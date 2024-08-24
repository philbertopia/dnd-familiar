"use client";

import { useState } from "react";

export function Notes() {
  const [notes, setNotes] = useState<string[]>([]); // Explicitly type as string array
  const [noteText, setNoteText] = useState<string>(""); // Explicitly type as string
  const [isEditing, setIsEditing] = useState<boolean>(false); // Explicitly type as boolean
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null); // Explicitly type as number or null
  const [editNoteText, setEditNoteText] = useState<string>(""); // Explicitly type as string

  const addNote = (e: React.FormEvent) => {
    // Specify event type
    e.preventDefault();
    if (noteText.trim() === "") return;

    setNotes([...notes, noteText]);
    setNoteText("");
  };

  const deleteNote = (index: number) => {
    // Specify index type
    setNotes(notes.filter((_, i) => i !== index));
  };

  const startEditing = (index: number) => {
    // Specify index type
    setIsEditing(true);
    setCurrentEditIndex(index);
    setEditNoteText(notes[index]);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setCurrentEditIndex(null);
    setEditNoteText("");
  };

  const saveEdit = (e: React.FormEvent) => {
    // Specify event type
    e.preventDefault();
    if (editNoteText.trim() === "") return;

    const updatedNotes = notes.map((note, index) =>
      index === currentEditIndex ? editNoteText : note
    );

    setNotes(updatedNotes);
    cancelEditing();
  };

  return (
    <div className="p-3 mt-3 w-full bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Notes</h2>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded"
          >
            <div>
              <p className="text-sm text-gray-600">{note}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => startEditing(index)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add or Edit Note Form */}
      {isEditing ? (
        <form className="mt-6 space-y-4" onSubmit={saveEdit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="editNoteText"
            >
              Edit Note Text
            </label>
            <textarea
              id="editNoteText"
              value={editNoteText}
              onChange={(e) => setEditNoteText(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Edit your note text"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={cancelEditing}
            className="w-full mt-2 py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={addNote}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="noteText"
            >
              Note Text
            </label>
            <textarea
              id="noteText"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your note text"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Note
          </button>
        </form>
      )}
    </div>
  );
}

