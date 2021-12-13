export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(stateDay => stateDay.name === day);
  if (filteredDays.length === 0) {
    return [];
  } else {
    console.log(filteredDays[0].appointments);
    return filteredDays[0].appointments
  }
}