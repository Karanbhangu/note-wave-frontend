import React from "react";
import "../css/Alert.css";

const Alert = (props) => {

    const closeAlert = ()=>{
        props.setOpenAlert("");
        props.formatDeletingNote("");
    }
  return (
    <div className={props.openAlert === "open" ? "alert open" : "alert"}>
      <div className="alert-box">
        <div className="actions">
          <h3 className="alert-title">{props.title}</h3>
          <i className="fa-solid fa-x close-icon" onClick={closeAlert}></i>
        </div>
        <p className="text">{props.text}</p>
        <div className="btns">
          <button className="btn btn-yes" onClick={() => {props.forFunction(props.id,props.jwt);closeAlert()}}>
            Yes
          </button>
          <button className="btn btn-no" onClick={closeAlert}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
