import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🆕 Rejestracja:", { email, password });
    // tutaj później wywołasz dispatch(registerUser({email, password}))
  };

  return (
    <div>
      <h1>Rejestracja</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 10, maxWidth: 300 }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
}
