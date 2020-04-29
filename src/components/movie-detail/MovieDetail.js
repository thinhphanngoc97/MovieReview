import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constant from '../../utils/Constant';
import '../../assets/scss/MovieDetail.scss';
import axios from 'axios';
import SimilarMoviesList from './SimilarMoviesList';
import TopBilledCastList from './TopBilledCastList';
import ReviewsList from './ReviewsList';
import { Link } from "react-router-dom";
import TrailersList from './TrailersList';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieInfo: null,
            isLoading: true
        }
    }

    componentDidMount() {
        // Dispatch action to reducer to hide header's banner
        let {dispatch} = this.props;
        dispatch({type: 'HIDE_BANNER'});
        
        // Fetch API to get movie detail from themoviedb.org 
        axios({
            method: 'GET',
            url: `${Constant.API_URL}/movie/${this.props.match.params.id}`,
            params: {
                api_key: Constant.API_KEY,
                language: Constant.DEFAULT_LANGUAGE
            }
        })
        .then (res => {
            this.setState({
                movieInfo: res.data,
                isLoading: false
            })
        })
        .catch (err => {
            console.log(err);
        })
    }

    render() {
        return(
            <div>
                {!this.state.isLoading &&
                    <div className="container">
                        {/* Movie's backdrop */}
                        <div className="movie-backdrop" style={{backgroundImage: `url(${Constant.BACKDROP_URL}/${this.state.movieInfo.backdrop_path})`}}></div>
                        <div className="main-section">
                            <div className="row">
                                <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                                    {/* Main detail of movie */}
                                    <div className="card movie-main-detail">
                                        <div className="card-body">
                                            <div className="movie-score">{this.state.movieInfo.vote_average}</div>
                                            <div>
                                                {/* Movie's title */}
                                                <Link className="movie-title" to={`/movie-detail/${this.state.movieInfo.id}/${this.state.movieInfo.title}`}>{this.state.movieInfo.title}</Link>
                                                {/* Release day */}
                                                <span className="movie-release-day">{` (${this.state.movieInfo.release_date})`}</span>
                                            </div>
                                            <div>
                                                {/* Genres */}
                                                <span>
                                                {
                                                    this.state.movieInfo.genres.map((item, index) => {
                                                        return <Link key={index} className="movie-genre" to="/no-available">{`${item.name} `}</Link>;
                                                    })
                                                }
                                                </span>
                                            </div>
                                            <br/>
                                            <div>
                                                <strong>Runtime: </strong>
                                                <span>{`${this.state.movieInfo.runtime} Minutes`}</span>
                                            </div>
                                            {/* Overview */}
                                            <div>
                                                <strong>Overview: </strong>
                                                <span>{this.state.movieInfo.overview}</span>
                                            </div>
                                            <div className="option-list">
                                                <span className="option option-add-to-watch-list"></span>
                                                <span className="option option-mark-as-favorite"></span>
                                                <span className="option option-rate"></span>
                                                <span className="option option-share"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <h4 className="section-title">Top Billed Cast</h4>
                                    <TopBilledCastList movieId={this.props.match.params.id}/>
                                    <br/>
                                    <h4 className="section-title">Reviews</h4>
                                    <ReviewsList movieId={this.props.match.params.id}/>
                                    <br/>
                                    <h4 className="section-title">Trailers</h4>
                                    <TrailersList movieId={this.props.match.params.id}/>
                                    <br/>
                                    <h4 className="section-title">Similar movies</h4>
                                    <SimilarMoviesList movieId={this.props.match.params.id}/>
                                    <br/>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div className="card movie-additional-detail">
                                        <div className="card-body">
                                            <div>
                                                <strong>Budget</strong>
                                            </div>
                                            <p>{`$${this.state.movieInfo.budget}`}</p>
                                            <div>
                                                <strong>Revenue</strong>
                                            </div>
                                            <p>{`$${this.state.movieInfo.revenue}`}</p>
                                            <div>
                                                <strong>Vote count</strong>
                                            </div>
                                            <p>{this.state.movieInfo.vote_count}</p>
                                            <div>
                                                <strong>Popularity</strong>
                                            </div>
                                            <p>{this.state.movieInfo.popularity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default connect((store) => {
    return {}
})(MovieDetail);