import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AboutPage({ user }) {
  const navigate = useNavigate();

  // State to track which Contact Inquiry box is currently clicked/expanded
  const [activeLog, setActiveLog] = useState(0);

  // Shortened, 3-line maximum Layman Contact Inquiry Options
  const platformLogs = [
    {
      version: "INQUIRY 01",
      title: "General Mailbox",
      short: "For reader feedback, suggestions, or general messages.",
      details: "Have ideas on how to improve our platform or briefings? Email us at kaurgulmehak23@gmail.com. We read all messages and aim to reply within 48 hours."
    },
    {
      version: "INQUIRY 02",
      title: "Confidential Tips",
      short: "For secure story submissions and regional alerts.",
      details: "If you have secure story leads, raw news datasets, or evidence to share, write to our editors. We protect your anonymity under strict journalistic guidelines."
    },
    {
      version: "INQUIRY 03",
      title: "Join the Newsroom",
      short: "For student developers and designers looking to build with us.",
      details: "Want to build new features for SourcePoint? We are always open to collaborations. Contact us to get access to our GitHub repository branch and start coding!"
    }
  ];

  const principles = [
    {
      num: "01",
      title: "CONTEXT OVER VELOCITY",
      text: "We prioritize deep architectural understanding over breaking news noise. Every report connects immediate events to long-term patterns.",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    },
    {
      num: "02",
      title: "RIGOROUS VERIFICATION",
      text: "Zero editorial bias or speculative outrage. Every briefing uses verified data sources, satellite imagery, and primary research.",
      bgImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80"
    },
    {
      num: "03",
      title: "UNCLUTTERED CLARITY",
      text: "No popups, ad-tech bloat, or engagement traps. Designed for focused, high-value consumption.",
      bgImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="landing" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif" }}>
      {/* Dynamic Background Mesh */}
      <div className="background"></div>
      <div className="background-overlay" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.6) 0%, #0a0a0a 100%)" }}></div>
      <div className="red-glow"></div>

      {/* Standard Header */}
      <header className="navbar">
        <Link to={user ? "/MainPage" : "/"} className="logo">
          <span className="logo-box">S</span> SourcePoint
        </Link>
        <nav>
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

      {/* Hero Header - STRICTLY SIDE-BY-SIDE DESIGN */}
      <section className="hero" style={{ padding: "6rem 8% 3.5rem 8%" }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "4rem",
          flexWrap: "nowrap"
        }}>
          {/* Left Column: Bold Tagline & Text */}
          <div className="hero-content" style={{ flex: "1.3 1 0%", maxWidth: "700px" }}>
            <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#e50914", fontWeight: "700", letterSpacing: "2px", fontSize: "0.85rem" }}>
              <span style={{ display: "inline-block", width: "12px", height: "1.5px", background: "#e50914" }}></span> 
              MANIFESTO / EDITORIAL STANDARD
            </div>
            <h1 style={{ fontSize: "4.3rem", lineHeight: "1.05", fontWeight: "900", marginTop: "1.5rem", letterSpacing: "-1px" }}>
              JOURNALISM <br />
              <span style={{ color: "#e50914" }}>BUILT FOR CONTEXT,</span> <br />
              NOT CHAOS.
            </h1>
            <p style={{ marginTop: "2rem", fontSize: "1.2rem", color: "#b3b3b3", lineHeight: "1.6" }}>
              SourcePoint was established to dismantle algorithmic sensationalism. We construct multi-layered visual briefings on modern geopolitics, active climate shifts, and socioeconomic movements.
            </p>
          </div>

          {/* Right Column: Expanded Visual Telemetry Node Card */}
          <div style={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #1a1a1a",
            boxShadow: "0 15px 40px rgba(229, 9, 20, 0.12)",
            height: "360px",
            flex: "1 1 0%",
            minWidth: "360px",
            maxWidth: "480px",
            background: "rgba(20, 20, 20, 0.4)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.18
            }}></div>
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(10,10,10,0.1) 0%, #0a0a0a 100%)"
            }}></div>

            <div style={{ position: "relative", zIndex: 2, padding: "2.5rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "#e50914", fontWeight: "800", letterSpacing: "3px", display: "block", marginBottom: "0.5rem" }}>
                GLOBAL OPERATIONS
              </span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#fff", marginBottom: "0.75rem", letterSpacing: "0.5px" }}>
                Active Telemetry Monitoring
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#888", maxWidth: "320px", margin: "0 auto 1.5rem auto", lineHeight: "1.5" }}>
                Synthesizing real-time planetary data and regional satellite imagery into curated context streams.
              </p>
              <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
                <span style={{ fontSize: "0.7rem", background: "rgba(229, 9, 20, 0.12)", border: "1px solid #e50914", color: "#e50914", padding: "0.4rem 1rem", borderRadius: "20px", fontWeight: "700" }}>
                  ● LIVE DATA FEED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Principles Grid - COMPACTED PADDING */}
      <section className="context" id="about" style={{ padding: "2.5rem 8%" }}>
        <span style={{ color: "#e50914", fontWeight: "700", letterSpacing: "2px", fontSize: "0.8rem" }}>OUR CORE PILLARS</span>
        <h2 style={{ fontSize: "2rem", fontWeight: "800", marginTop: "0.25rem", marginBottom: "2rem" }}>How we unpack the world.</h2>
        
        <div className="context-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {principles.map((p, idx) => (
            <div 
              className="context-card" 
              key={idx} 
              style={{
                background: "rgba(20, 20, 20, 0.6)",
                border: "1px solid #1a1a1a",
                borderRadius: "10px",
                padding: "2rem 1.8rem",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div
                className="context-bg"
                style={{
                  backgroundImage: `url('${p.bgImage}')`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0.1,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 0
                }}
              ></div>
              
              <div style={{ position: "relative", zIndex: 1 }}>
                <b style={{ display: "block", fontSize: "2.5rem", color: "#e50914", fontWeight: "900", marginBottom: "0.5rem" }}>{p.num}</b>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "0.5rem", letterSpacing: "1px" }}>{p.title}</h3>
                <p style={{ color: "#a0a0a0", fontSize: "0.9rem", lineHeight: "1.5" }}>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- THE EDITORIAL ENGINEERING DESK & TIMELINE (SIDE-BY-SIDE INTEGRATION) --- */}
      <section style={{ padding: "3.5rem 8%", background: "#0c0c0c", borderTop: "1px solid #161616" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ color: "#e50914", fontWeight: "700", letterSpacing: "2px", fontSize: "0.8rem" }}>PLATFORM ARCHITECTS</span>
            <h2 style={{ fontSize: "2rem", fontWeight: "800", marginTop: "0.25rem" }}>Contact Our Team</h2>
          </div>

          {/* Master Dashboard Grid - Side-By-Side Design */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
            alignItems: "start"
          }}>
            
            {/* LEFT COLUMN: Team Members with Swapped Roles */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: "800", letterSpacing: "2px", color: "#fff", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                CORE ENGINEERS
              </h4>

              {/* Member 1: Gulmehakpreet Kaur - DATA JOURNALIST & UI */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                background: "rgba(255, 255, 255, 0.01)",
                border: "1px solid #161616",
                borderRadius: "8px",
                padding: "1rem 1.2rem"
              }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "1px solid #e50914",
                  background: "#161616",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  color: "#e50914",
                  fontWeight: "900",
                  flexShrink: 0
                }}>
                  GK
                </div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#fff", margin: 0 }}>Gulmehakpreet Kaur</h3>
                  <p style={{ color: "#e50914", fontWeight: "700", fontSize: "0.7rem", letterSpacing: "0.5px", margin: "0.1rem 0" }}>DATA JOURNALIST & UI</p>
                  <p style={{ color: "#888", fontSize: "0.8rem", margin: 0, lineHeight: "1.3" }}>Translates visual geopolitical data maps to interfaces.</p>
                </div>
              </div>

              {/* Member 2: Arindam Arya - FRONTEND LEAD ARCHITECT */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                background: "rgba(255, 255, 255, 0.01)",
                border: "1px solid #161616",
                borderRadius: "8px",
                padding: "1rem 1.2rem"
              }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "1px solid #e50914",
                  background: "#161616",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  color: "#e50914",
                  fontWeight: "900",
                  flexShrink: 0
                }}>
                  AA
                </div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#fff", margin: 0 }}>Arindam Arya</h3>
                  <p style={{ color: "#e50914", fontWeight: "700", fontSize: "0.7rem", letterSpacing: "0.5px", margin: "0.1rem 0" }}>FRONTEND LEAD ARCHITECT</p>
                  <p style={{ color: "#888", fontSize: "0.8rem", margin: 0, lineHeight: "1.3" }}>Designs responsive components & system layouts.</p>
                </div>
              </div>

              {/* Member 3: Bhavin Ahuja - FULLSTACK PLATFORM ENGINEER */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                background: "rgba(255, 255, 255, 0.01)",
                border: "1px solid #161616",
                borderRadius: "8px",
                padding: "1rem 1.2rem"
              }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "1px solid #e50914",
                  background: "#161616",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  color: "#e50914",
                  fontWeight: "900",
                  flexShrink: 0
                }}>
                  BA
                </div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#fff", margin: 0 }}>Bhavin Ahuja</h3>
                  <p style={{ color: "#e50914", fontWeight: "700", fontSize: "0.7rem", letterSpacing: "0.5px", margin: "0.1rem 0" }}>FULLSTACK PLATFORM ENGINEER</p>
                  <p style={{ color: "#888", fontSize: "0.8rem", margin: 0, lineHeight: "1.3" }}>Handles API architecture & secure authentication pipelines.</p>
                </div>
              </div>

              {/* Email Us Directly button below members */}
              <div style={{ marginTop: "1rem" }}>
                <a href="mailto:kaurgulmehak23@gmail.com" style={{
                  display: "block",
                  padding: "0.8rem",
                  textAlign: "center",
                  background: "transparent",
                  border: "1px solid #e50914",
                  color: "#fff",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: "800",
                  letterSpacing: "0.5px",
                  textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(229, 9, 20, 0.15)",
                  transition: "all 0.2s ease"
                }}>
                  ✉ EMAIL US DIRECTLY: kaurgulmehak23@gmail.com
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Topic Selection Panel */}
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: "800", letterSpacing: "2px", color: "#fff", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                HOW TO REACH US
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {platformLogs.map((m, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveLog(idx)}
                    style={{
                      background: activeLog === idx ? "rgba(229, 9, 20, 0.02)" : "transparent",
                      border: activeLog === idx ? "1px solid #e50914" : "1px solid #161616",
                      borderRadius: "8px",
                      padding: "1rem 1.2rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ 
                        fontSize: "0.7rem", 
                        fontWeight: "800", 
                        color: activeLog === idx ? "#e50914" : "#555",
                        letterSpacing: "0.5px"
                      }}>
                        {m.version}
                      </span>
                      <span style={{ fontSize: "0.7rem", color: activeLog === idx ? "#e50914" : "#444" }}>
                        {activeLog === idx ? "▼" : "▶"}
                      </span>
                    </div>

                    <h5 style={{ fontSize: "0.95rem", fontWeight: "800", margin: "0.2rem 0", color: "#fff" }}>
                      {m.title}
                    </h5>
                    
                    <p style={{ color: "#a0a0a0", fontSize: "0.8rem", margin: 0, lineHeight: "1.4" }}>
                      {m.short}
                    </p>

                    {activeLog === idx && (
                      <p style={{ 
                        marginTop: "0.6rem", 
                        paddingTop: "0.6rem", 
                        borderTop: "1px dashed rgba(229, 9, 20, 0.2)", 
                        color: "#999", 
                        fontSize: "0.75rem", 
                        lineHeight: "1.4" 
                      }}>
                        {m.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Banner - HIGHLY COMPRESSED */}
      <section style={{ padding: "3rem 8%", background: "linear-gradient(90deg, #0d0d0d 0%, #050505 100%)", borderTop: "1px solid #161616", borderBottom: "1px solid #161616" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ maxWidth: "650px" }}>
            <span style={{ color: "#e50914", fontWeight: "700", letterSpacing: "2px", fontSize: "0.75rem" }}>INDEPENDENT JOURNALISM</span>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", marginTop: "0.25rem", lineHeight: "1.2" }}>Ready to experience conflict analysis in high resolution?</h2>
          </div>
          <button
            onClick={() => navigate(user ? "/MainPage" : "/")}
            style={{
              background: "#e50914",
              color: "#fff",
              border: "none",
              padding: "1rem 2rem",
              fontWeight: "800",
              cursor: "pointer",
              letterSpacing: "1px",
              borderRadius: "4px",
              boxShadow: "0 4px 15px rgba(229, 9, 20, 0.3)",
              transition: "transform 0.2s ease, background 0.2s ease"
            }}
          >
            {user ? "ACCESS BRIEFING ROOM →" : "JOIN SourcePoint →"}
          </button>
        </div>
      </section>
    </div>
  );
}