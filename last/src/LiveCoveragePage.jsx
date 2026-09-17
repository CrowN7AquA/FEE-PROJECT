import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, signOut } from "./firebase";

export default function LiveCoveragePage({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.topics')) setTopicsOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      if (setUser) setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }

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
        <Link to={user ? "/MainPage" : "/"} className="logo">
          <span className="logo-box">N</span> NOWLINE
        </Link>
        <nav>
          {user && (
            <div className="topics" onMouseEnter={() => setTopicsOpen(true)} onMouseLeave={() => setTopicsOpen(false)}>
              <button className="topics-btn">TOPICS <span className="caret">▾</span></button>
              {topicsOpen && (
                <div className="topics-menu">
                  {["Climate","Historical","Geographical","Disasters","World","Politics","Science","Economy"].map(t => (
                    <a key={t} href={`#${t.toLowerCase()}`}>{t}</a>
                  ))}
                </div>
              )}
            </div>
          )}
          <Link
            to="/MainPage"
            className={currentPath === "/MainPage" ? "nav-active" : ""}
            onClick={(e) => { if (!user) { e.preventDefault(); navigate("/"); } }}
          >STORIES</Link>
          <Link to="/about" className={currentPath === "/about" ? "nav-active" : ""}>ABOUT</Link>
          <Link
            to="/live"
            className={`live ${currentPath === "/live" ? "nav-active" : ""}`}
            onClick={(e) => { if (!user) { e.preventDefault(); navigate("/"); } }}
          ><span></span> LIVE</Link>
        </nav>
        {user ? (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button className="profile-btn" onClick={() => navigate("/MainPage")}>{user.displayName || user.email?.split("@")[0]}</button>
            <button className="profile-btn" onClick={handleLogout}>Sign Out</button>
          </div>
        ) : (
          <Link to="/" className="profile-btn" style={{ textDecoration: 'none' }}>Sign in</Link>
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

      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="footer-socials">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                </a>
            </div>

            <div className="footer-logo">
                <span className="logo-box">N</span>
                <span>NOWLINE</span>
            </div>

            <p className="footer-copy">
                © 2026 Nowline Media. All rights reserved. Nowline, the Nowline logo,
                and all associated marks are trademarks of Nowline Media.
            </p>

            <div className="footer-links">
                <Link to="/privacy" target="_blank" rel="noopener noreferrer">PRIVACY NOTICE</Link>
                <Link to="/terms" target="_blank" rel="noopener noreferrer">TERMS OF SERVICE</Link>
                <Link to="/support" target="_blank" rel="noopener noreferrer">SUPPORT</Link>
                <Link to="/cookies" target="_blank" rel="noopener noreferrer">COOKIE PREFERENCES</Link>
            </div>
        </footer>
    );
}