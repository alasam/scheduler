import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState((prev) => {
      const spotsLeft = updateFreeSpots(prev, appointments);
      return { ...prev, appointments, days: spotsLeft }
      });
    return axios.put(`/api/appointments/${id}`, appointment)
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState((prev) => {
      const spotsLeft = updateFreeSpots(prev, appointments);
      return { ...prev, appointments, days: spotsLeft }
      });
    return axios.delete(`/api/appointments/${id}`)
  }

  const updateFreeSpots = (state, appointments) => {
    let spotsRemaining = 0;
    const day = state.days.find((day) => day.name === state.day);
        for(const appointmentID of day.appointments) {
      if (appointments[appointmentID].interview === null) {
        spotsRemaining++;
      }
    }

    const emptyDay = { ...day, spotsRemaining }
    const daysInfo = state.days.map((day) => (day.name === state.day ? emptyDay : day));
    return daysInfo;
  }

  useEffect(() => {
    Promise.all([

      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")

    ]).then((all) => {

      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data

      }))
      console.log(all);
    })
  }, []);


  return { state, setDay, bookInterview, cancelInterview, updateFreeSpots };
};