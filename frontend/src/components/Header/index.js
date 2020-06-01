import React,{Component} from 'react'
import Logo from './Logo.js'
import Navigation from './Navigation'

export default class Header extends Component {


  render(){
    return(
      <header >
        <nav className="navbar-expand-lg navbar-light bg-light">
          <Logo />
          <Navigation />
        </nav>

      </header>
    )
  }
}
