import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LiveCoveragePage({ user }) {
  const [filter, setFilter] = useState("all");

  const updates = [
    { id: 1, time: "14:32 UTC", tag: "CLIMATE", title: "Antarctic Thermal Anomaly Reaches Critical Threshold", body: "Satellite radar indicates surface temperatures 4.2°C above baseline averages along the western ice shelf." },
    { id: 2, time: "13:10 UTC", tag: "GEOPOLITICS", title: "Maritime Security Corridor Established in Red Sea", body: "Coalition forces deploy real-time satellite tracking to secure commercial trade vectors." },
    { id: 3, time: "11:45 UTC", tag: "SOCIETY", title: "Global Student Reform Coalition Issues Declaration", body: "Representatives across 18 countries publish unified demands regarding examination transparency." }
  ];

  const filteredUpdates = filter === "all" ? updates : updates.filter(u => u.tag.toLowerCase() === filter);

  return (
    <div className="landing">
      <div className="background"></div>
      <div className="background-overlay"></div>
      <div className="red-glow"></div>

      <header className="navbar">
        <Link to="/" className="logo">
          <span className="logo-box">N</span> NOWLINE
        </Link>
        <nav>
          <Link to="/MainPage">STORIES</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/live" className="live">
            <span></span> LIVE
          </Link>
        </nav>
        {user && (
          <button className="profile-btn">
            {user.displayName || user.email?.split("@")[0]}
          </button>
        )}
      </header>

      <section className="stories" style={{ paddingTop: "60px" }}>
        <div className="section-top">
          <div>
            <span style={{ color: "#ff4352", fontSize: "9px", letterSpacing: "2px", fontWeight: "900" }}>
              LIVE BROADCAST
            </span>
            <h2 style={{ marginTop: "10px", fontSize: "34px", letterSpacing: "-1.5px" }}>
              Global Energy & Maritime Crisis Summit 2026
            </h2>
            <p style={{ color: "rgba(255,255,255,.55)", marginTop: "12px", fontSize: "14px", maxWidth: "700px", lineHeight: 1.7 }}>
              Live transmission from Geneva. Key delegations assemble to determine new resource distribution protocols amidst climate anomalies.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "30px", marginBottom: "50px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,.1)" }}>
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA"
            title="Live Briefing Transmission"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="section-top">
          <div>
            <span>INTELLIGENCE STREAM</span>
            <h2>Chronological Dispatches</h2>
          </div>
          <div className="chips">
            <button className={`chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>ALL</button>
            <button className={`chip ${filter === "climate" ? "active" : ""}`} onClick={() => setFilter("climate")}>CLIMATE</button>
            <button className={`chip ${filter === "geopolitics" ? "active" : ""}`} onClick={() => setFilter("geopolitics")}>GEOPOLITICS</button>
            <button className={`chip ${filter === "society" ? "active" : ""}`} onClick={() => setFilter("society")}>SOCIETY</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
          {filteredUpdates.map(item => (
            <div key={item.id} style={{ background: "rgba(18, 18, 18, 0.7)", borderLeft: "3px solid #e50914", padding: "1.5rem", borderRadius: "4px" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ color: "#e50914", fontWeight: "bold", fontSize: "0.85rem" }}>{item.time}</span>
                <span className="story-tag">{item.tag}</span>
              </div>
              <h3 style={{ fontSize: "1.25rem", margin: "0.5rem 0", color: "#fff" }}>{item.title}</h3>
              <p style={{ color: "#a0a0a0", fontSize: "0.95rem", margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}