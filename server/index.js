// server/index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // domyślnie pozwala wszystkim originom (OK na start)
app.use(express.json()); // parsowanie JSON w body

// Tymczasowa "baza" w pamięci:
let notes = [];

// Prosty healthcheck
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Pobierz wszystkie notatki
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Dodaj nową notatkę
app.post("/notes", (req, res) => {
  const note = req.body; // oczekujemy { id, text, date }
  notes.push(note);
  res.status(201).json(note);
});

// (opcjonalnie) szczegółowa konfiguracja CORS dla Vite:
// app.use(cors({ origin: "http://localhost:5173" }));

const PORT = 3000; // Vite używa 5173, więc nie ma konfliktu
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
