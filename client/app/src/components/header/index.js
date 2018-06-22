import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
// import { Dropdown, Button, NavItem } from 'react-materialize'
import logic from '../../logic'
import './header.css'


class Header extends Component {

  _handleLogout = () => {
    logic.logout()
  }

  state = {
    isLogged: ''
  }

  render() {
    return (
      <header>
        {logic.isLogged() ?
          (
            <nav>
              <div className="container">
                <div className="nav-wrapper">
                  <a href="#" className="brand-logo left">els
                  <span className="gerds">Gerds</span>
                  </a>
                  <ul className="right hide-on-small-and-down">
                    <li>
                    </li><li>
                      <a href="#todaymenu">On the Menu Today</a>
                    </li>
                    <li>
                      <a href="#">[Your orders]</a>
                    </li>
                    <li>
                      <a href='#' onClick={this._handleLogout} >Logout</a>


                    </li>
                  </ul></div>
              </div></nav>
          ) : (
            <nav>
              <div className="container">
                <div className="nav-wrapper">
                  <a href="#" className="brand-logo left">els
                  <span className="gerds">Gerds</span>
                  </a>

                  <ul className="right hide-on-small-and-down">
                    <li>
                    </li><li>
                      <a href="#">Home</a>
                    </li>

                    <li>
                      <a href="#todaymenu">On the Menu Today</a>
                    </li>

                    <li>
                      <a href="#register">Register</a>
                    </li>

                    <li>
                      <a href="#login">Login</a>
                    </li>
                  </ul></div></div></nav>
          )}
      </header >
    )
  }
}

export default withRouter(Header)