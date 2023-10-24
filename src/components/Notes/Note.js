import React from "react";

const Note = (props) => {
  return (
    <>
    <div className="note" key={props._id}>
      <h3 className="noteTitle">{props.title}</h3>
      <p className="hashtag">{`#${props.tag}`}</p>
      <p className="noteDescription">
        {props.description.length >= 45
          ? props.description.slice(0, 45) + "..."
          : props.description}
      </p>
      <div className="icons">
        <p>Created on: {new Date(props.date).toLocaleDateString()}</p>
        <div className="icon">
          <i
            className="fa-solid fa-trash"
            onClick={() => props.deleteNote(props._id)}
          ></i>
          <i
            className="fa-solid fa-arrow-up-right-from-square"
            onClick={() => {
              props.handleEdit(props._id, props.title, props.tag, props.description);
            }}
          ></i>{" "}
        </div>
      </div>
    </div>
    </>
  );
};

export default Note;
