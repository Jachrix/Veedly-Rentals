import React, { Component } from "react";
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = {
        pageSize: 4,
        currentPage: 1,
        movies: [],
        genres: []
    };
    
    componentDidMount(){
        this.setState({ movies: getMovies(), genres: getGenres()});
    }
    
    handleDelete = (movie) => {
        //console.log(movie);   
        const movies = this.state.movies.filter(m => m._id !== movie._id); 
        this.setState({ movies });    //Es6 simplified movies: movies
    }
    
    handleGenreSelect = genre => {
        //console.log("Genre Selected....", genre);
        this.setState({ selectedGenre: genre });
    }
    
    handleLike = (movie) => {
        //console.log('Like icon clicked....', movie);
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]}
        movies[index].liked = !movies[index].liked; //Toggling
        this.setState({ movies });
    }
    
    handlePageChange = page => {
        //console.log('Pagination clicked....', page);
        this.setState({ currentPage: page });
    }
    
    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state;
        
        if(count === 0) 
            return <p>There are no movies in the Database...</p>;
            
        const filtered = selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
            
        const movies = paginate(filtered, currentPage, pageSize);    
            
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup  
                        items={this.state.genres} 
                        selectedItem={ this.state.selectedGenre } 
                        onItemSelect={ this.handleGenreSelect } 
                    />
                </div>
                <div className="col">
                    <p>Showing { filtered.length } numbers of movies in the Database.</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        { movies.map(movie => (
                            <tr key={ movie._id }>
                                <td>{ movie.title }</td>
                                <td>{ movie.genre.name }</td>
                                <td>{ movie.numberInStock }</td>
                                <td>{ movie.dailyRentalRate }</td>
                                <td> <Like liked={ movie.liked } onClick={() => this.handleLike(movie) } /> </td>
                                <td><button onClick={ () => this.handleDelete(movie) } className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        ))}                
                        </tbody>
                    </table>
                    <Pagination 
                        itemCount={ filtered.length } 
                        pageSize={ pageSize }
                        currentPage={ currentPage }
                        onPageChange={ this.handlePageChange } 
                    />
                </div>                
            </div>            
        );
    }
}

export default Movies;