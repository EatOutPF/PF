import React, { useEffect } from "react";
import style from "./Paginado.module.css";

function Paginate({
  restaurants,
  restaurantsPerPage,
  paginado,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(restaurants / restaurantsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  function handleNext() {
    if (currentPage < Math.ceil(restaurants / restaurantsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === Math.ceil(restaurants / restaurantsPerPage)) {
      setCurrentPage(1);
    }
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (currentPage === 1) {
      setCurrentPage(Math.ceil(restaurants / restaurantsPerPage));
    }
  }

  useEffect(() => {
    console.log(currentPage);
  });

  return (
    <div className="pagination">
      <button onClick={() => handlePrev()}>Prev</button>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <button
            onClick={() => paginado(number)}
            key={number}
            className={number === currentPage ? style.active : null}
          >
            {number}
          </button>
        ))}
      <button
        onClick={() => handleNext()}
        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
      >
        Next
      </button>
    </div>
  );
}

export default Paginate;
