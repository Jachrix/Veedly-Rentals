import React from 'react';
import _ from 'lodash';

const Pagination = props => {
    const { itemCount, pageSize, currentPage, onPageChange } = props;
    //console.log(currentPage);
    
    const pagesCount = Math.ceil(itemCount/pageSize);
    //console.log(pagesCount);
    if(pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href="ppp">Previous</a></li>
                { pages.map(page => (
                    <li key={page} className={ page === currentPage ? 'page-item active': 'page-item'}>
                        <a className="page-link" onClick={() => onPageChange(page)} >{page}</a>
                    </li>
                ))}                
                <li className="page-item"><a className="page-link" href="ppp">Next</a></li>
            </ul>
        </nav>
    );
}
 
export default Pagination;
