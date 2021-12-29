import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import Chart from './pages/Chart';
import Main from './pages/Main';

function App() {

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/chart' component={Chart} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
