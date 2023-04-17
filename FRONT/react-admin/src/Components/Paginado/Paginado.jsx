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
  console.log({ currentPage }, pageNumbers[0]);

  return (
    <div className={style.containerPagination}>
      <button
        onClick={() => handlePrev()}
        className={style.buttonPagination}
        disabled={currentPage === pageNumbers[0]}
        name="prev"
      >
        {"<"}
      </button>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <button
            onClick={() => paginado(number)}
            key={number}
            className={
              number === currentPage ? style.active : style.buttonPagination
            }
          >
            {number}
          </button>
        ))}
      <button
        onClick={() => handleNext()}
        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
        className={style.buttonPagination}
        name="next"
      >
        {">"}
      </button>
    </div>
  );
}

export default Paginate;
