// App.jsx
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">NOWLINE</div>
          <ul className="nav-links">
            <li><a href="#">HOME</a></li>
            <li><a href="#">HISTORICAL</a></li>
            <li><a href="#">GEOGRAPHICAL</a></li>
            <li><a href="#">NATURAL DISASTERS</a></li>
            <li><a href="#">CURRENT AFFAIRS</a></li>
            <li><a href="#">WORLD</a></li>
            <li><a href="#">POLITICS</a></li>
            <li><a href="#">SCIENCE</a></li>
            <li><a href="#">ECONOMY</a></li>
            <li><a href="#">ABOUT US</a></li>
          </ul>
        </div>
        <button className="btn-signin">Sign in</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <p className="hero-tag">CURRENT AFFAIRS / WORLD / CONTEXT</p>
        <h1 className="hero-title">KNOW WHAT HAPPENED.<br />UNDERSTAND WHY.</h1>
        <p className="hero-subtitle">
          A cinematic current-affairs platform for understanding climate change, protests,
          education controversies, historical events, geography, ecology and world conflicts.
        </p>
      </section>

      {/* Section 1 - Current Affairs (Heading Right, Video Left) */}
      <section className="story-section reverse">
        <div className="story-text">
          <span className="story-tag">CURRENT AFFAIRS</span>
          <h2>Global Climate Summit 2025: A Turning Point</h2>
          <p>
            World leaders have reached a landmark agreement on emissions reduction.
            Developing nations will receive new support for green energy.
          </p>
          <span className="read-more">Read more →</span>
        </div>
        <div className="story-video">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID_1"
            title="Current Affairs Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Section 2 - Historical (Video Right, Heading Left) */}
      <section className="story-section">
        <div className="story-text">
          <span className="story-tag">HISTORICAL</span>
          <h2>Lessons From the Past: How History Shapes Today</h2>
          <p>
            From ancient civilizations to modern conflicts, understanding history
            helps us make sense of the world we live in today.
          </p>
          <span className="read-more">Read more →</span>
        </div>
        <div className="story-video">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID_2"
            title="Historical Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Section 3 - Geographical (Heading Right, Video Left) */}
      <section className="story-section reverse">
        <div className="story-text">
          <span className="story-tag">GEOGRAPHICAL</span>
          <h2>Mapping the World: Landscapes That Define Nations</h2>
          <p>
            Geography shapes culture, economy and conflict. Explore how natural
            borders and resources influence global events.
          </p>
          <span className="read-more">Read more →</span>
        </div>
        <div className="story-video">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID_3"
            title="Geographical Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Section 4 - Natural Disasters (Video Right, Heading Left) */}
      <section className="story-section">
        <div className="story-text">
          <span className="story-tag">NATURAL DISASTERS</span>
          <h2>When Nature Strikes: Preparedness and Response</h2>
          <p>
            Earthquakes, floods and wildfires are increasing in frequency.
            Learn how communities prepare and recover from disasters.
          </p>
          <span className="read-more">Read more →</span>
        </div>
        <div className="story-video">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID_4"
            title="Natural Disasters Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Section 5 - World (Heading Right, Video Left) */}
      <section className="story-section reverse">
        <div className="story-text">
          <span className="story-tag">WORLD</span>
          <h2>Global Headlines: Stories Shaping Our World</h2>
          <p>
            From diplomatic breakthroughs to regional tensions, we cover the
            events that matter most across every continent.
          </p>
          <span className="read-more">Read more →</span>
        </div>
        <div className="story-video">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID_5"
            title="World Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Section 6 - Politics (Video Right, Heading Left) */}
      <section className="story-section">
        <div className="story-text">
          <span className="story-tag">POLITICS</span>
          <h2>Power and Policy: Inside the Decisions That Matter</h2>
          <p>
            Elections, reforms and debates — we break down the political
            stories that affect everyday life around the globe.
          </p>
          <span className="read-more">Read more →</span>
        </div>
        <div className="story-video">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID_6"
            title="Politics Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Section 7 - Science (Heading Right, Video Left) */}
      <section className="story-section reverse">
        <div className="story-text">
          <span className="story-tag">SCIENCE</span>
          <h2>Discovery and Innovation: The Frontiers of Knowledge</h2>
          <p>
            From space exploration to medical breakthroughs, science continues
            to reshape how we understand the universe.
          </p>
          <span className="read-more">Read more →</span>
        </div>
        <div className="story-video">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID_7"
            title="Science Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Section 8 - Economy (Video Right, Heading Left) */}
      <section className="story-section">
        <div className="story-text">
          <span className="story-tag">ECONOMY</span>
          <h2>Markets and Money: Understanding the Global Economy</h2>
          <p>
            Inflation, trade and jobs — we explain the economic forces that
            shape your daily life in simple, clear language.
          </p>
          <span className="read-more">Read more →</span>
        </div>
        <div className="story-video">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID_8"
            title="Economy Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <p>© 2025 NOWLINE. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
