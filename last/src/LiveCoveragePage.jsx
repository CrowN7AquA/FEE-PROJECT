import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, signOut } from "./firebase";

// Local image imports from src/
import arcticIceImg from "./willian-justen-de-vasconcellos-LzwNq8DVQzs-unsplash.jpg";
import crisisMapImg from "./kelsey-knight-SFRw5GChoLA-unsplash.jpg";
import diplomaticPressImg from "./history-in-hd-v_e3Hha4EBA-unsplash.jpg";

export default function LiveCoveragePage({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Navigation Dropdown
  const [topicsOpen, setTopicsOpen] = useState(false);

  // Time & Weather Clock
  const [localTime, setLocalTime] = useState("");
  const weatherInfo = "Global crisis desk";
  const locationInfo = "Global coverage";
  const latencyInfo = "120 ms"; // placeholder value — connect to the real feed latency when available

  // Media Player Modes: 'video' | 'satellite'
  const [feedMode, setFeedMode] = useState("video");
  const [streamActive, setStreamActive] = useState(true);
  const [streamInitialized, setStreamInitialized] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [synthSpeaking, setSynthSpeaking] = useState(false);

  // Reader Poll
  const [pollVotes, setPollVotes] = useState({ yes: 1008, no: 474 });
  const [hasVoted, setHasVoted] = useState(false);

  // Donation State
  const [donationFreq, setDonationFreq] = useState("monthly"); // 'monthly' | 'onetime'
  const [selectedTier, setSelectedTier] = useState("15"); // '5', '15', '50', 'custom'
  const [customAmount, setCustomAmount] = useState("");

  // Filters & Dispatches
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

  // Modals & UI States
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", icon: "fa-circle-info" });

  // Crisis map locations. These are illustrative story locations, not a live verified data feed.
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
    if (localStorage.getItem("nowline_voted")) {
      setHasVoted(true);
    }
  }, []);

  const showToast = (message, icon = "fa-circle-info") => {
    setToast({ visible: true, message, icon });
    setTimeout(() => {
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
    const newId = "dispatch-" + (dispatches.length + 1);

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
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#070A0F",
        color: "#F0F4F8",
        backgroundImage: "radial-gradient(circle at 50% 0%, rgba(229, 57, 53, 0.05) 0%, transparent 60%), linear-gradient(to bottom, #070A0F, #0B0F14)"
      }}
      className="flex flex-col antialiased selection:bg-[#E53935] selection:text-white"
    >
      {/* TACTICAL HUD CUSTOM CSS SHAPES */}
      <style>{`
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

        /* Horizontally scrolling breaking-news headlines */
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
        .breaking-marquee:hover .breaking-track {
          animation-play-state: paused;
        }
        .breaking-group {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
        }

        /* Moon-like 1:1 Circle Hover Transition for .live */
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
        .live-link-container:hover {
          background-color: rgba(229, 57, 53, 0.12);
          box-shadow: 0 0 16px rgba(229, 57, 53, 0.25);
        }
        .live-link-container:hover::before {
          opacity: 1;
        }

        /* 1. CHAMFERED / ANGLED TACTICAL CORNERS */
        .tactical-chamfer-box {
          clip-path: polygon(
            0 0, 
            calc(100% - 16px) 0, 
            100% 16px, 
            100% 100%, 
            16px 100%, 
            0 calc(100% - 16px)
          );
          background: #10161E;
          border: 1px solid rgba(229, 57, 53, 0.3);
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.6);
        }

        .tactical-chamfer-tag {
          clip-path: polygon(
            0 0, 
            calc(100% - 10px) 0, 
            100% 10px, 
            100% 100%, 
            10px 100%, 
            0 calc(100% - 10px)
          );
        }

        /* 3. HEXAGONAL / FLOATING HEX-GRID DOSSIER BADGES */
        .hex-badge {
          clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
          background: linear-gradient(135deg, rgba(20, 28, 36, 0.95), rgba(11, 15, 20, 0.95));
          border: 1px solid rgba(34, 45, 58, 0.8);
          transition: all 0.3s ease;
        }
        .hex-badge:hover {
          border-color: rgba(229, 57, 53, 0.6);
          box-shadow: 0 0 12px rgba(229, 57, 53, 0.2);
        }

        /* 4. NOTCHED FOLDER TAB CONTAINER */
        .notched-folder-container {
          position: relative;
          padding-top: 28px;
        }
        .notched-folder-tab {
          position: absolute;
          top: 0;
          left: 16px;
          height: 28px;
          padding: 0 16px;
          background: #141C24;
          border-t: 1px solid #222D3A;
          border-l: 1px solid #222D3A;
          border-r: 1px solid #222D3A;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #E53935;
          text-transform: uppercase;
          z-index: 10;
        }

        /* 5. SEAMLESS FULL-BLEED WIREFRAME GRID CARDS */
        .wireframe-grid-card {
          background-color: transparent;
          background-image: 
            linear-gradient(to right, rgba(34, 45, 58, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 45, 58, 0.15) 1px, transparent 1px);
          background-size: 24px 24px;
          border-left: 2px solid rgba(229, 57, 53, 0.4);
          border-top: 1px solid rgba(34, 45, 58, 0.5);
          position: relative;
        }
        .wireframe-grid-card::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 8px;
          height: 8px;
          border-top: 2px solid #E53935;
          border-right: 2px solid #E53935;
        }
      `}</style>

      {/* HEADER NAVBAR */}
      <header className="border-b border-[#222D3A] bg-[#070A0F]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo — Matching About Us Page */}
            <Link to={user ? "/MainPage" : "/"} className="logo">
              <span className="logo-box">N</span> NOWLINE
            </Link>

            {/* Nav Menu */}
            <nav className="flex items-center gap-4 text-xs font-semibold tracking-wider">
              {user && (
                <div
                  className="relative"
                  onMouseEnter={() => setTopicsOpen(true)}
                  onMouseLeave={() => setTopicsOpen(false)}
                >
                  <button className="flex items-center gap-1 text-[#8C9BAE] hover:text-white transition-colors uppercase bg-transparent border-none cursor-pointer">
                    TOPICS <span className="text-[10px]">▾</span>
                  </button>
                  {topicsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-[#141C24] border border-[#222D3A] rounded-md shadow-xl py-2 z-50">
                      {["Climate", "Historical", "Geographical", "Disasters", "World", "Politics", "Science", "Economy"].map((t) => (
                        <a
                          key={t}
                          href={`#${t.toLowerCase()}`}
                          className="block px-4 py-1.5 text-xs text-[#8C9BAE] hover:text-white hover:bg-[#1B2530] text-decoration-none"
                        >
                          {t}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Link
                to="/MainPage"
                className={`text-decoration-none transition-colors ${
                  currentPath === "/MainPage" ? "text-[#E53935] font-bold" : "text-[#8C9BAE] hover:text-white"
                }`}
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    navigate("/");
                  }
                }}
              >
                STORIES
              </Link>

              <Link
                to="/about"
                className={`text-decoration-none transition-colors ${
                  currentPath === "/about" ? "text-[#E53935] font-bold" : "text-[#8C9BAE] hover:text-white"
                }`}
              >
                ABOUT
              </Link>

              {/* LIVE Nav Link with 1:1 Moon Circle Orbit */}
              <Link
                to="/live"
                className={`live-link-container text-decoration-none transition-colors ${
                  currentPath === "/live" ? "text-[#E53935] font-bold" : "text-[#8C9BAE] hover:text-white"
                }`}
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    navigate("/");
                  }
                }}
                title="Live Crisis Coverage Feed"
              >
                <div className="flex flex-col items-center justify-center leading-none gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E53935] animate-pulse"></span>
                  <span className="text-[10px] font-bold tracking-tight">LIVE</span>
                </div>
              </Link>
            </nav>

            {/* Profile controls only — telemetry is aligned with the transmission feed below. */}
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <button onClick={() => navigate("/MainPage")} className="profile-btn" style={{ border: "none", background: "transparent", boxShadow: "none" }}>
                    {user.displayName || user.email?.split("@")[0]}
                  </button>
                  <button onClick={handleLogout} className="profile-btn" style={{ border: "none", background: "transparent", boxShadow: "none" }}>Sign Out</button>
                </>
              ) : (
                <Link to="/" className="profile-btn text-decoration-none" style={{ border: "none", background: "transparent", boxShadow: "none" }}>Sign in</Link>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ROTATING BREAKING NEWS STRIP */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-4">
        <div className="tactical-chamfer-box p-3 relative overflow-hidden flex items-center gap-3 min-h-[52px]">
          <span className="tactical-chamfer-tag flex-shrink-0 px-3 py-1 bg-[#E53935] text-white text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> BREAKING
          </span>
          <div className="breaking-marquee text-xs text-[#D7E0EA]">
            <div className="breaking-track">
              {[0, 1].map((copy) => (
                <div key={copy} className="breaking-group" aria-hidden={copy === 1 ? "true" : undefined}>
                  {breakingItems.map((item, i) => (
                    <span key={i} className="inline-flex items-center">
                      <span className="px-6">{item}</span>
                      <span className="text-[#E53935] text-[8px]">◆</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <span className="flex-shrink-0 text-[9px] text-[#8C9BAE] font-mono tracking-widest">NOWLINE · NEWS DESK</span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* SECTION 1: HERO BROADCAST PLAYER & COVERAGE DOSSIER */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 4. NOTCHED FOLDER TAB LAYOUT FOR MAIN VIEWPORT TERMINAL */}
          <div className="lg:col-span-8 notched-folder-container">
            <div className="notched-folder-tab">
              <i className="fa-solid fa-record-vinyl text-[10px] animate-spin"></i>
              <span>[ GLOBAL CRISIS COVERAGE ]</span>
            </div>

            <div className="bg-[#10161E] border border-[#222D3A] rounded-b-xl overflow-hidden shadow-2xl flex flex-col">
              
              <div className="bg-[#070A0F]/80 border-b border-[#222D3A] px-4 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-[#E53935] font-bold font-mono">
                    <i className="fa-solid fa-circle text-[8px] animate-pulse"></i> TRANSMISSION FEED #1
                  </span>
                  <span className="text-[#222D3A]">|</span>
                  <span className="text-[#8C9BAE] hidden sm:inline font-mono"><i className="fa-regular fa-clock mr-1" />{localTime || "LOCAL TIME"}</span>
                  <span className="text-[#222D3A] hidden sm:inline">|</span>
                  <span className="text-[#8C9BAE] hidden sm:inline font-mono"><i className="fa-solid fa-location-dot mr-1" />GLOBAL COVERAGE</span>
                  <span className="text-[#222D3A] hidden sm:inline">|</span>
                  <span className="text-[#8C9BAE] hidden sm:inline font-mono"><i className="fa-solid fa-signal mr-1" />LATENCY {latencyInfo}</span>
                </div>

                {/* VIDEO and RADAR Toggle Options */}
                <div className="flex items-center gap-1 bg-[#070A0F] p-1 rounded border border-[#222D3A]">
                  <button
                    onClick={() => setFeedMode("video")}
                    className={`px-3 py-1 rounded transition-all font-semibold cursor-pointer border-none flex items-center gap-1.5 ${
                      feedMode === "video" ? "bg-[#222D3A] text-white shadow" : "bg-transparent text-[#8C9BAE] hover:text-white"
                    }`}
                  >
                    <i className="fa-solid fa-video text-[10px]"></i> VIDEO
                  </button>
                  <button
                    onClick={() => setFeedMode("satellite")}
                    className={`px-3 py-1 rounded transition-all font-semibold cursor-pointer border-none flex items-center gap-1.5 ${
                      feedMode === "satellite" ? "bg-[#222D3A] text-white shadow" : "bg-transparent text-[#8C9BAE] hover:text-white"
                    }`}
                  >
                    <i className="fa-solid fa-globe text-[10px]"></i> CRISIS MAP
                  </button>
                </div>
              </div>

              {/* Screen Viewport with Video / Radar Modes */}
              <div className="relative bg-black aspect-video w-full flex items-center justify-center overflow-hidden">
                
                {feedMode === "video" && (
                  <div className="w-full h-full relative flex items-center justify-center bg-zinc-950">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-luminosity scale-105 transition-transform duration-1000"
                      style={{
                        backgroundImage: `url(${diplomaticPressImg})`
                      }}
                    ></div>

                    {/* Vignette & Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70"></div>

                    {/* Media Tag: FEATURED CRISIS BRIEFING */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
                      <span className="bg-[#E53935]/90 text-white text-[10px] px-2.5 py-1 rounded uppercase font-bold tracking-wider shadow-lg flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                        FEATURED CRISIS BRIEFING
                      </span>
                      <span className="text-white/80 text-[11px] font-mono drop-shadow-md">VIDEO LINKS PENDING SOURCE CONFIRMATION</span>
                    </div>

                    <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs z-10">
                      <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur border border-[#222D3A] text-[#8C9BAE] flex items-center gap-1.5 font-mono font-semibold">
                        <i className="fa-solid fa-circle-info"></i> RECORDED BRIEFING PLACEHOLDER
                      </span>
                    </div>

                    <div className="z-10 text-center px-6 max-w-md">
                      {!streamInitialized ? (
                        <>
                          <div className="w-16 h-16 rounded-full bg-[#E53935]/20 border border-[#E53935] text-[#E53935] flex items-center justify-center mx-auto mb-3 text-2xl shadow-lg shadow-[#E53935]/30 animate-pulse">
                            <i className="fa-solid fa-tower-broadcast"></i>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">Global Crisis Intelligence</h3>
                          <p className="text-xs text-[#8C9BAE] mb-4">Explore developing reports on conflict, natural hazards, climate events and verified relief coordination. Video links will open when a source is provided.</p>
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => {
                                setStreamInitialized(true);
                                showToast("No verified live-stream URL is configured yet. Choose Crisis Map to explore briefings.", "fa-circle-info");
                              }}
                              className="px-5 py-2.5 bg-[#E53935] hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-[#E53935]/30 cursor-pointer border-none"
                            >
                              <i className="fa-solid fa-play"></i> WATCH LIVE NOW
                            </button>

                          </div>
                        </>
                      ) : (
                        <div className="px-5 py-3 bg-[#00E676]/20 border border-[#00E676] text-[#00E676] text-xs font-bold rounded-lg animate-pulse inline-block shadow-lg">
                          ● FEATURED REPORT SELECTED
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* GLOBAL CRISIS INTELLIGENCE MAP */}
                {feedMode === "satellite" && (
                  <div className="w-full h-full min-h-[350px] bg-[#060B12] p-4 sm:p-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(30,48,64,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(30,48,64,.35) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                    <div className="absolute inset-0 opacity-35" style={{ background: "radial-gradient(ellipse at 48% 45%, rgba(0,217,255,.16), transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(229,57,53,.12), transparent 38%)" }} />
                    <div className="relative z-10 flex items-start justify-between gap-3 mb-3">
                      <div><p className="text-[10px] tracking-[.22em] text-[#00D9FF] font-bold">NOWLINE / WORLD MONITOR</p><h3 className="text-lg sm:text-xl font-bold text-white">Global Crisis Intelligence Map</h3><p className="text-[10px] text-[#8C9BAE] mt-1">Illustrative incident markers · select a node for its briefing</p></div>
                      <span className="text-[9px] font-mono border border-[#263748] bg-[#0A111A] px-2 py-1 text-[#8C9BAE]">MAP VIEW</span>
                    </div>
                    <div className="relative z-10 h-[230px] sm:h-[280px] border border-[#1D3342] rounded-xl overflow-hidden" style={{ background: "radial-gradient(ellipse at center, #102331 0%, #09141E 62%, #070C12 100%)" }}>
                      <svg viewBox="0 0 900 420" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-60" aria-hidden="true">
                        <g fill="#173343" stroke="#2A5365" strokeWidth="1.5">
                          <path d="M40 100 L95 65 165 60 205 92 190 128 148 145 125 184 90 172 72 140Z M160 190 L205 205 230 250 220 300 190 350 165 310 155 260Z M330 85 L390 65 450 82 470 115 445 135 420 128 400 160 365 145 345 115Z M405 160 L455 175 480 225 460 285 430 335 400 280 390 225Z M475 90 L555 65 650 75 710 100 770 95 825 125 795 155 725 150 680 180 625 160 590 185 550 150 510 155 480 125Z M635 205 L690 215 730 255 710 305 675 330 650 285 620 250Z M755 325 L805 315 835 340 815 365 775 360Z" />
                        </g>
                        <g stroke="#244657" strokeWidth="1" strokeDasharray="4 7"><path d="M0 105 H900 M0 210 H900 M0 315 H900 M150 0 V420 M300 0 V420 M450 0 V420 M600 0 V420 M750 0 V420" /></g>
                      </svg>
                      {radarLocations.map((loc) => (
                        <button key={loc.id} type="button" style={{ top: loc.top, left: loc.left, color: loc.color }} onClick={() => { setSelectedHotspot(loc); showToast(`Briefing opened: ${loc.name}`, "fa-location-dot"); }} className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex flex-col items-center bg-transparent border-none cursor-pointer">
                          <span className="absolute w-7 h-7 rounded-full animate-ping opacity-25" style={{ backgroundColor: loc.color }} />
                          <span className="relative w-4 h-4 rounded-full border-2 border-white shadow-[0_0_16px_currentColor]" style={{ backgroundColor: loc.color }} />
                          <span className="mt-1 px-1.5 py-0.5 rounded bg-[#050A10]/90 border border-[#2B4050] text-[8px] sm:text-[9px] font-bold whitespace-nowrap text-white group-hover:border-white">{loc.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="relative z-10 mt-3 grid grid-cols-3 gap-2 text-[9px] sm:text-[10px] text-[#AAB8C7]">
                      <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-[#E53935]" /> Armed conflict</span>
                      <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-[#FFB300]" /> Natural / climate hazard</span>
                      <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-[#00D9FF]" /> Relief / diplomacy</span>
                    </div>
                    {selectedHotspot && <div className="relative z-10 mt-3 p-3 rounded-lg border border-[#284252] bg-[#0A121B]/95 text-xs space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2"><strong style={{ color: selectedHotspot.color }}>{selectedHotspot.name}</strong><span className="text-[#8C9BAE]">{selectedHotspot.coords} · {selectedHotspot.severity}</span></div>
                      <p className="text-white">{selectedHotspot.update}</p><p className="text-[#8C9BAE]"><strong className="text-[#00D9FF]">AID / SAFETY:</strong> {selectedHotspot.aid}</p>
                    </div>}
                    <p className="relative z-10 text-[9px] text-[#65788A] mt-2">This map is a UI demonstration, not a real-time verified emergency feed.</p>
                  </div>
                )}

              </div>

              {/* Footer Bar with Gradient */}
              <div className="bg-gradient-to-r from-[#070A0F] via-[#141C24] to-[#070A0F] border-t border-[#222D3A] px-4 py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#8C9BAE]">SIGNAL STATUS:</span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                      streamActive
                        ? "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/30"
                        : "bg-[#E53935]/10 text-[#E53935] border-[#E53935]/30"
                    }`}
                  >
                    {streamActive ? "COVERAGE DASHBOARD ACTIVE" : "NO LIVE URL CONFIGURED"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[#8C9BAE] font-mono text-[11px]">
                  <i className="fa-solid fa-globe text-[#00D9FF]"></i>
                  <span>GLOBAL CRISIS DESK</span>
                </div>
              </div>

            </div>
          </div>

          {/* 1 & 3. CHAMFERED + HEXAGON BADGE COVERAGE BRIEFING SIDEBAR */}
          <div className="lg:col-span-4 tactical-chamfer-box p-5 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#222D3A] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C9BAE] font-bold">SUMMARY FILE: G-MAR-21</span>
                <h2 className="text-lg font-bold text-white">Coverage Briefing</h2>
              </div>
              
              {/* 3. HEXAGONAL FLOATING BADGE FOR THREAT LEVEL */}
              <div className="px-4 py-2 hex-badge text-center shadow-lg">
                <span className="text-[9px] text-[#8C9BAE] block uppercase font-mono font-bold">THREAT LEVEL</span>
                <span className="text-xs text-[#FFB300] font-black tracking-wide">ELEVATED (L4)</span>
              </div>
            </div>

            {/* Preserved rows up to Focus Domain */}
            <div className="space-y-3 text-xs">
              <div className="bg-[#070A0F] p-3 rounded-lg border border-[#222D3A] flex justify-between items-center">
                <span className="text-[#8C9BAE]">PRIMARY LOCATION</span>
                <span className="text-white font-semibold flex items-center gap-1">
                  <i className="fa-solid fa-location-dot text-[#E53935]"></i> Global coverage desk
                </span>
              </div>

              <div className="bg-[#070A0F] p-3 rounded-lg border border-[#222D3A] flex justify-between items-center">
                <span className="text-[#8C9BAE]">FOCUS DOMAIN</span>
                <span className="text-white font-semibold">Conflict · Climate · Disasters · Relief</span>
              </div>

              {/* 3. HEXAGONAL FLOATING BADGES FOR VERIFICATION & SOURCES */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="px-3 py-2.5 hex-badge text-center flex flex-col items-center justify-center">
                  <span className="text-[9px] text-[#8C9BAE] block font-mono">VERIFICATION</span>
                  <span className="text-xs text-[#00E676] font-bold flex items-center gap-1">
                    <i className="fa-solid fa-circle-check text-[10px]"></i> 4/4 Matrix
                  </span>
                </div>

                <div className="px-3 py-2.5 hex-badge text-center flex flex-col items-center justify-center">
                  <span className="text-[9px] text-[#8C9BAE] block font-mono">SOURCE LOG</span>
                  <span className="text-[11px] text-white font-bold tracking-tight">Reuters · Copernicus</span>
                </div>
              </div>
            </div>

            {/* WHAT TO WATCH NEXT (TIMELINE) */}
            <div className="space-y-2 border-t border-[#222D3A] pt-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#E53935] uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <i className="fa-solid fa-clock-rotate-left"></i> WHAT TO WATCH NEXT (TIMELINE)
                </span>
                <span className="text-[9px] px-1.5 py-0.5 bg-[#222D3A] text-[#8C9BAE] rounded font-mono">UPCOMING</span>
              </div>
              <div className="bg-[#070A0F] rounded-lg border border-[#222D3A] p-3 text-xs space-y-2.5">
                <div className="flex items-center gap-2 text-white font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse"></span>
                  <p className="leading-snug">
                    <span className="text-[#F0F4F8] font-mono font-bold">• 16:00 UTC</span> - Emergency IAEA Presser
                  </p>
                </div>
                <div className="flex items-center gap-2 text-white font-medium border-t border-[#222D3A]/60 pt-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFB300]"></span>
                  <p className="leading-snug">
                    <span className="text-[#F0F4F8] font-mono font-bold">• 18:30 UTC</span> - UN Security Council Vote
                  </p>
                </div>
              </div>
            </div>

            {/* 5-SECOND BRIEF (FAST READING) */}
            <div className="space-y-2">
              <span className="text-[11px] text-[#00E676] uppercase tracking-wider block font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-bolt-lightning"></i> 5-SECOND BRIEF (FAST READING)
              </span>
              <div className="bg-[#070A0F] rounded-lg border border-[#222D3A] p-3 text-xs space-y-2.5">
                <div className="flex items-start gap-2 text-white/90">
                  <i className="fa-solid fa-check text-[#00E676] mt-0.5"></i>
                  <p className="leading-relaxed">
                    High-resolution Sentinel-5P satellite image processing.
                  </p>
                </div>
                <div className="flex items-start gap-2 text-white/90 border-t border-[#222D3A]/50 pt-2">
                  <i className="fa-solid fa-check text-[#00E676] mt-0.5"></i>
                  <p className="leading-relaxed">
                    Unfiltered OSINT (Open-Source Intelligence) verification.
                  </p>
                </div>
                <div className="flex items-start gap-2 text-white/90 border-t border-[#222D3A]/50 pt-2">
                  <i className="fa-solid fa-check text-[#00E676] mt-0.5"></i>
                  <p className="leading-relaxed">
                    Open access to raw dispatch dossiers for researchers and students.
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION TOOLBAR (SHARING & EXPORTING) */}
            <div className="space-y-2 border-t border-[#222D3A] pt-4">
              <span className="text-[10px] text-[#8C9BAE] uppercase tracking-wider block font-bold">
                ACTION TOOLBAR (SHARING & EXPORTING)
              </span>

              <div className="grid grid-cols-1 gap-2">
                {/* 60-sec Audio Brief */}
                <button
                  onClick={playAudioBrief}
                  className="w-full py-2 bg-[#1B2530] hover:bg-[#222D3A] border border-[#222D3A] hover:border-[#FFB300] text-white text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <i className={`fa-solid ${synthSpeaking ? "fa-volume-high text-[#FFB300]" : "fa-headphones text-[#FFB300]"}`}></i>
                  <span>{synthSpeaking ? "STOP AUDIO BRIEF" : "60-SEC AUDIO BRIEF"}</span>
                </button>

                <div className="flex gap-2">
                  {/* Copy Link */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      showToast("Coverage link copied to clipboard!", "fa-link");
                    }}
                    className="flex-1 py-2 bg-[#1B2530] hover:bg-[#222D3A] border border-[#222D3A] hover:border-white text-white text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <i className="fa-solid fa-link text-[#8C9BAE]"></i> COPY LINK
                  </button>

                  {/* Export Briefing PDF */}
                  <button
                    onClick={() => showToast("Exporting Intel Briefing PDF...", "fa-file-pdf")}
                    className="flex-1 py-2 bg-[#1B2530] hover:bg-[#222D3A] border border-[#222D3A] hover:border-[#E53935] text-white text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <i className="fa-solid fa-file-pdf text-[#E53935]"></i> EXPORT BRIEFING PDF
                  </button>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* 5. SEAMLESS FULL-BLEED WIREFRAME GRID FOR DONATE NOW & POLL */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* DONATE NOW WIREFRAME CARD (7 COLS) */}
          <div className="md:col-span-7 wireframe-grid-card p-6 shadow-2xl flex flex-col justify-between space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#222D3A] pb-3">
              <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-2 tracking-wide">
                <span className="text-base">🛡️</span> SUPPORT UNBIASED, REAL-TIME INTELLIGENCE
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-[#E53935]/10 border border-[#E53935]/30 text-[#E53935] rounded font-bold font-mono">
                READER BACKED
              </span>
            </div>

            <p className="text-xs text-[#8C9BAE] leading-relaxed">
              NOWLINE relies on reader backing to deliver uncorrupted coverage.
            </p>

            <form onSubmit={handleSupportSubmit} className="space-y-4 text-xs">
              
              {/* Contribution Frequency Toggle */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#8C9BAE] uppercase font-bold tracking-wider block">
                  Choose Contribution Frequency
                </label>
                <div className="flex items-center gap-6 bg-[#070A0F]/80 p-2.5 rounded-lg border border-[#222D3A]">
                  <label className="flex items-center gap-2 cursor-pointer text-white text-xs font-medium">
                    <input
                      type="radio"
                      name="frequency"
                      checked={donationFreq === "monthly"}
                      onChange={() => setDonationFreq("monthly")}
                      className="accent-[#E53935]"
                    />
                    <span>Monthly Membership</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-[#8C9BAE] hover:text-white text-xs font-medium transition-colors">
                    <input
                      type="radio"
                      name="frequency"
                      checked={donationFreq === "onetime"}
                      onChange={() => setDonationFreq("onetime")}
                      className="accent-[#E53935]"
                    />
                    <span>One-Time Dispatch Backing</span>
                  </label>
                </div>
              </div>

              {/* Tier Selection Buttons */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#8C9BAE] uppercase font-bold tracking-wider block">
                  Select Tier / Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTier("5")}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      selectedTier === "5"
                        ? "bg-[#E53935] text-white border-[#E53935] shadow-md shadow-[#E53935]/30"
                        : "bg-[#070A0F] text-[#8C9BAE] border-[#222D3A] hover:border-white hover:text-white"
                    }`}
                  >
                    \$5 / mo
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier("15")}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer relative ${
                      selectedTier === "15"
                        ? "bg-[#E53935] text-white border-[#E53935] shadow-md shadow-[#E53935]/30"
                        : "bg-[#070A0F] text-[#8C9BAE] border-[#222D3A] hover:border-white hover:text-white"
                    }`}
                  >
                    \$15 / mo <span className="text-[9px] font-normal opacity-90">(Popular)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier("50")}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      selectedTier === "50"
                        ? "bg-[#E53935] text-white border-[#E53935] shadow-md shadow-[#E53935]/30"
                        : "bg-[#070A0F] text-[#8C9BAE] border-[#222D3A] hover:border-white hover:text-white"
                    }`}
                  >
                    \$50 / mo
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier("custom")}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      selectedTier === "custom"
                        ? "bg-[#E53935] text-white border-[#E53935] shadow-md shadow-[#E53935]/30"
                        : "bg-[#070A0F] text-[#8C9BAE] border-[#222D3A] hover:border-white hover:text-white"
                    }`}
                  >
                    Custom $
                  </button>
                </div>

                {selectedTier === "custom" && (
                  <input
                    type="number"
                    placeholder="Enter Custom Amount (\$)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full mt-2 bg-[#070A0F] border border-[#222D3A] focus:border-[#E53935] rounded-lg p-2 text-xs text-white focus:outline-none"
                    autoFocus
                  />
                )}
              </div>

              {/* What your $15/mo funds list */}
              <div className="bg-[#070A0F]/80 rounded-lg border border-[#222D3A] p-3 space-y-2">
                <span className="text-[11px] text-white font-bold block border-b border-[#222D3A] pb-1">
                  What your ${selectedTier === "custom" ? (customAmount || "0") : selectedTier}/mo funds:
                </span>
                <ul className="space-y-1.5 text-[11px] text-[#8C9BAE]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#00E676] font-bold">✓</span> High-resolution Sentinel-5P satellite image processing.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00E676] font-bold">✓</span> Unfiltered OSINT (Open-Source Intelligence) verification.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00E676] font-bold">✓</span> Ad-free, tracking-free reader experience across all devices.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00E676] font-bold">✓</span> Open access to raw dispatch dossiers for researchers and students.
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#E53935] hover:bg-red-600 text-white font-bold text-xs rounded-lg transition-all shadow-lg shadow-[#E53935]/30 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>💳 SUPPORT NOWLINE NETWORK</span>
              </button>

              <div className="text-[10px] text-[#8C9BAE] text-center flex items-center justify-center gap-2 pt-1 font-mono">
                <span>🔒 256-bit Encrypted</span>
                <span>·</span>
                <span>Cancel anytime</span>
                <span>·</span>
                <span>Transparent Annual Reporting</span>
              </div>

            </form>
          </div>

          {/* READER IMPACT POLL WIREFRAME CARD (5 COLS) */}
          <div className="md:col-span-5 wireframe-grid-card p-6 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between text-xs border-b border-[#222D3A] pb-3">
              <span className="font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-chart-simple text-[#FFB300]"></i> NEWSROOM IMPACT PULSE
              </span>
              <span className="text-[#8C9BAE] text-[10px] font-mono">VERIFIED READER POLL</span>
            </div>

            <div className="space-y-3 py-2">
              <p className="text-xs text-white font-medium leading-relaxed">
                Will the established Red Sea maritime security corridor stabilize Q4 commercial trade routes?
              </p>

              <div className="space-y-2 text-xs">
                <button
                  onClick={() => castVote("yes")}
                  className="w-full bg-[#070A0F]/80 p-3 rounded-lg border border-[#222D3A] hover:border-[#8C9BAE] flex justify-between items-center transition-all cursor-pointer text-white"
                >
                  <span>Yes, high probability ({yesPercent}%)</span>
                  <span className="text-[#00E676] font-bold font-mono">{yesPercent}%</span>
                </button>
                <button
                  onClick={() => castVote("no")}
                  className="w-full bg-[#070A0F]/80 p-3 rounded-lg border border-[#222D3A] hover:border-[#8C9BAE] flex justify-between items-center transition-all cursor-pointer text-white"
                >
                  <span>No, strategic delay expected ({noPercent}%)</span>
                  <span className="text-[#FFB300] font-bold font-mono">{noPercent}%</span>
                </button>
              </div>
            </div>

            <div className="text-[10px] text-[#8C9BAE] flex justify-between items-center pt-2 border-t border-[#222D3A]/60">
              <span>Total Votes: <span className="text-white font-bold font-mono">{totalVotes.toLocaleString()}</span></span>
              <span className="text-[#00E676] flex items-center gap-1 font-mono">
                <i className="fa-solid fa-circle-check text-[9px]"></i> Saved in this browser
              </span>
            </div>
          </div>

        </section>

        {/* 2. ASYMMETRIC DUAL-LEVEL SPLIT CARDS FOR INTELLIGENCE STREAM */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222D3A] pb-4">
            <div>
              <span className="text-xs text-[#E53935] uppercase tracking-widest font-bold font-mono">LATEST UPDATES</span>
              <h2 className="text-2xl font-bold text-white">News & Field Reports</h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {["all", "geopolitics", "climate", "society"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full uppercase font-semibold transition-all cursor-pointer border-none ${
                    selectedCategory === cat
                      ? "bg-[#E53935] text-white shadow-sm"
                      : "bg-[#10161E] hover:bg-[#1B2530] text-[#8C9BAE] hover:text-white border border-[#222D3A]"
                  }`}
                >
                  {cat === "all" ? "ALL NEWS" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative space-y-6 before:content-[''] before:absolute before:top-4 before:bottom-4 before:left-[80px] sm:before:left-[110px] before:w-0.5 before:bg-[#222D3A]">
            {filteredDispatches.map((dispatch) => {
              const isExpanded = !!expandedDispatches[dispatch.id];
              return (
                <article key={dispatch.id} id={dispatch.id} className="relative flex flex-col sm:flex-row gap-4 items-start group">
                  
                  {/* ASYMMETRIC LEFT COLUMN: Angled Tag with Timestamp & Category */}
                  <div className="w-24 sm:w-28 flex-shrink-0 flex flex-col items-center sm:items-end text-center sm:text-right pt-2 z-10">
                    <div className="tactical-chamfer-tag px-2.5 py-1 bg-[#E53935] text-white font-mono font-bold text-[11px] shadow-lg">
                      {dispatch.time}
                    </div>
                    <span className="text-[10px] font-mono text-[#8C9BAE] uppercase tracking-tighter mt-1 block">
                      {dispatch.category}
                    </span>
                  </div>

                  {/* RIGHT COLUMN: Connected Main Body Block */}
                  <div className="flex-1 bg-[#10161E] border border-[#222D3A] hover:border-[#E53935] rounded-xl p-5 shadow-xl transition-all space-y-4 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#222D3A]/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#222D3A] text-white rounded font-semibold text-[11px]">
                          {dispatch.categoryLabel}
                        </span>
                        
                        {/* 3. Hexagonal Badge for Status */}
                        <span className="px-2 py-0.5 hex-badge text-[10px] font-bold text-[#00E676] flex items-center gap-1">
                          <i className="fa-solid fa-circle-check"></i> {dispatch.status}
                        </span>
                      </div>
                      <span className="text-[#8C9BAE] text-[11px] font-mono">SOURCE: {dispatch.source}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      
                      {/* High-Impact Image Frame */}
                      <div className="md:col-span-4 rounded-xl overflow-hidden border border-[#222D3A] relative aspect-video md:aspect-[4/3] bg-black group-hover:border-[#E53935]/50 transition-colors">
                        <img
                          src={dispatch.image}
                          alt={dispatch.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <span className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur px-2 py-1 font-mono text-[9px] text-[#F0F4F8] rounded border border-[#222D3A] truncate">
                          {dispatch.imageCaption || "LIVE MEDIA FEED"}
                        </span>
                      </div>

                      {/* Content Box */}
                      <div className="md:col-span-8 space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#E53935] transition-colors leading-snug">
                          {dispatch.title}
                        </h3>
                        <p className="text-xs text-[#8C9BAE] leading-relaxed">{dispatch.summary}</p>

                        <div className="pt-2 flex items-center justify-between">
                          <button
                            onClick={() => toggleDispatchExpand(dispatch.id)}
                            className="text-xs text-[#E53935] font-bold hover:underline flex items-center gap-1 bg-transparent border-none cursor-pointer"
                          >
                            <span>{isExpanded ? "HIDE DETAILS" : "READ FULL DISPATCH"}</span>
                            <i className={`fa-solid fa-chevron-${isExpanded ? "up" : "down"} text-[10px]`}></i>
                          </button>

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/live#${dispatch.id}`);
                              showToast(`Copied share link for ${dispatch.id}`, "fa-link");
                            }}
                            className="text-[#8C9BAE] hover:text-white text-xs flex items-center gap-1 bg-transparent border-none cursor-pointer"
                          >
                            <i className="fa-solid fa-link"></i> Share
                          </button>
                        </div>
                      </div>

                    </div>

                    {isExpanded && (
                      <div className="border-t border-[#222D3A]/60 pt-4 mt-2 space-y-3 text-xs bg-[#070A0F]/60 p-4 rounded-lg">
                        <h4 className="font-bold text-[#E53935] uppercase text-[11px] tracking-wider font-mono">WHAT WE KNOW SO FAR</h4>
                        {dispatch.bullets && (
                          <ul className="list-disc list-inside space-y-1.5 text-[#8C9BAE]">
                            {dispatch.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}
                        {dispatch.quote && (
                          <div className="p-3 bg-[#10161E] border-l-2 border-[#E53935] text-white italic">
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

          <div className="pt-4 border-t border-[#222D3A] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="text-[#8C9BAE] flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00E676]"></span>
              <span>AUTOMATIC FEED SYNC ACTIVE</span>
            </div>

            <button
              onClick={simulateIncomingDispatch}
              className="px-4 py-2 bg-[#1B2530] hover:bg-[#222D3A] border border-[#222D3A] hover:border-[#E53935] text-white font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <i className="fa-solid fa-plus text-[#E53935]"></i> SIMULATE LIVE INCOMING DISPATCH
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <SiteFooter />

      {/* MODALS */}
      {verificationOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#10161E] border border-[#222D3A] max-w-xl w-full rounded-xl p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-[#222D3A] pb-3">
              <div className="flex items-center gap-2 text-[#00E676] font-bold">
                <i className="fa-solid fa-shield-halved"></i>
                <span>VERIFICATION MATRIX & SOURCE CONSENSUS</span>
              </div>
              <button onClick={() => setVerificationOpen(false)} className="text-[#8C9BAE] hover:text-white text-base bg-transparent border-none cursor-pointer">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-2">
              {[
                "COPERNICUS SATELLITE NETWORK",
                "REUTERS NEWSROOM DESK",
                "UN SECURITY COUNCIL TELEMETRY",
                "GENEVA ATMOSPHERIC MONITOR"
              ].map((src, idx) => (
                <div key={idx} className="p-2.5 bg-[#070A0F] rounded border border-[#222D3A] flex items-center justify-between">
                  <span>{idx + 1}. {src}</span>
                  <span className="text-[#00E676] font-bold font-mono">VERIFIED 100%</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setVerificationOpen(false)}
              className="w-full py-2 bg-[#222D3A] hover:bg-[#8C9BAE] hover:text-black text-white font-bold rounded transition-colors cursor-pointer border-none"
            >
              CLOSE MATRIX
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 bg-[#10161E] border border-[#E53935] text-white px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-3 z-50">
          <i className={`fa-solid ${toast.icon} text-[#E53935]`}></i>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="footer-socials">
                <a href="#x" aria-label="X">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#youtube" aria-label="YouTube">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#instagram" aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#facebook" aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#discord" aria-label="Discord">
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