import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:7080"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const token = localStorage.getItem("token")

    const getAllNotes = async () => {
        const response = await fetch(`${host}/api/v1/userNotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

        },
        );
        const json = await response.json()
        setNotes(json)
    }

    const addNote = async (title, description, tag) => {
        const note = {
            "title": title,
            "description": description,
            "tag": tag,
        }
        console.log(note, "note")
        setNotes(!notes.data ? notes.concat(note) : notes.data.concat(note))
        const response = await fetch(`${host}/api/v1/addNotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, tag })
        },
        );
        console.log(response)
    }

    const editNote = async (id, title, description, tag) => {
        console.log(id)
        const response = await fetch(`${host}/api/v1/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, tag })
        },
        );
        const json = response.json()
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < !newNotes.data.length ? newNotes.length : newNotes.data.length; i++) {
            const element = newNotes.data[i]
            if (element._id === id) {
                newNotes.data[i].title = title
                newNotes.data[i].description = description
                newNotes.data[i].tag = tag
                break;
            }
        }
        setNotes(newNotes)
        console.log(json)
    }

    const deleteNote = async (id) => {
        const newNotes = notes.length > 0 ? notes.filter((note) => {
            return note._id !== id
        }) : notes.data.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
        const response = await fetch(`${host}/api/v1/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

        },
        );
        const json = response.json()
        console.log(json)
    }
    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getAllNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState