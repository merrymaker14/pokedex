import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './components/layout/NavBar'
import Dashboard from './components/layout/Dashboard'

import PokemonList from './components/pokemon/PokemonList'
import Pokemon from './components/pokemon/Pokemon'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import backgroundImage from './pattern.png';

function App() {
  return (
    <Router>
      <div className="App" style={{ background: `url(${backgroundImage})` }}>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='page/1' />} />
            <Route exact path='/page/:id' component={PokemonList} />
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
