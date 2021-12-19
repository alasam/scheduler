export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(stateDay => stateDay.name === day);
  console.log (">>>>>*******", state)
  if (!filteredDay) {
    return [];
  } else {
    // console.log(filteredDays[0].appointments);
    return filteredDay.appointments.map((id) => state.appointments[id])
  }
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    };
  } else {
    return null;
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find(dayOfDays => dayOfDays.name === day);
  if (!state.days.length || !filteredDays) {
    return [];
  } else {
    return filteredDays.interviewers.map((id) => state.interviewers[id])
  }
};