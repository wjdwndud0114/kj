import React, { Component } from 'react'
import { Router } from 'react-static'
import styled, { createGlobalStyle } from 'styled-components'
import { hot } from 'react-hot-loader'
import { TimelineMax } from 'gsap/all'

import Intro from './components/Intro'
import Content from './components/Content'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
`

const AppStyles = styled.div`
`

class App extends Component {
  state = {
    introDone: false
  }

  constructor (props) {
    super(props);
    this.intro = React.createRef();
    this.content = React.createRef();
  }

  introEndHandler () { // called when intro animation finishes
    this.intro.current.hide(this.introHiddenHandler.bind(this));
  }

  introHiddenHandler () { // called when intro outro is done
    this.setState({ introDone: true });
  }

  render () {
    return (
      <Router>
        <AppStyles>
          {this.state.introDone ? null : <Intro end={this.introEndHandler.bind(this)} ref={this.intro} />}
          <Content ref={this.content} />
        </AppStyles>
        <GlobalStyle />
      </Router>
    )
  }
}

export default hot(module)(App)
