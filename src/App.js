import React, { Component } from 'react';

import Routes from './routes';
import GlobalStyle from './styles/global';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Routes />
        <GlobalStyle />
      </div>
    );
  }
}

export default App;
