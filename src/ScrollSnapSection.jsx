import React, { useState } from "react";
import worldBgImg from './world-bg.jpg';
import scienceBgImg from './science-bg.jpg';
import economyBgImg from './economy-bg.jpg'; 
import climateBgImg from './climate-bg.jpg'; 

const LIVE_NEWS = "https://www.youtube.com/embed/live_stream?channel=UCNye-wNBqNL5ZzHSJj3l8Bg";

// Map section IDs to their background images
const SECTION_BACKGROUNDS = {
  world: worldBgImg,
  science: scienceBgImg,
  economy: economyBgImg,
  climate: climateBgImg
};

const CATEGORY_SECTIONS = [
  {
    id: "world",
    tag: "World",
    title: "Global Headlines: Stories Shaping Our World",
    articles: [
      { 
        id: 1, 
        author: "Elena Rostova", 
        time: "2 hours ago", 
        title: "Diplomatic Breakthrough in Geneva", 
        text: "World leaders reach a historic consensus on border disputes, paving the way for a new era of regional stability after months of tense negotiations.", 
        video: LIVE_NEWS 
      },
      { 
        id: 2, 
        author: "Marcus Chen", 
        time: "5 hours ago", 
        title: "Regional Tensions Ease in South Asia", 
        text: "New trade agreements pave the way for peace talks as both nations agree to demilitarize the shared border over the next six months.", 
        video: LIVE_NEWS 
      },
      { 
        id: 3, 
        author: "Sarah Jenkins", 
        time: "8 hours ago", 
        title: "UN Summit Addresses Global Migration", 
        text: "New policies drafted to handle climate-induced displacement, focusing on creating safe corridors for affected populations.", 
        video: "https://www.youtube.com/embed/RmLEQhAhK4w" 
      }
    ]
  },
  {
    id: "science",
    tag: "Science",
    title: "Discovery and Innovation: The Frontiers of Knowledge",
    articles: [
      { 
        id: 1, 
        author: "Dr. Aris Thorne", 
        time: "1 hour ago", 
        title: "James Webb Telescope Finds New Earth", 
        text: "Astronomers detect a potentially habitable exoplanet just 40 light-years away. Initial scans suggest the presence of liquid water and a stable atmosphere.", 
        video: "https://www.youtube.com/embed/t-DE5vmAytA" 
      },
      { 
        id: 2, 
        author: "Lila Vance", 
        time: "4 hours ago", 
        title: "Breakthrough in Fusion Energy", 
        text: "Scientists achieve net-positive energy for the first time in a lab setting. This milestone could revolutionize global power grids within a decade.", 
        video: "https://www.youtube.com/embed/6Eh2rZAD6uc" 
      },
      { 
        id: 3, 
        author: "David Wu", 
        time: "6 hours ago", 
        title: "AI Predicts Protein Structures", 
        text: "New AI models accelerate drug discovery by decades, accurately predicting complex protein folding mechanisms.", 
        video: "https://www.youtube.com/embed/6hlgADbBvZs" 
      }
    ]
  },
  {
    id: "economy",
    tag: "Economy",
    title: "Markets and Money: Understanding the Global Economy",
    articles: [
      { 
        id: 1, 
        author: "Rachel Adams", 
        time: "3 hours ago", 
        title: "Global Inflation Begins to Cool", 
        text: "Central banks report steady declines in consumer price indexes, signaling a potential soft landing for the global economy.", 
        video: LIVE_NEWS 
      },
      { 
        id: 2, 
        author: "Thomas Reed", 
        time: "7 hours ago", 
        title: "Supply Chains Shift Back Home", 
        text: "Major corporations invest heavily in domestic manufacturing, aiming to reduce reliance on fragile international logistics.", 
        video: "https://www.youtube.com/embed/PyXx7meBWRg" 
      },
      { 
        id: 3, 
        author: "Nina Patel", 
        time: "9 hours ago", 
        title: "Crypto Regulations Tighten", 
        text: "A new international framework is established for digital assets, bringing clarity and security to the volatile market.", 
        video: LIVE_NEWS 
      }
    ]
  },
  {
    id: "climate",
    tag: "Climate",
    title: "Global Climate Summit: A Turning Point",
    articles: [
      { 
        id: 1, 
        author: "James Holden", 
        time: "12 hours ago", 
        title: "Historic Emissions Agreement Reached", 
        text: "Developing nations secure critical funding for green infrastructure in a landmark deal brokered at the climate summit.", 
        video: "https://www.youtube.com/embed/iS0dJ0divP8" 
      },
      { 
        id: 2, 
        author: "Maya Lin", 
        time: "14 hours ago", 
        title: "Amazon Deforestation Hits Record Low", 
        text: "Satellite data reveals a 40% drop in illegal logging following aggressive new enforcement policies by local governments.", 
        video: LIVE_NEWS 
      }, 
      { 
        id: 3, 
        author: "Chris Evans", 
        time: "18 hours ago", 
        title: "Ocean Cleanup Project Scales Up", 
        text: "New autonomous barges are deployed to remove microplastics from the Pacific, targeting the Great Pacific Garbage Patch.", 
        video: "https://www.youtube.com/embed/JUQnhiZirKQ" 
      }
    ]
  }
];

function CarouselSection({ section }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextArticle = () => {
    setCurrentIndex((prev) => (prev + 1) % section.articles.length);
  };

  const prevArticle = () => {
    setCurrentIndex((prev) => (prev - 1 + section.articles.length) % section.articles.length);
  };

  const currentArticle = section.articles[currentIndex];
  
  // Check if this section has a configured background image
  const bgImage = SECTION_BACKGROUNDS[section.id];
  const hasBg = !!bgImage;

  return (
    <section 
      className={`mp-topic-row ${hasBg ? "has-bg-section" : ""}`} 
      id={section.id}
      style={hasBg ? { "--section-bg": `url(${bgImage})` } : {}}
    >
      
      {/* Header & Navigation */}
      <div className="mp-topic-header">
        <div className="mp-topic-title-wrap">
          <span className="mp-topic-tag">{section.tag}</span>
          <h2>{section.title}</h2>
        </div>
        
        <div className="mp-carousel-controls">
          <button onClick={prevArticle} aria-label="Previous story" className="mp-nav-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <span className="mp-nav-counter">
            0{currentIndex + 1} <span className="mp-counter-divider">/</span> 0{section.articles.length}
          </span>
          <button onClick={nextArticle} aria-label="Next story" className="mp-nav-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mp-editorial-grid" key={currentIndex}>
        
        {/* Video Container (Left) */}
        <div className="mp-video-container">
          <iframe
            src={currentArticle.video}
            title={currentArticle.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
          <div className="mp-video-overlay"></div>
        </div>

        {/* Text Container (Right) */}
        <div className="mp-text-container">
          <div className="mp-article-meta">
            <span className="mp-author">By {currentArticle.author}</span>
            <span className="mp-time">{currentArticle.time}</span>
          </div>
          <h3>{currentArticle.title}</h3>
          <p>{currentArticle.text}</p>
          
          <button className="mp-read-more">
            Read Full Story
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

      </div>
    </section>
  );
}

export default function ScrollSnapSection() {
  return (
    <div className="mp-in-depth-container">
      <div className="section-top in-depth-top">
        <div>
          <span>IN-DEPTH COVERAGE</span>
          <h2>Stories that move us to act.</h2>
        </div>
        <small>CRISIS · CONTEXT · RELIEF</small>
      </div>

      {CATEGORY_SECTIONS.map((section) => (
        <CarouselSection key={section.id} section={section} />
      ))}
    </div>
  );
}