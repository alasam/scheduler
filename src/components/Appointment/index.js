import React from "react";
//import classNames from "classnames";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode.js"


export default function Appointment(props) {

  const CONFIRM = "CONFIRM";
  const CREATE = 'CREATE';
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const EMPTY = 'EMPTY';
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const SAVING = "SAVING";
  const SHOW = 'SHOW';
  


  function save(name, interviewer) {
    transition(SAVING, true)
    const interview = {
      student: name,
      interviewer
    }; 
  
    props.bookInterview(props.id, interview)
    .then (() =>
    transition(SHOW)
    )
    .catch(error =>{
      console.log(">>>>>!!!!",error)
      transition(ERROR_SAVE, true);
    })
  }

  function deleteApp (name, interviewer) {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(error =>{
      transition(ERROR_DELETE, true);
    })
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
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
      {mode === SAVING && <Status message={"SAVING"}  />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete?"} OnConfirm={deleteApp} OnCancel={() => back()} />}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.interviewer} onSave={save} onCancel={back} />}
      {mode === ERROR_SAVE && <Error message="Sorry, could not create appointment!" onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Sorry, could not delete appointment!" onClose={() => back()} />}
      {/* {props.interview ?
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      /> :
   <Empty />} */}

    </article>
  );


};


