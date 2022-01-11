import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../components/modal'
import Tweets from '../components/Tweets'
import TweetForm from '../components/TweetForm'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'

class Guest extends React.Component {
  // login & sign up page, all actions (handleChange & handleSubmit) are passed up to the App by props
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
      <div id="login" className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-5 order-md-2 p-4 forms">
            <FontAwesomeIcon icon={['fab', 'twitter']} className='home-icon-right'></FontAwesomeIcon>
            <br /><br /><br />
            <h1>Happening Now</h1>
            <br /><br />
            <h2>Join Twitter today.</h2>
            <br />
            <Modal buttonText="Sign up with email" buttonClass="btn btn-rounded btn-primary blue-bg">
              <div className="modal-title">
                <FontAwesomeIcon icon={['fab', 'twitter']} color="#1d9bf0"></FontAwesomeIcon>
              </div>
              <form id="signUp" name="signUp" onSubmit={this.handleSubmit}>
                <fieldset>
                  <legend>Create your account</legend>
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
            </Modal>
            <span id="legal">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</span>
            <br /><br /><br />
            <h3>Already have an account?</h3>
            <Modal buttonText="Sign in" buttonClass="btn btn-rounded btn-outline-primary">
              <FontAwesomeIcon icon={['fab', 'twitter']} color="#1d9bf0"></FontAwesomeIcon>
              <form id="logIn" name="logIn" onSubmit={this.handleSubmit}>
                <fieldset>
                  <legend>Sign in</legend>
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
            </Modal>

          </div>
          <div className="col-12 col-md-7 order-md-1  image">
            <FontAwesomeIcon icon={['fab', 'twitter']} className='large-icon'></FontAwesomeIcon>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <nav>
              <button className="btn btn-link">About</button>
              <button className="btn btn-link">Help Center</button>
              <button className="btn btn-link">Terms of Service</button>
              <button className="btn btn-link">Privacy Policy</button>
              <button className="btn btn-link">Cookie Policy</button>
              <button className="btn btn-link">Accessibility</button>
              <button className="btn btn-link">Ads info</button>
              <button className="btn btn-link">Blog</button>
              <button className="btn btn-link">Status</button>
              <button className="btn btn-link">Careers</button>
              <button className="btn btn-link">Brand Resourses</button>
              <button className="btn btn-link">Avertising</button>
              <button className="btn btn-link">Marketing</button>
              <button className="btn btn-link">Twitter for Business</button>
              <button className="btn btn-link">Developers</button>
              <button className="btn btn-link">Directory</button>
              <button className="btn btn-link">Settings</button>
              <br />
              <span>&copy; 2021 Twitter, Inc.</span>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

class User extends React.Component {
  // main component after user has logged in, shows feed & Tweet form, all actions (handleChange, handleSubmit & handleDelete) are passed up to App through props
  constructor(props) {
    super(props)
  }

  handleChange = (event) => {
    this.props.handleChange(event)
    let form = event.target.parentElement.parentElement.parentElement
    let button = form.querySelector('button')
    let textarea = form.querySelector('textarea')
    if (textarea.value.length > 0) {
      button.disabled = false
    } else {
      button.disabled = true
    }
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
      <div id="feed" className="container">
        <div className="row">
          <div className="col-3">
            <LeftSidebar user={this.props.user} handleChange={this.handleChange} handleSubmit={this.handleSubmit} logout={this.logout} />
          </div>
          <div className="col-6">
            <h4>Home</h4>
            <TweetForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            <Tweets tweets={this.props.tweets} handleDelete={this.handleDelete} user_id={this.props.user.id} />
          </div>
          <div className="col-3">
            <RightSidebar />
          </div>
        </div>
        <hr />
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