// Import External Resources
import React from "react";
import DayListItem from "./DayListItem";

// DayList Component
export default function DayList(props) {
  //Creating days array
  const days = props.days.map((day) => {
    return (
      //DaylistItem with props
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={props.value === day.name}
        setDay={props.onChange}
      />
    );
  }
  )

  return (
    // HTML Output
    <ul>
      {days}
    </ul>
  );
};
