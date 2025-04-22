import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext)
    const { deleteNote } = context;
    const { note, updateNotes, showAlert } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-description">{note.description}</p>
                    <i className="fa-solid fa-file-pen mx-2 " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                        updateNotes(note); 
                    }}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={() => {
                        deleteNote(note._id);
                        showAlert ("Deleted successfully", "success");
                    }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem