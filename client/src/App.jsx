// src/App.jsx
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote, removeNote } from "./store/notesSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {
  // 1) Odczyt stanu z Reduxa:
  // state.notes (nazwa z store.js) -> .notes (tablica w initialState)
  const notes = useSelector((state) => state.notes.notes);

  // 2) Dostęp do dispatch (wysyłanie akcji do store)
  const dispatch = useDispatch();

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

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch(
      addNote({
        id: Date.now(),
        text: trimmed,
        date: selectedDateStr, // UŻYWAMY daty z kalendarza
      })
    );
    setText("");
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
                <button onClick={() => dispatch(removeNote(note.id))}>
                  Usuń
                </button>
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
