import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.js"; // <--- importujemy router

const app = express();
app.use(cors());
app.use(express.json());

// Tutaj możemy ewentualnie dodać middleware auth
app.use("/notes", notesRouter); // wszystkie ścieżki /notes trafiają do routera

app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
