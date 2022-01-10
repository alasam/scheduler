// Import External Resources
import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";
// import { transformFromAstSync } from "@babel/core";

// DayListItem component
export default function DayListItem(props) {
  // Creating dayClass class
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  function formatSpots(spots) {
    if (spots === 1) {
      return `${spots} spot `;
    }
    if (spots > 1) {
      return `${spots} spots `;
    }
    return `no spots `;
  }

  return (
    // HTML Output
    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}remaining</h3>

    </li>
  );
}