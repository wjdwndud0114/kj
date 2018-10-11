import React, { Component } from 'react'
import { Route, Prefetch } from 'react-static'
import styled from 'styled-components'
import TweenMax from 'gsap/umd/TweenMax'

import { TransitContext } from '../context/TransitContext.jsx'

const StyledHome = styled.div`
  flex: 1 1 auto;
  background: #0068A0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;

  h1, p {
    color: #fff;
  }
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 2rem;
  }
  button {
    font-size: 2rem;
    color: #fff;
    background: transparent;
    border: 1px solid white;
    padding: 1rem;
    margin-top: 3rem;
    display: inline-block;
    vertical-align: middle;
    transform: translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    transition-duration: 0.3s;
    transition-property: transform;
  }
  button:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.transitFunc = null;
    this.h = React.createRef();
    this.t = React.createRef();
    this.about = React.createRef();
  }

  componentDidMount () {
    const tl = new TimelineMax();
    tl.from(this.h.current, 2, {
      opacity: 0,
      y: -30,
      ease: Back.easeOut,
    })
      .from(this.t.current, 2, {
        opacity: 0,
        y: 30,
        ease: Power2.easeOut,
      }, "-=0.5")
      .from(this.about.current, 2, {
        opacity: 0,
        y: 40,
        ease: Back.easeOut,
      }, "-=0.5")
      .add(() => {this.about.current.style.transform = ""});
  }

  handleAboutClick (history) {
    this.transitFunc("/", "/about", () => { history.push('/about') });
  }

  render () {
    return (
      <StyledHome>
        <TransitContext.Consumer>
          {(c) => { this.transitFunc = c.transitFunc }}
        </TransitContext.Consumer>
        <h1 ref={this.h} className="header">Hi, I'm Kevin.</h1>
        <p ref={this.t} className="text">I'm currently working on this website to show what I can do!</p>
        <Prefetch path='/about'>
          <Route render={({ history }) => (
            <button
              ref={this.about}
              type='button'
              onClick={() => { this.handleAboutClick(history) }}>About me</button>
          )} />
        </Prefetch>
      </StyledHome>
    )
  }
}
