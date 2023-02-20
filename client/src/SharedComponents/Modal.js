import React from "react";

function Modal({ show, children, url }) {
  // const [showModal,setShowModal]=useState(true)

  return (
    <div
      style={{
        display: show ? "block" : "none",
        position: "fixed",
        zIndex: 1,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fefefe",
          margin: "15% auto",
          padding: "20px",
          border: "1px solid #888",
          width: "50%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
