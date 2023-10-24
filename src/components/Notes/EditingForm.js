import React, { useState, useEffect, useContext } from 'react';
import '../css/Editing.css';
import NoteContext from '../../context/Notes/NoteContext';
import Cookies from "js-cookie";

const EditingForm = ({ editingNote, clickHandler }) => {
  const context = useContext(NoteContext);
  const { updateNote } = context;
  const [editStatus, setEditStatus] = useState(false);
  const findJwt = Cookies.get("jwt");

  const [formData, setFormData] = useState({
    title: editingNote.title || '',
    tag: editingNote.tag || '',
    description: editingNote.description || '',
    id: editingNote.id || '',
  });

  useEffect(() => {
    setFormData({
      title: editingNote.title || '',
      tag: editingNote.tag || '',
      description: editingNote.description || '',
      id: editingNote.id || '',
    });
  }, [editingNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  };  
  const handleUpdate = () => {
    updateNote(formData.id, formData.title, formData.description, formData.tag,findJwt);
    clickHandler();
  };

  const handleEdit = () => {
    editStatus === false ? setEditStatus(true) : setEditStatus(false)
  }
  return (
    <div className="edit-note-form">
      <div className="edit-nav">
      <h2>
        <i className="fa-solid fa-arrow-left" onClick={clickHandler}></i> Edit Note
      </h2>
      <button className="edit-handle" onClick={handleEdit}>{editStatus? "Disable Edit": "Enable Edit"}</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            disabled={!editStatus}
          />
        </div>
        <div className="form-group">
          <label>Tag:</label>
          <input
            type="text"
            name="tag"
            placeholder="Enter tag"
            value={formData.tag}
            onChange={handleChange}
            disabled={!editStatus}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Enter description"
            rows={10}
            cols={40}
            value={formData.description}
            onChange={handleChange}
            disabled={!editStatus}
          ></textarea>
        </div>
        <div className="button-group">
          <button type="submit" onClick={handleUpdate} disabled={formData.title.length < 5 || formData.description.length < 8 || formData.tag.length < 3}>
            Update Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditingForm;
