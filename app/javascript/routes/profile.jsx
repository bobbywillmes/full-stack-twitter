import * as React from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'
import Tweets from '../components/Tweets'

const Profile = (props) => {
  let params = useParams()
  let username = params.username

  useEffect(() => {
    props.setProfileUser(params.username)
  }, [])
  const handleChange = (event) => {
    props.handleChange(event)
    let form = event.target.parentElement.parentElement.parentElement
    let button = form.querySelector('button')
    let textarea = form.querySelector('textarea')
    if (textarea.value.length > 0) {
      button.disabled = false
    } else {
      button.disabled = true
    }
  }
  const handleImageSelect = (event) => {
    props.handleImageSelect(event)
  }
  const handleSubmit = (event) => {
    props.handleSubmit(event)
  }
  const handleDelete = (event) => {
    props.handleSubmit(event)
  }
  const logout = (event) => {
    event.preventDefault()
    props.logout(event)
  }

    return (
      <div id="profile" className="container">
        <div className="row">
          <div className="col-3">
            <LeftSidebar user={props.user} handleChange={handleChange} handleSubmit={handleSubmit} handleImageSelect={handleImageSelect} logout={logout} />
          </div>
          <div className="col-6">
            <h4 className="username">{username}</h4>
            <Tweets tweets={props.userTweets} handleDelete={handleDelete} user_id={props.user.id} />
          </div>
          <div className="col-3">
            <RightSidebar />
          </div>
        </div>
        <hr />
      </div>
    )
}

export default Profile