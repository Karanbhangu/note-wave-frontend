import NoteContext from "./NoteContext";
import { useState } from "react";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const host = process.env.REACT_APP_HOST ; // Use environment variables for configuration
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState([]);
  const notify = (message) => {
    toast(message);
  };

  const getUser = async (jwt) => {
    try {
      const response = await fetch(`${host}/auth/getuser`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": jwt,
        },
      });
      const fetchUser = await response.json();
      setUser(fetchUser);
    } catch (err) {}
  };

  const updateUserDetails = async (jwt, name, email, password) => {
    const updatedData = {};
    if(name){
      updatedData.name = name;
    }
    if(email){
      updatedData.email = email;
    }
    if(password){
      updatedData.password = password;
    }
    try {
      const response = await fetch(`${host}/auth/updateuser`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": jwt,
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const verifyResponse = await response.json();
        console.log(verifyResponse);
      }
    } catch (err) {}
  };

  const getNotes = async (jwt) => {
    try {
      const response = await fetch(`${host}/notes/getnotes`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": jwt,
        },
      });
      const { notes: fetchedNotes } = await response.json();
      setNotes(fetchedNotes);
    } catch (error) {
      notify("Error while getting your notes. Please login and logout");
    }
  };

  const deleteNote = async (id, jwt) => {
    try {
      const response = await fetch(`${host}/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": jwt,
        },
      });
      const { message } = await response.json();
      notify(message);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      notify("Error deleting your note. Please try later");
    }
  };

  const addNote = async (title, description, tag, jwt) => {
    try {
      const noteData = {
        notetitle: title,
        notebody: description,
        notetag: tag,
      };
      const response = await fetch(`${host}/notes/addnote`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": jwt,
        },
        body: JSON.stringify(noteData),
      });
      const { message, note: addedNote } = await response.json();
      notify(message);
      setNotes((prevNotes) => [...prevNotes, addedNote]);
    } catch (error) {
      notify("Error adding your note please try later");
    }
  };

  const updateNote = async (id, title, description, tag, jwt) => {
    try {
      const noteData = {
        notetitle: title,
        notebody: description,
        notetag: tag,
      };
      const response = await fetch(`${host}/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "auth-token": jwt,
        },
        body: JSON.stringify(noteData),
      });
      const { message } = await response.json();
      notify(message);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    } catch (error) {
      notify("Error while updating your note please try later");
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        getNotes,
        deleteNote,
        updateNote,
        getUser,
        user,
        updateUserDetails,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
