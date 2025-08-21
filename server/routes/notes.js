import express from "express";
const router = express.Router();

//tymczasowa tablica notatek
let notes = [];

// GET /notes - pobranie wszystkich notatek
router.get("/", (req, res) => {
  res.json(notes);
});

// POST /notes - dodanie nowej notatki
router.post("/", (req, res) => {
  const note = req.body;
  notes.push(note);
  res.status(201).json(note);
});

// DELETE /notes/:id - usunięcie notatki
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    if (!Array.isArray(notes)) {
      throw new Error("notes nie jest tablicą!");
    }
    // porównujemy jako stringi – bez Number
    notes = notes.filter((note) => String(note.id) !== String(id));

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /notes/:id - edycja notatki
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const note = notes.find((n) => n.id === Number(id));
  if (note) {
    note.text = text;
    res.json(note);
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

export default router;
