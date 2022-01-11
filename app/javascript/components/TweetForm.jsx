import React from 'react'

const TweetForm = (props) => {
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

export default TweetForm