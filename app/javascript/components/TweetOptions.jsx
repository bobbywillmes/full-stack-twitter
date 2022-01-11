import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

export default TweetOptions