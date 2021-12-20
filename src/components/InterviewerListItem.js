// Import External Resources
import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// InterviewerListItem component
export default function InterviewerListItem(props) {
  // Declaring interviewerClass class
  const interviewerClass = classNames("interviewers__item", { "interviewers__item--selected": props.selected })
  return (
    // HTML Output
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>

  );
}