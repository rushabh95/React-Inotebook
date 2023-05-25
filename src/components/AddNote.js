import React, {useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context
    const [note,setNote] = useState({title:"",description:"",tag:"default"})

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description,note.tag)
        props.showAlert('Note Added successfully',"success")
        setNote({title:"",description:"",tag:""})
        window.location.reload();
    }
    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }
   
    return (
        <div className="container my-3">
            <h1>Add Your Notes</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                
                <button type="submit" disabled={note.title.length<5 || note.description<500} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
