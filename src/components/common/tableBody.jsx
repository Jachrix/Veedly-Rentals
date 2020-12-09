import React, { Component } from 'react';
import Like from './like';

class TableBody extends Component {
        
    render() {
        const { data, columns, onLike, onDelete } = this.props;
        
        return (
            <tbody>
              {data.map((data) => (
                <tr key={data._id}>
                  {columns.map(column => <td></td>)}
                  <td>                    
                    <Like
                      liked={data.liked}
                      onClick={() => onLike(data)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => onDelete(data)}
                      className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        );
    }
}

export default TableBody;