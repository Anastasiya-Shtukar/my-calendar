import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// GET /notes - pobranie wszystkich notatek
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes); // zawsze tablica []
  } catch (err) {
    console.error("❌ Błąd pobierania notatek:", err);
    res.status(500).json({ error: "Błąd pobierania notatek" });
  }
});

// POST /notes - dodanie nowej notatki
router.post("/", async (req, res) => {
  try {
    const { text, date } = req.body;
    const note = new Note({ text, date });
    const saved = await note.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Błąd dodawania notatki" });
  }
});

// DELETE /notes/:id - usunięcie notatki
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Błąd usuwania notatki" });
  }
});

// PUT /notes/:id - edycja notatki
router.put("/:id", async (req, res) => {
  try {
    const { text } = req.body;
    const update = await Note.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (update) {
      res.json(update);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Błąd edycji notatki" });
  }
});

export default router;
