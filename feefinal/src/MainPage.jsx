import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signOut } from './firebase';

function MainPage({ user, setUser }) {
  const navigate = useNavigate();
  const [topicsOpen, setTopicsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.topics')) {
        setTopicsOpen(false);
      }
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

  const featured = [
    { tag: "CLIMATE", title: "Global Climate Summit 2025: A Turning Point", text: "World leaders reach landmark agreement on emissions reduction.", image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1400&q=85" },
    { tag: "SOCIETY", title: "Protests and Democracy: A Global Perspective", text: "How citizen movements are reshaping political landscapes.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1300&q=85" },
    { tag: "GEOPOLITICS", title: "Historical Echoes: Conflicts That Shaped Our World", text: "Understanding the roots of modern geopolitical tensions.", image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1400&q=85" },
    { tag: "HISTORY", title: "The Future of Education in a Digital Age", text: "Controversies and innovations in how we teach and learn.", image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1400&q=85" }
  ];

  const sections = [
    { id: "climate", tag: "Climate", title: "Global Climate Summit 2025: A Turning Point", text: "World leaders have reached a landmark agreement on emissions reduction. Developing nations will receive new support for green energy.", video: "https://www.youtube.com/embed/VIDEO_ID_1" },
    { id: "historical", tag: "Historical", title: "Lessons From the Past: How History Shapes Today", text: "From ancient civilizations to modern conflicts, understanding history helps us make sense of the world we live in today.", video: "https://www.youtube.com/embed/VIDEO_ID_2" },
    { id: "geographical", tag: "Geographical", title: "Mapping the World: Landscapes That Define Nations", text: "Geography shapes culture, economy and conflict. Explore how natural borders and resources influence global events.", video: "https://www.youtube.com/embed/VIDEO_ID_3" },
    { id: "disasters", tag: "Disasters", title: "When Nature Strikes: Preparedness and Response", text: "Earthquakes, floods and wildfires are increasing in frequency. Learn how communities prepare and recover from disasters.", video: "https://www.youtube.com/embed/VIDEO_ID_4" },
    { id: "world", tag: "World", title: "Global Headlines: Stories Shaping Our World", text: "From diplomatic breakthroughs to regional tensions, we cover the events that matter most across every continent.", video: "https://www.youtube.com/embed/VIDEO_ID_5" },
    { id: "politics", tag: "Politics", title: "Power and Policy: Inside the Decisions That Matter", text: "Elections, reforms and debates — we break down the political stories that affect everyday life around the globe.", video: "https://www.youtube.com/embed/VIDEO_ID_6" },
    { id: "science", tag: "Science", title: "Discovery and Innovation: The Frontiers of Knowledge", text: "From space exploration to medical breakthroughs, science continues to reshape how we understand the universe.", video: "https://www.youtube.com/embed/VIDEO_ID_7" },
    { id: "economy", tag: "Economy", title: "Markets and Money: Understanding the Global Economy", text: "Inflation, trade and jobs — we explain the economic forces that shape your daily life in simple, clear language.", video: "https://www.youtube.com/embed/VIDEO_ID_8" }
  ];

  return (
    <div className="landing">
      <div className="background"></div>
      <div className="background-overlay"></div>
      <div className="red-glow"></div>

      <header className="navbar">
        <Link to="/MainPage" className="logo">
          <span className="logo-box">N</span> NOWLINE
        </Link>

        <nav>
          <div
            className="topics"
            onMouseEnter={() => setTopicsOpen(true)}
            onMouseLeave={() => setTopicsOpen(false)}
          >
            <button className="topics-btn">
              TOPICS <span className="caret">▾</span>
            </button>

            {topicsOpen && (
              <div className="topics-menu">
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`}>{s.tag}</a>
                ))}
              </div>
            )}
          </div>

          <Link to="/about">ABOUT</Link>
          <Link to="/live" className="live">
            <span></span> LIVE
          </Link>
        </nav>

        {user && (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span style={{ color: "#fff", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>
              {user.displayName || user.email?.split("@")[0]}
            </span>
            <button className="profile-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="hero" style={{ gridTemplateColumns: "1fr", minHeight: "55vh" }}>
        <div className="hero-content">
          <div className="eyebrow">
            <span></span> CURRENT AFFAIRS / WORLD / CONTEXT
          </div>
          <h1>
            KNOW WHAT <br />
            <span>HAPPENED.</span> <br />
            UNDERSTAND WHY.
          </h1>
          <p>
            A cinematic current-affairs platform for understanding climate change, protests,
            education controversies, historical events, geography, ecology and world conflicts.
          </p>
        </div>
      </section>

      {/* 4-Card Featured Grid */}
      <section className="stories">
        <div className="section-top">
          <div>
            <span>LATEST BRIEFINGS</span>
            <h2>Featured stories worth understanding.</h2>
          </div>
          <small>ANALYSIS / BRIEFINGS</small>
        </div>
        <div className="story-grid">
          {featured.map((f, i) => (
            <div className="story-card" key={i} style={{ cursor: "pointer" }}>
              <div className="story-image" style={{ backgroundImage: `url('${f.image}')` }}></div>
              <div className="story-overlay"></div>
              <div className="story-content">
                <span className="story-tag">{f.tag}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8 Story Sections — alternating layout with videos */}
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
              <iframe
                src={s.video}
                title={`${s.tag} Video`}
                allowFullScreen
              ></iframe>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default MainPage;