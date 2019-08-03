import React, { Component } from 'react'
import styled from 'styled-components'

const NavBarStyle = styled.nav``;

export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar navbar-expand-md navbar-dark bg-dark fixed-top" style={{backgroundColor: '#ef5350 !important'}}>
        <a href="#" className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">
          Pokedex
        </a>
      </div>
    )
  }
}
