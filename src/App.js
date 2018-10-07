import React, { Component } from 'react'
import { Router } from 'react-static'
import styled, { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'

import Intro from './components/Intro'
import Content from './components/Content'

injectGlobal`
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
  render () {
    return (
      <Router>
        <AppStyles>
          <Intro />
          <Content />
        </AppStyles>
      </Router>
    )
  }
}

export default hot(module)(App)
