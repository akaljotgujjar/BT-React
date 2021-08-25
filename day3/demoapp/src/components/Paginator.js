import React from "react";
// import Button from "./Button.styles";
import Button from "react-bootstrap/Button";

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
    fontWeight: "bold",
  };

  return (
    <div>
      <p>
        Page {currentPage} of {totalPages}{" "}
      </p>
      <Button
        variant="info"
        onClick={showPrevious}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>
      <Button variant="success" onClick={showNext}>
        &gt;
      </Button>
    </div>
  );
}

export default Paginator;
