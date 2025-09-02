import { useState } from 'react'

export default function NoteCard({ note, onEdit, onDelete, onPin }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ title: note.title, content: note.content })

  const handleSave = () => {
    onEdit({ ...note, ...editData }) // call Dashboard update function
    setIsEditing(false)
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow relative">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <textarea
            value={editData.content}
            onChange={(e) => setEditData({ ...editData, content: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-900 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{note.title}</h3>
              <p className="text-gray-600 mt-1">{note.content}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onPin(note)}
                className="text-sm text-indigo-600 hover:underline"
              >
                {note.isPinned ? 'Unpin' : 'Pin'}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-green-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
