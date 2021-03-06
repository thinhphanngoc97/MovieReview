import React, { Component } from 'react';
import {
    Route,
    Switch,
  } from "react-router-dom";
import Home from './components/home/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import Movies from './components/movies/Movies';
import NotAvailable from './components/NotAvailable';
import MovieDetail from './components/movie-detail/MovieDetail';
import GenreMovies from './components/movies/GenreMovies';
import SearchResults from './components/search/SearchResults';

class Routes extends Component {
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path='/movie-detail/:id/:name' render={(props) => (<MovieDetail key={props.match.params.id} {...props} />)} />
                <Route path="/about" component={About} />
                <Route path="/movies/genre/:id/:name/page-:page" render={(props) => (<GenreMovies key={props.match.params.page} {...props} />)} />
                <Route path="/movies/popular/page-:page" render={(props) => (<Movies key={props.match.params.page} {...props} />)} />
                <Route path="/search-results/:keyword/page-:page" render={(props) => (<SearchResults key={props.match.params.page} {...props} />)} />
                <Route path="/login" component={NotAvailable} />
                <Route path="/register" component={NotAvailable} />
                <Route path="/not-available" component={NotAvailable} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default Routes;