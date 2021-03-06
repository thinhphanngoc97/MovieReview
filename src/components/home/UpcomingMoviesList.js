import React, { Component } from 'react';
import * as Constant from '../../utils/Constant';
import axios from 'axios';
import MovieCardItem from './MovieCardItem';

class UpcomingMoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isLoading: true
        }
    }

    componentDidMount() {
        // Fetch API to get upcoming movies list from themoviedb.org 
        axios({
            method: 'GET',
            url: `${Constant.API_URL}/movie/upcoming`,
            params: {
                api_key: Constant.API_KEY,
                language: Constant.DEFAULT_LANGUAGE,
                page: 1,
                region: Constant.DEFAULT_REGION
            }
        })
        .then (res => {
            this.setState({
                list: res.data.results,
                isLoading: false
            })
        })
        .catch (err => {
            console.log(err);
        })
    }
    
    render() {
        return (
            <div>
                {!this.state.isLoading &&
                <div className="popular-section">
                    {
                        this.state.list.map((item, index) => {
                            if (item.vote_average === 0) { 
                                item.vote_average = 'N/A'; 
                            };
                            return <MovieCardItem key={index} id={item.id} name={item.title} posterPath={item.poster_path} releaseDay={item.release_date} score={item.vote_average}/>
                        })
                    }
                </div>}
            </div>      
        )
    }
}

export default UpcomingMoviesList;