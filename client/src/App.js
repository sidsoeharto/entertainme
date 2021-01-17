import logo from './logo.svg';
import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';

import { ApolloProvider } from '@apollo/client'
import client from './config/graphql'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation';

import Home from './pages/Home'
import Series from './pages/Series'
import Movies from './pages/Movies'
import SeriesDetail from './pages/SeriesDetail'
import MoviesDetail from './pages/MoviesDetail'

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/movies/:id">
              <MoviesDetail />
            </Route>
            <Route path="/series">
              <Series />
            </Route>
            <Route path="/series/:id">
              <SeriesDetail />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
