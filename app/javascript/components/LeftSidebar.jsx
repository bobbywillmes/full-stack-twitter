import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../components/modal'
import TweetForm from './TweetForm'

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
  handleImageSelect = (event) => {
    this.props.handleImageSelect(event)
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
              <Link to={"/"}><FontAwesomeIcon icon={['fas', 'home']} className="icon"></FontAwesomeIcon> Home</Link>
            </button>
            <button className="btn btn-link btn-fake">
              <FontAwesomeIcon icon={['fas', 'hashtag']} className="icon"></FontAwesomeIcon> Explore
            </button>
            <button className="btn btn-link btn-fake">
              <FontAwesomeIcon icon={['far', 'bell']} className="icon"></FontAwesomeIcon> Notifications
            </button>
            <button className="btn btn-link btn-fake">
              <FontAwesomeIcon icon={['far', 'envelope']} className="icon"></FontAwesomeIcon> Messages
            </button>
            <button className="btn btn-link btn-fake">
              <FontAwesomeIcon icon={['far', 'user']} className="icon"></FontAwesomeIcon> Profile
            </button>
            <button className="btn btn-link btn-fake" onFocus={this.showMoreNavFunc} onBlur={this.showMoreNavFunc}>
              <FontAwesomeIcon icon={['fas', 'ellipsis-h']} className="icon"></FontAwesomeIcon> More
            </button>
          </div>
          {this.state.showMoreNav ?
            (<div id="moreMenu">
              <button className="btn btn-link btn-fake">
                <FontAwesomeIcon icon={['fas', 'comment-dots']} className="icon"></FontAwesomeIcon> Topics
              </button>
              <button className="btn btn-link btn-fake">
                <FontAwesomeIcon icon={['fas', 'bolt']} className="icon"></FontAwesomeIcon> Moments
              </button>
              <button className="btn btn-link btn-fake">
                <FontAwesomeIcon icon={['fab', 'twitter']} color="#1d9bf0" className="icon"></FontAwesomeIcon> Twitter Blue
              </button>
              <button className="btn btn-link btn-fake">
                <FontAwesomeIcon icon={['far', 'newspaper']} className="icon"></FontAwesomeIcon> Newsletters
              </button>
              <button className="btn btn-link btn-fake">
                <FontAwesomeIcon icon={['fas', 'rocket']} className="icon"></FontAwesomeIcon> Twitter for Professionals
              </button>
              <button className="btn btn-link btn-fake">
                <FontAwesomeIcon icon={['fas', 'arrow-right']} className="icon"></FontAwesomeIcon> Twitter ads
              </button>
              <button className="btn btn-link btn-fake">
                <FontAwesomeIcon icon={['far', 'chart-bar']} className="icon"></FontAwesomeIcon> Analytics
              </button>
              <hr />
              <button className="btn btn-link btn-fake">
                <FontAwesomeIcon icon={['fas', 'cog']} className="icon"></FontAwesomeIcon> Setting and privacy
              </button>
              <button className="btn btn-link btn-fake">
                <FontAwesomeIcon icon={['far', 'question-circle']} className="icon"></FontAwesomeIcon> Help Center
              </button>
              <button className="btn btn-link btn-fake">
                <FontAwesomeIcon icon={['far', 'edit']} className="icon"></FontAwesomeIcon> Display
              </button>
              <button className="btn btn-link btn-fake">
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
            <TweetForm formId="tweetModal" handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleImageSelect={this.handleImageSelect} />
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

export default LeftSidebar