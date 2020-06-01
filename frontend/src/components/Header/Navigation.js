import React from 'react'

export default function Navigation(props){
  return (
    <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="">Home  </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href=""> Questions </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href=""> Friends</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href=""> Settings </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href=""> Log out  </a>
        </li>
      </ul>
    </div>
  )
}
