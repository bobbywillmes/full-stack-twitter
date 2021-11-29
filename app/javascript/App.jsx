import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import Main from './routes/main'

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render () {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Main />} ></Route>
        </Routes>
      </Router>
      
    )
  }
}

export default App
