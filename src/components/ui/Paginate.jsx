import { useEffect, useState } from "react";

import "./Paginate.css";

export default function Paginate({ onload, type, pages }) {
  const [currentBtn, setCurrentBtn] = useState(
    Number(sessionStorage.getItem(type)) || 1
  );
  const [arrCurrentBtns, setArrCurrentBtns] = useState([]);

  useEffect(() => {
    setCurrentBtn(() => Number(sessionStorage.getItem(type) || 1));
  }, [sessionStorage.getItem(type)]);

  useEffect(() => {
    onload(currentBtn);
  }, [currentBtn]);

  // Page number showing functionality
  useEffect(() => {
    const numberOfPages = [];
    for (let i = 1; i <= pages; i++) {
      numberOfPages.push(i);
    }

    let tempNumPages = [...numberOfPages].slice(0, 8);
    if (currentBtn >= 7) {
      let sliced;
      if (currentBtn >= numberOfPages.length - 2) {
        sliced = numberOfPages.slice(numberOfPages.length - 6);
      } else {
        sliced = numberOfPages.slice(currentBtn - 3, currentBtn + 2);
      }
      tempNumPages = [1, 2, "...", ...sliced];
    }
    setArrCurrentBtns(tempNumPages);
  }, [currentBtn, pages]);

  const prevBtnHandler = () => {
    setCurrentBtn((prevState) => {
      const value = prevState === 1 ? prevState : prevState - 1;
      sessionStorage.setItem(type, value);
      return value;
    });
  };
  const nextBtnHandler = () => {
    setCurrentBtn((prevState) => {
      const value = prevState === pages ? prevState : prevState + 1;
      sessionStorage.setItem(type, value);
      return value;
    });
  };

  return (
    <div className="paginate">
      <button
        type="button"
        className={currentBtn === 1 ? "btn-hidden" : ""}
        onClick={prevBtnHandler}
      >
        Prev
      </button>
      {arrCurrentBtns.map((pageNum, index) => (
        <button
          key={index}
          type="button"
          className={`${currentBtn === pageNum && "btn-active"} ${
            pageNum === "..." && "btn-disabled"
          }`}
          onClick={() => {
            setCurrentBtn(pageNum);
            sessionStorage.setItem(type, pageNum);
          }}
        >
          {pageNum}
        </button>
      ))}
      {pages > 8 && currentBtn < pages - 2 && (
        <button type="button" className="btn-disabled" disabled>
          ...
        </button>
      )}
      <button
        className={currentBtn === pages ? "btn-hidden" : ""}
        type="button"
        onClick={nextBtnHandler}
      >
        Next
      </button>
    </div>
  );
}
