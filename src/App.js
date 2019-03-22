import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Movie from './pages/Movie';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/movie/:id' component={Movie} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </div>
    );
  }
}

export default App;
