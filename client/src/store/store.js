// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice"; // podłączymy slice z notatkami

// Tworzymy store aplikacji.
// Każde pole w "reducer" to jeden "kawałek" (slice) stanu.
const persisted = JSON.parse(localStorage.getItem("app-state") || "{}");
export const store = configureStore({
  reducer: { notes: notesReducer },
  preloadedState: persisted, // wczytaj przy starcie
});
store.subscribe(() => {
  localStorage.setItem("app-state", JSON.stringify(store.getState()));
});
// (opcjonalnie) możesz tu kiedyś dodać middleware, preloadedState, itp.
