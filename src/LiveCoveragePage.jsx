import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, signOut } from "./firebase";

import arcticIceImg from "./willian-justen-de-vasconcellos-LzwNq8DVQzs-unsplash.jpg";
import crisisMapImg from "./kelsey-knight-SFRw5GChoLA-unsplash.jpg";
import diplomaticPressImg from "./history-in-hd-v_e3Hha4EBA-unsplash.jpg";

const DROPDOWN_TOPICS = ["World", "Science", "Economy", "Climate"];

export default function LiveCoveragePage({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [topicsOpen, setTopicsOpen] = useState(false);

  const [localTime, setLocalTime] = useState("");
  const weatherInfo = "Global crisis desk";
  const locationInfo = "Global coverage";
  const latencyInfo = "120 ms";

  const [feedMode, setFeedMode] = useState("video");
  const [streamActive, setStreamActive] = useState(true);
  const [streamInitialized, setStreamInitialized] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [synthSpeaking, setSynthSpeaking] = useState(false);

  const [pollVotes, setPollVotes] = useState({ yes: 1008, no: 474 });

  const [hasVoted, setHasVoted] = useState(() => {
    return !!localStorage.getItem("nowline_voted");
  });

  const [donationFreq, setDonationFreq] = useState("monthly");
  const [selectedTier, setSelectedTier] = useState("15");
  const [customAmount, setCustomAmount] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedDispatches, setExpandedDispatches] = useState({});
  const [dispatches, setDispatches] = useState([
    {
      id: "dispatch-1",
      category: "climate",
      time: "14:32 UTC",
      categoryLabel: "CLIMATE & ENVIRONMENT",
      status: "CONFIRMED",
      source: "COPERNICUS SATELLITE NETWORK",
      image: arcticIceImg,
      imageCaption: "AERIAL SATELLITE FEED — SECTOR 4 POLAR SHELF",
      title: "Antarctic Thermal Anomaly Reaches Critical Threshold in Sector 4",
      summary: "Satellite sensors from the Copernicus constellation have detected an unprecedented +4.2°C surface temperature spike across the Queen Maud Land shelf. UN environmental teams are convening an emergency assessment.",
      bullets: [
        "Thermal deviation began at 09:15 UTC and peaked at 14:00 UTC over Sector 4.",
        "No seismic triggers detected in adjacent oceanographic sensors.",
        "Geneva Security Council requested real-time telemetry verification from polar stations."
      ],
      quote: `"The velocity of heat accumulation in this sector requires immediate international scientific synchronization." — Dr. H. Vance, Polar Dynamics Director`
    },
    {
      id: "dispatch-2",
      category: "geopolitics",
      time: "13:10 UTC",
      categoryLabel: "GEOPOLITICS & MARITIME",
      status: "DEVELOPING",
      source: "NAVAL TASK FORCE CORRIDOR",
      image: crisisMapImg,
      imageCaption: "GLOBAL TACTICAL MAP — MARITIME INCIDENT NODES",
      title: "Maritime Security Corridor Established in Red Sea Zone",
      summary: "A multi-national naval coalition has activated a guarded transit corridor to secure commercial vessel passage through Bab-el-Mandeb. Insurance premiums for energy tankers decreased by 12% following the announcement.",
      bullets: [
        "8 naval escort vessels stationed at key coordinates.",
        "Commercial vessels required to register transit schedule 12 hours prior.",
        "Air support patrols active 24/7 over primary lanes."
      ]
    },
    {
      id: "dispatch-3",
      category: "society",
      time: "11:45 UTC",
      categoryLabel: "SOCIETY & GOVERNANCE",
      status: "CONFIRMED",
      source: "GENEVA PRESS ASSOCIATION",
      image: diplomaticPressImg,
      imageCaption: "GENEVA PRESS ROOM — BRIEFING DELEGATES",
      title: "Global Student Reform Coalition Issues Declaration at Geneva Summit",
      summary: "Delegates representing over 40 international universities have presented a unified charter on ethical technology and climate accountability directly to UN delegates in Geneva.",
      bullets: [
        "Proposal for open algorithmic oversight in environmental crisis modeling.",
        "Establishment of youth consultative seat on international energy boards."
      ]
    }
  ]);

  const [verificationOpen, setVerificationOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", icon: "fa-circle-info" });
  const toastTimer = useRef(null);

  const radarLocations = [
    { id: "redsea", name: "RED SEA CORRIDOR", coords: "15.5527° N, 41.8981° E", type: "Armed conflict / maritime security", status: "ELEVATED", top: "48%", left: "59%", color: "#E53935", severity: "Elevated", update: "A maritime security corridor is reported in the Red Sea zone.", aid: "Check established humanitarian and maritime advisories before travel." },
    { id: "antarctica", name: "ANTARCTIC SHELF", coords: "82.8628° S, 135.0000° E", type: "Climate anomaly", status: "MONITORING", top: "82%", left: "49%", color: "#FFB300", severity: "Monitoring", update: "A reported thermal anomaly is under environmental assessment.", aid: "Follow official scientific monitoring and emergency advisories." },
    { id: "geneva", name: "GENEVA SUMMIT", coords: "46.2044° N, 6.1432° E", type: "Diplomacy / relief coordination", status: "ACTIVE", top: "35%", left: "47%", color: "#00D9FF", severity: "Active briefing", update: "Delegates are discussing international climate and technology accountability.", aid: "See verified humanitarian organizations for current relief opportunities." },
    { id: "southasia", name: "SOUTH ASIA", coords: "22.0° N, 82.0° E", type: "Flood response", status: "RESPONSE", top: "52%", left: "68%", color: "#FFB300", severity: "Response underway", update: "Flood-response coverage and displacement updates require confirmation from local authorities.", aid: "Use local disaster-management services and established relief groups." }
  ];

  const breakingItems = [
    "BREAKING · Antarctic thermal anomaly under environmental assessment",
    "SECURITY · Maritime corridor reported in the Red Sea zone",
    "DIPLOMACY · Student reform coalition issues Geneva declaration",
    "RELIEF · South Asia flood response updates — follow verified local advisories"
  ];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (message, icon = "fa-circle-info") => {
    setToast({ visible: true, message, icon });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast({ visible: false, message: "", icon: "fa-circle-info" });
    }, 3200);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (setUser) setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const playAudioBrief = () => {
    if ("speechSynthesis" in window) {
      if (synthSpeaking) {
        window.speechSynthesis.cancel();
        setSynthSpeaking(false);
        showToast("Audio Briefing paused.", "fa-volume-xmark");
      } else {
        const briefText =
          "Nowline 60-second Briefing. Antarctic ice shelf temperature spike +4.2 degrees triggers UN emergency protocol. Red Sea maritime transit corridor established with eight naval vessels. Geneva youth delegates present global climate charter.";
        const utterance = new SpeechSynthesisUtterance(briefText);
        utterance.rate = 1.0;
        utterance.onend = () => setSynthSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setSynthSpeaking(true);
        showToast("Playing 60-sec Audio Briefing...", "fa-volume-high");
      }
    } else {
      showToast("Web Speech API not supported in this browser.", "fa-triangle-exclamation");
    }
  };

  const castVote = (option) => {
    if (hasVoted) {
      showToast("You have already registered your vote in this session.", "fa-circle-info");
      return;
    }
    setPollVotes((prev) => ({
      ...prev,
      [option]: prev[option] + 1
    }));
    setHasVoted(true);
    localStorage.setItem("nowline_voted", option);
    showToast("Your vote has been saved in this browser.", "fa-check");
  };

  const toggleDispatchExpand = (id) => {
    setExpandedDispatches((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const simulateIncomingDispatch = () => {
    const now = new Date();
    const timeStr = now.toISOString().substring(11, 16) + " UTC";
    const newId = "dispatch-" + Date.now();

    const newDispatch = {
      id: newId,
      category: "geopolitics",
      time: timeStr,
      categoryLabel: "LIVE SIGNAL DISPATCH",
      status: "CONFIRMED",
      source: "FIELD RELAY NODE",
      image: crisisMapImg,
      imageCaption: "TACTICAL HOTSPOT UPDATE",
      title: "Geneva Diplomatic Envoy Issues Joint Statement on Energy Reserves",
      summary: "A multilateral accord has been finalized to guarantee strategic petroleum reserves access during climate anomalies. Full documentation uploaded to secure terminal.",
      bullets: [
        "Strategic reserve deployment timeline set to 24 hours.",
        "Unanimous verification across all Geneva and Indo-Pacific monitoring hubs."
      ]
    };

    setDispatches((prev) => [newDispatch, ...prev]);
    showToast("NEW LIVE DISPATCH RECEIVED IN STREAM!", "fa-bell");
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    const amount = selectedTier === "custom" ? (customAmount || "0") : selectedTier;
    const freq = donationFreq === "monthly" ? "Monthly" : "One-Time";
    showToast(`Thank you for supporting NOWLINE Network with a ${freq} $${amount} contribution!`, "fa-heart");
  };

  const filteredDispatches = dispatches.filter((d) => {
    return selectedCategory === "all" || d.category === selectedCategory;
  });

  const totalVotes = pollVotes.yes + pollVotes.no;
  const yesPercent = Math.round((pollVotes.yes / totalVotes) * 100);
  const noPercent = Math.round((pollVotes.no / totalVotes) * 100);

  return (
    <div className="live-page-container">
      <style>{`
        /* Base Styles for Live Page */
        .live-page-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            font-family: 'Inter', system-ui, sans-serif;
            background-color: #070A0F;
            color: #F0F4F8;
            background-image: radial-gradient(circle at 50% 0%, rgba(229, 57, 53, 0.05) 0%, transparent 60%), linear-gradient(to bottom, #070A0F, #0B0F14);
        }
        .live-header {
            border-bottom: 1px solid #222D3A;
            background-color: rgba(7, 10, 15, 0.9);
            backdrop-filter: blur(12px);
            position: sticky;
            top: 0;
            z-index: 40;
        }
        .live-header-inner {
            max-width: 80rem;
            margin: 0 auto;
            padding: 0 1.5rem;
        }
        .live-nav-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 4rem;
            gap: 1rem;
        }
        .live-main {
            flex: 1;
            max-width: 80rem;
            width: 100%;
            margin: 0 auto;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        .live-grid-main {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            align-items: start;
        }
        @media (min-width: 1024px) {
            .live-grid-main { grid-template-columns: 2fr 1fr; }
        }
        .live-grid-bottom {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        @media (min-width: 768px) {
            .live-grid-bottom { grid-template-columns: 7fr 5fr; }
        }
        .live-card {
            background: #10161E;
            border: 1px solid #222D3A;
            border-radius: 0.75rem;
            overflow: hidden;
        }
        .live-card-header {
            background: rgba(7, 10, 15, 0.8);
            border-bottom: 1px solid #222D3A;
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.75rem;
        }
        .live-video-area {
            position: relative;
            background: black;
            aspect-ratio: 16 / 9;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .live-sidebar {
            background: #10161E;
            border: 1px solid rgba(229, 57, 53, 0.3);
            border-radius: 0.75rem;
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
        }
        .live-ticker {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            border: 1px solid rgba(229, 57, 53, 0.3);
            background: #10161E;
            margin: 1rem auto 0;
            max-width: 80rem;
            width: calc(100% - 3rem);
            border-radius: 4px;
        }
        .live-dispatch-card {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background: #10161E;
            border: 1px solid #222D3A;
            border-radius: 0.75rem;
            padding: 1.25rem;
        }
        .live-dispatch-inner {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.25rem;
        }
        @media (min-width: 768px) {
            .live-dispatch-inner { grid-template-columns: 1fr 2fr; }
        }
        .live-flex-row { display: flex; align-items: center; gap: 0.5rem; }
        .live-flex-col { display: flex; flex-direction: column; gap: 0.5rem; }
        .live-flex-between { display: flex; align-items: center; justify-content: space-between; }
        
        /* Custom animations */
        @keyframes orbitRedBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes tickerReveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .breaking-marquee {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0, #000 3%, #000 97%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 3%, #000 97%, transparent 100%);
        }
        .breaking-track {
          display: inline-flex;
          width: max-content;
          white-space: nowrap;
          animation: tickerScroll 45s linear infinite;
        }
        .breaking-marquee:hover .breaking-track { animation-play-state: paused; }
        .breaking-group { display: inline-flex; flex-shrink: 0; align-items: center; }
        .live-link-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: transparent;
          transition: background-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease;
          z-index: 1;
        }
        .live-link-container::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          padding: 2px;
          background: conic-gradient(from 0deg, transparent 0%, #E53935 30%, #FF5252 50%, transparent 70%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: orbitRedBorder 2s linear infinite;
          pointer-events: none;
        }
        .live-link-container:hover { background-color: rgba(229, 57, 53, 0.12); box-shadow: 0 0 16px rgba(229, 57, 53, 0.25); }
        .live-link-container:hover::before { opacity: 1; }
        .tactical-chamfer-box {
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
          background: #10161E;
          border: 1px solid rgba(229, 57, 53, 0.3);
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.6);
        }
        .tactical-chamfer-tag {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .hex-badge {
          clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
          background: linear-gradient(135deg, rgba(20, 28, 36, 0.95), rgba(11, 15, 20, 0.95));
          border: 1px solid rgba(34, 45, 58, 0.8);
          transition: all 0.3s ease;
        }
        .hex-badge:hover { border-color: rgba(229, 57, 53, 0.6); box-shadow: 0 0 12px rgba(229, 57, 53, 0.2); }
        .notched-folder-container { position: relative; padding-top: 28px; }
        .notched-folder-tab {
          position: absolute; top: 0; left: 16px; height: 28px; padding: 0 16px;
          background: #141C24; border-top: 1px solid #222D3A; border-left: 1px solid #222D3A; border-right: 1px solid #222D3A;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%);
          display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700;
          letter-spacing: 1px; color: #E53935; text-transform: uppercase; z-index: 10;
        }
        .wireframe-grid-card {
          background-color: transparent;
          background-image: linear-gradient(to right, rgba(34, 45, 58, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 45, 58, 0.15) 1px, transparent 1px);
          background-size: 24px 24px;
          border-left: 2px solid rgba(229, 57, 53, 0.4);
          border-top: 1px solid rgba(34, 45, 58, 0.5);
          position: relative;
        }
        .wireframe-grid-card::after {
          content: ''; position: absolute; top: 0; right: 0; width: 8px; height: 8px;
          border-top: 2px solid #E53935; border-right: 2px solid #E53935;
        }
      `}</style>

      <header className="navbar">
        <Link to={user ? "/home" : "/"} className="logo">
          <span className="logo-box">N</span> NOWLINE
        </Link>
        <nav>
          {user && (
            <div className="topics" onMouseEnter={() => setTopicsOpen(true)} onMouseLeave={() => setTopicsOpen(false)}>
              <button className="topics-btn">TOPICS <span className="caret">▾</span></button>
              {topicsOpen && (
                <div className="topics-menu">
                  {DROPDOWN_TOPICS.map(t => (
                    <a key={t} href={`/home#${t.toLowerCase()}`}>{t}</a>
                  ))}
                </div>
              )}
            </div>
          )}
          <Link to="/home" className={currentPath === "/home" ? "nav-active" : ""}>STORIES</Link>
          <Link to="/about" className={currentPath === "/about" ? "nav-active" : ""}>ABOUT</Link>

          <Link
            to="/live"
            className={`live-link-container ${currentPath === "/live" ? "nav-active" : ""}`}
            style={{ marginLeft: '14px', padding: 0 }}
            title="Live Crisis Coverage Feed"
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1, gap: "2px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#E53935", boxShadow: "0 0 15px #ff3447" }}></span>
              <span style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "1.5px", color: currentPath === "/live" ? "white" : "rgba(255,255,255,.65)" }}>LIVE</span>
            </div>
          </Link>
        </nav>
        {user ? (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span className="user-name" style={{ pointerEvents: 'none', cursor: 'default', borderBottom: 'none' }}>
              {user.displayName || user.email?.split("@")[0]}
            </span>
            <button className="profile-btn" onClick={handleLogout}>Sign Out</button>
          </div>
        ) : (
          <Link to="/" className="profile-btn" style={{ textDecoration: 'none' }}>Sign in</Link>
        )}
      </header>

      <div className="live-ticker tactical-chamfer-box">
        <span className="tactical-chamfer-tag" style={{ flexShrink: 0, padding: '4px 12px', backgroundColor: '#E53935', color: 'white', fontSize: '11px', fontWeight: '900', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'white' }}></span> BREAKING
        </span>
        <div className="breaking-marquee" style={{ fontSize: '12px', color: '#D7E0EA' }}>
          <div className="breaking-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="breaking-group" aria-hidden={copy === 1 ? "true" : undefined}>
                {breakingItems.map((item, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span style={{ padding: '0 24px' }}>{item}</span>
                    <span style={{ color: '#E53935', fontSize: '8px' }}>◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <span style={{ flexShrink: 0, fontSize: '9px', color: '#8C9BAE', fontFamily: 'monospace', letterSpacing: '2px' }}>NOWLINE · NEWS DESK</span>
      </div>

      <main className="live-main">
        <section className="live-grid-main">
          
          <div className="notched-folder-container">
            <div className="notched-folder-tab">
              <i className="fa-solid fa-record-vinyl" style={{ fontSize: '10px', animation: 'spin 2s linear infinite' }}></i>
              <span>[ GLOBAL CRISIS COVERAGE ]</span>
            </div>

            <div className="live-card" style={{ borderRadius: '0 0 12px 12px' }}>
              
              <div className="live-card-header">
                <div className="live-flex-row">
                  <span className="live-flex-row" style={{ color: '#E53935', fontWeight: 'bold', fontFamily: 'monospace' }}>
                    <i className="fa-solid fa-circle" style={{ fontSize: '8px', animation: 'pulse 1.5s infinite' }}></i> TRANSMISSION FEED #1
                  </span>
                  <span style={{ color: '#222D3A' }}>|</span>
                  <span style={{ color: '#8C9BAE', fontFamily: 'monospace' }}><i className="fa-regular fa-clock" style={{ marginRight: '4px' }} />{localTime || "LOCAL TIME"}</span>
                  <span style={{ color: '#222D3A' }}>|</span>
                  <span style={{ color: '#8C9BAE', fontFamily: 'monospace' }}><i className="fa-solid fa-location-dot" style={{ marginRight: '4px' }} />GLOBAL COVERAGE</span>
                  <span style={{ color: '#222D3A' }}>|</span>
                  <span style={{ color: '#8C9BAE', fontFamily: 'monospace' }}><i className="fa-solid fa-signal" style={{ marginRight: '4px' }} />LATENCY {latencyInfo}</span>
                </div>

                <div className="live-flex-row" style={{ background: '#070A0F', padding: '4px', borderRadius: '4px', border: '1px solid #222D3A' }}>
                  <button
                    onClick={() => setFeedMode("video")}
                    style={{ padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', background: feedMode === "video" ? "#222D3A" : "transparent", color: feedMode === "video" ? "white" : "#8C9BAE" }}
                  >
                    <i className="fa-solid fa-video" style={{ fontSize: '10px' }}></i> VIDEO
                  </button>
                  <button
                    onClick={() => setFeedMode("satellite")}
                    style={{ padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', background: feedMode === "satellite" ? "#222D3A" : "transparent", color: feedMode === "satellite" ? "white" : "#8C9BAE" }}
                  >
                    <i className="fa-solid fa-globe" style={{ fontSize: '10px' }}></i> CRISIS MAP
                  </button>
                </div>
              </div>

              <div className="live-video-area">
                
                {feedMode === "video" && (
                  <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b' }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${diplomaticPressImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, mixBlendMode: 'luminosity', transform: 'scale(1.05)' }}></div>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, black, rgba(0,0,0,0.4), rgba(0,0,0,0.7))' }}></div>

                    <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 10 }}>
                      <span style={{ backgroundColor: 'rgba(229, 57, 53, 0.9)', color: 'white', fontSize: '10px', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }}></span> FEATURED CRISIS BRIEFING
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontFamily: 'monospace' }}>VIDEO LINKS PENDING SOURCE CONFIRMATION</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '16px', right: '16px', zIndex: 10 }}>
                      <span style={{ padding: '4px 10px', borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #222D3A', color: '#8C9BAE', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'monospace', fontWeight: '600', fontSize: '11px' }}>
                        <i className="fa-solid fa-circle-info"></i> RECORDED BRIEFING PLACEHOLDER
                      </span>
                    </div>

                    <div style={{ zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '400px' }}>
                      {!streamInitialized ? (
                        <>
                          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(229, 57, 53, 0.2)', border: '1px solid #E53935', color: '#E53935', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '24px' }}>
                            <i className="fa-solid fa-tower-broadcast"></i>
                          </div>
                          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>Global Crisis Intelligence</h3>
                          <p style={{ fontSize: '12px', color: '#8C9BAE', marginBottom: '16px' }}>Explore developing reports on conflict, natural hazards, climate events and verified relief coordination. Video links will open when a source is provided.</p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                            <button
                              onClick={() => {
                                setStreamInitialized(true);
                                showToast("No verified live-stream URL is configured yet. Choose Crisis Map to explore briefings.", "fa-circle-info");
                              }}
                              style={{ padding: '10px 20px', backgroundColor: '#E53935', color: 'white', fontSize: '12px', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                              <i className="fa-solid fa-play"></i> WATCH LIVE NOW
                            </button>
                          </div>
                        </>
                      ) : (
                        <div style={{ padding: '12px 20px', backgroundColor: 'rgba(0, 230, 118, 0.2)', border: '1px solid #00E676', color: '#00E676', fontSize: '12px', fontWeight: 'bold', borderRadius: '8px', display: 'inline-block' }}>
                          ● FEATURED REPORT SELECTED
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {feedMode === "satellite" && (
                  <div style={{ width: '100%', height: '100%', minHeight: '350px', backgroundColor: '#060B12', padding: '16px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: "linear-gradient(rgba(30,48,64,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(30,48,64,.35) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.35, background: "radial-gradient(ellipse at 48% 45%, rgba(0,217,255,.16), transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(229,57,53,.12), transparent 38%)" }} />
                    
                    <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <p style={{ fontSize: '10px', letterSpacing: '.22em', color: '#00D9FF', fontWeight: 'bold', margin: 0 }}>NOWLINE / WORLD MONITOR</p>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: '4px 0' }}>Global Crisis Intelligence Map</h3>
                        <p style={{ fontSize: '10px', color: '#8C9BAE', margin: 0 }}>Illustrative incident markers · select a node for its briefing</p>
                      </div>
                      <span style={{ fontSize: '9px', fontFamily: 'monospace', border: '1px solid #263748', backgroundColor: '#0A111A', padding: '4px 8px', color: '#8C9BAE' }}>MAP VIEW</span>
                    </div>

                    <div style={{ position: 'relative', zIndex: 10, height: '230px', border: '1px solid #1D3342', borderRadius: '12px', overflow: 'hidden', background: "radial-gradient(ellipse at center, #102331 0%, #09141E 62%, #070C12 100%)" }}>
                      <svg viewBox="0 0 900 420" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }} aria-hidden="true">
                        <g fill="#173343" stroke="#2A5365" strokeWidth="1.5">
                          <path d="M40 100 L95 65 165 60 205 92 190 128 148 145 125 184 90 172 72 140Z M160 190 L205 205 230 250 220 300 190 350 165 310 155 260Z M330 85 L390 65 450 82 470 115 445 135 420 128 400 160 365 145 345 115Z M405 160 L455 175 480 225 460 285 430 335 400 280 390 225Z M475 90 L555 65 650 75 710 100 770 95 825 125 795 155 725 150 680 180 625 160 590 185 550 150 510 155 480 125Z M635 205 L690 215 730 255 710 305 675 330 650 285 620 250Z M755 325 L805 315 835 340 815 365 775 360Z" />
                        </g>
                        <g stroke="#244657" strokeWidth="1" strokeDasharray="4 7"><path d="M0 105 H900 M0 210 H900 M0 315 H900 M150 0 V420 M300 0 V420 M450 0 V420 M600 0 V420 M750 0 V420" /></g>
                      </svg>
                      
                      {radarLocations.map((loc) => (
                        <button key={loc.id} type="button" style={{ position: 'absolute', top: loc.top, left: loc.left, color: loc.color, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 20 }} onClick={() => { setSelectedHotspot(loc); showToast(`Briefing opened: ${loc.name}`, "fa-location-dot"); }}>
                          <span style={{ position: 'absolute', width: '28px', height: '28px', borderRadius: '50%', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.25, backgroundColor: loc.color }} />
                          <span style={{ position: 'relative', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid white', backgroundColor: loc.color, boxShadow: '0 0 16px currentColor' }} />
                          <span style={{ marginTop: '4px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(5, 10, 16, 0.9)', border: '1px solid #2B4050', fontSize: '9px', fontWeight: 'bold', whiteSpace: 'nowrap', color: 'white' }}>{loc.name}</span>
                        </button>
                      ))}
                    </div>

                    <div style={{ position: 'relative', zIndex: 10, marginTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '10px', color: '#AAB8C7' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E53935' }} /> Armed conflict</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFB300' }} /> Natural / climate hazard</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00D9FF' }} /> Relief / diplomacy</span>
                    </div>

                    {selectedHotspot && (
                      <div style={{ position: 'relative', zIndex: 10, marginTop: '12px', padding: '12px', borderRadius: '8px', border: '1px solid #284252', backgroundColor: 'rgba(10, 18, 27, 0.95)', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                          <strong style={{ color: selectedHotspot.color }}>{selectedHotspot.name}</strong>
                          <span style={{ color: '#8C9BAE' }}>{selectedHotspot.coords} · {selectedHotspot.severity}</span>
                        </div>
                        <p style={{ color: 'white', margin: 0 }}>{selectedHotspot.update}</p>
                        <p style={{ color: '#8C9BAE', margin: 0 }}><strong style={{ color: '#00D9FF' }}>AID / SAFETY:</strong> {selectedHotspot.aid}</p>
                      </div>
                    )}
                    <p style={{ position: 'relative', zIndex: 10, fontSize: '9px', color: '#65788A', marginTop: '8px' }}>This map is a UI demonstration, not a real-time verified emergency feed.</p>
                  </div>
                )}
              </div>

              <div style={{ background: 'linear-gradient(to right, #070A0F, #141C24, #070A0F)', borderTop: '1px solid #222D3A', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div className="live-flex-row">
                  <span style={{ color: '#8C9BAE' }}>SIGNAL STATUS:</span>
                  <span style={{ padding: '2px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', border: '1px solid', backgroundColor: streamActive ? 'rgba(0, 230, 118, 0.1)' : 'rgba(229, 57, 53, 0.1)', color: streamActive ? '#00E676' : '#E53935', borderColor: streamActive ? 'rgba(0, 230, 118, 0.3)' : 'rgba(229, 57, 53, 0.3)' }}>
                    {streamActive ? "COVERAGE DASHBOARD ACTIVE" : "NO LIVE URL CONFIGURED"}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8C9BAE', fontFamily: 'monospace', fontSize: '11px' }}>
                  <i className="fa-solid fa-globe" style={{ color: '#00D9FF' }}></i>
                  <span>GLOBAL CRISIS DESK</span>
                </div>
              </div>

            </div>
          </div>

          <div className="live-sidebar tactical-chamfer-box">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222D3A', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#8C9BAE', fontWeight: 'bold' }}>SUMMARY FILE: G-MAR-21</span>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0 }}>Coverage Briefing</h2>
              </div>
              
              <div style={{ padding: '8px 16px', textAlign: 'center', backgroundColor: '#10161E', border: '1px solid #222D3A' }} className="hex-badge">
                <span style={{ fontSize: '9px', color: '#8C9BAE', display: 'block', textTransform: 'uppercase', fontWeight: 'bold', fontFamily: 'monospace' }}>THREAT LEVEL</span>
                <span style={{ fontSize: '12px', color: '#FFB300', fontWeight: '900', letterSpacing: '0.5px' }}>ELEVATED (L4)</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div style={{ backgroundColor: '#070A0F', padding: '12px', borderRadius: '8px', border: '1px solid #222D3A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8C9BAE' }}>PRIMARY LOCATION</span>
                <span style={{ color: 'white', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <i className="fa-solid fa-location-dot" style={{ color: '#E53935' }}></i> Global coverage desk
                </span>
              </div>

              <div style={{ backgroundColor: '#070A0F', padding: '12px', borderRadius: '8px', border: '1px solid #222D3A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8C9BAE' }}>FOCUS DOMAIN</span>
                <span style={{ color: 'white', fontWeight: '600' }}>Conflict · Climate · Disasters · Relief</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '4px' }}>
                <div style={{ padding: '10px 12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#10161E', border: '1px solid #222D3A' }} className="hex-badge" onClick={() => setVerificationOpen(true)}>
                  <span style={{ fontSize: '9px', color: '#8C9BAE', display: 'block', fontFamily: 'monospace' }}>VERIFICATION</span>
                  <span style={{ fontSize: '12px', color: '#00E676', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <i className="fa-solid fa-circle-check" style={{ fontSize: '10px' }}></i> 4/4 Matrix
                  </span>
                </div>

                <div style={{ padding: '10px 12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#10161E', border: '1px solid #222D3A' }} className="hex-badge">
                  <span style={{ fontSize: '9px', color: '#8C9BAE', display: 'block', fontFamily: 'monospace' }}>SOURCE LOG</span>
                  <span style={{ fontSize: '11px', color: 'white', fontWeight: 'bold', letterSpacing: '-0.5px' }}>Reuters · Copernicus</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #222D3A', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: '#E53935', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fa-solid fa-clock-rotate-left"></i> WHAT TO WATCH NEXT
                </span>
                <span style={{ fontSize: '9px', padding: '2px 6px', backgroundColor: '#222D3A', color: '#8C9BAE', borderRadius: '4px', fontFamily: 'monospace' }}>UPCOMING</span>
              </div>
              <div style={{ backgroundColor: '#070A0F', borderRadius: '8px', border: '1px solid #222D3A', padding: '12px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '500' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E53935' }}></span>
                  <p style={{ margin: 0, lineHeight: 1.4 }}><span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>• 16:00 UTC</span> - Emergency IAEA Presser</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '500', borderTop: '1px solid rgba(34,45,58,0.6)', paddingTop: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFB300' }}></span>
                  <p style={{ margin: 0, lineHeight: 1.4 }}><span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>• 18:30 UTC</span> - UN Security Council Vote</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#00E676', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-bolt-lightning"></i> 5-SECOND BRIEF
              </span>
              <div style={{ backgroundColor: '#070A0F', borderRadius: '8px', border: '1px solid #222D3A', padding: '12px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(255,255,255,0.9)' }}>
                  <i className="fa-solid fa-check" style={{ color: '#00E676', marginTop: '2px' }}></i>
                  <p style={{ margin: 0, lineHeight: 1.5 }}>High-resolution Sentinel-5P satellite image processing.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(255,255,255,0.9)', borderTop: '1px solid rgba(34,45,58,0.5)', paddingTop: '8px' }}>
                  <i className="fa-solid fa-check" style={{ color: '#00E676', marginTop: '2px' }}></i>
                  <p style={{ margin: 0, lineHeight: 1.5 }}>Unfiltered OSINT (Open-Source Intelligence) verification.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(255,255,255,0.9)', borderTop: '1px solid rgba(34,45,58,0.5)', paddingTop: '8px' }}>
                  <i className="fa-solid fa-check" style={{ color: '#00E676', marginTop: '2px' }}></i>
                  <p style={{ margin: 0, lineHeight: 1.5 }}>Open access to raw dispatch dossiers for researchers and students.</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #222D3A', paddingTop: '16px' }}>
              <span style={{ fontSize: '10px', color: '#8C9BAE', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontWeight: 'bold' }}>ACTION TOOLBAR</span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                <button
                  onClick={playAudioBrief}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#1B2530', border: '1px solid #222D3A', color: 'white', fontSize: '12px', fontWeight: '600', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <i className={`fa-solid ${synthSpeaking ? "fa-volume-high text-[#FFB300]" : "fa-headphones text-[#FFB300]"}`}></i>
                  <span>{synthSpeaking ? "STOP AUDIO BRIEF" : "60-SEC AUDIO BRIEF"}</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => { navigator.clipboard.writeText(window.location.href); showToast("Coverage link copied to clipboard!", "fa-link"); }}
                    style={{ flex: 1, padding: '8px', backgroundColor: '#1B2530', border: '1px solid #222D3A', color: 'white', fontSize: '12px', fontWeight: '600', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <i className="fa-solid fa-link" style={{ color: '#8C9BAE' }}></i> COPY LINK
                  </button>

                  <button
                    onClick={() => showToast("Exporting Intel Briefing PDF...", "fa-file-pdf")}
                    style={{ flex: 1, padding: '8px', backgroundColor: '#1B2530', border: '1px solid #222D3A', color: 'white', fontSize: '12px', fontWeight: '600', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <i className="fa-solid fa-file-pdf" style={{ color: '#E53935' }}></i> EXPORT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="live-grid-bottom">
          
          <div className="wireframe-grid-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222D3A', paddingBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.5px' }}>
                <span style={{ fontSize: '16px' }}>🛡️</span> SUPPORT UNBIASED INTELLIGENCE
              </span>
              <span style={{ fontSize: '10px', padding: '2px 8px', backgroundColor: 'rgba(229, 57, 53, 0.1)', border: '1px solid rgba(229, 57, 53, 0.3)', color: '#E53935', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                READER BACKED
              </span>
            </div>

            <p style={{ fontSize: '12px', color: '#8C9BAE', lineHeight: '1.6', margin: 0 }}>
              NOWLINE relies on reader backing to deliver uncorrupted coverage.
            </p>

            <form onSubmit={handleSupportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '12px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', color: '#8C9BAE', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Choose Contribution Frequency</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', backgroundColor: 'rgba(7, 10, 15, 0.8)', padding: '10px', borderRadius: '8px', border: '1px solid #222D3A' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'white', fontSize: '12px', fontWeight: '500' }}>
                    <input type="radio" checked={donationFreq === "monthly"} onChange={() => setDonationFreq("monthly")} style={{ accentColor: '#E53935' }} />
                    <span>Monthly Membership</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#8C9BAE', fontSize: '12px', fontWeight: '500' }}>
                    <input type="radio" checked={donationFreq === "onetime"} onChange={() => setDonationFreq("onetime")} style={{ accentColor: '#E53935' }} />
                    <span>One-Time Backing</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', color: '#8C9BAE', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Select Tier / Amount</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  <button type="button" onClick={() => setSelectedTier("5")} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: selectedTier === "5" ? '#E53935' : '#070A0F', color: selectedTier === "5" ? 'white' : '#8C9BAE', borderColor: selectedTier === "5" ? '#E53935' : '#222D3A' }}>$5 / mo</button>
                  <button type="button" onClick={() => setSelectedTier("15")} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: selectedTier === "15" ? '#E53935' : '#070A0F', color: selectedTier === "15" ? 'white' : '#8C9BAE', borderColor: selectedTier === "15" ? '#E53935' : '#222D3A' }}>$15 / mo</button>
                  <button type="button" onClick={() => setSelectedTier("50")} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: selectedTier === "50" ? '#E53935' : '#070A0F', color: selectedTier === "50" ? 'white' : '#8C9BAE', borderColor: selectedTier === "50" ? '#E53935' : '#222D3A' }}>$50 / mo</button>
                  <button type="button" onClick={() => setSelectedTier("custom")} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: selectedTier === "custom" ? '#E53935' : '#070A0F', color: selectedTier === "custom" ? 'white' : '#8C9BAE', borderColor: selectedTier === "custom" ? '#E53935' : '#222D3A' }}>Custom $</button>
                </div>

                {selectedTier === "custom" && (
                  <input type="number" placeholder="Enter Custom Amount ($)" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} style={{ width: '100%', marginTop: '8px', backgroundColor: '#070A0F', border: '1px solid #222D3A', borderRadius: '8px', padding: '8px', fontSize: '12px', color: 'white', outline: 'none' }} autoFocus />
                )}
              </div>

              <div style={{ backgroundColor: 'rgba(7, 10, 15, 0.8)', borderRadius: '8px', border: '1px solid #222D3A', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: 'white', fontWeight: 'bold', display: 'block', borderBottom: '1px solid #222D3A', paddingBottom: '4px' }}>
                  What your ${selectedTier === "custom" ? (customAmount || "0") : selectedTier}/mo funds:
                </span>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#8C9BAE' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#00E676', fontWeight: 'bold' }}>✓</span> High-resolution Sentinel-5P satellite image processing.</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#00E676', fontWeight: 'bold' }}>✓</span> Unfiltered OSINT (Open-Source Intelligence) verification.</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#00E676', fontWeight: 'bold' }}>✓</span> Ad-free, tracking-free reader experience.</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#00E676', fontWeight: 'bold' }}>✓</span> Open access to raw dispatch dossiers.</li>
                </ul>
              </div>

              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#E53935', color: 'white', fontWeight: 'bold', fontSize: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <span>💳 SUPPORT NOWLINE NETWORK</span>
              </button>

              <div style={{ fontSize: '10px', color: '#8C9BAE', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'monospace', paddingTop: '4px' }}>
                <span>🔒 256-bit Encrypted</span>
                <span>·</span>
                <span>Cancel anytime</span>
              </div>

            </form>
          </div>

          <div className="wireframe-grid-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid #222D3A', paddingBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-chart-simple" style={{ color: '#FFB300' }}></i> NEWSROOM IMPACT PULSE
              </span>
              <span style={{ color: '#8C9BAE', fontSize: '10px', fontFamily: 'monospace' }}>VERIFIED POLL</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '8px 0' }}>
              <p style={{ fontSize: '12px', color: 'white', fontWeight: '500', lineHeight: '1.6', margin: 0 }}>
                Will the established Red Sea maritime security corridor stabilize Q4 commercial trade routes?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <button onClick={() => castVote("yes")} style={{ width: '100%', backgroundColor: 'rgba(7, 10, 15, 0.8)', padding: '12px', borderRadius: '8px', border: '1px solid #222D3A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: 'white' }}>
                  <span>Yes, high probability ({yesPercent}%)</span>
                  <span style={{ color: '#00E676', fontWeight: 'bold', fontFamily: 'monospace' }}>{yesPercent}%</span>
                </button>
                <button onClick={() => castVote("no")} style={{ width: '100%', backgroundColor: 'rgba(7, 10, 15, 0.8)', padding: '12px', borderRadius: '8px', border: '1px solid #222D3A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: 'white' }}>
                  <span>No, strategic delay expected ({noPercent}%)</span>
                  <span style={{ color: '#FFB300', fontWeight: 'bold', fontFamily: 'monospace' }}>{noPercent}%</span>
                </button>
              </div>
            </div>

            <div style={{ fontSize: '10px', color: '#8C9BAE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(34, 45, 58, 0.6)' }}>
              <span>Total Votes: <span style={{ color: 'white', fontWeight: 'bold', fontFamily: 'monospace' }}>{totalVotes.toLocaleString()}</span></span>
              <span style={{ color: '#00E676', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'monospace' }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: '9px' }}></i> Saved in this browser
              </span>
            </div>
          </div>

        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', borderBottom: '1px solid #222D3A', paddingBottom: '16px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#E53935', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', fontFamily: 'monospace' }}>LATEST UPDATES</span>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>News & Field Reports</h2>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
              {["all", "geopolitics", "climate", "society"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{ padding: '6px 12px', borderRadius: '20px', textTransform: 'uppercase', fontWeight: '600', cursor: 'pointer', border: selectedCategory === cat ? 'none' : '1px solid #222D3A', backgroundColor: selectedCategory === cat ? '#E53935' : '#10161E', color: selectedCategory === cat ? 'white' : '#8C9BAE' }}
                >
                  {cat === "all" ? "ALL NEWS" : cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {filteredDispatches.map((dispatch) => {
              const isExpanded = !!expandedDispatches[dispatch.id];
              return (
                <article key={dispatch.id} id={dispatch.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                  
                  <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(34,45,58,0.6)', paddingBottom: '12px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ padding: '4px 8px', backgroundColor: '#222D3A', color: 'white', borderRadius: '4px', fontWeight: '600', fontSize: '11px' }}>{dispatch.categoryLabel}</span>
                      <span style={{ padding: '4px 8px', backgroundColor: '#10161E', border: '1px solid #222D3A', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', color: '#00E676', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <i className="fa-solid fa-circle-check"></i> {dispatch.status}
                      </span>
                    </div>
                    <span style={{ color: '#8C9BAE', fontSize: '11px', fontFamily: 'monospace' }}>SOURCE: {dispatch.source}</span>
                  </div>

                  <div className="live-dispatch-card" style={{ width: '100%' }}>
                    <div className="live-dispatch-inner">
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #222D3A', position: 'relative', aspectRatio: '16/9', backgroundColor: 'black' }}>
                        <img src={dispatch.image} alt={dispatch.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                        <span style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '4px 8px', fontFamily: 'monospace', fontSize: '9px', color: '#F0F4F8', borderRadius: '4px', border: '1px solid #222D3A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {dispatch.imageCaption || "LIVE MEDIA FEED"}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0, lineHeight: 1.3 }}>{dispatch.title}</h3>
                        <p style={{ fontSize: '12px', color: '#8C9BAE', lineHeight: '1.6', margin: 0 }}>{dispatch.summary}</p>

                        <div style={{ paddingTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <button onClick={() => toggleDispatchExpand(dispatch.id)} style={{ fontSize: '12px', color: '#E53935', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <span>{isExpanded ? "HIDE DETAILS" : "READ FULL DISPATCH"}</span>
                            <i className={`fa-solid fa-chevron-${isExpanded ? "up" : "down"}`} style={{ fontSize: '10px' }}></i>
                          </button>

                          <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/live#${dispatch.id}`); showToast(`Copied share link for ${dispatch.id}`, "fa-link"); }} style={{ color: '#8C9BAE', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <i className="fa-solid fa-link"></i> Share
                          </button>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{ borderTop: '1px solid rgba(34,45,58,0.6)', paddingTop: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', backgroundColor: 'rgba(7,10,15,0.6)', padding: '16px', borderRadius: '8px' }}>
                        <h4 style={{ fontWeight: 'bold', color: '#E53935', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', fontFamily: 'monospace', margin: 0 }}>WHAT WE KNOW SO FAR</h4>
                        {dispatch.bullets && (
                          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', color: '#8C9BAE', margin: 0 }}>
                            {dispatch.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}
                        {dispatch.quote && (
                          <div style={{ padding: '12px', backgroundColor: '#10161E', borderLeft: '2px solid #E53935', color: 'white', fontStyle: 'italic' }}>
                            {dispatch.quote}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </article>
              );
            })}
          </div>

          <div style={{ paddingTop: '16px', borderTop: '1px solid #222D3A', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', fontSize: '12px' }}>
            <div style={{ color: '#8C9BAE', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'monospace' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00E676' }}></span>
              <span>AUTOMATIC FEED SYNC ACTIVE</span>
            </div>

            <button onClick={simulateIncomingDispatch} style={{ padding: '8px 16px', backgroundColor: '#1B2530', border: '1px solid #222D3A', color: 'white', fontWeight: 'bold', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <i className="fa-solid fa-plus" style={{ color: '#E53935' }}></i> SIMULATE LIVE DISPATCH
            </button>
          </div>
        </section>
      </main>

      {verificationOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#10161E', border: '1px solid #222D3A', maxWidth: '500px', width: '100%', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222D3A', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00E676', fontWeight: 'bold' }}>
                <i className="fa-solid fa-shield-halved"></i>
                <span>VERIFICATION MATRIX</span>
              </div>
              <button onClick={() => setVerificationOpen(false)} style={{ color: '#8C9BAE', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {["COPERNICUS SATELLITE NETWORK", "REUTERS NEWSROOM DESK", "UN SECURITY COUNCIL TELEMETRY", "GENEVA ATMOSPHERIC MONITOR"].map((src, idx) => (
                <div key={idx} style={{ padding: '10px', backgroundColor: '#070A0F', borderRadius: '4px', border: '1px solid #222D3A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{idx + 1}. {src}</span>
                  <span style={{ color: '#00E676', fontWeight: 'bold', fontFamily: 'monospace' }}>VERIFIED 100%</span>
                </div>
              ))}
            </div>

            <button onClick={() => setVerificationOpen(false)} style={{ width: '100%', padding: '8px', backgroundColor: '#222D3A', color: 'white', fontWeight: 'bold', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
              CLOSE MATRIX
            </button>
          </div>
        </div>
      )}

      {toast.visible && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#10161E', border: '1px solid #E53935', color: 'white', padding: '12px 16px', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 50 }}>
          <i className={`fa-solid ${toast.icon}`} style={{ color: '#E53935' }}></i>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}