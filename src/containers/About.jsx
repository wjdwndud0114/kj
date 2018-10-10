
import React, { Component } from 'react'
import { Route, Prefetch } from 'react-static'
import styled from 'styled-components'
import TweenMax from 'gsap/umd/TweenMax'

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
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  a {
    width: 4rem;
    height: 4rem;
    margin-left: 1.6rem;
  }
  a, button {
    display: inline-block;
    vertical-align: middle;
    transform: translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    transition-duration: 0.3s;
    transition-property: transform;
    transition-timing-function: ease-out;
  }
  a:hover , button:hover {
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
    this.g = React.createRef();
    this.home = React.createRef();
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
      .from(this.g.current, 1.5, {
        opacity: 0,
        x: 40,
        ease: Back.easeIn
      }, "-=1")
      .from(this.home.current, 2, {
        opacity: 0,
        y: 40,
        ease: Back.easeOut,
      }, "+=0.5")
      .add(() => {this.home.current.style.transform = ""});
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
        <div className="container">
          <p ref={this.t}>Reach me: jyj022@ucsd.edu</p>
          <a href="https://github.com/wjdwndud0114/">
            <svg ref={this.g} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>wjdwndud0114</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          </a>
        </div>
        <Prefetch path='/'>
          <Route render={({ history }) => (
            <button
              ref={this.home}
              type='button'
              onClick={() => { this.handleHomeClick(history) }}>Home</button>
          )} />
        </Prefetch>
      </StyledAbout>
    )
  }
}