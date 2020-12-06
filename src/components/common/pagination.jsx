import React from 'react';

const Pagination = props => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href="ppp">Previous</a></li>
                <li className="page-item"><a className="page-link" href="ppp">1</a></li>
                <li className="page-item"><a className="page-link" href="ppp">2</a></li>
                <li className="page-item"><a className="page-link" href="ppp">3</a></li>
                <li className="page-item"><a className="page-link" href="ppp">Next</a></li>
            </ul>
        </nav>
    );
}
 
export default Pagination;

