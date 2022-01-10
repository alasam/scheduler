// Import External Resources and Components
import React from "react";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode.js"
import "components/Appointment/styles.scss"

  // Mode constants declarations 
  const CONFIRM = "CONFIRM";
  const CREATE = 'CREATE';
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const EMPTY = 'EMPTY';
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const SAVING = "SAVING";
  const SHOW = 'SHOW';

// Overall Appointment Component
export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Save function to save appointment
  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
      .then(() =>
        transition(SHOW)
      )
      .catch(error => {

        transition(ERROR_SAVE, true);
      })
  }
  // deleteApp funtion to delete appointment
  function deleteApp(name, interviewer) {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true);
      })
  };

    // Update function to save appointment
    function update(name, interviewer) {
    
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING, true)
      props.updateInterview(props.id, interview)
        .then(() =>
          transition(SHOW)
        )
        .catch(error => {
  
          transition(ERROR_SAVE, true);
        })
    }


  return (
    //HTML output
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete?"} onConfirm={deleteApp} onCancel={() => back()} />}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} onSave={update} onCancel={() => back()} />}
      {mode === ERROR_SAVE && <Error message="Sorry, could not create appointment!" onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Sorry, could not delete appointment!" onClose={() => back()} />}
    </article>
  );
};


