// src/store/notesSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Ustal kształt danych. Na start: id + tekst + (zaraz dodamy datę).
const initialState = {
  notes: [], // np. [{id: 123, text: "Kup mleko", date: "2025-08-19"}]
};

const notesSlice = createSlice({
  name: "notes", // nazwa gałęzi w store: state.notes
  initialState, // stan początkowy
  reducers: {
    // action.payload: { id, text, date }
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    // action.payload: id
    removeNote: (state, action) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },
    // action.payload: { id, text? , date? }
    updateNote: (state, action) => {
      const { id, text, date } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        if (typeof text === "string") note.text = text;
        if (typeof date === "string") note.date = date;
      }
    },
  },
});

// Eksport akcji (wywołasz je przez dispatch w komponentach)
export const { addNote, removeNote, updateNote } = notesSlice.actions;

// Eksport reduktora (podłączony w store.js)
export default notesSlice.reducer;
