import React, { useState } from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {
    const [expanded, setExpanded] = useState(false);
    const maxLength = 100;
    
    const isContentLong = note.content.length > maxLength;
    const displayContent = expanded ? note.content : 
        isContentLong ? `${note.content.substring(0, maxLength)}...` : note.content;

    const handleSeeMore = () => {   
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head>
                    <title>${note.title}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { font-size: 24px; }
                        p { font-size: 18px; }
                    </style>
                </head>
                <body>
                    <h1>${note.title}</h1>
                    <p>${note.content}</p>
                    <button onclick="window.close()">Close</button>
                </body>
            </html>
        `);
        newWindow.document.close();
    };

    return (
        <div className={`note-card ${expanded ? 'expanded' : ''}`}>
            <div className="note-content">
                <h5 className="note-title">{note.title}</h5>
                <p className="note-text">{displayContent}</p>
                {isContentLong && (
                    <button
                        className="see-more-btn"
                        onClick={handleSeeMore} // Change here
                    >
                        See more
                    </button>
                )}
            </div>
            <div className="note-actions">
                <button 
                    className="btn btn-warning me-2" 
                    onClick={() => onEdit(note)}
                >
                    Edit
                </button>
                <button 
                    className="btn btn-danger" 
                    onClick={() => onDelete(note._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default NoteItem;
