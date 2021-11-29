import * as React from 'react'
import axios from 'axios'
import Header from '../components/header'

function HandleErrors(err, formType) {
  // loop through given errors to build HTML, insert errors onto page section based on formType
  console.log(`handleErrors() ${formType} ---`)
  console.log(err)
  let errorHtml = ''
  for (const property in err) {
    // console.log(`${property}`)
    errorHtml += `
      <div class="alert alert-warning" role="alert">
        <strong>${property}</strong>: ${err[property].join(', ')}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `
  }
  let errorDiv
  if (formType == 'signUp') {
    errorDiv = document.querySelector('#signUpErrors')
  } else if (formType == 'logIn') {
    errorDiv = document.querySelector('#logInErrors')
  }
  errorDiv.innerHTML = errorHtml
}

class Guest extends React.Component {
  // login & sign up page, all actions (handleChange & handleSubmit) are passed up to the Main component
  constructor(props) {
    super(props)
  }

  handleChange = (event) => {
    this.props.handleChange(event)
  }
  handleSubmit = (event) => {
    this.props.handleSubmit(event)
  }

  render() {
    return (
      <div className="container">
        <div className="row">

          <div className="col">
            <form id="logIn" name="logIn" onSubmit={this.handleSubmit}>
              <fieldset>
                <legend>Log in</legend>
                <div className="mb-3">
                  <label htmlFor="loginUsername" className="form-label">Username</label>
                  <input type="text" name="username" className="form-control" id="loginUsername" placeholder="SomeUser" value={this.username} onChange={this.handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" id="loginPassword" placeholder="******" value={this.password} onChange={this.handleChange} />
                </div>
                <button className="btn btn-primary">Log In</button>
              </fieldset>
            </form>
            <hr />
            <div id="logInErrors"></div>
          </div>

          <div className="col">
            <form id="signUp" name="signUp" onSubmit={this.handleSubmit} autoComplete="off">
              <fieldset>
                <legend>Sign Up</legend>
                <div className="mb-3">
                  <label htmlFor="signUpEmail" className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" id="signUpEmail" placeholder="mark@gmail.com" value={this.newEmail} onChange={this.handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="signUpUsername" className="form-label">Username</label>
                  <input type="text" name="username" className="form-control" id="signUpUsername" placeholder="SomeUser" value={this.newUsername} onChange={this.handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="signUpPassword" className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" id="signUpPassword" placeholder="******" value={this.newPassword} onChange={this.handleChange} />
                </div>
                <br />
                <button id="signUpBtn" className="btn btn-success">Sign Up</button>
              </fieldset>
            </form>
            <div id="signUpErrors"></div>
          </div>

        </div>
      </div>
    )
  }
}

const Tweets = (props) => {
  // render all tweets for the User component
  let users = props.users
  return (
    <div id="tweets">
      <h3>Tweets</h3>
      {/* map through tweets, get the author's details; if user is the author, add a delete button */}
      {props.tweets.map(tweet => {
        let author = users.filter(function (user) {
          return user.id === tweet.user_id
        })
        author = author[0]
        let del = ''
        if (tweet.user_id === props.user_id) {
          del = <a name="deleteTweet" className="delete" onClick={props.handleDelete}>x</a>
        }
        return (
          <article id={tweet.id} key={tweet.id}>
            {tweet.message} <br />
            by {author.username} on {tweet.created_at}
            {del}
          </article>
        )
      })}
    </div>
  )
}

const TweetForm = (props) => {
  // build Tweet form for User component
  return (
    <form id="tweetForm" name="tweet" onSubmit={props.handleSubmit}>
      <fieldset>
        <div className="mb-3">
          <label htmlFor="tweet" className="form-label">Tweet:</label>
          <textarea className="form-control" id="tweet" rows="3" placeholder="What's happening?" onChange={props.handleChange}></textarea>
        </div>
        <button className="btn btn-success">Tweet</button>
      </fieldset>
    </form>
  )
}

class User extends React.Component {
  // main component after user has logged in, shows feed & Tweet form, all actions (handleChange & handleSubmit) are passed up to the Main component
  constructor(props) {
    super(props)
    this.state = {
      tweets: []
    }
  }

  handleChange = (event) => {
    this.props.handleChange(event)
  }
  handleSubmit = (event) => {
    this.props.handleSubmit(event)
  }
  handleDelete = (event) => {
    this.props.handleSubmit(event)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Welcome {this.props.user} ({this.props.user_id})</h3>
          </div>
          <div className="col">
            <form id="logOut" name="logOut" onSubmit={this.handleSubmit}>
              <button name="logOut" className="btn btn-secondary">Log Out</button>
            </form>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12 col-md-6">
            <TweetForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} />
          </div>
        </div>
        <hr />
        <h4>Feed</h4>
        <Tweets tweets={this.props.tweets} handleDelete={this.handleDelete} user_id={this.props.user_id} users={this.props.users} />
      </div>
    )
  }
}

