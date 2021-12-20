// Retrieves and returns Appointments for Day provided as an Array
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(stateDay => stateDay.name === day);

  if (!filteredDay) {
    return [];
  } else {
    return filteredDay.appointments.map((id) => state.appointments[id])
  }
}

// Retrieves and returns Interview data (student and interviewer)
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
// Retrieves and returns interviewers for provided day
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find(dayOfDays => dayOfDays.name === day);
  if (!state.days.length || !filteredDays) {
    return [];
  } else {
    return filteredDays.interviewers.map((id) => state.interviewers[id])
  }
};