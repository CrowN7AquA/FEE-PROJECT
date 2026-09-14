// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [topicsOpen, setTopicsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.topics')) {
        setTopicsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        {/* Navbar logo */}
        <div className="logo">
          <div className="logo-mark">
            <span>N</span>
          </div>
          <div className="logo-text">NOWLINE</div>
        </div>

        {/* Topics dropdown */}
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
              <a href="#">Climate</a>
              <a href="#">Historical</a>
              <a href="#">Geographical</a>
              <a href="#">Disasters</a>
              <a href="#">World</a>
              <a href="#">Politics</a>
              <a href="#">Science</a>
              <a href="#">Economy</a>
            </div>
          )}
        </div>

        {/* About Us + Sign in */}
        <div className="nav-right">
          <a href="#" className="btn-about">About Us</a>
          <button className="btn-signin">Sign in</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <img src="/nowline.png" alt="Nowline" className="hero-name" />
        <p className="hero-tagline">
          NOWLINE — A current-affairs platform for understanding the world in context.
        </p>
      </section>

      {/* Section 1 - Climate */}
      <section className="story-section reverse">
        <div className="story-text">
          <span className="story-tag">Climate</span>
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
            title="Climate Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Section 2 - Historical */}
      <section className="story-section">
        <div className="story-text">
          <span className="story-tag">Historical</span>
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

      {/* Section 3 - Geographical */}
      <section className="story-section reverse">
        <div className="story-text">
          <span className="story-tag">Geographical</span>
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

      {/* Section 4 - Disasters */}
      <section className="story-section">
        <div className="story-text">
          <span className="story-tag">Disasters</span>
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
            title="Disasters Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Section 5 - World */}
      <section className="story-section reverse">
        <div className="story-text">
          <span className="story-tag">World</span>
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

      {/* Section 6 - Politics */}
      <section className="story-section">
        <div className="story-text">
          <span className="story-tag">Politics</span>
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

      {/* Section 7 - Science */}
      <section className="story-section reverse">
        <div className="story-text">
          <span className="story-tag">Science</span>
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

      {/* Section 8 - Economy */}
      <section className="story-section">
        <div className="story-text">
          <span className="story-tag">Economy</span>
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
        <p>© 2025 Nowline. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
