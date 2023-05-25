import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom';
import AddNote from './AddNote'

const Notes = (props) => {
    const context = useContext(NoteContext)
    const { notes, getAllNotes, editNote } = context
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token")){
            getAllNotes()
        }else{
            navigate("/login")
        }
      
    }, [getAllNotes])
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    const handleClick = (e) => {
        e.preventDefault()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Note update successfully", "success")

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container col-lg-8 my-3">
                <AddNote showAlert={props.showAlert}></AddNote>
                {/* <!-- Button trigger modal --> */}
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" disabled={note.etitle.length < 5 || note.edescription < 500} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-3">

                    <h2>Your Notes</h2>

                    {notes.length === 0 ? notes : notes.length > 0 ? notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}></NoteItem>
                    }) : notes.data.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}></NoteItem>
                    })}
                </div>
            </div>
        </>

    )
}

export default Notes
