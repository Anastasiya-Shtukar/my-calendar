import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import notesRouter from "./routes/notes.js"; // <--- importujemy router

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Połączono z MongoDB"))
  .catch((err) => console.error("❌ Błąd połączenia z MongoDB:", err));

// Tutaj możemy ewentualnie dodać middleware auth
app.use("/notes", notesRouter); // wszystkie ścieżki /notes trafiają do routera

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log("✅ Server running on http://localhost:3000")
);
