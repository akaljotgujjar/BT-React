import React from "react";

function Modal({ children, show, updateClose }) {
  function handleClose() {
    updateClose(false);
  }

  if (!show) {
    return null;
  }

  return (
    <div style={{ display: show ? "block" : "none" }}>
      <div>
        <button onClick={handleClose}>X</button>
      </div>

      {children}
    </div>
  );
}

export default Modal;
