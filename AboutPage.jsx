import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AboutPage({ user }) {
  const navigate = useNavigate();
  const [activeLog, setActiveLog] = useState(0);
  const [hoveredPrinciple, setHoveredPrinciple] = useState(null);
  const [hoveredLog, setHoveredLog] = useState(null);

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
      text: "Wars, armed conflicts, and geopolitical crises are our top priority — verified on-ground reporting before the noise."
    },
    {
      num: "02",
      title: "Disaster response",
      text: "Earthquakes, floods like the recent Nepal crisis, and climate emergencies — tracked live with routes to verified aid."
    },
    {
      num: "03",
      title: "Climate & beyond",
      text: "From El Niño patterns to data leaks and long-term climate shifts — the slow crises that reshape our world."
    }
  ];

  return (
    <div style={{
      background: "#0a0a0a",
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      position: "relative"
    }}>

      {/* Fixed Background Image */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.14,
        zIndex: 0,
        pointerEvents: "none"
      }}></div>

      <div style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.95) 65%, #0a0a0a 100%)",
        zIndex: 0,
        pointerEvents: "none"
      }}></div>

      {/* Navbar */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 6%",
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        <Link to={user ? "/MainPage" : "/"} style={{
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
          textDecoration: "none",
          color: "#fff",
          fontWeight: "700",
          fontSize: "1.1rem",
          letterSpacing: "-0.3px"
        }}>
          <span style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            border: "1.5px solid rgba(255,255,255,0.35)",
            borderRadius: "4px",
            transform: "skewX(-10deg)",
            background: "transparent"
          }}>
            <span style={{
              transform: "skewX(10deg)",
              color: "#e50914",
              fontWeight: "900",
              fontSize: "1rem",
              lineHeight: 1
            }}>N</span>
          </span>
          Nowline
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link to="/MainPage" style={{
            color: "#888",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: "600",
            letterSpacing: "0.5px"
          }}>STORIES</Link>
          <Link to="/about" style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: "600",
            letterSpacing: "0.5px",
            borderBottom: "2px solid #e50914",
            paddingBottom: "2px"
          }}>ABOUT</Link>
          <Link to="/live" style={{
            color: "#888",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: "600",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem"
          }}>
            <span style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              background: "#e50914",
              borderRadius: "50%",
              animation: "pulse 1.5s infinite"
            }}></span>
            LIVE
          </Link>
        </nav>

        {user ? (
          <button
            onClick={() => navigate("/MainPage")}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              padding: "0.5rem 1.2rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            {user.displayName || user.email?.split("@")[0]}
          </button>
        ) : (
          <Link to="/" style={{
            background: "#e50914",
            color: "#fff",
            padding: "0.5rem 1.4rem",
            borderRadius: "999px",
            fontSize: "0.8rem",
            fontWeight: "700",
            textDecoration: "none",
            letterSpacing: "0.3px"
          }}>Sign in</Link>
        )}
      </header>

      {/* Hero Section */}
      <section style={{ position: "relative", zIndex: 1, padding: "7rem 6% 5rem", maxWidth: "900px" }}>
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

      {/* Live Crisis Tracker Card */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 6% 4rem" }}>
        <div style={{
          position: "relative",
          maxWidth: "720px",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid #1a1a1a",
          boxShadow: "0 15px 40px rgba(229, 9, 20, 0.12)"
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.25
          }}></div>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, #0a0a0a 100%)"
          }}></div>

          <div style={{ position: "relative", zIndex: 2, padding: "3.5rem 2.5rem", textAlign: "center" }}>
            <span style={{
              fontSize: "0.75rem",
              color: "#e50914",
              fontWeight: "800",
              letterSpacing: "3px",
              display: "block",
              marginBottom: "0.75rem"
            }}>
              LIVE CRISIS TRACKER
            </span>
            <h3 style={{
              fontSize: "1.7rem",
              fontWeight: "900",
              color: "#fff",
              marginBottom: "1rem",
              letterSpacing: "0.3px",
              lineHeight: "1.25"
            }}>
              Wars · Earthquakes · Floods<br />· El Niño · Data Leaks
            </h3>
            <p style={{
              fontSize: "0.95rem",
              color: "#999",
              maxWidth: "460px",
              margin: "0 auto 1.75rem auto",
              lineHeight: "1.6"
            }}>
              Real-time monitoring of armed conflicts, seismic events, floods, and climate anomalies — updated with verified on-ground reports.
            </p>
            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap" }}>
              <span style={{
                fontSize: "0.75rem",
                background: "rgba(229, 9, 20, 0.12)",
                border: "1px solid #e50914",
                color: "#e50914",
                padding: "0.5rem 1.2rem",
                borderRadius: "999px",
                fontWeight: "700",
                letterSpacing: "0.5px"
              }}>
                ● LIVE DATA FEED
              </span>
              <span style={{
                fontSize: "0.75rem",
                background: "rgba(229, 9, 20, 0.12)",
                border: "1px solid #e50914",
                color: "#e50914",
                padding: "0.5rem 1.2rem",
                borderRadius: "999px",
                fontWeight: "700",
                letterSpacing: "0.5px"
              }}>
                ❤ DONATE NOW
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section style={{ position: "relative", zIndex: 1, padding: "4rem 6%" }}>
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
          gap: "2.5rem"
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
                  ? "radial-gradient(circle at center, rgba(229,9,20,0.14) 0%, rgba(229,9,20,0.04) 55%, transparent 75%)"
                  : "transparent",
                boxShadow: hoveredPrinciple === idx
                  ? "0 10px 40px rgba(229,9,20,0.18)"
                  : "none",
                transition: "all 0.4s ease",
                transform: hoveredPrinciple === idx ? "scale(1.04)" : "scale(1)",
                aspectRatio: "1 / 1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
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
                color: hoveredPrinciple === idx ? "#e50914" : "#fff",
                letterSpacing: "-0.2px",
                transition: "all 0.35s ease"
              }}>{p.title}</h3>

              <p style={{
                color: hoveredPrinciple === idx ? "#b3b3b3" : "#888",
                fontSize: "0.82rem",
                lineHeight: "1.55",
                margin: 0,
                maxWidth: "220px",
                transition: "color 0.35s ease"
              }}>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team & Contact Section */}
      <section style={{
        position: "relative",
        zIndex: 1,
        padding: "4rem 6%",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
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

      {/* CTA Section */}
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
            onClick={() => navigate(user ? "/MainPage" : "/")}
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
      `}</style>
    </div>
  );
}