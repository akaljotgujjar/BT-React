import React from "react";

function Paginator({ handlePageChange, currentPage, totalPages }) {
  function showPrevious() {
    handlePageChange(-1);
  }

  function showNext() {
    handlePageChange(1);
  }

  const button = {
      backgroundColor: "#007bff",
      padding: 20,
      color: "#FFF",
      border: 0,
      fontSize: "36px",
      fontWeight: "bold"
  }

  return (
    <div>
      <p>
        Page {currentPage} of {totalPages}{" "}
      </p>
      <button style={button} onClick={showPrevious} disabled={currentPage === 1}>
        &lt;
      </button>
      <button style={button} onClick={showNext}>&gt;</button>
    </div>
  );
}

export default Paginator;
