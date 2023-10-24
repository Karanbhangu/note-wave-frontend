import React, { useContext, useState } from "react";
import "../css/AddNotes.css";
import NoteContext from "../../context/Notes/NoteContext";
import Cookies from "js-cookie";

const AddNotes = () => {
  // State to manage the visibility of the "Add Note" menu
  const [noteAdd, setNoteAdd] = useState(false);
  const findJwt = Cookies.get("jwt");

  // State to store the values of the note
  const [note, setNote] = useState({
    notetitle: "",
    notebody: "",
    notetag: "",
  });

  // Access the NoteContext for adding notes
  const context = useContext(NoteContext);
  const { addNote } = context;

  // Function to toggle the visibility of the "Add Note" menu
  const handleToggle = () => {
    setNoteAdd((prevNoteAdd) => !prevNoteAdd);
  };

  // Function to handle form submission (prevents default behavior)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Function to add a note and reset input fields
  const handleAddNote = () => {
    addNote(note.notetitle, note.notebody, note.notetag, findJwt);
    setNote({
      notetitle: "",
      notebody: "",
      notetag: "",
    });
    setNoteAdd(false);
  };

  return (
    <div className="upper-portion">
      <div className="note-nav">
        <h2>My Notes</h2>
        <div className="features">
          <button onClick={handleToggle}>
            {noteAdd ? "Close Menu" : "Add Notes"}
          </button>
        </div>
      </div>
      <div className={`note-menu ${noteAdd ? "opens" : ""}`}>
        <form action="" onSubmit={handleSubmit}>
          <h3>Add a Note:</h3>
          <div className="input-box">
            <label htmlFor="notetitle">Note Title:</label>
            <input
              name="notetitle"
              id="notetitle"
              type="text"
              onChange={handleChange}
              value={note.notetitle}
            />
          </div>
          <div className="input-box">
            <label htmlFor="notetag">Note Tag:</label>
            <input
              name="notetag"
              id="notetag"
              type="text"
              onChange={handleChange}
              value={note.notetag}
            />
          </div>
          <div className="input-box">
            <label htmlFor="notebody">Enter Your Note:</label>
            <textarea
              name="notebody"
              id="notebody"
              rows="5"
              onChange={handleChange}
              value={note.notebody}
            ></textarea>
          </div>
          <button onClick={handleAddNote} disabled={note.notetitle.length < 5 || note.notetag.length< 3 ||note.notebody.length < 8}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
