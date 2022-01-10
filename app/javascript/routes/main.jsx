import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormatDate from '../utils/formatdate'
import Header from '../components/header'
import Modal from '../components/modal'

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

class TweetOptions extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  showTweetOptionsFunc = () => {
    this.props.showTweetOptionsFunc()
  }
  handleDelete = (e) => {
    this.props.handleDelete(e)
  }
  confirmDelete = (e) => {
    if (window.confirm('Are you sure?')) {
      this.handleDelete(e)
    }
  }

  render() {
    if (this.props.tweet.user_id == this.props.user_id) {
      return (
        <Fragment>
          <button className="btn red" name="deleteTweet" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon={['fas', 'trash-alt']} className="icon"></FontAwesomeIcon> Delete
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['fas', 'thumbtack']} className="icon"></FontAwesomeIcon> Pin to your profile
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['fas', 'plus']} className="icon"></FontAwesomeIcon> Add/remove from Lists
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['fas', 'comment']} className="icon"></FontAwesomeIcon> Change who can reply
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['fas', 'code']} className="icon"></FontAwesomeIcon> Embed Tweet
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['far', 'chart-bar']} className="icon"></FontAwesomeIcon> View Tweet activity
          </button>
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['fas', 'minus']} className="icon"></FontAwesomeIcon> Unfollow {this.props.tweet.username}
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['far', 'frown']} className="icon"></FontAwesomeIcon> Not interested in this Tweet
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['far', 'frown']} className="icon"></FontAwesomeIcon> Add/remove {this.props.tweet.username} from Lists
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['fas', 'volume-mute']} className="icon"></FontAwesomeIcon> Mute {this.props.tweet.username}
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['fas', 'ban']} className="icon"></FontAwesomeIcon> Block {this.props.tweet.username}
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['fas', 'code']} className="icon"></FontAwesomeIcon> Embed Tweet
          </button>
          <button className="btn" onClick={this.showTweetOptionsFunc}>
            <FontAwesomeIcon icon={['far', 'flag']} className="icon"></FontAwesomeIcon> Report Tweet
          </button>
        </Fragment>
      )
    }


  }

}

class Tweet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showTweetOptions: false,
      hasOptions: true
    }
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    if(this.props.hasOptions == false) {
      this.setState({ hasOptions: false })
    }
  }
  showTweetOptionsFunc = (e) => {
    this.setState({ showTweetOptions: !this.state.showTweetOptions })
  }
  handleDelete = (e) => {
    this.props.handleDelete(e)
  }

  tweetOptions = () => {
    return (
      <Fragment>
        <button className="btn btn-link optionsBtn" onClick={this.showTweetOptionsFunc} >
          <FontAwesomeIcon icon={['fas', 'ellipsis-h']} className="icon"></FontAwesomeIcon>
        </button>
        {this.state.showTweetOptions ? (
          <div className="options">
            <TweetOptions showTweetOptionsFunc={this.showTweetOptionsFunc} tweet={this.props.tweet} user_id={this.props.user_id} handleDelete={this.handleDelete} />
          </div>
        ) : (
          <div></div>
        )}
      </Fragment>
    )
  }

  render() {
    return (
      <article id={this.props.tweet.id} key={this.props.tweet.id} className="tweet">
        <Link className="user" to={`/${this.props.tweet.username}`}>
          <FontAwesomeIcon icon={['far', 'user-circle']} className="icon"></FontAwesomeIcon> {this.props.tweet.username}
        </Link> &bull;  {FormatDate(this.props.tweet.created_at, true)}
        <br />
        {this.props.tweet.message} <br />
      {this.state.hasOptions ? <this.tweetOptions /> : (<span></span>)}
      </article>
    )
  }
}

class Tweets extends React.Component {
  constructor(props) {
    super(props)
  }
  // render all tweets for the User component
  render() {
    return (
      <div className="tweets">
        {this.props.tweets.map(tweet => {
          return (
            <Tweet tweet={tweet} key={tweet.id} user_id={this.props.user_id} handleDelete={this.props.handleDelete} hasOptions={this.props.hasOptions} />
          )
        })}
      </div>
    )
  }
}

