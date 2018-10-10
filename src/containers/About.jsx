
import React, { Component } from 'react'
import { Route, Prefetch } from 'react-static'
import styled from 'styled-components'

import { TransitContext } from '../context/TransitContext.jsx'

const StyledAbout = styled.div`
  flex: 1 1 auto;
  background: #CAF27B;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1, p, button {
    color: #1f2d3d;
  }
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 2rem;
  }
  button {
    font-size: 2rem;
    background: transparent;
    border: 1px solid #1f2d3d;
    padding: 1rem;
    margin-top: 3rem;
  }
  button: hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

export default class About extends Component {
  constructor (props) {
    super(props);
    this.transitFunc = null;
    this.h = React.createRef();
    this.t = React.createRef();
    this.about = React.createRef();
  }

  componentDidMount () {
    const tl = new TimelineMax();
    tl.from(this.h.current, 1.5, {
      opacity: 0,
      y: -40,
      ease: Back.easeOut,
    })
      .from(this.t.current, 1.5, {
        opacity: 0,
        y: 40,
        ease: Back.easeIn
      }, "-=1")
      .from(this.about.current, 2, {
        opacity: 0,
        y: 40,
        ease: Back.easeOut,
      }, "+=0.5");
  }

  handleHomeClick (history) {
    this.transitFunc("/about", "/", () => { history.push('/') });
  }

  render () {
    return (
      <StyledAbout>
        <TransitContext.Consumer>
          {(c) => { this.transitFunc = c.transitFunc }}
        </TransitContext.Consumer>
        <h1 ref={this.h}>I'm a full stack developer.</h1>
        <p ref={this.t}>Reach me: jyj022@ucsd.edu</p>
        <Prefetch path='/'>
          <Route render={({ history }) => (
            <button
              ref={this.about}
              type='button'
              onClick={() => { this.handleHomeClick(history) }}>Home</button>
          )} />
        </Prefetch>
      </StyledAbout>
    )
  }
}