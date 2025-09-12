// frontend/src/App.jsx
import React, { useState } from "react";
import "./App.css";

const API_BASE = "http://localhost:5000"; // backend URL

function App() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [message, setMessage] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    setMessage("");
    setShortUrl("");

    if (!url) {
      setMessage("!..Please enter a URL");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, alias }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`${data.error || "!Failed to shorten URL"}`);
      } else {
        // Use backend URL for redirection
        setShortUrl(`${API_BASE}/${data.shortCode}`);
        setMessage(" Short URL created successfully!");
        setUrl("");
        setAlias("");
      }
    } catch (err) {
      setMessage("!Server error. Please try again later.");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>🔗 URL Shortener</h1>

        <div className="form">
          <input
            type="text"
            placeholder="Enter your long URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Custom alias (optional)"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
          <button onClick={handleShorten}>Shorten URL</button>
        </div>

        {message && <p className="message">{message}</p>}

        {shortUrl && (
          <p className="result">
              Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
