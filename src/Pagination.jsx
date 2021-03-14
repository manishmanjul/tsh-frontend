import React, { useEffect } from "react";
import { useState } from "react";

const Pagination = ({ dataCount, perPage, callBack }) => {
  const [pages, setPages] = useState({ min: 1, max: 4, page: 1, myArr: [] });
  let totalPages = Math.ceil(dataCount / perPage);

  useEffect(() => {
    let tempArr = [];
    let lmax = 1;
    if (totalPages > 4) lmax = 4;
    else lmax = totalPages;
    for (var i = 1; i <= lmax; i++) {
      tempArr.push(i);
    }
    setPages({ min: 1, max: lmax, page: 1, myArr: tempArr });
  }, [totalPages]);

  const handleClick = (pageSelected) => {
    let newMax = pages.max;
    let newMin = pages.min;
    let currentPage = pages.page;
    if (pageSelected === "<") {
      if (currentPage > 1) currentPage--;
    }
    if (pageSelected === "<<") {
      currentPage = 1;
      newMin = 1;
      newMax = 4;
    }
    if (pageSelected === ">") {
      if (currentPage < totalPages - 1) currentPage++;
    }
    if (pageSelected === ">>") {
      currentPage = totalPages;
      newMax = totalPages;
      newMin = newMax - 3;
    }
    if (pageSelected >= 1 && pageSelected <= totalPages)
      currentPage = pageSelected;

    if (currentPage === pages.min) {
      newMax = currentPage;
      newMin = newMax - 3;
      if (newMin < 1) {
        newMin = 1;
        if (totalPages >= 4) newMax = 4;
        else newMax = totalPages;
      }
    }

    if (currentPage === pages.max) {
      newMin = currentPage;
      newMax = newMin + 3;
      if (newMax > totalPages) {
        newMax = totalPages;
        if (totalPages >= 4) newMin = newMax - 3;
        else newMin = 1;
      }
    }

    let tempArr = [];
    for (var i = newMin; i <= newMax; i++) {
      tempArr.push(i);
    }

    setPages({ min: newMin, max: newMax, page: currentPage, myArr: tempArr });
    callBack(currentPage);
  };

  return (
    <section className="w-100 d-flex flex-row justify-content-end pr-4 text-dark text-11">
      <button
        type="button"
        className="border-grey pl-1 pr-1 text-center"
        onClick={() => handleClick("<<")}
      >
        {"<<"}
      </button>
      <button
        type="button"
        className="border-grey pl-1 pr-1 text-center"
        onClick={() => handleClick("<")}
      >
        {"<"}
      </button>
      {pages.myArr.map((v) => (
        <button
          type="button"
          key={v}
          className={
            v === pages.page
              ? "pagination border-grey pl-1 pr-1 text-center active"
              : "pagination border-grey pl-1 pr-1 text-center"
          }
          onClick={() => handleClick(v)}
        >
          {v < 10 ? "0" + v : v}
        </button>
      ))}
      <button
        type="button"
        className="border-grey pl-1 pr-1 text-center"
        onClick={() => handleClick(">")}
      >
        {">"}
      </button>
      <button
        type="button"
        className="border-grey pl-1 pr-1 text-center"
        onClick={() => handleClick(">>")}
      >
        {">>"}
      </button>
      <span className="ml-2 pt-1 align-center text-center">
        [of {totalPages + " "}pages]
      </span>
    </section>
  );
};

export default Pagination;
