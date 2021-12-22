import * as React from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import FormatDate from '../utils/formatdate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../components/header'

const Tweets = (props) => {
  console.log(props)
  return (
    <div id="tweets">
      <h3>Tweets</h3>
      {/* map through tweets; if user is the author, add a delete button */}
      {props.userTweets.map(tweet => {
        let del = ''
        if (props.username === props.user.username) {
          del = (
            <span name="deleteTweet" className="delete" onClick={props.handleSubmit}>
                <FontAwesomeIcon icon={['fas', 'trash']}></FontAwesomeIcon>
            </span>
          )
        }
        return (
          <article id={tweet.id} key={tweet.id}>
            {tweet.message} <br />
            by {props.username} <br />
            on {FormatDate(tweet.created_at)}
            {del}
          </article>
        )
      })}
    </div>
  )
}

const Profile = (props) => {
  let params = useParams()
  let username = params.username

  useEffect(() => {
    props.setProfileUser(params.username)
  }, [])

    return (
      <div className="container">
        <Header authenticated={props.authenticated} handleSubmit={props.handleSubmit} />
        <h1>{username}</h1>
        <Tweets
          userTweets={props.userTweets}
          username={username}
          user={props.user}
        />
        
      </div>
    )
}

export default Profile