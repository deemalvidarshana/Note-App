import React from 'react';
import axios from 'axios';
import NoteItem from './NoteItem';

const NotesList = ({ notes, fetchNotes, setSelectedNote }) => {
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/notes/${id}`);
        fetchNotes();
    };

    return (
        <div className="notes-grid">
            {notes.map(note => (
                <div className="note-wrapper" key={note._id}>
                    <NoteItem 
                        note={note} 
                        onDelete={handleDelete} 
                        onEdit={setSelectedNote}
                    />
                </div>
            ))}
        </div>
    );
};

export default NotesList;
