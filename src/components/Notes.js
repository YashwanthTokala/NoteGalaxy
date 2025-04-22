import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import NoteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(NoteContext);
  const navigate= useNavigate()
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"", title: "", description: "", tag: "deault" })

  const updateNotes = (currentNote) => {
    setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag })
    setTimeout(() => {
      ref.current.click();
    }, 0);
  }
  const handleClick = (e) => {
    refClose.current.click()
    editNote(note.id, note.title, note.description, note.tag)
    props.showAlert("Updated successfully", "success");
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch hidden modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="Text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="Text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="Text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.title.length<3 || note.description.length<5} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>YOUR NOTES</h3>
        <div className="container">
          {notes.length === 0 && 'No Notes To Display'}
        </div>
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNotes={updateNotes} showAlert={props.showAlert} note={note} />
          })}
      </div>
    </>
  );
}
export default Notes