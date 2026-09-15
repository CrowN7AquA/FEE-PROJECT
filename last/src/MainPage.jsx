import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, signOut } from './firebase';

const LETTERS = [
  { char: 'N', rest: 'EWS',    desc: 'We are here to help people. We take donations and inform about climate, earthquakes, tsunamis, hurricanes, and all that.' },
  { char: 'O', rest: 'RBIT',   desc: 'Global coverage. From wars to climate shifts, we track the crises shaping our world.' },
  { char: 'W', rest: 'ORK',    desc: 'Work for nation. We connect readers to verified relief efforts and donation drives on the ground.' },
  { char: 'L', rest: 'IVE',    desc: 'Live coverage. Real-time tracking of armed conflicts, seismic events, and floods.' },
  { char: 'I', rest: 'NFORM',  desc: 'Inform. We deliver verified on-ground reports, data leaks, and climate intelligence.' },
  { char: 'N', rest: 'ATURE',  desc: "Nature's fury. Earthquakes, tsunamis, hurricanes, and the climate anomalies reshaping our planet." },
  { char: 'E', rest: 'ARTH',   desc: 'Earth impact. Understanding how natural disasters and human conflicts reshape our world.' }
];

function MainPage({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [topicsOpen, setTopicsOpen] = useState(false);

  const [introDone, setIntroDone] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // Grace period on mouseleave — prevents any residual flicker
  const leaveTimer = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 150);
    return () => clearTimeout(t);
  }, []);

  // rAF scroll tracking
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        raf = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll reveal for story sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.15 }
    );
    const els = document.querySelectorAll('.story-section');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  // Close topics dropdown when clicking outside
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

  // Title is locked (unclickable) once scrolled
  const isLocked = scrollY > 5;
  const isHovering = hoveredIdx !== null && !isLocked;

  const handleLetterEnter = (i) => {
    if (isLocked) return;
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHoveredIdx(i);
  };

  const handleTitleLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      setHoveredIdx(null);
      leaveTimer.current = null;
    }, 200);
  };

  // Shatter-on-scroll: only applies when not hovering and not locked
    const getLetterStyle = (i) => {
    if (isHovering) {
      return { transform: 'none', opacity: 1 };
    }
    const dx  = scrollY * (i - 3) * 0.15;
    const dy  = scrollY * (i % 2 === 0 ? 0.15 : -0.15);
    const rot = scrollY * (i - 3) * 0.08;
    return {
      transform: `translate3d(${dx}px, ${dy}px, 0) rotate(${rot}deg)`,
      opacity: Math.max(0, 1 - scrollY / 400)
    };
  };

  const sections = [
    { id: "climate",      tag: "Climate",      title: "Global Climate Summit 2025: A Turning Point",         text: "World leaders have reached a landmark agreement on emissions reduction. Developing nations will receive new support for green energy.", video: "https://www.youtube.com/embed/VIDEO_ID_1" },
    { id: "historical",   tag: "Historical",   title: "Lessons From the Past: How History Shapes Today",     text: "From ancient civilizations to modern conflicts, understanding history helps us make sense of the world we live in today.",       video: "https://www.youtube.com/embed/VIDEO_ID_2" },
    { id: "geographical", tag: "Geographical", title: "Mapping the World: Landscapes That Define Nations",   text: "Geography shapes culture, economy and conflict. Explore how natural borders and resources influence global events.",           video: "https://www.youtube.com/embed/VIDEO_ID_3" },
    { id: "disasters",    tag: "Disasters",    title: "When Nature Strikes: Preparedness and Response",       text: "Earthquakes, floods and wildfires are increasing in frequency. Learn how communities prepare and recover from disasters.",      video: "https://www.youtube.com/embed/VIDEO_ID_4" },
    { id: "world",        tag: "World",        title: "Global Headlines: Stories Shaping Our World",         text: "From diplomatic breakthroughs to regional tensions, we cover the events that matter most across every continent.",           video: "https://www.youtube.com/embed/VIDEO_ID_5" },
    { id: "politics",     tag: "Politics",     title: "Power and Policy: Inside the Decisions That Matter",  text: "Elections, reforms and debates — we break down the political stories that affect everyday life around the globe.",           video: "https://www.youtube.com/embed/VIDEO_ID_6" },
    { id: "science",      tag: "Science",      title: "Discovery and Innovation: The Frontiers of Knowledge", text: "From space exploration to medical breakthroughs, science continues to reshape how we understand the universe.",                 video: "https://www.youtube.com/embed/VIDEO_ID_7" },
    { id: "economy",      tag: "Economy",      title: "Markets and Money: Understanding the Global Economy", text: "Inflation, trade and jobs — we explain the economic forces that shape your daily life in simple, clear language.",             video: "https://www.youtube.com/embed/VIDEO_ID_8" }
  ];

  return (
    <div className="landing">
      <div className="background"></div>
      <div className="background-overlay"></div>
      <div className="red-glow"></div>

      {/* ---------- Navbar ---------- */}
      <header className="navbar">
        <Link to={user ? "/MainPage" : "/"} className="logo">
          <span className="logo-box">N</span>
          <span style={{ opacity: introDone ? 0 : 1, transition: 'opacity 0.8s ease' }}>
            NOWLINE
          </span>
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
          <Link to="/MainPage" className={currentPath === "/MainPage" ? "nav-active" : ""}>STORIES</Link>
          <Link to="/about"     className={currentPath === "/about"     ? "nav-active" : ""}>ABOUT</Link>
          <Link to="/live"      className={`live ${currentPath === "/live" ? "nav-active" : ""}`}><span></span> LIVE</Link>
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

      {/* ---------- Cinematic Hero ---------- */}
      <section
        className="hero main-hero"
        style={{
          gridTemplateColumns: "1fr",
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1
          className={`hero-logo-reveal ${introDone ? "active" : ""} ${isLocked ? "locked" : ""}`}
          onMouseLeave={handleTitleLeave}
        >
          {LETTERS.map((l, i) => {
            const isOtherHovered = isHovering && hoveredIdx !== i;
            const isThisHovered = isHovering && hoveredIdx === i;
            const style = getLetterStyle(i);

            return (
              <span
                key={i}
                className={`letter-block ${isOtherHovered ? "collapsed" : ""} ${isThisHovered ? "expanded" : ""}`}
                onMouseEnter={() => handleLetterEnter(i)}
                style={{
                  transform: style.transform,
                  opacity: style.opacity
                }}
              >
                <span className="letter-char">{l.char}</span>
                <span className="letter-rest">{l.rest}</span>
              </span>
            );
          })}
        </h1>

        {isHovering && (
          <p key={hoveredIdx} className="letter-desc">
            {LETTERS[hoveredIdx].desc}
          </p>
        )}

        <p
          style={{
            position: "absolute",
            top: "70vh",
            maxWidth: "600px",
            textAlign: "center",
            fontSize: "1.05rem",
            lineHeight: "1.8",
            color: "rgba(255,255,255,0.5)",
            opacity: introDone && !isLocked && !isHovering ? 1 : 0,
            transform: `translateY(${introDone ? 0 : 20}px) translateY(-${scrollY * 0.4}px)`,
            transition: "opacity 0.6s ease, transform 1s cubic-bezier(0.19,1,0.22,1)",
            pointerEvents: "none",
            zIndex: 5
          }}
        >
          A cinematic current-affairs platform for understanding climate change, protests,
          education controversies, historical events, geography, ecology and world conflicts.
        </p>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            opacity: introDone && !isLocked && !isHovering ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: "none"
          }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(255,255,255,0.4)" }}>
            SCROLL TO EXPLORE
          </span>
        </div>
      </section>

      {/* ---------- In-Depth Story Sections ---------- */}
      <div className="stories-wrap">
        <div className="section-top" style={{ marginBottom: "20px" }}>
          <div>
            <span>IN-DEPTH COVERAGE</span>
            <h2>Stories that move us to act.</h2>
          </div>
          <small>CRISIS · CONTEXT · RELIEF</small>
        </div>

        {sections.map((s, idx) => (
          <section
            key={s.id}
            id={s.id}
            className={`story-section ${idx % 2 === 0 ? "reverse" : ""}`}
          >
            <div className="story-text">
              <span className="story-tag">{s.tag}</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <span className="read-more">Read more →</span>
            </div>
            <div className="story-video">
              <iframe src={s.video} title={`${s.tag} Video`} allowFullScreen></iframe>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default MainPage;