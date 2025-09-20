import { useState } from 'react';
import '../styles/Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [noteColor, setNoteColor] = useState('#ffeb3b');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const windowWidth = window.innerWidth;
    const fridgeWidth = windowWidth * 0.6; 
    const fridgeCenter = windowWidth / 2;
    const rightPanelX = fridgeCenter + 50; 

    const note = {
      id: Date.now(),
      content: newNote,
      color: noteColor,
      position: {
        x: rightPanelX,
        y: 80 + Math.random() * 300 
      }
    };

    setNotes([...notes, note]);
    setNewNote('');
    setIsModalOpen(false);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="notes-section">
      <div className="notes-grid">
        {notes.map(note => (
          <div
            key={note.id}
            className="sticky-note"
            style={{
              backgroundColor: note.color,
              left: note.position.x,
              top: note.position.y
            }}
          >
            <button 
              className="delete-button"
              onClick={() => deleteNote(note.id)}
            >
              ×
            </button>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
      
      <button className="add-sticky-button" onClick={() => setIsModalOpen(true)}>
        Add Sticky
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
            <h2>New Sticky Note</h2>
            <form onSubmit={addNote} className="note-form">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write a note..."
                autoFocus
              />
              <div className="color-picker">
                <label>Choose Color:</label>
                <input
                  type="color"
                  value={noteColor}
                  onChange={(e) => setNoteColor(e.target.value)}
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">Add Note</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;