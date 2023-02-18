import React from "react";
import { range } from "lodash";

const Paginate = ({ totalItems, currentPage, perPage,siblingCount = 1, onPageChange }) => {
    const pageCount = Math.ceil(totalItems / perPage);
    if (pageCount === 1) return null;

    const pages = range(1, pageCount + 1);
    // console.info("pagesssssssssssss", pages);
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {pages.map(page => (
                    <li key={page} className="page-item">
                        <a className={page === currentPage ? "page-link main-background-color text-white" : "page-link"} style={{ cursor: "pointer" }} onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                    </li>

                ))}
            </ul>
        </nav>

    );
}

export default Paginate;