import React, { useState } from 'react';
import '../styles/Notes.css';

const Notes = ({ notes, addNote, deleteNote, isNotesModalOpen, setIsNotesModalOpen }) => {
  const [noteText, setNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFE4B5');

  const colors = [
    '#FFE4B5',
    '#FFB6C1',
    '#98FB98',
    '#87CEEB',
    '#DDA0DD',
    '#F0E68C',
    '#FFA07A',
    '#20B2AA',
  ];

  const handleAddNote = () => {
    if (noteText.trim()) {
      addNote(noteText, selectedColor);
      setNoteText('');
      setSelectedColor('#FFE4B5');
      setIsNotesModalOpen(false);
    }
  };

  return (
    <>
      <button 
        className="add-sticky-button" 
        onClick={() => setIsNotesModalOpen(true)}
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 2000 }}
      >
        + Add Sticky
      </button>

      <div className="notes-display-area">
        {notes.map((note, index) => (
          <div
            key={note.id}
            className="sticky-note"
            style={{
              backgroundColor: note.color,
              position: 'absolute',
              right: `${20 + (index % 3) * 120}px`,
              bottom: `${20 + Math.floor(index / 3) * 120}px`,
            }}
          >
            <button 
              className="note-delete-button" 
              onClick={() => deleteNote(note.id)}
            >
              ×
            </button>
            <div className="note-text">{note.text}</div>
          </div>
        ))}
      </div>

      {isNotesModalOpen && (
        <div className="notes-modal">
          <div className="notes-modal-content">
            <button className="notes-close-button" onClick={() => setIsNotesModalOpen(false)}>×</button>
            <h2>Add Sticky Note</h2>
            
            <div className="notes-input-section">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your note..."
                className="notes-textarea"
                rows="4"
              />
            </div>

            <div className="color-selection">
              <h3>Choose Color:</h3>
              <div className="color-options">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <button onClick={handleAddNote} className="notes-button">Add Note</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;