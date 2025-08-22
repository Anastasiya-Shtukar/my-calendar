import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import notesRouter from "./routes/notes.js"; // <--- importujemy router

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://nastasija2409:<db_password>@cluster0.cxual.mongodb.net/calendar"
  )
  .then(() => console.log("✅ Połączono z MongoDB"))
  .catch((err) => console.error("❌ Błąd połączenia z MongoDB:", err));

// Tutaj możemy ewentualnie dodać middleware auth
app.use("/notes", notesRouter); // wszystkie ścieżki /notes trafiają do routera

app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
