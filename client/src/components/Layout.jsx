import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <header style={{ padding: "10px", background: "#eee" }}>
        <nav style={{ display: "flex", gap: "12px" }}>
          <Link to="/">Home</Link>
          <Link to="/notes">Notatki</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
