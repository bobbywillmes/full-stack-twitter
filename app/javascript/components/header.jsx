import * as React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = (props) => {
  const SignOut = () => {
    if (props.authenticated) {
      return (
        <form id="logOut" name="logOut">
          <button name="logOut" className="btn btn-secondary">Log Out</button>
        </form>
      )
    }
    return (
      ''
    )
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><FontAwesomeIcon icon={['fab', 'twitter']} color="blue"></FontAwesomeIcon> &nbsp; Twitter</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li> */}
          </ul>
          <SignOut />
        </div>
      </div>
    </nav>
  )
}

export default Header