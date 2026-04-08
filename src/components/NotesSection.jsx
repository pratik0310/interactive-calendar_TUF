import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Calendar as CalendarIcon, Save } from 'lucide-react';

export default function NotesSection({ selectedRange }) {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('calendarNotes');
    if (stored) {
      setSavedNotes(JSON.parse(stored));
    }
  }, []);

  const saveNotes = () => {
    const { start, end } = selectedRange;
    if (!notes.trim() && !noteTitle.trim()) return;
    
    const newNote = {
      id: Date.now(),
      title: noteTitle.trim() || 'Untitled Note',
      content: notes.trim(),
      startDate: start ? format(start, 'MMM dd, yyyy') : null,
      endDate: end ? format(end, 'MMM dd, yyyy') : null,
      createdAt: new Date().toISOString(),
    };
    
    const updated = [newNote, ...savedNotes];
    setSavedNotes(updated);
    localStorage.setItem('calendarNotes', JSON.stringify(updated));
    setNotes('');
    setNoteTitle('');
    setIsEditing(false);
  };

  const deleteNote = (id) => {
    const updated = savedNotes.filter(note => note.id !== id);
    setSavedNotes(updated);
    localStorage.setItem('calendarNotes', JSON.stringify(updated));
  };

  const getRangeDisplay = () => {
    const { start, end } = selectedRange;
    if (start && end) {
      return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd')}`;
    }
    if (start) {
      return `${format(start, 'MMM dd')} (Single day)`;
    }
    return 'No date range selected';
  };

  return (
    <div className="bg-stone-50 rounded-xl shadow-md p-4 md:p-5">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
        <div>
          <h3 className="font-serif text-lg md:text-xl font-semibold text-stone-800">
            Notes
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            {getRangeDisplay()}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-stone-400 hover:text-blue-600 transition-colors"
        >
          <Edit2 size={18} />
        </button>
      </div>
      
      {isEditing && (
        <div className="mb-5 p-4 bg-white rounded-lg border border-stone-200 shadow-sm">
          <input
            type="text"
            placeholder="Note title..."
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="w-full mb-2 px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm"
          />
          <textarea
            placeholder="Write your note here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm resize-none"
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={saveNotes}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={14} />
              Save Note
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-sm text-stone-500 hover:text-stone-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {savedNotes.length === 0 ? (
          <div className="text-center py-8 text-stone-400">
            <CalendarIcon size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notes yet</p>
            <p className="text-xs mt-1">Click edit to add a note</p>
          </div>
        ) : (
          savedNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-3 rounded-lg border border-stone-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-stone-800 text-sm">
                    {note.title}
                  </h4>
                  {(note.startDate || note.endDate) && (
                    <p className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                      <CalendarIcon size={10} />
                      {note.startDate}
                      {note.endDate && note.endDate !== note.startDate && ` → ${note.endDate}`}
                    </p>
                  )}
                  <p className="text-stone-600 text-sm mt-2 whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <p className="text-xs text-stone-400 mt-2">
                    {format(new Date(note.createdAt), 'MMM dd, h:mm a')}
                  </p>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-stone-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-stone-200 text-xs text-stone-400 flex items-center gap-1">
        <span>💡</span>
        Notes are saved automatically to your browser
      </div>
    </div>
  );
}