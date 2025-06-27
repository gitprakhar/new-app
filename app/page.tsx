import { useState } from "react";

export default function Home() {
  const [guess, setGuess] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/guesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess }),
      });
      if (res.ok) {
        setMessage("Guess submitted!");
        setGuess("");
      } else {
        setMessage("Failed to submit guess.");
      }
    } catch (err) {
      setMessage("Error submitting guess.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'blue', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <h1 style={{ color: 'white', fontSize: '3rem' }}>hello world</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="guess" style={{ color: 'white', marginBottom: 8 }}>Guesses</label>
        <input
          id="guess"
          type="text"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: 'none', marginBottom: 8 }}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading} style={{ padding: '8px 16px', borderRadius: 4, border: 'none', background: '#fff', color: 'blue', fontWeight: 'bold' }}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {message && <div style={{ color: 'white', marginTop: 8 }}>{message}</div>}
      </form>
    </div>
  );
}
