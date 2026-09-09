import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navbar - Matches "NOWLINE | STORIES | ABOUT | LIVE" design */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo">NOWLINE</div>
            <ul className="nav-links">
              <li><a href="#stories">STORIES</a></li>
              <li><a href="#about">ABOUT</a></li>
              <li><a href="#live">LIVE</a></li>
            </ul>
          </div>
          <div className="nav-right">
            <button className="btn-signin">Sign in</button>
          </div>
        </div>
      </nav>

      {/* Main Headline Section - "CURRENT AFFAIRS/WORLD/CONTEXT" */}
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

      {/* News Section - Headline Left, Video Right */}
      <section className="news-section">
        <div className="news-container">
          {/* Left side: News Headline */}
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

          {/* Right side: Video */}
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

      {/* Category Cards - CLIMATE, SOCIETY, GEOGRAPHIC, HISTORY */}
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

      {/* Scrolling Content - Additional Stories */}
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

export default App;
