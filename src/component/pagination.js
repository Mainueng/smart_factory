import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={totalPosts > postsPerPage ? "pagination" : "d-none"}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              number === currentPage
                ? "page-item active pointer"
                : "page-item pointer"
            }
          >
            <p onClick={() => paginate(number)} className="page-link">
              {number}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
