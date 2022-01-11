import React from 'react'
import Tweet from './Tweet'

class Tweets extends React.Component {
  constructor(props) {
    super(props)
  }
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

export default Tweets