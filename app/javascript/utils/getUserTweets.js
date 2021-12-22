import axios from 'axios'

function getUserTweets2(username) {
  console.log(`getUserTweets(${username})`)
  axios.get('/api/users/' + username + '/tweets')
    .then(res => {
      if (res.status === 200) {
        console.log(res.data.tweets)
        return res.data
      } else {
        console.log(`couldn't get tweets`)
      }
    })
    .catch(err => {
      console.log(`error with GET: /api/tweets`)
      console.log(err)
    })
}

function getUserTweets(username) {
  console.log(`getUserTweets with Promise`)
  let promise = new Promise(function(resolve, reject) {
    // setTimeout(() => resolve('done'), 2000)
    axios.get('/api/users/' + username + '/tweets')
    .then(res => {
      if (res.status === 200) {
        // console.log(res.data.tweets)
        resolve(res.data) 
      } else {
        console.log(`couldn't get tweets`)
        reject(`couldn't get tweets`)
      }
    })
    .catch(err => {
      console.log(`error with GET: /api/tweets`)
      console.log(err)
      reject(err)
    })
  })
  return promise
}

export default getUserTweets