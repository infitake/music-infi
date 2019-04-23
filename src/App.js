import React, { Component } from 'react';
import Navbar from './components/layout/navbar'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Index from './components/layout/index'
import { Provider } from './context';
import Lyrics from './components/tracks/lyrics'

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <Navbar />
          <React.Fragment>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/lyrics/track/:id" component={Lyrics} />
            </Switch>
          </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
