import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tweets from './Tweets'

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

export default RightSidebar