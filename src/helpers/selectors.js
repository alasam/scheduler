export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(stateDay => stateDay.name === day);
  if (filteredDays.length === 0) {
    return [];
  } else {
    // console.log(filteredDays[0].appointments);
    return filteredDays[0].appointments
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
  const newArr = [];
  const filteredDays = state.days.filter(stateDay => {
    if (stateDay.name === day) {
      for (const list of stateDay.interviewers) {
        newArr.push(stateDay.interviewers[list]);
      }
    }
  })
  return newArr;
}