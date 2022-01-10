// Import External Resources
import DayList from "./DayList";
import React from "react";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay, } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData"
import "components/Application.scss";

// Application component
export default function Application(props) {

  // Variable declarations to functions
  const { state, setDay, bookInterview, cancelInterview, updateInterview } = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      // Passing down props
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        updateInterview={updateInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    // HTML Output
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
