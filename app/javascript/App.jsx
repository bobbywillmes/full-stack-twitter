import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, fab)
import Main from './routes/main'
import Header from './components/header'
import HandleErrors from './utils/handleErrors'

class App extends React.Component {
  // top level component for application, maintains the State, passes down handleChange (form changes), handleSubmit(api calls) & state data (tweets & users) to Main component
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      user: '',
      username: '',
      user_id: '',
      password: '',
      authenticated: false,
      newUsername: '',
      newEmail: '',
      newPassword: '',
      newTweet: '',
      tweets: [],
      users: []
    }
  }

  getTweets() {
    axios.get('/api/tweets')
      .then(res => {
        if (res.status === 200) {
          this.setState({ tweets: res.data.tweets })
        } else {
          console.log(`couldn't get tweets`)
        }
      })
      .catch(err => {
        console.log(`error with GET: /api/tweets`)
        console.log(err)
      })
  }

  getUsers() {
    axios.get('/api/users')
      .then(res => {
        if (res.status === 200) {
          let users = res.data
          this.setState({ users: users })
        } else {
          console.log(`couldn't get users`)
        }
      })
      .catch(err => {
        console.log(`error with GET: /api/users`)
        console.log(err)
      })
  }

  handleSubmit = (event) => {
    // api calls to the backend
    event.preventDefault()
    console.log(event)
    let formType = event.target.name
    console.log(`form type: ${formType}`)

    if(event.target.parentElement.parentElement.getAttribute('name') == 'deleteTweet') {
      console.log(`tweet should be deleted---`)
      formType = 'deleteTweet'
    }

    if (formType === 'logIn') {
      // try to login with form input set by user; if success, user is authenticated
      axios.post('/api/sessions', {
        user: {
          username: this.state.username,
          password: this.state.password
        }
      })
        .then(res => {
          // console.log(`POST: /api/sessions --`)
          if (res.data.success === true) {
            // console.log(`successfully logged in`)
            this.setState({
              user_id: res.data.session.user_id,
              user: res.data.user,
              password: '',
              authenticated: true,
              newPassword: "",
              newUsername: ""
            })
            this.getTweets()
            this.getUsers()
          } else {
            HandleErrors({ error: ['Incorrect username and/or password'] }, formType)
          }
        })
        .catch(err => {
          console.log(`error with POST: /api/sessions`)
          console.log(err)
        })
    } else if (formType === 'logOut') {
      // log out by sending a delete request to end session
      axios.delete('/api/sessions')
        .then(res => {
          // console.log(`DELETE: /api/sessions --`)
          if (res.data.success === true) {
            // console.log(`successfully logged out`)
            this.setState({ authenticated: false, username: '', password: '' })
          }
        })
        .catch(err => {
          console.log(`error with DELETE: /api/sessions`)
          console.log(err)
        })
    } else if (formType === 'signUp') {
      // submit form input set by user to sign up, else return error
      // console.log('signUp handleSubmit() ---')
      axios.post('/api/users', {
        user: {
          email: this.state.newEmail,
          username: this.state.newUsername,
          password: this.state.newPassword
        }
      })
        .then(res => {
          // console.log(`POST: /api/users ---`)
          let error = res.data.error
          HandleErrors(error, formType)
        })
    } else if (formType === 'tweet') {
      // submit a tweet, else return error
      axios.post('/api/tweets', {
        tweet: {
          message: this.state.newTweet
        }
      })
        .then(res => {
          // console.log(`POST: /api/tweets --`)
          // clear tweet form, then get tweets
          const tweetForm = document.querySelector('textarea#tweet')
          tweetForm.value = ''
          this.getTweets()
        })
        .catch(err => {
          console.log(`error with POST: /api/tweets`)
          console.log(err)
        })
    } else if (formType === 'deleteTweet') {
      // delete a tweet
      console.log(`formType === 'deleteTweet'`)
      let tweetEl = event.target.parentElement.parentElement.parentElement
      let tweetId = tweetEl.getAttribute('id')
      axios.delete(`/api/tweets/${tweetId}`)
        .then(res => {
          // console.log(`DEL: /api/tweets/${tweetId} ---`)
          if (res.data.success) {
            // console.log(`delete tweet was successful ---`)
            this.getTweets()
          }
        })
    } else {
      console.log(`handleSubmit() else ---- `)
    }
  }

  handleChange = (event) => {
    // watch for changes on logIn, signUp & tweet forms, then setState of the form input values
    // console.log(event.target.name + ': ' + event.target.value)
    let form = event.target.parentElement.parentElement.parentElement.getAttribute('name')
    // console.log(form)
    if (form === 'logIn') {
      if (event.target.name === 'username') {
        this.setState({ username: event.target.value })
      } else if (event.target.name === 'password') {
        this.setState({ password: event.target.value })
      }
    } else if (form === 'signUp') {
      if (event.target.name === 'username') {
        this.setState({ newUsername: event.target.value })
      } else if (event.target.name === 'email') {
        this.setState({ newEmail: event.target.value })
      } else if (event.target.name === 'password') {
        this.setState({ newPassword: event.target.value })
      }
    } else if (form === 'tweet') {
      this.setState({ newTweet: event.target.value })
    }
  }

  render() {
    return (
      <Router>
        <Header authenticated={this.state.authenticated} handleSubmit={this.handleSubmit}></Header>
        <Routes>
          <Route exact path='/' element={<Main
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            authenticated={this.state.authenticated}
            user={this.state.user}
            user_id={this.state.user_id}
            users={this.state.users}
            tweets={this.state.tweets}
          />}  ></Route>
        </Routes>
      </Router>

    )
  }
}

export default App
