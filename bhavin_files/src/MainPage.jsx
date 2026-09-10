import React from 'react';
import '../../App.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { auth, signOut } from './firebase'; 

function MainPage({ user, setUser }) {
  // 1. Initialized the navigate tool
  const navigate = useNavigate();

  // 2. Added the handleLogout function to safely perform Sign Out
  async function handleLogout() {
    try {
      await signOut(auth);
      if (setUser) setUser(null); // Clear user state
      navigate("/"); // Redirect back to login screen
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }

  return (
    <div className="App">
      {/* Navbar - Matches "NOWLINE | STORIES | ABOUT | LIVE" design */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            {/* 3. Replaced static logo text with a working Link back to home */}
            <Link to="/MainPage" className="logo">NOWLINE</Link>
            <ul className="nav-links">
              {/* 4. Swapped static <a> tags with React Router <Link> components to load pages dynamically */}
              <li><Link to="/MainPage">STORIES</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
              <li><Link to="/live">LIVE</Link></li>
            </ul>
          </div>
          <div className="nav-right">
            {/* 5. Dynamically shows username + "Sign Out" button when logged in, or "Sign in" when logged out */}
            {user ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span className="user-name" style={{ color: '#fff', fontSize: '0.9rem' }}>
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <button 
                  className="btn-signin" 
                  onClick={handleLogout} 
                  style={{ background: '#e50914' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button className="btn-signin" onClick={() => navigate("/")}>
                Sign in
              </button>
            )}
          </div>
        </div>
      </nav>

      <section className="main-headline">
        <div className="headline-container">
          <div className="headline-tag">
            <span>CURRENT AFFAIRS / WORLD / CONTEXT</span>
          </div>
          <h1 className="main-title">KNOW WHAT HAPPENED. UNDERSTAND WHY.</h1>
          <p className="main-subtitle">
            A cinematic current-affairs platform for understanding climate change, protests,
            education controversies, historical events, geography, ecology and world conflicts.
          </p>
        </div>
      </section>

      <section className="news-section">
        <div className="news-container">
          <div className="news-headline">
            <span className="breaking-tag">LIVE</span>
            <h2 className="news-title">Global Climate Summit 2025: A Turning Point</h2>
            <p className="news-description">
              World leaders have reached a landmark agreement on emissions reduction,
              with developing nations receiving unprecedented financial support for
              green energy transition.
            </p>
            <div className="news-meta">
              <span className="author">By Elena Rodriguez</span>
              <span className="date">• 2 hours ago</span>
            </div>
          </div>
          <div className="video-container">
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/VIDEO_ID_PLACEHOLDER"
                title="Climate Summit Coverage"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="categories-container">
          <div className="category-card climate">
            <h3>CLIMATE</h3>
            <p>Understanding our changing planet and the fight for a sustainable future.</p>
          </div>
          <div className="category-card society">
            <h3>SOCIETY</h3>
            <p>Exploring social movements, education, and the structures that shape our lives.</p>
          </div>
          <div className="category-card geographic">
            <h3>GEOGRAPHIC</h3>
            <p>Discovering the world's diverse landscapes and their impact on human history.</p>
          </div>
          <div className="category-card history">
            <h3>HISTORY</h3>
            <p>Uncovering the past to better understand the present and future.</p>
          </div>
        </div>
      </section>

      <div className="scroll-content">
        <div className="content-block">
          <h2>Featured Stories</h2>
          <div className="article-grid">
            <div className="article-item">
              <h3>Protests and Democracy: A Global Perspective</h3>
              <p>How citizen movements are reshaping political landscapes across continents.</p>
              <span className="read-more">Read more →</span>
            </div>
            <div className="article-item">
              <h3>The Future of Education in a Digital Age</h3>
              <p>Controversies and innovations in how we teach and learn.</p>
              <span className="read-more">Read more →</span>
            </div>
            <div className="article-item">
              <h3>Ecology in Crisis: Can We Reverse the Damage?</h3>
              <p>Examining the state of our ecosystems and the efforts to restore balance.</p>
              <span className="read-more">Read more →</span>
            </div>
            <div className="article-item">
              <h3>Historical Echoes: Conflicts That Shaped Our World</h3>
              <p>Understanding the roots of modern geopolitical tensions.</p>
              <span className="read-more">Read more →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;