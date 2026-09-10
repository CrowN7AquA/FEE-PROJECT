import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AboutPage({ user }) {
  const navigate = useNavigate();

  // Upgraded each principle with its own custom, high-resolution visual journalism Unsplash image
  const principles = [
    {
      num: "01",
      title: "CONTEXT OVER VELOCITY",
      text: "We prioritize deep architectural understanding over breaking news noise. Every report connects immediate events to long-term patterns.",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" // Deep network context
    },
    {
      num: "02",
      title: "RIGOROUS VERIFICATION",
      text: "Zero editorial bias or speculative outrage. Every briefing uses verified data sources, satellite imagery, and primary research.",
      bgImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80" // Deep analysis radar/focus
    },
    {
      num: "03",
      title: "UNCLUTTERED CLARITY",
      text: "No popups, ad-tech bloat, or engagement traps. Designed for focused, high-value consumption.",
      bgImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" // Sleek minimalist design screen
    }
  ];

  return (
    <div className="landing" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>
      {/* Dynamic Background Mesh */}
      <div className="background"></div>
      <div className="background-overlay" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.6) 0%, #0a0a0a 100%)" }}></div>
      <div className="red-glow"></div>

      {/* Standard Header */}
      <header className="navbar">
        <Link to={user ? "/MainPage" : "/"} className="logo">
          <span className="logo-box">N</span> NOWLINE
        </Link>
        <nav>
          {/* Changed link target from /feed to /MainPage to keep routing fully connected */}
          <Link to="/MainPage">STORIES</Link>
          <Link to="/about" className="active">ABOUT</Link>
          <Link to="/live">
            <span className="live"><span></span> LIVE</span>
          </Link>
        </nav>
        {user ? (
          <button className="profile-btn" onClick={() => navigate("/MainPage")} style={{ cursor: "pointer" }}>
            {user.displayName || user.email?.split("@")[0]}
          </button>
        ) : (
          <Link to="/" className="btn-signin">Sign in</Link>
        )}
      </header>

      {/* Hero Header */}
      <section className="hero" style={{ padding: "8rem 8% 4rem 8%" }}>
        <div className="hero-content" style={{ maxWidth: "900px" }}>
          <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#e50914", fontWeight: "700", letterSpacing: "2px", fontSize: "0.85rem" }}>
            <span style={{ display: "inline-block", width: "12px", height: "1.5px", background: "#e50914" }}></span> 
            MANIFESTO / EDITORIAL STANDARD
          </div>
          <h1 style={{ fontSize: "4.5rem", lineHeight: "1.05", fontWeight: "900", marginTop: "1.5rem", letterSpacing: "-1px" }}>
            JOURNALISM <br />
            <span style={{ color: "#e50914" }}>BUILT FOR CONTEXT,</span> <br />
            NOT CHAOS.
          </h1>
          <p style={{ marginTop: "2rem", fontSize: "1.25rem", color: "#b3b3b3", lineHeight: "1.6", maxWidth: "700px" }}>
            NOWLINE was established to dismantle algorithmic sensationalism. We construct multi-layered visual briefings on modern geopolitics, active climate shifts, and socioeconomic movements.
          </p>
        </div>
      </section>

      {/* Editorial Principles Grid */}
      <section className="context" id="about" style={{ padding: "6rem 8%" }}>
        <span style={{ color: "#e50914", fontWeight: "700", letterSpacing: "2px", fontSize: "0.85rem" }}>OUR CORE PILLARS</span>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginTop: "0.5rem", marginBottom: "3rem" }}>How we unpack the world.</h2>
        
        <div className="context-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {principles.map((p, idx) => (
            <div 
              className="context-card" 
              key={idx} 
              style={{
                background: "rgba(20, 20, 20, 0.6)",
                border: "1px solid #222",
                borderRadius: "12px",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)"
              }}
            >
              {/* Refined Image Background Overlay */}
              <div
                className="context-bg"
                style={{
                  backgroundImage: `url('${p.bgImage}')`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0.15,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 0,
                  transition: "opacity 0.3s ease"
                }}
              ></div>
              
              <div style={{ position: "relative", zIndex: 1 }}>
                <b style={{ display: "block", fontSize: "3rem", color: "#e50914", fontWeight: "900", marginBottom: "1rem" }}>{p.num}</b>
                <h3 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: "1rem", letterSpacing: "1px" }}>{p.title}</h3>
                <p style={{ color: "#a0a0a0", fontSize: "1rem", lineHeight: "1.6" }}>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{ padding: "6rem 8%", background: "linear-gradient(90deg, #0d0d0d 0%, #050505 100%)", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2.5rem" }}>
          <div style={{ maxWidth: "600px" }}>
            <span style={{ color: "#e50914", fontWeight: "700", letterSpacing: "2px", fontSize: "0.85rem" }}>INDEPENDENT JOURNALISM</span>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginTop: "0.5rem", lineHeight: "1.2" }}>Ready to experience conflict analysis in high resolution?</h2>
          </div>
          <button
            onClick={() => navigate(user ? "/MainPage" : "/")}
            style={{
              background: "#e50914",
              color: "#fff",
              border: "none",
              padding: "1.2rem 2.5rem",
              fontWeight: "800",
              cursor: "pointer",
              letterSpacing: "1.5px",
              borderRadius: "4px",
              boxShadow: "0 4px 20px rgba(229, 9, 20, 0.4)",
              transition: "transform 0.2s ease, background 0.2s ease"
            }}
          >
            {user ? "ACCESS BRIEFING ROOM →" : "JOIN NOWLINE →"}
          </button>
        </div>
      </section>
    </div>
  );
}