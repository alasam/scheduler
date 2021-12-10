import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  
  let activeSpots;
  if (props.spots === 0) {
    activeSpots = <h3 className="text--light">no spots remaining</h3>
  } else if (props.spots === 1) {
    activeSpots = <h3 className="text--light">1 spot remaining</h3>
  } else {
    activeSpots = <h3 className="text--light">{props.spots} spots remaining</h3>
  }

  return (
    // Line below does not work in sidebar, will ask for assistance tomorrow.
    <li onClick={() => props.setDay(props.name)} className={dayClass}> 
      <h2 className="text--regular">{props.name}</h2>
      {activeSpots}

    </li>
  );
}