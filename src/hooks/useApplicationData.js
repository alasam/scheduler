// Importing External Resources
import { useState, useEffect } from "react";
import axios from "axios";

// useApplicationData custom Hook
export default function useApplicationData() {
  // State decleration
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  // bookInterview function
  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then( () => {
        setState((prev) => {
          const spotsLeft = updateSpots(state.day, state.days, "REMOVE_SPOT");
          return { ...prev, appointments, days: spotsLeft }
        });
        console.log("STATE NEW >>>>>", state)
      })
  }

    // updateInterview function
    function updateInterview(id, interview) {
    
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
      return axios.put(`/api/appointments/${id}`, {interview})
        .then( () => {
          setState((prev) => {
            const spotsLeft = updateSpots(state.day, state.days);
            return { ...prev, appointments, days: spotsLeft }
          });
          console.log("STATE NEW >>>>>", state)
        })
    }

  // cancelInterview function
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then( () => {
      setState((prev) => {
        const spotsLeft = updateSpots(state.day, state.days, "ADD_SPOT");
        return { ...prev, appointments, days: spotsLeft }
      });
    })
  }

  const updateSpots = (weekday, days, variable) => {
    if (variable === "REMOVE_SPOT") {
      const updatedStateDayArray = days.map(day => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable)
        };
      });
      return updatedStateDayArray;
    }
    if (variable === "ADD_SPOT") {
      const updatedStateDayArray = days.map(day => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable)
        };
      });
      return updatedStateDayArray;
    }
    const updatedStateDayArray = days.map(day => {
      return {
        ...day,
        spots: spotUpdate(weekday, day, variable)
      };
    });
    return updatedStateDayArray;
  };

  const spotUpdate = (weekday, day, variable) => {
    let spot = day.spots;
    if (weekday === day.name && variable === "REMOVE_SPOT") {
      return spot - 1;
    } else if (weekday === day.name && variable === "ADD_SPOT") {
      return spot + 1;
    } else {
      return spot;
    }
  };

  
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


  return { state, setDay, bookInterview, cancelInterview, updateSpots, updateInterview };
};