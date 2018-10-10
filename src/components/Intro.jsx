import React, { Component } from 'react'
import styled from 'styled-components'
import { TimelineMax } from 'gsap/all'

const StyledIntro = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #22C9AD;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  .animation-container {
    width: auto;
    height: auto;
    display: flex;
    align-items: flex-end;
  }
  svg.logo {
    width: 6rem;
    stroke-dasharray: 400;
    stroke-dashoffset: 0;

    .logo.path {
      fill: #ffffff;
      fill-opacity: 1;
      stroke: #ffffff;
      stroke-width: 2;
      stroke-linecap: round;
    }
  }
  svg.dot {
    margin-left: .5rem;
    width: 1.5rem;
    scale: 1;

    .dot.circle {
      fill: #ffffff;
      fill-opacity: 1;
      stroke: #ffffff;
      stroke-width: 1;
      stroke-linecap: round;
    }
  }
`

export default class Intro extends Component {
  constructor (props) {
    super(props);
    this.logo = React.createRef();
    this.dot = React.createRef();
  }

  componentDidMount () {
    const loading = new TimelineMax();
    loading.to(this.dot.current, 1, { scale: .5, ease: Elastic.easeIn, transformOrigin: "center" })
      .to(this.dot.current, 1.5, { scale: 1, ease: Elastic.easeOut }).repeat(-1);

    // enter animation
    (new TimelineMax())
      .from(this.logo.current, 2, {
        strokeDashoffset: 400,
        ease: Power4.easeIn,
      })
      .from(this.logo.current, 3, {
        x: -150,
        opacity: 0,
        ease: Power3.easeOut,
      }, 0)
      .from('.logo.path', 2.5, {
        fillOpacity: 0,
        ease: Power3.easeOut,
      }, '-=1')
      .from(this.dot.current, 1.5, {
        scale: 0,
        ease: Elastic.easeOut,
      }, '-=2')
      .add(()=>{this.props.end()}, "-=0.7")
      .add(loading, "-=0.7");
  }

  render () {
    return (
      <StyledIntro>
        <div className="animation-container">
          <svg ref={this.logo} className="logo" viewBox="0 0 130 100">
            <path className="logo path" d="M0.7,1.2h10.9v48.6H12L47.2,1.2h12.3L11.6,67.5v31H0.7V1.2z M24.6,44.2l6.5-9.8l31.5,64.1H50.4L24.6,44.2z" />
            <path className="logo path" d="M75.4,84.1l6.8-7.6c4.9,8.6,11.5,12.8,18.1,12.8c11.9,0,17.3-7,17.3-23V11.6H82.4V1.1h46v66.3c0,18.1-7,32.9-27.9,32.9 C91.2,100.3,81.3,95.3,75.4,84.1z" />
          </svg>
          <svg ref={this.dot} className="dot" viewBox="0 0 150 100">
            <circle className="dot circle" cx="50" cy="50" r="50" />
          </svg>
        </div>
      </StyledIntro>
    );
  }
}
