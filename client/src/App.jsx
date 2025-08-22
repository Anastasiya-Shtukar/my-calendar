// src/App.jsx
import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote, removeNote } from "./store/notesSlice.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {
  // 1) Odczyt stanu z Reduxa:
  // state.notes (nazwa z store.js) -> .notes (tablica w initialState)
  const notes = useSelector((state) => state.notes.notes);

  // 2) Dostęp do dispatch (wysyłanie akcji do store)
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchNotes() {
      try {
        // Wysyłamy GET do backendu
        const response = await fetch("http://localhost:3000/notes");
        const data = await response.json(); // odczytujemy JSON
        dispatch({ type: "notes/setNotes", payload: data }); // zapisujemy w Reduxie
      } catch (error) {
        console.error("Błąd pobierania notatek:", error);
      }
    }

    fetchNotes();
  }, [dispatch]);

  // 3) Lokalny stan formularza
  const [text, setText] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Z daty obiektu Date zrobimy "YYYY-MM-DD"
  const selectedDateStr = useMemo(
    () => selectedDate.toISOString().slice(0, 10),
    [selectedDate]
  );

  // Notatki tylko dla wybranej daty
  const notesForSelected = useMemo(
    () => notes.filter((n) => n.date === selectedDateStr),
    [notes, selectedDateStr]
  );

  const handleAdd = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newNote = {
      text: trimmed,
      date: selectedDateStr,
    };

    try {
      // Wysyłamy POST do backendu
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      const savedNote = await response.json(); // backend zwraca notatkę z potwierdzeniem
      dispatch(addNote(savedNote)); // dopiero teraz zapisujemy w Redux
      setText("");
    } catch (error) {
      console.error("Błąd dodawania notatki:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await fetch(`http://localhost:3000/notes/${_id}`, { method: "DELETE" });
      dispatch(removeNote(_id)); // dopiero teraz usuwamy z Redux
    } catch (error) {
      console.error("Błąd usuwania notatki:", error);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Kalendarz z notatkami 🗓️</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        <div>
          <Calendar value={selectedDate} onChange={setSelectedDate} />
        </div>

        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Notatka na ${selectedDateStr}`}
              style={{ flex: 1 }}
            />
            <button onClick={handleAdd}>Dodaj</button>
          </div>

          <h3>Notatki z dnia {selectedDateStr}</h3>
          <ul style={{ paddingLeft: 18 }}>
            {notesForSelected.map((note) => (
              <li key={note.id} style={{ marginBottom: 6 }}>
                {note.text}{" "}
                <button onClick={() => handleDelete(note._id)}>Usuń</button>
              </li>
            ))}
            {notesForSelected.length === 0 && <p>Brak notatek tego dnia.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
