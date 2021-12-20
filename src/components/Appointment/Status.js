// Import External Resources
import React from "react";

// Status window component
export default function Status(props) {
  return (
    // HTML Output
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
};
