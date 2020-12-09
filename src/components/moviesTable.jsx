import React, { Component } from "react";
import Like from './common/like';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';


class MoviesTable extends Component {
    columns = [
        { path: 'title', label:'Title'},
        { path: 'genre.name', label:'Genre'},
        { path: 'numberInStock', label:'Stock'},
        { path: 'dailyRentalRate', label:'Rate'},
        { key: "like"},
        { key: "delete"}
    ]
    
    render() { 
        const { movies, onDelete, onLike, sortColumn, onSort } = this.props;
    
        return (
          <table className="table">
            <TableHeader columns={ this.columns } sortColumn={ sortColumn } onSort={  onSort } />
            <TableBody data={ movies } onLike={ onLike } onDelete={ onDelete } />
          </table>
        );
    }
}
 
export default MoviesTable;
