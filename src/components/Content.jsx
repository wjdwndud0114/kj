import React, { Component } from 'react'
// import { Link } from 'react-static'
import Routes from 'react-static-routes'
import styled from 'styled-components'

const StyledContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;

  nav {
    position: absolute;
    top: 0;
  }
`

export default class Content extends Component {
  render () {
    return (
      <StyledContent>
        {/* <nav>
          <Link exact to="/">Home</Link>
          <Link to="/work">Work</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav> */}
        {this.props.introDone && <Routes />}
      </StyledContent>
    )
  }
}
