import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoteForm = ({ fetchNotes, selectedNote, setSelectedNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [selectedNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedNote) {
                await axios.put(`http://localhost:5000/notes/${selectedNote._id}`, { title, content }); // Use backticks for template literals
            } else {
                await axios.post('http://localhost:5000/notes', { title, content });
            }
            fetchNotes(); // Refresh the list of notes
            setSelectedNote(null); // Clear selected note
            setTitle(''); // Clear title input
            setContent(''); // Clear content input
        } catch (error) {
            console.error('Error saving note:', error);
            // Optionally, you could set some error state here to display an error message
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
            </div>
            <div className="form-group mb-3">
                <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    rows="3"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {selectedNote ? 'Update Note' : 'Add Note'}
            </button>
            {selectedNote && (
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                        setSelectedNote(null);
                        setTitle('');
                        setContent('');
                    }}
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default NoteForm;