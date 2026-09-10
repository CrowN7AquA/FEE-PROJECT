import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LiveCoveragePage({ user }) {
  const [filter, setFilter] = useState("all");

  const updates = [
    {
      id: 1,
      time: "14:32 UTC",
      tag: "CLIMATE",
      title: "Antarctic Thermal Anomaly Reaches Critical Threshold",
      body: "Satellite radar indicates surface temperatures 4.2°C above baseline averages along the western ice shelf."
    },
    {
      id: 2,
      time: "13:10 UTC",
      tag: "GEOPOLITICS",
      title: "Maritime Security Corridor Established in Red Sea",
      body: "Coalition forces deploy real-time satellite tracking to secure commercial trade vectors."
    },
    {
      id: 3,
      time: "11:45 UTC",
      tag: "SOCIETY",
      title: "Global Student Reform Coalition Issues Declaration",
      body: "Representatives across 18 countries publish unified demands regarding examination transparency."
    }
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
          <Link to="/feed">STORIES</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/live" className="active">
            <span className="live"><span></span> LIVE</span>
          </Link>
        </nav>
      </header>

      {/* Main Broadcast Split */}
      <section className="news-section" style={{ paddingTop: "7rem", paddingBottom: "3rem" }}>
        <div className="news-container">
          {/* Headline Left */}
          <div className="news-headline">
            <span className="breaking-tag" style={{ background: "#e50914", color: "#fff", padding: "0.2rem 0.6rem", fontWeight: "bold" }}>
              LIVE BROADCAST
            </span>
            <h2 className="news-title" style={{ fontSize: "2.5rem", marginTop: "1rem" }}>
              Global Energy & Maritime Crisis Summit 2026
            </h2>
            <p className="news-description">
              Live transmission from Geneva. Key delegations assemble to determine new resource distribution protocols amidst climate anomalies.
            </p>
            <div className="news-meta" style={{ marginTop: "1.5rem" }}>
              <span className="author">Editorial Desk</span>
              <span className="date">• UPDATED REAL-TIME</span>
            </div>
          </div>

          {/* Broadcast Embed Right */}
          <div className="video-container">
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/live_stream?channel=EXPLORATION_CHANNEL"
                title="Live Briefing Transmission"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Chronological Timeline Feed */}
      <section className="stories">
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
            <div
              key={item.id}
              style={{
                background: "rgba(18, 18, 18, 0.7)",
                borderLeft: "3px solid #e50914",
                padding: "1.5rem",
                borderRadius: "4px"
              }}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ color: "#e50914", fontWeight: "bold", fontSize: "0.85rem" }}>{item.time}</span>
                <span className="story-tag">{item.tag}</span>
              </div>
              <h3 style={{ fontSize: "1.25rem", margin: "0.5rem 0" }}>{item.title}</h3>
              <p style={{ color: "#a0a0a0", fontSize: "0.95rem" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}