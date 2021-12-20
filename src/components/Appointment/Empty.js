// Import External Resources
import React from "react";

// Empty Window Component
export default function Empty(props) {
  return (
    //HTML output
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};
