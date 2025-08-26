import { useState } from "react";

function NoteForm({ selectedDateStr, onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Notatka na ${selectedDateStr}`}
        style={{ flex: 1 }}
      />
      <button onClick={handleSubmit}>Dodaj</button>
    </div>
  );
}

export default NoteForm;
