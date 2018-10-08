import React, { Component } from 'react'
import { Link } from 'react-static'
import Routes from 'react-static-routes'
import styled from 'styled-components'

const StyledContent = styled.div`

`

export default class Content extends Component {
  render () {
    return (
      <StyledContent>
        <Link exact to="/">Home</Link>
        <Link to="/work">Work</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Routes />
      </StyledContent>
    )
  }
}
