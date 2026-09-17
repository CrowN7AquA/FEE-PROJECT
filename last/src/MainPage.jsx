import React, { useState, useEffect, useRef, useMemo } from 'react';
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

const DISASTER_TYPES = ['rain', 'earthquake', 'lightning'];

function DisasterIntro() {
  const [type] = useState(() => DISASTER_TYPES[Math.floor(Math.random() * DISASTER_TYPES.length)]);
  const [visible, setVisible] = useState(true);

  const rainDrops = useMemo(() => Array.from({ length: 180 }).map(() => ({
    left: Math.random() * 100,
    delay: Math.random() * 1.6,
    duration: 0.55 + Math.random() * 0.7,
    opacity: 0.35 + Math.random() * 0.6
  })), []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className={`disaster-overlay disaster-${type}`} aria-hidden="true">
      {type === 'rain' && (
        <>
          <div className="rain-clouds" />
          {rainDrops.map((d, i) => (
            <span
              key={i}
              className="rain-drop"
              style={{
                left: `${d.left}%`,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.duration}s`,
                opacity: d.opacity
              }}
            />
          ))}
        </>
      )}

      {type === 'earthquake' && (
        <svg className="earthquake-cracks" viewBox="0 0 1200 1000" preserveAspectRatio="none">
          <path d="M 0 380 L 180 400 L 330 340 L 520 430 L 720 360 L 920 460 L 1200 420" />
          <path d="M 120 0 L 200 180 L 150 380 L 260 560 L 200 750 L 300 1000" />
          <path d="M 420 0 L 370 230 L 460 430 L 400 640 L 500 1000" />
          <path d="M 720 0 L 770 210 L 700 400 L 780 600 L 730 1000" />
          <path d="M 1020 0 L 960 220 L 1040 440 L 970 660 L 1080 1000" />
          <path d="M 600 550 L 700 700 L 820 900 L 900 1000" />
          <path d="M 500 580 L 400 720 L 320 880 L 260 1000" />
        </svg>
      )}

      {type === 'lightning' && (
        <div className="lightning-storm">
          <div className="lightning-clouds" />

          <svg className="lightning-bolt bolt-1" viewBox="0 0 200 700" preserveAspectRatio="none">
            <path d="M 100 0 L 85 90 L 115 110 L 70 240 L 105 260 L 60 420 L 100 440 L 55 600 L 90 620 L 75 700" />
          </svg>
          <svg className="lightning-bolt bolt-2" viewBox="0 0 200 700" preserveAspectRatio="none">
            <path d="M 100 0 L 130 80 L 95 100 L 140 230 L 100 250 L 150 400 L 105 420 L 155 570 L 110 590 L 130 700" />
          </svg>
          <svg className="lightning-bolt bolt-3" viewBox="0 0 200 700" preserveAspectRatio="none">
            <path d="M 100 0 L 70 110 L 110 130 L 75 270 L 115 290 L 80 440 L 120 460 L 85 620 L 110 640 L 100 700" />
          </svg>

          <div className="lightning-flash f1" />
          <div className="lightning-flash f2" />
          <div className="lightning-flash f3" />
        </div>
      )}
    </div>
  );
}

function MainPage({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [topicsOpen, setTopicsOpen] = useState(false);

  const [introDone, setIntroDone] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  const leaveTimer = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 150);
    return () => clearTimeout(t);
  }, []);

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

  const getLetterStyle = (i) => {
    if (isHovering) return { transform: 'none', opacity: 1 };
    const dx  = scrollY * (i - 3) * 0.15;
    const dy  = scrollY * (i % 2 === 0 ? 0.15 : -0.15);
    const rot = scrollY * (i - 3) * 0.08;
    return {
      transform: `translate3d(${dx}px, ${dy}px, 0) rotate(${rot}deg)`,
      opacity: Math.max(0, 1 - scrollY / 400)
    };
  };

  const blob1X = 25 + Math.sin(scrollY * 0.0012) * 25;
  const blob1Y = 35 + Math.cos(scrollY * 0.0015) * 20;
  const blob2X = 75 - Math.cos(scrollY * 0.0009) * 25;
  const blob2Y = 65 + Math.sin(scrollY * 0.0013) * 20;
  const blob3X = 50 + Math.sin(scrollY * 0.0007 + 2) * 30;
  const blob3Y = 50 + Math.cos(scrollY * 0.0011 + 1) * 25;

  const bgStyle = {
    background: `
      radial-gradient(circle at ${blob1X}% ${blob1Y}%, rgba(229, 9, 20, ${0.08 + Math.min(0.12, scrollY / 4000)}), transparent 55%),
      radial-gradient(circle at ${blob2X}% ${blob2Y}%, rgba(150, 0, 40, ${0.10 + Math.min(0.08, scrollY / 5000)}), transparent 60%),
      radial-gradient(circle at ${blob3X}% ${blob3Y}%, rgba(80, 0, 20, ${0.15 + Math.min(0.10, scrollY / 6000)}), transparent 65%)
    `
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

      <div className="scroll-bg-layer" style={bgStyle} />

      <DisasterIntro />

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
            const isThisHovered  = isHovering && hoveredIdx === i;
            const style = getLetterStyle(i);

            return (
              <span
                key={i}
                className={`letter-block ${isOtherHovered ? "collapsed" : ""} ${isThisHovered ? "expanded" : ""}`}
                onMouseEnter={() => handleLetterEnter(i)}
                style={{ transform: style.transform, opacity: style.opacity }}
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

      <div className="stories-wrap">
        <div className="section-top in-depth-top">
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

export default MainPage;