const TweetForm = (props) => {
  // build Tweet form for User component
  return (
    <form id={props.formId} className="tweetForm" name="tweet" onSubmit={props.handleSubmit}>
      <fieldset>
        <div className="mb-3">
          <textarea className="form-control" id="tweet" rows="3" placeholder="What's happening?" onChange={props.handleChange}></textarea>
        </div>
        <button disabled className="btn btn-tweet">Tweet</button>
      </fieldset>
    </form>
  )
}

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMoreNav: false,
      showMoreUser: false
    }
  }
  handleChange = (event) => {
    this.props.handleChange(event)
  }
  handleSubmit = (event) => {
    this.props.handleSubmit(event)
  }
  showMoreNavFunc = (e) => {
    this.setState({ showMoreNav: !this.state.showMoreNav })
  }
  showMoreUserFunc = (e) => {
    this.setState({ showMoreUser: !this.state.showMoreUser })
  }
  logout = (event) => {
    event.preventDefault()
    this.props.logout(event)
  }

  render() {
    return (
      <Fragment>
        <nav id="leftSidebar">
          <div>
            <Link to={"/"} className="twitterIcon"><FontAwesomeIcon icon={['fab', 'twitter']}></FontAwesomeIcon></Link>
            <button className="btn btn-link">
              <FontAwesomeIcon icon={['fas', 'home']} className="icon"></FontAwesomeIcon> Home
            </button>
            <button className="btn btn-link">
              <FontAwesomeIcon icon={['fas', 'hashtag']} className="icon"></FontAwesomeIcon> Explore
            </button>
            <button className="btn btn-link">
              <FontAwesomeIcon icon={['far', 'bell']} className="icon"></FontAwesomeIcon> Notifications
            </button>
            <button className="btn btn-link">
              <FontAwesomeIcon icon={['far', 'envelope']} className="icon"></FontAwesomeIcon> Messages
            </button>
            <button className="btn btn-link">
              <FontAwesomeIcon icon={['far', 'user']} className="icon"></FontAwesomeIcon> Profile
            </button>
            <button className="btn btn-link" onFocus={this.showMoreNavFunc} onBlur={this.showMoreNavFunc}>
              <FontAwesomeIcon icon={['fas', 'ellipsis-h']} className="icon"></FontAwesomeIcon> More
            </button>
          </div>
          {this.state.showMoreNav ?
            (<div id="moreMenu">
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['fas', 'comment-dots']} className="icon"></FontAwesomeIcon> Topics
              </button>
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['fas', 'bolt']} className="icon"></FontAwesomeIcon> Moments
              </button>
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['fab', 'twitter']} color="#1d9bf0" className="icon"></FontAwesomeIcon> Twitter Blue
              </button>
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['far', 'newspaper']} className="icon"></FontAwesomeIcon> Newsletters
              </button>
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['fas', 'rocket']} className="icon"></FontAwesomeIcon> Twitter for Professionals
              </button>
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['fas', 'arrow-right']} className="icon"></FontAwesomeIcon> Twitter ads
              </button>
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['far', 'chart-bar']} className="icon"></FontAwesomeIcon> Analytics
              </button>
              <hr />
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['fas', 'cog']} className="icon"></FontAwesomeIcon> Setting and privacy
              </button>
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['far', 'question-circle']} className="icon"></FontAwesomeIcon> Help Center
              </button>
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['far', 'edit']} className="icon"></FontAwesomeIcon> Display
              </button>
              <button className="btn btn-link">
                <FontAwesomeIcon icon={['far', 'user-circle']} className="icon"></FontAwesomeIcon> Keyboard shortcuts
              </button>

              <button className="btn btn-link" onClick={this.showMoreNav}>
                <FontAwesomeIcon icon={['fas', 'ellipsis-h']} className="icon"></FontAwesomeIcon> Close
              </button>
            </div>) :
            (<span></span>)
          }
          <Modal
            buttonText="Tweet!"
            buttonClass="btn btn-rounded btn-tweet"
            modalClass="tweetModal modal-lg col-9 col-md-6"
          >
            <TweetForm formId="tweetModal" handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          </Modal>
        </nav>
        <div id="leftSidebarBottom" onClick={this.showMoreUserFunc}>
          <div className="row">
            <div className="col">
              <FontAwesomeIcon icon={['far', 'user-circle']} className="icon"></FontAwesomeIcon>
            </div>
            <div className="col">
              {this.props.user.username}
              <br /> {this.props.user.email}
            </div>
            <div className="col">
              <FontAwesomeIcon icon={['fas', 'ellipsis-h']} className='icon'></FontAwesomeIcon>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {this.state.showMoreUser ?
                (<div id="showMoreUser">
                  <form id="logOut" name="logOut">
                    <button name="logOut" className="btn btn-link" onClick={this.logout}>Log Out</button>
                  </form>
                </div>)
                : (<div></div>)
              }
            </div>
          </div>
        </div>

      </Fragment>
    )
  }
}

class RightSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearchResults: false
    }
  }
  showSearchResultsFunc = () => {
    const inputEl = document.querySelector('#rightSidebar .input-group')
    if (!this.state.showSearchResults) {
      inputEl.classList.add('focus')
    } else {
      inputEl.classList.remove('focus')
    }
    this.setState({ showSearchResults: !this.state.showSearchResults })
  }

  happeningTweets = [
    {
      "id": 142,
      "user_id": 1,
      "username": "The New York Times",
      "message": "How to think about Covid data right now",
      "created_at": "2022-01-09T17:55:46.732Z",
      "updated_at": "2022-01-09T17:55:46.732Z"
    },
    {
      "id": 141,
      "user_id": 3,
      "username": "Bloomberg Quicktake",
      "message": "The tallest Galapagos volcano erupts, spewing lava and ash over Pacfic Ocean",
      "created_at": "2022-01-04T20:00:17.798Z",
      "updated_at": "2022-01-04T20:00:17.798Z"
    },
    {
      "id": 139,
      "user_id": 3,
      "username": "BuzzFeed",
      "message": "20 celebrity couples who changed a whole lot or a whole little in the last 20 years",
      "created_at": "2022-01-04T18:21:47.679Z",
      "updated_at": "2022-01-04T18:21:47.679Z"
    },
    {
      "id": 137,
      "user_id": 3,
      "username": "The New York Times",
      "message": "Big Bend National Park has had an increase in valdalism, including \"irreparable damage\" done to prehistoric art that was carved into a rock at least 3,000 years ago.",
      "created_at": "2022-01-04T17:36:41.314Z",
      "updated_at": "2022-01-04T17:36:41.314Z"
    }
  ]

  toFollow = [
    {id: 1, username: 'Tesla'},
    {id: 2, username: 'NASA'},
    {id: 3, username: 'Bloomberg'}
  ]
  WhoToFollow = () => {
    return (
      <div>
        {this.toFollow.map(person => {
          return (
            <article key={person.id}>
              <FontAwesomeIcon icon={['far', 'user-circle']} className="icon"></FontAwesomeIcon>
              &nbsp;
              {person.username}
              <button className="btn">Follow</button>
            </article>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div id="rightSidebar">
        <div>
          
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <FontAwesomeIcon icon={['fas', 'search']} className="icon"></FontAwesomeIcon>
          </span>
          <input type="text" className="form-control" placeholder="Search Twitter" aria-label="Search Twitter" aria-describedby="basic-addon1" onFocus={this.showSearchResultsFunc} onBlur={this.showSearchResultsFunc} />
          {this.state.showSearchResults ?
            (<div id="searchResults">
              Try searching for people, topics, or keywords
            </div>) :
            (<div></div>)
          }
        </div>
        <section>
          <h4>What's Happening</h4>
          <Tweets tweets={this.happeningTweets} hasOptions={false} />
        </section>
        <section id="follow">
          <h4>Who to follow</h4>
          <this.WhoToFollow />
        </section>
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