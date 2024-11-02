// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

function App() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [filteredNotes, setFilteredNotes] = useState([]); // State for filtered notes

    const fetchNotes = async () => {
        const response = await axios.get('http://localhost:5000/notes');
        setNotes(response.data);
        setFilteredNotes(response.data); // Set initial notes to display all
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleSearch = () => {
        if (searchTerm === '') {
            setFilteredNotes(notes); // Show all notes if search is empty
        } else {
            setFilteredNotes(
                notes.filter(note =>
                    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    note.content.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    };

    const handleClearSearch = () => {
        setSearchTerm(''); // Clear the search term
        setFilteredNotes(notes); // Show all notes
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Note App</h1>
            <NoteForm fetchNotes={fetchNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />

            {/* Search Input */}
            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                <button className="btn btn-secondary" onClick={handleClearSearch}>Clear</button>
            </div>

            <h2>Your Notes</h2>
            <NotesList notes={filteredNotes} fetchNotes={fetchNotes} setSelectedNote={setSelectedNote} />
        </div>
    );
}

export default App;
