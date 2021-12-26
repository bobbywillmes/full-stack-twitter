import * as React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormatDate from '../utils/formatdate'
import Header from '../components/header'

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
            by <Link to={`/${tweet.username}`}>{tweet.username}</Link> <br />
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
  // main component after user has logged in, shows feed & Tweet form, all actions (handleChange, handleSubmit & handleDelete) are passed up to App through props
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

  logout = (event) => {
    event.preventDefault()
    this.props.logout()
  }

  componentDidMount() {
    this.props.getTweets()
  }

  render() {
    return (
      <div className="container">
        <Header authenticated={this.props.authenticated} handleSubmit={this.handleSubmit}  logout={this.logout} />
        <div className="row">
          <div className="col">
            <h3>Welcome {this.props.user.username}</h3>
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
        <Tweets tweets={this.props.tweets} handleDelete={this.handleDelete} user_id={this.props.user.id} />
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

  componentDidMount() {
    this.props.checkAuthenticated()
  }

  render() {
    return (
      <main>
        {this.isAuthenticated()
          ? <User
            user={this.props.user}
            user_id={this.props.user_id}
            users={this.props.users}
            tweets={this.props.tweets}
            authenticated={this.props.authenticated}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            logout={this.props.logout}
            getTweets={this.props.getTweets}
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