class Main extends React.Component {
  // main component, maintains State for application, handles API calls to server, renders either User or Guest component based on login state
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      user_id: '',
      password: '',
      authenticated: false,
      newUsername: '',
      newEmail: '',
      newPassword: '',
      tweets: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getUsers() {
    axios.get('/api/users')
      .then(res => {
        if (res.status === 200) {
          // console.log(`${res.status}(${res.statusText}) | got users`)
          // console.log(res.data)
          let users = res.data
          this.setState({ users: users })
        } else {
          console.log(`couldn't get users`)
          console.log(error)
        }
      })
      .catch(err => {
        console.log(`error with GET: /api/users`)
        console.log(err)
      })
  }

  getTweets() {
    axios.get('/api/tweets',)
      .then(res => {
        if (res.status === 200) {
          // console.log(`successfully got tweets`)
          // console.log(res.data)
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

  componentDidMount() {
    this.getUsers()
  }

  handleSubmit = (event) => {
    // all the api calls to the backend
    event.preventDefault()
    console.log(event)
    let formType = event.target.name
    console.log(`form type: ${formType}`)

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
          // console.log(`${res.status}(${res.statusText}) | ${res.data.success}`)
          if (res.data.success === true) {
            // console.log(`successfully logged in`)
            this.setState({ user_id: res.data.session.user_id })
            this.setState({ authenticated: true, newPassword: "", newUsername: "" })
            this.getTweets()
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
          // console.log(`${res.status}(${res.statusText}) | ${res.data.success}`)
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
      console.log('signUp handleSubmit() ---')
      axios.post('/api/users', {
        user: {
          email: this.state.newEmail,
          username: this.state.newUsername,
          password: this.state.newPassword
        }
      })
        .then(res => {
          console.log(`POST: /api/users ---`)
          console.log(res)
          let error = res.data.error
          HandleErrors(error, formType)
        })
    } else if (formType === 'tweet') {
      // submit a tweet, else return error
      console.log(`formType === 'tweet`)
      console.log(`form === tweet ----`)
      axios.post('/api/tweets', {
        tweet: {
          message: this.state.newTweet
        }
      })
        .then(res => {
          console.log(`POST: /api/tweets --`)
          console.log(res)
          let tweet = res.data.tweet
          console.log(tweet)
          console.log(this.state)

          this.getTweets()
        })
        .catch(err => {
          console.log(`error with POST: /api/tweets`)
          console.log(err)
        })
    } else if (formType === 'deleteTweet') {
      // delete a tweet
      console.log(`formType === 'deleteTweet'`)
      console.log(`handleDelete() ---`)
      let tweetEl = event.target.parentElement
      let tweetId = tweetEl.getAttribute('id')
      console.log(tweetEl)
      console.log(tweetId)
      axios.delete(`/api/tweets/${tweetId}`)
        .then(res => {
          console.log(`DEL: /api/tweets/${tweetId} ---`)
          console.log(res)
          if (res.data.success) {
            console.log(`delete tweet was successful ---`)
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
      // console.log(`logIn form ---`)
      if (event.target.name === 'username') {
        this.setState({ username: event.target.value })
      } else if (event.target.name === 'password') {
        this.setState({ password: event.target.value })
      }
    } else if (form === 'signUp') {
      // console.log(`signUp form ---`)
      if (event.target.name === 'username') {
        this.setState({ newUsername: event.target.value })
      } else if (event.target.name === 'email') {
        this.setState({ newEmail: event.target.value })
      } else if (event.target.name === 'password') {
        this.setState({ newPassword: event.target.value })
      }
    } else if (form === 'tweet') {
      // console.log(`tweet form ---- ${event.target.value}`)
      this.setState({ newTweet: event.target.value })
    }
  }

  isAuthenticated() {
    return !!this.state.authenticated
  }

  render() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <Header />
        {this.isAuthenticated()
          ? <User
            user={this.state.username}
            user_id={this.state.user_id}
            users={this.state.users}
            tweets={this.state.tweets}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange} />
          : <Guest
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange} />
        }
      </main>
    );
  }

}

export default Main;