import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, signOut } from "./firebase";

// Local image imports using exact original filenames with spaces preserved
import heroBgImg from "./hero bg image.jpg";
import warConflictImg from "./War and Conflict.jpg";
import disasterResponseImg from "./Disasater Response.jpg";
import arcticIceImg from "./willian-justen-de-vasconcellos-LzwNq8DVQzs-unsplash.jpg";
import crisisMapImg from "./kelsey-knight-SFRw5GChoLA-unsplash.jpg";
import platformArchitectBgImg from "./Screenshot 2026-10-24 225302.png";

export default function AboutPage({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [activeLog, setActiveLog] = useState(0);
  const [hoveredPrinciple, setHoveredPrinciple] = useState(null);
  const [hoveredLog, setHoveredLog] = useState(null);

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

  const platformLogs = [
    {
      version: "INQUIRY 01",
      title: "General Mailbox",
      short: "For reader feedback, story tips, or general messages.",
      details: "Have a local story, a correction, or feedback on our coverage? Email us at kaurgulmehak23@gmail.com. We read every message and aim to reply within 48 hours."
    },
    {
      version: "INQUIRY 02",
      title: "Report a Crisis",
      short: "For live alerts — wars, earthquakes, floods, and disaster zones.",
      details: "Witnessing an armed conflict, seismic event, or flood in your region? Send us verified footage, coordinates, and on-ground updates so we can alert the Nowline community and route aid faster."
    },
    {
      version: "INQUIRY 03",
      title: "Start a Donation Drive",
      short: "For NGOs, volunteers, and citizens raising relief funds.",
      details: "Want to fundraise for war-affected families, earthquake relief, or flood victims? Contact us to get your verified drive featured on Nowline's relief board and reach thousands of readers."
    }
  ];

  const principles = [
    {
      num: "01",
      title: "Conflict first",
      text: "Wars, armed conflicts, and geopolitical crises are our top priority — verified on-ground reporting before the noise.",
      image: warConflictImg
    },
    {
      num: "02",
      title: "Disaster response",
      text: "Earthquakes, floods like the recent Nepal crisis, and climate emergencies — tracked live with routes to verified aid.",
      image: disasterResponseImg
    },
    {
      num: "03",
      title: "Climate & beyond",
      text: "From El Niño patterns to data leaks and long-term climate shifts — the slow crises that reshape our world.",
      image: arcticIceImg
    }
  ];

  return (
    <div style={{
      background: "transparent",
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      position: "relative",
      overflowX: "hidden"
    }}>

      <div className="background"></div>
      <div className="background-overlay"></div>
      <div className="red-glow"></div>

      {/* HERO BACKGROUND IMAGE BLEND */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "85%",
        height: "820px",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${heroBgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: 0.85,
          mixBlendMode: "screen"
        }}></div>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, #000 0%, #000 20%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.15) 80%, transparent 100%)"
        }}></div>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 65%, #000 100%)"
        }}></div>
      </div>

      <header className="navbar" style={{ position: "relative", zIndex: 10 }}>
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
            <button className="profile-btn" style={{ border: "none", background: "transparent", boxShadow: "none" }} onClick={() => navigate("/MainPage")}>{user.displayName || user.email?.split("@")[0]}</button>
            <button className="profile-btn" style={{ border: "none", background: "transparent", boxShadow: "none" }} onClick={handleLogout}>Sign Out</button>
          </div>
        ) : (
          <Link to="/" className="profile-btn" style={{ textDecoration: 'none', border: 'none', background: 'transparent', boxShadow: 'none' }}>Sign in</Link>
        )}
      </header>

      {/* HERO SECTION */}
      <section style={{ position: "relative", zIndex: 1, padding: "7rem 6% 4rem", maxWidth: "900px" }}>
        <p style={{
          color: "#e50914",
          fontWeight: "600",
          letterSpacing: "3px",
          fontSize: "0.75rem",
          marginBottom: "1.2rem"
        }}>
          ABOUT NOWLINE
        </p>
        <h1 style={{
          fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
          lineHeight: "1.15",
          fontWeight: "700",
          margin: "0 0 1.5rem 0",
          letterSpacing: "-1.5px",
          color: "#fff"
        }}>
          Wars. Quakes. Floods.<br />
          <span style={{ color: "#e50914" }}>Real-world impact.</span>
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: "#999",
          lineHeight: "1.7",
          maxWidth: "620px",
          margin: 0
        }}>
          Nowline tracks the crises shaping our world right now — armed conflicts, earthquakes, floods like the recent Nepal disaster, El Niño disruptions, and major data leaks — and connects readers to verified donation drives and relief organisations on the ground.
        </p>
      </section>

      {/* NEW: IMPACT METRICS BAR (Adds substance and credibility) */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 6% 4rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          maxWidth: "900px",
          padding: "2rem",
          borderRadius: "16px",
          background: "rgba(20, 20, 20, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)"
        }}>
          <div>
            <h4 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff", margin: "0 0 0.2rem 0" }}>24 / 7</h4>
            <p style={{ fontSize: "0.8rem", color: "#888", margin: 0, letterSpacing: "0.5px", textTransform: "uppercase" }}>Active Monitoring</p>
          </div>
          <div>
            <h4 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#e50914", margin: "0 0 0.2rem 0" }}>100%</h4>
            <p style={{ fontSize: "0.8rem", color: "#888", margin: 0, letterSpacing: "0.5px", textTransform: "uppercase" }}>Verified On-Ground Feeds</p>
          </div>
          <div>
            <h4 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff", margin: "0 0 0.2rem 0" }}>Direct</h4>
            <p style={{ fontSize: "0.8rem", color: "#888", margin: 0, letterSpacing: "0.5px", textTransform: "uppercase" }}>Aid & Donation Routing</p>
          </div>
        </div>
      </section>

      {/* REFINED LIVE CRISIS TRACKER PREVIEW SECTION */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 6% 4rem" }}>
        <div style={{
          position: "relative",
          maxWidth: "900px",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid rgba(229, 9, 20, 0.3)",
          boxShadow: "0 20px 50px rgba(229, 9, 20, 0.15)"
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${crisisMapImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
            filter: "brightness(0.9) contrast(110%)"
          }}></div>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.8) 50%, rgba(10,10,10,0.6) 100%)"
          }}></div>

          <div style={{ position: "relative", zIndex: 2, padding: "3.5rem 3rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
            <div style={{ maxWidth: "480px" }}>
              <span style={{
                fontSize: "0.75rem",
                color: "#e50914",
                fontWeight: "800",
                letterSpacing: "3px",
                display: "block",
                marginBottom: "0.75rem"
              }}>
                LIVE OPERATIONS ENGINE
              </span>
              <h3 style={{
                fontSize: "1.8rem",
                fontWeight: "900",
                color: "#fff",
                marginBottom: "1rem",
                letterSpacing: "-0.5px",
                lineHeight: "1.2"
              }}>
                Beyond the headline. Real-time crisis intelligence.
              </h3>
              <p style={{
                fontSize: "0.95px",
                color: "#aaa",
                margin: 0,
                lineHeight: "1.6"
              }}>
                Our tracking grid processes incoming live data feeds across conflict zones, natural disasters, and climate shifts, pairing them directly with actionable relief channels.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", minWidth: "200px" }}>
              <Link
                to="/live"
                className="crisis-pill"
                onClick={(e) => { if (!user) { e.preventDefault(); navigate("/"); } }}
                style={{ justifyContent: "center" }}
              >
                <span className="pill-dot"></span> LIVE DATA FEED
              </Link>

              <Link
                to="/live"
                className="crisis-pill crisis-pill-donate"
                onClick={(e) => { if (!user) { e.preventDefault(); navigate("/"); } }}
                style={{ justifyContent: "center" }}
              >
                <span className="pill-heart">❤</span> DONATE NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS (Fixed `.map` bug) */}
      <section style={{ position: "relative", zIndex: 1, padding: "2rem 6% 4rem" }}>
        <p style={{
          color: "#e50914",
          fontWeight: "600",
          letterSpacing: "3px",
          fontSize: "0.75rem",
          marginBottom: "0.5rem"
        }}>
          OUR CORE PILLARS
        </p>
        <h2 style={{
          fontSize: "1.6rem",
          fontWeight: "700",
          margin: "0 0 3rem 0",
          letterSpacing: "-0.5px"
        }}>
          How we cover the world.
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2.5rem",
          maxWidth: "1000px"
        }}>
          {principles.map((p, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredPrinciple(idx)}
              onMouseLeave={() => setHoveredPrinciple(null)}
              style={{
                position: "relative",
                cursor: "default",
                padding: "2rem 1.8rem",
                borderRadius: "50%",
                background: hoveredPrinciple === idx
                  ? "radial-gradient(circle at center, rgba(229,9,20,0.18) 0%, rgba(229,9,20,0.06) 55%, transparent 75%)"
                  : "transparent",
                boxShadow: hoveredPrinciple === idx
                  ? "0 10px 40px rgba(229,9,20,0.25)"
                  : "none",
                transition: "all 0.4s ease",
                transform: hoveredPrinciple === idx ? "scale(1.05)" : "scale(1)",
                aspectRatio: "1 / 1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)"
              }}
            >
              <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${p.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: hoveredPrinciple === idx ? 0.75 : 0,
                filter: "brightness(1.05) contrast(115%)",
                transition: "opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease",
                transform: hoveredPrinciple === idx ? "scale(1.1)" : "scale(1)",
                zIndex: 0
              }}></div>

              <div style={{
                position: "absolute",
                inset: 0,
                background: hoveredPrinciple === idx
                  ? "radial-gradient(circle at center, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.82) 100%)"
                  : "transparent",
                transition: "background 0.4s ease",
                zIndex: 1
              }}></div>

              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{
                  fontSize: hoveredPrinciple === idx ? "2.6rem" : "2rem",
                  fontWeight: "900",
                  color: "#e50914",
                  lineHeight: 1,
                  letterSpacing: "-1px",
                  marginBottom: "0.9rem",
                  fontFamily: "'Inter', sans-serif",
                  transition: "font-size 0.35s ease"
                }}>
                  {p.num}
                </div>

                <h3 style={{
                  fontSize: hoveredPrinciple === idx ? "1.15rem" : "1.05rem",
                  fontWeight: "700",
                  margin: "0 0 0.7rem 0",
                  color: "#fff",
                  textShadow: hoveredPrinciple === idx ? "0 2px 8px rgba(0,0,0,0.8)" : "none",
                  letterSpacing: "-0.2px",
                  transition: "all 0.35s ease"
                }}>{p.title}</h3>

                <p style={{
                  color: hoveredPrinciple === idx ? "#e0e0e0" : "#888",
                  textShadow: hoveredPrinciple === idx ? "0 1px 6px rgba(0,0,0,0.9)" : "none",
                  fontSize: "0.82rem",
                  lineHeight: "1.55",
                  margin: 0,
                  maxWidth: "220px",
                  transition: "color 0.35s ease"
                }}>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM & CONTACT SECTION */}
      <section style={{
        position: "relative",
        zIndex: 1,
        padding: "4rem 6%",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.68)), url(${platformArchitectBgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.48,
          pointerEvents: "none",
          zIndex: -1
        }}></div>
        <p style={{
          color: "#e50914",
          fontWeight: "600",
          letterSpacing: "3px",
          fontSize: "0.75rem",
          marginBottom: "0.5rem"
        }}>
          PLATFORM ARCHITECTS
        </p>
        <h2 style={{
          fontSize: "1.6rem",
          fontWeight: "700",
          margin: "0 0 2.5rem 0",
          letterSpacing: "-0.5px"
        }}>
          Contact our team.
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "3rem"
        }}>

          <div>
            <h4 style={{
              fontSize: "0.75rem",
              fontWeight: "700",
              letterSpacing: "2px",
              color: "#666",
              textTransform: "uppercase",
              marginBottom: "1.2rem"
            }}>Core Engineers</h4>

            {[
              { initials: "GK", name: "Gulmehakpreet Kaur", role: "Data Journalist & UI", desc: "Translates conflict and disaster data into reader-friendly interfaces." },
              { initials: "AA", name: "Arindam Arya", role: "Frontend Lead Architect", desc: "Designs responsive components & live crisis dashboards." },
              { initials: "BA", name: "Bhavin Ahuja", role: "Fullstack Platform Engineer", desc: "Handles API architecture & secure donation pipelines." }
            ].map((m, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)"
              }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(229,9,20,0.1)",
                  border: "1px solid rgba(229,9,20,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  color: "#e50914",
                  fontWeight: "700",
                  flexShrink: 0
                }}>{m.initials}</div>
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: "700", margin: 0, color: "#fff" }}>{m.name}</h3>
                  <p style={{ color: "#e50914", fontWeight: "600", fontSize: "0.68rem", margin: "0.15rem 0", letterSpacing: "0.5px" }}>{m.role}</p>
                  <p style={{ color: "#777", fontSize: "0.78rem", margin: 0, lineHeight: "1.4" }}>{m.desc}</p>
                </div>
              </div>
            ))}

            <a href="mailto:kaurgulmehak23@gmail.com" style={{
              display: "inline-block",
              marginTop: "1.5rem",
              padding: "0.7rem 1.5rem",
              background: "transparent",
              border: "1px solid rgba(229,9,20,0.5)",
              color: "#fff",
              borderRadius: "999px",
              fontSize: "0.78rem",
              fontWeight: "600",
              textDecoration: "none",
              letterSpacing: "0.3px"
            }}>
              ✉ kaurgulmehak23@gmail.com
            </a>
          </div>

          <div>
            <h4 style={{
              fontSize: "0.75rem",
              fontWeight: "700",
              letterSpacing: "2px",
              color: "#e50914",
              textTransform: "uppercase",
              marginBottom: "1.2rem"
            }}>How to reach us</h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {platformLogs.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLog(idx)}
                  onMouseEnter={() => setHoveredLog(idx)}
                  onMouseLeave={() => setHoveredLog(null)}
                  style={{
                    padding: "1rem 1.3rem",
                    borderRadius: hoveredLog === idx || activeLog === idx ? "999px" : "14px",
                    cursor: "pointer",
                    background: hoveredLog === idx || activeLog === idx
                      ? "rgba(229,9,20,0.06)"
                      : "transparent",
                    boxShadow: hoveredLog === idx || activeLog === idx
                      ? "0 6px 22px rgba(229,9,20,0.14)"
                      : "none",
                    transition: "all 0.35s ease",
                    transform: hoveredLog === idx ? "translateY(-2px)" : "none"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{
                        fontSize: "0.65rem",
                        fontWeight: "700",
                        color: "#e50914",
                        letterSpacing: "1px"
                      }}>{m.version}</span>
                      <h5 style={{
                        fontSize: "0.9rem",
                        fontWeight: "700",
                        margin: "0.3rem 0 0.15rem 0",
                        color: "#e50914"
                      }}>{m.title}</h5>
                      <p style={{
                        color: "#888",
                        fontSize: "0.78rem",
                        margin: 0,
                        lineHeight: "1.5"
                      }}>{m.short}</p>
                    </div>
                    <span style={{
                      fontSize: "0.9rem",
                      color: activeLog === idx ? "#e50914" : "#555",
                      transition: "color 0.2s ease",
                      flexShrink: 0
                    }}>{activeLog === idx ? "−" : "+"}</span>
                  </div>
                  {activeLog === idx && (
                    <p style={{
                      marginTop: "0.8rem",
                      paddingTop: "0.8rem",
                      borderTop: "1px solid rgba(229,9,20,0.15)",
                      color: "#999",
                      fontSize: "0.75rem",
                      lineHeight: "1.55"
                    }}>{m.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{
        position: "relative",
        zIndex: 1,
        padding: "4rem 6%",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
          maxWidth: "1100px"
        }}>
          <div>
            <p style={{
              color: "#e50914",
              fontWeight: "600",
              letterSpacing: "3px",
              fontSize: "0.7rem",
              marginBottom: "0.4rem"
            }}>DONATE · REPORT · RESPOND</p>
            <h2 style={{
              fontSize: "1.4rem",
              fontWeight: "700",
              margin: 0,
              lineHeight: "1.3",
              color: "#fff"
            }}>
              Help us turn headlines into<br />real-world relief.
            </h2>
          </div>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "#e50914",
              color: "#fff",
              border: "none",
              padding: "0.9rem 2rem",
              fontWeight: "700",
              cursor: "pointer",
              letterSpacing: "0.5px",
              borderRadius: "999px",
              fontSize: "0.85rem"
            }}
          >
            {user ? "Access Briefing Room →" : "Join Nowline →"}
          </button>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(1); }
          75% { transform: scale(1.2); }
        }

        .crisis-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #e50914;
          background: rgba(229, 9, 20, 0.12);
          border: 1px solid #e50914;
          padding: 0.5rem 1.2rem;
          border-radius: 999px;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease,
                      transform 0.3s ease, box-shadow 0.3s ease;
        }
        .crisis-pill:hover,
        .crisis-pill:focus-visible {
          background: #e50914;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(229, 9, 20, 0.45);
          outline: none;
        }
        .crisis-pill:active {
          transform: translateY(0) scale(0.97);
        }

        .pill-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse 1.4s ease-in-out infinite;
        }
        .pill-heart {
          display: inline-block;
        }
        .crisis-pill-donate:hover .pill-heart,
        .crisis-pill-donate:focus-visible .pill-heart {
          animation: heartbeat 0.9s ease-in-out infinite;
        }
      `}</style>

      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="footer-socials">
                <a href="#x" aria-label="X">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#youtube" aria-label="YouTube">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#instagram" aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#facebook" aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#discord" aria-label="Discord">
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