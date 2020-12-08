import React, { Component } from "react";
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = {
        pageSize: 4,
        currentPage: 1,
        movies: [],
        genres: [],
        sortColumn: { path: 'title', order: 'asc'}
    };
    
    componentDidMount(){
        const genres = [{_id: null, name: 'All Genres'}, ...getGenres()];
        this.setState({ movies: getMovies(), genres: genres});
    }
    
    handleDelete = (movie) => {
        //console.log(movie);   
        const movies = this.state.movies.filter(m => m._id !== movie._id); 
        this.setState({ movies });    //Es6 simplified movies: movies
    }
    
    handleGenreSelect = genre => {
        //console.log("Genre Selected....", genre);
        this.setState({ selectedGenre: genre, currentPage: 1 });
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
    
    handleSort = path => {
        //console.log('Handled sorting ....', path);
        const sortColumn = {...this.state.sortColumn};
        if(sortColumn.path === path)
            sortColumn.order = sortColumn.order === 'asc' ? 'desc':'asc';
        else{
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        
        this.setState({ sortColumn });
    }
    
    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies } = this.state;
        
        if(count === 0) 
            return <p>There are no movies in the Database...</p>;
            
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
            
        const movies = paginate(sorted, currentPage, pageSize);    
            
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
                    
                    <MoviesTable 
                        onDelete = { this.handleDelete } 
                        onLike = { this.handleLike } 
                        onSort = { this.handleSort }
                        movies = {movies} 
                    />
                    
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