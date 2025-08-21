const express = require("express");
const router = express.Router();

//tymczasowa tablica notatek
const notes = [];

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
  notes = notes.filter((note) => note.id !== Number(id));
  res.status(204).end();
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
