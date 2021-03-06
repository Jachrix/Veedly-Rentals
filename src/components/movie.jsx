import React, { Component } from "react";
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import SearchBox from './searchBox';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from "react-router-dom";

class Movies extends Component {
    state = {
        pageSize: 4,
        currentPage: 1,
        movies: [],
        genres: [],
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc'}
    };
    
    componentDidMount(){
        const genres = [{_id: null, name: 'All Genres'}, ...getGenres()];
        this.setState({ movies: getMovies(), genres: genres});
    }
    
    getPagedData = () =>{
        const { pageSize, currentPage, searchQuery, selectedGenre, sortColumn, movies: allMovies } = this.state;
        
        let filtered = allMovies;
        
        if(searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()));
        else if(selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
            
        const movies = paginate(sorted, currentPage, pageSize);
        
        return { totalCount: filtered.length, data: movies };
    }
    
    handleDelete = (movie) => {
        //console.log(movie);   
        const movies = this.state.movies.filter(m => m._id !== movie._id); 
        this.setState({ movies });    //Es6 simplified movies: movies
    }
    
    handleGenreSelect = genre => {
        //console.log("Genre Selected....", genre);
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
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
    
    handleSort = sortColumn => {
        //console.log('Handled sorting ....', sortColumn); 
        this.setState({ sortColumn });
    }
    
    handleChange = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    }
    
    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
        
        if(count === 0) 
            return <p>There are no movies in the Database...</p>;      
            
        const { totalCount, data: movies } = this.getPagedData();
                
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
                    <Link to="/movies/new" className="btn btn-primary mb-2">New Movie</Link>
                    
                    <p>Showing { totalCount } numbers of movies in the Database.</p>
                    
                    <SearchBox  value={ searchQuery } onChange={ this.handleChange } />
                    
                    <MoviesTable 
                        onDelete = { this.handleDelete } 
                        onLike = { this.handleLike } 
                        sortColumn = { sortColumn }
                        onSort = { this.handleSort }
                        movies = {movies} 
                    />
                    
                    <Pagination 
                        itemCount={ totalCount } 
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