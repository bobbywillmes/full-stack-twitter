import * as React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

function FormatDate(date) {
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let newDate = new Date(date)
  newDate = months[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear() + ' ' + newDate.toLocaleTimeString()
  return newDate
}

const Tweets = (props) => {
  // render all tweets for the User component
  let users = props.users
  // console.log(`Tweets() build Tweets ------------------`)
  return (
    <div id="tweets">
      <h3>Tweets</h3>
      {/* map through tweets; if user is the author, add a delete button */}
      {props.tweets.map(tweet => {
        let del = ''
        if (tweet.user_id === props.user_id) {
          del = (
            <span name="deleteTweet" className="delete" onClick={props.handleDelete}>
                <FontAwesomeIcon icon={['fas', 'trash']}></FontAwesomeIcon>
            </span>
          )
        }
        return (
          <article id={tweet.id} key={tweet.id}>
            {tweet.message} <br />
            by {tweet.user_id} <br />
            on {FormatDate(tweet.created_at)}
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
  // main component after user has logged in, shows feed & Tweet form, all actions (handleChange & handleSubmit) are passed up to App through props
  constructor(props) {
    super(props)
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
  // if user is logged in render the User component (feed), else render the Guest component (login & signup). handleChange & handleSubmit are passed up to App.js.
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    this.props.handleChange(event)
  }

  handleSubmit = (event) => {
    this.props.handleSubmit(event)
  }


  isAuthenticated() {
    return !!this.props.authenticated
  }

  render() {
    return (
      <main style={{ padding: "1rem 0" }}>
        {this.isAuthenticated()
          ? <User
            user={this.props.username}
            user_id={this.props.user_id}
            users={this.props.users}
            tweets={this.props.tweets}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            />
          : <Guest
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            />
        }
      </main>
    );
  }

}

export default Main;