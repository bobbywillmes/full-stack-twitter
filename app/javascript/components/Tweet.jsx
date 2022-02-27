import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormatDate from '../utils/formatdate'
import TweetOptions from './TweetOptions'

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

  image = () => {
    let image
    if(this.props.tweet.image) {
      image = <img src={this.props.tweet.image.url} alt="Image" />
    }
    return (
      <Fragment>
        {image}
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
        <this.image />
      {this.state.hasOptions ? <this.tweetOptions /> : (<span></span>)}
      </article>
    )
  }
}

export default Tweet