import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { lazy } from "react";
import PrivateRoute from "./components/PrivateRoute.jsx";
import RestrictedRoute from "./components/RestrictedRoute.jsx";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const NotesPage = lazy(() => import("./pages/Notes.jsx"));
const RegisterPage = lazy(() => import("./pages/Register.jsx"));
const LoginPage = lazy(() => import("./pages/Login.jsx"));

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/notes"
          element={
            <PrivateRoute redirectPath="/login" Component={<NotesPage />} />
          }
        />

        <Route
          path="/login"
          element={
            <RestrictedRoute redirectPath="/notes" Component={<LoginPage />} />
          }
        />

        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectPath="/notes"
              Component={<RegisterPage />}
            />
          }
        />

        <Route path="*" element={<h2>404 - Strona nie istnieje</h2>} />
      </Routes>
    </Layout>
  );
}
