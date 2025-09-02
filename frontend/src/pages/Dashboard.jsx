import { useState, useEffect } from 'react';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import Alert from '../components/Alert';
import { getNotes, createNote, updateNote, deleteNote } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch notes' });
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    setLoading(true);
    try {
      const response = await createNote(newNote);
      setNotes([response.data, ...notes]);
      setNewNote({ title: '', content: '' });
      setAlert({ type: 'success', message: 'Note created successfully' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to create note' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (note) => {
    try {
      const updatedData = await updateNote(note._id, note);
      setNotes(notes.map((n) => (n._id === updatedData.data._id ? updatedData.data : n)));
      setAlert({ type: 'success', message: 'Note updated successfully' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update note' });
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note._id !== noteId));
      setAlert({ type: 'success', message: 'Note deleted successfully' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete note' });
    }
  };

  const handlePinNote = async (note) => {
    try {
      const updatedData = await updateNote(note._id, { isPinned: !note.isPinned });
      setNotes(notes.map((n) => (n._id === updatedData.data._id ? updatedData.data : n)));
      setAlert({ type: 'success', message: updatedData.data.isPinned ? 'Note pinned' : 'Note unpinned' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to pin/unpin note' });
    }
  };

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const otherNotes = notes.filter((note) => !note.isPinned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Header />

      {alert && (
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Welcome Section */}
        <div className="mb-8 md:mb-10 text-center px-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Manage your thoughts, tasks, and inspirations in one place.
          </p>
        </div>

        {/* Create Note Form */}
        <div className="bg-white shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-8 md:mb-12 mx-2 sm:mx-0">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <span className="mr-2">✍️</span> Create New Note
          </h2>
          <form onSubmit={handleCreateNote} className="space-y-4">
            <input
              type="text"
              placeholder="Note title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              required
            />
            <textarea
              placeholder="Note content..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base min-h-[100px] sm:min-h-[120px]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-white font-medium sm:font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : 'Create Note'}
            </button>
          </form>
        </div>

        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div className="mb-8 md:mb-12 px-2 sm:px-0">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-xl">📌</span> Pinned Notes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {pinnedNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleUpdateNote}
                  onDelete={handleDeleteNote}
                  onPin={handlePinNote}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Notes */}
        <div className="px-2 sm:px-0">
          <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <span className="text-xl">📝</span> All Notes
          </h2>
          {notes.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl shadow">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12 sm:h-14 sm:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm sm:text-base px-4">No notes yet. Start by creating your first note above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {otherNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleUpdateNote}
                  onDelete={handleDeleteNote}
                  onPin={handlePinNote}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}