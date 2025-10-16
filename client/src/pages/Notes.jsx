import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote, removeNote, setNotes } from "../store/notesSlice.js";
import NotesList from "../components/NotesList.jsx";
import CalendarView from "../components/CalendarView.jsx";

export default function Notes() {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("http://localhost:3000/notes");
        const data = await response.json();
        dispatch(setNotes(Array.isArray(data) ? data : []));
      } catch (error) {
        console.error("Błąd pobierania notatek:", error);
        dispatch(setNotes([]));
      }
    }
    fetchNotes();
  }, [dispatch]);

  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateStr = useMemo(
    () => selectedDate.toISOString().slice(0, 10),
    [selectedDate]
  );

  const notesForSelected = useMemo(
    () =>
      Array.isArray(notes)
        ? notes.filter((n) => n.date === selectedDateStr)
        : [],
    [notes, selectedDateStr]
  );

  const handleAdd = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newNote = { text: trimmed, date: selectedDateStr };
    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      const savedNote = await response.json();
      dispatch(addNote(savedNote));
      setText("");
    } catch (error) {
      console.error("błąd dodawania notatki:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await fetch("http://localhost:3000/notes/${_id}", { method: "DELETE" });
      dispatch(removeNote(_id));
    } catch (error) {
      console.error("błąd usuwania notatki:", error);
    }
  };

  return (
    <div>
      <h1>kalendarz z notatkami</h1>
      <div>
        <CalendarView selectedDate={selectedDate} onChange={setSelectedDate} />
        <div>
          <div>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`notatka na ${selectedDateStr}`}
            />
            <button onClick={handleAdd}>Dodaj</button>
          </div>
          <NotesList
            notes={notesForSelected}
            onDelete={handleDelete}
            selectedDateStr={selectedDateStr}
          />
        </div>
      </div>
    </div>
  );
}
