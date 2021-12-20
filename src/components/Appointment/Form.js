// Import External Resources
import Button from "../Button";
import InterviewerList from "../InterviewerList";
import React, { useState } from 'react';

// Form window component
export default function Form(props) {

  // useState declaration 
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Reset function
  const reset = () => {
    setInterviewer(null)
    setStudent("")
    setError("")
  }
  // Cancel funtion
  const cancel = () => {
    reset();
    props.onCancel()
  }

  // Validate function
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError('Please pick an interviewer');
      return;
    }

    props.onSave(student, interviewer);
    setError("")
  }

  // HTML output
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};
