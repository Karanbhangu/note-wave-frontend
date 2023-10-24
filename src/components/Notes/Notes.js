import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../../context/Notes/NoteContext";
import EditingForm from "./EditingForm";
import "../css/Notes.css";
import Alert from "../Interactions/Alert";
import Note from "./Note";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, deleteNote } = context;
  const [editStatus, setEditStatus] = useState("closed");
  const [editingNote, setEditingNote] = useState(null); // Use an object, not an array
  const [deletingNote, setDeletingNote] = useState("");
  const [openAlert, setOpenAlert] = useState("");
  const navigate = useNavigate();
  const [jwt, setjwt] = useState("");
  const notify = (message) => {
    toast(message);
  };
  useEffect(() => {
    const findJwt = Cookies.get("jwt");
    if (findJwt) {
      setjwt(findJwt);
      getNotes(findJwt);
    } else {
      notify("Login before accessing Notes");
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (deletingNote !== "") {
      setOpenAlert("open");
    }
  }, [deletingNote]);
  const handleEdit = (id, title, tag, description) => {
    setEditingNote({ id, title, tag, description });
    editStatus === "open" ? setEditStatus("closed") : setEditStatus("open");
  };
  return (
    <>
      <div className={editStatus === "open" ? "notes open" : "notes"}>
        {notes.length === 0 ? (
          <div className="no-notes">
            You currently have no notes added in your account. Click on Add
            Notes to add your first Note.
          </div>
        ) : (
          notes.map((note) => {
            return (
              <Note
                key={note._id}
                _id={note._id}
                title={note.title}
                tag={note.tag}
                description={note.description}
                date={note.date}
                deleteNote={setDeletingNote}
                handleEdit={handleEdit}
              />
            );
          })
        )}
      </div>
      {editStatus === "open" && editingNote && (
        <div className="edits open">
          <EditingForm clickHandler={handleEdit} editingNote={editingNote} />
        </div>
      )}
      <Alert
        title="Delete Note"
        text="Are you sure you want to delete this text"
        forFunction={deleteNote}
        id={deletingNote}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        formatDeletingNote={setDeletingNote}
        jwt={jwt}
      />
    </>
  );
};

export default Notes;
