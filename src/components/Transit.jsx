import React, { Component } from 'react'
import styled from 'styled-components'
import { TimelineMax } from 'gsap/all'
import lottie from 'lottie-web'

import transitData from '../data/transit_data.json';

const StyledTransition = styled.div`
  div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    flex: 1 1 auto;
    height: 100%;
  }
`

function getColors(data) {
  switch(data.to) {
    case '/':
      return {top: '#0068A0', middle: '#6AE8A1'};
    case '/about':
      return {top: '#CAF27B', middle: '#6AE8A1'}
    default:
      return {top: '#0068A0', middle: '#CAF27B'};
    }
}

export default class Transit extends Component {
  constructor (props) {
    super(props);
    this.animContainer = React.createRef();
    this.anim = null;
  }

  componentDidMount () {
    this.anim = lottie.loadAnimation({
      container: this.animContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: transitData,
      rendererSettings: {
        preserveAspectRatio: 'none',
        viewBoxOnly: 'true'
      }
    });
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log("Should Transit update? %s", (this.props.transitData !== nextProps.transitData ? "Yes" : "No"));
    return this.props.transitData !== nextProps.transitData;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.transitData.from === this.props.transitData.to) return;
    console.log("Animation starting.");
    this.animContainer.current.style.display = "flex";
    this.anim.goToAndStop(0);
    const colors = getColors(this.props.transitData);
    document.getElementById("transit_layer1").childNodes[0].childNodes[0].style.fill = colors.middle;
    document.getElementById("transit_layer2").childNodes[0].childNodes[0].style.fill = colors.top;

    let s = {speed: 2};
    const tl = new TimelineMax();
    tl.add(() => this.anim.play())
      .to(s, 1.5, {
        speed: 1,
        ease: Power3.easeIn,
        onUpdate: () => {this.anim.setSpeed(s.speed);},
      });
    tl.add(() => this.handleDone(), 2);
  }

  handleDone () {
    console.log("Transition animation finished.");
    this.props.transitData.callback();
    this.animContainer.current.style.display = "none"; // hide transition
  }

  render () {
    return (
      <StyledTransition>
        <div ref={this.animContainer} />
      </StyledTransition>
    )
  }
}