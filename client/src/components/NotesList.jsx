function NotesList({ notes, onDelete, selectedDateStr }) {
  return (
    <div>
      <h3>Notatki z dnia {selectedDateStr}</h3>
      <ul style={{ paddingLeft: 18 }}>
        {notes.map((note) => (
          <li key={note._id} style={{ marginBottom: 6 }}>
            {note.text} <button onClick={() => onDelete(note._id)}>Usuń</button>
          </li>
        ))}
        {notes.length === 0 && <p>Brak notatek tego dnia.</p>}
      </ul>
    </div>
  );
}

export default NotesList;
