import React, { Component } from 'react'
import { Router } from 'react-static'
import styled, { createGlobalStyle } from 'styled-components'
import { hot } from 'react-hot-loader'

import Intro from './components/Intro'
import Content from './components/Content'
import Transit from './components/Transit'
import { TransitContext } from './context/TransitContext.jsx'

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
    introDone: false,
    transitData: {},
  }

  constructor (props) {
    super(props);
    this.intro = React.createRef();
    this.content = React.createRef();
  }

  introEndHandler = () => { // called when intro animation finishes
    this.transition('/intro', window.location.pathname, () => this.setState({ introDone: true }));
  }

  transition = (from, to, callback) => { // call to trigger transition
    this.setState({ transitData: { from, to, callback } });
  }
  transitCallBack = () => {

  }

  render () {
    return (
      <Router>
        <AppStyles>
          <GlobalStyle />
          <Transit
            transitData={this.state.transitData}
            globalCallBack={this.transitCallBack}
          />
          {this.state.introDone ? null : <Intro end={this.introEndHandler} ref={this.intro} />}
          <TransitContext.Provider value={{ transitFunc: this.transition }}>
            <Content introDone={this.state.introDone} ref={this.content} />
          </TransitContext.Provider>
        </AppStyles>
      </Router>
    )
  }
}

export default hot(module)(App)
