import React, { Component } from 'react'
import logo from '../images/logo.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends Component {
  render() {
    return(
      <div className="header card">
         <Link to='/'>
            <img alt="logo" src={logo} className="header__logo"/>
        </Link>
        <Link to="/cart"className="header__cart-count">Cart</Link>
      </div>
    )
  }
}

[export](https://www.belvikram.com "Export is a ES6 Keyword used to Export is a ES6 Keyword used to Export is a ES6 Keyword used to Export is a ES6 Keyword used to Export is a ES6 Keyword used to check more here https://www.belvikram.com") default Header
