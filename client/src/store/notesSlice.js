// src/store/notesSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Stan początkowy: tablica notatek
// Każda notatka ma strukturę: { _id, text, date }
const initialState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      // nadpisujemy tablicę notes tym, co przyszło z backendu
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter((n) => n._id !== action.payload);
    },
    updateNote: (state, action) => {
      const { _id, text, date } = action.payload;
      const note = state.notes.find((n) => n._id === _id);
      if (note) {
        if (typeof text === "string") note.text = text;
        if (typeof date === "string") note.date = date;
      }
    },
  },
});

export const { setNotes, addNote, removeNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
