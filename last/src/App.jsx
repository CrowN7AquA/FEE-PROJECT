import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import {
    auth, firebaseReady, googleProvider, appleProvider, setPersistence,
    browserLocalPersistence, browserSessionPersistence,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signInWithPopup, sendPasswordResetEmail, signOut,
    updateProfile, onAuthStateChanged, saveUser
} from "./firebase";
import MainPage from "./MainPage";
import AboutPage from "./AboutPage";
import LiveCoveragePage from "./LiveCoveragePage";

const topics = [
    { id: "climate", name: "CLIMATE", title: "El Niño & Climate Change", text: "How ocean temperature anomalies alter global agricultural yields and weather patterns.", image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1400&q=85" },
    { id: "society", name: "SOCIETY", title: "Exam Controversies", text: "Deep-dive into structural policy leaks, accountability, and student reforms.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1300&q=85" },
    { id: "geopolitics", name: "GEOPOLITICS", title: "Wars & Global Conflicts", text: "Tracing the territorial vectors and diplomatic escalations shaping modern security.", image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1400&q=85" },
    { id: "history", name: "HISTORY", title: "History Behind Headlines", text: "Connect contemporary global events to the historical roots that shaped modern borders.", image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1400&q=85" }
];

const inDepthSections = [
    { id: "climate", tag: "Climate", title: "Global Climate Summit 2025: A Turning Point", text: "World leaders have reached a landmark agreement on emissions reduction. Developing nations will receive new support for green energy.", video: "https://www.youtube.com/embed/VIDEO_ID_1" },
    { id: "historical", tag: "Historical", title: "Lessons From the Past: How History Shapes Today", text: "From ancient civilizations to modern conflicts, understanding history helps us make sense of the world we live in today.", video: "https://www.youtube.com/embed/VIDEO_ID_2" },
    { id: "geographical", tag: "Geographical", title: "Mapping the World: Landscapes That Define Nations", text: "Geography shapes culture, economy and conflict. Explore how natural borders and resources influence global events.", video: "https://www.youtube.com/embed/VIDEO_ID_3" },
    { id: "disasters", tag: "Disasters", title: "When Nature Strikes: Preparedness and Response", text: "Earthquakes, floods and wildfires are increasing in frequency. Learn how communities prepare and recover from disasters.", video: "https://www.youtube.com/embed/VIDEO_ID_4" },
    { id: "world", tag: "World", title: "Global Headlines: Stories Shaping Our World", text: "From diplomatic breakthroughs to regional tensions, we cover the events that matter most across every continent.", video: "https://www.youtube.com/embed/VIDEO_ID_5" },
    { id: "politics", tag: "Politics", title: "Power and Policy: Inside the Decisions That Matter", text: "Elections, reforms and debates — we break down the political stories that affect everyday life around the globe.", video: "https://www.youtube.com/embed/VIDEO_ID_6" },
    { id: "science", tag: "Science", title: "Discovery and Innovation: The Frontiers of Knowledge", text: "From space exploration to medical breakthroughs, science continues to reshape how we understand the universe.", video: "https://www.youtube.com/embed/VIDEO_ID_7" },
    { id: "economy", tag: "Economy", title: "Markets and Money: Understanding the Global Economy", text: "Inflation, trade and jobs — we explain the economic forces that shape your daily life in simple, clear language.", video: "https://www.youtube.com/embed/VIDEO_ID_8" }
];

export default function App() {
    const [user, setUser] = useState(null);
    const [checkingUser, setCheckingUser] = useState(true);

    useEffect(() => {
        if (!auth) {
            setCheckingUser(false);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setCheckingUser(false);
        });
        return unsubscribe;
    }, []);

    if (checkingUser) {
        return (
            <div className="loading">
                <div className="loader"></div>
                <p>LOADING NOWLINE...</p>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
            <Route path="/MainPage" element={user ? <MainPage user={user} setUser={setUser} /> : <LandingPage user={user} setUser={setUser} />} />
            <Route path="/about" element={<AboutPage user={user} setUser={setUser} />} />
            <Route path="/live" element={user ? <LiveCoveragePage user={user} setUser={setUser} /> : <LandingPage user={user} setUser={setUser} />} />
            <Route path="/privacy" element={<LegalPage title="Privacy Policy" sections={privacyContent} />} />
            <Route path="/terms" element={<LegalPage title="Terms of Service" sections={termsContent} />} />
            <Route path="/cookies" element={<LegalPage title="Cookie Preferences" sections={cookiesContent} />} />
            <Route path="/support" element={<LegalPage title="Support" sections={supportContent} />} />
        </Routes>
    );
}

const privacyContent = [
    { h: "1. What we collect", p: "We collect your email, display name, and authentication provider (Google, Apple, or email) when you create a Nowline account. We also log basic usage such as which briefings you open." },
    { h: "2. How we use it", p: "Your data is used strictly to personalize your briefing room, save your reading history, and let you donate to verified relief drives. We never sell reader data to advertisers." },
    { h: "3. Cookies", p: "We use minimal cookies for authentication and language preference. No third-party tracking pixels. No ad-tech." },
    { h: "4. Your rights", p: "You can request deletion of your account and data at any time by emailing kaurgulmehak23@gmail.com. We respond within 7 working days." }
];

const termsContent = [
    { h: "1. Acceptance", p: "By using Nowline, you agree to these terms. If you do not agree, please do not use the platform." },
    { h: "2. Content usage", p: "All briefings, data visualisations, and editorial pieces are the intellectual property of Nowline. You may share links freely but may not republish without permission." },
    { h: "3. User conduct", p: "Do not submit false crisis reports, fake donation drives, or misleading evidence. Violations result in immediate account termination." },
    { h: "4. Donations", p: "Nowline only features verified donation drives. We are not liable for third-party NGO fund usage. Always verify before donating large sums." }
];

const cookiesContent = [
    { h: "Essential cookies", p: "Required for login session and language preference. Cannot be disabled." },
    { h: "Analytics cookies", p: "Optional. Help us understand which briefings readers find most useful. Aggregated and anonymised." },
    { h: "Preference cookies", p: "Remember your font size, dark mode, and region. Stored locally on your device." },
    { h: "How to manage", p: "You can clear cookies via your browser settings at any time. Disabling essential cookies may break login." }
];

const supportContent = [
    { h: "Reader support", p: "Email us at kaurgulmehak23@gmail.com for any login, account, or reading issue. We reply within 48 hours." },
    { h: "Crisis reports", p: "For verified news tips, disaster alerts, or on-ground reporting, use the Report a Crisis form on the About page." },
    { h: "Donation drives", p: "Want to start a verified relief fund? Contact us via the About page's Donation Drive section." },
    { h: "Press & partnerships", p: "For media collaborations or interviews, reach out with subject line 'PRESS: Nowline' to kaurgulmehak23@gmail.com." }
];

function LegalPage({ title, sections }) {
    return (
        <div className="legal-page">
            <div className="legal-inner">
                <Link to="/" className="legal-back">← BACK TO NOWLINE</Link>
                <span className="legal-eyebrow">NOWLINE · LEGAL</span>
                <h1>{title}</h1>
                <p className="legal-updated">Last updated: 2026</p>
                <div className="legal-body">
                    {sections.map((s, i) => (
                        <div key={i} className="legal-section">
                            <h2>{s.h}</h2>
                            <p>{s.p}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function LandingPage({ user, setUser }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginPrompt, setLoginPrompt] = useState("");
    const [topicsOpen, setTopicsOpen] = useState(false);
    const isLogin = mode === "login";

    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!loginPrompt) return;
        const t = setTimeout(() => setLoginPrompt(""), 2500);
        return () => clearTimeout(t);
    }, [loginPrompt]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(".topics")) setTopicsOpen(false);
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
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

    function handleStoryClick() {
        if (user) {
            navigate("/MainPage");
        } else {
            setLoginPrompt("Sign in to read the full story →");
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
                const emailInput = document.querySelector('.auth-card input[type="email"]');
                if (emailInput) emailInput.focus();
            }, 500);
        }
    }

    function handleProtectedNav(e, path, promptText) {
        if (user) return; // let Link navigate normally
        e.preventDefault();
        setLoginPrompt(promptText);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
            const emailInput = document.querySelector('.auth-card input[type="email"]');
            if (emailInput) emailInput.focus();
        }, 500);
    }

    function errorMessage(error) {
        const errors = {
            "auth/invalid-email": "Invalid email address.",
            "auth/user-not-found": "No account found.",
            "auth/wrong-password": "Wrong password.",
            "auth/invalid-credential": "Email or password is incorrect.",
            "auth/email-already-in-use": "Email already registered.",
            "auth/weak-password": "Password must contain at least 6 characters.",
            "auth/too-many-requests": "Too many attempts. Try again later."
        };
        return errors[error.code] || "Authentication failed.";
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!firebaseReady) {
            setMessage("Firebase config is missing.");
            return;
        }
        try {
            setLoading(true);
            setMessage("");
            await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);

            if (isLogin) {
                const result = await signInWithEmailAndPassword(auth, email, password);
                await saveUser(result.user, "password");
                setUser(result.user);
                navigate("/MainPage");
            } else {
                if (password !== confirmPassword) {
                    setMessage("Passwords do not match.");
                    setLoading(false);
                    return;
                }
                const result = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(result.user, { displayName: name });
                await saveUser(result.user, "password");
                setUser(result.user);
                navigate("/MainPage");
            }
        } catch (error) {
            setMessage(errorMessage(error));
        } finally {
            setLoading(false);
        }
    }

    async function handleProviderLogin(providerType) {
        if (!firebaseReady) return setMessage("Firebase config is missing.");
        try {
            const provider = providerType === "google" ? googleProvider : appleProvider;
            const result = await signInWithPopup(auth, provider);
            await saveUser(result.user, providerType);
            setUser(result.user);
            navigate("/MainPage");
        } catch (error) {
            setMessage(errorMessage(error));
        }
    }

    async function forgotPassword() {
        if (!email) return setMessage("Enter your email in the box first to reset.");
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent.");
        } catch (error) {
            setMessage(errorMessage(error));
        }
    }

    function handleCantSignIn() {
        if (!email) {
            setMessage("Enter your email above, then click 'Forgot password?' to reset.");
        } else {
            setMessage(`We'll send a reset link to ${email}. Click 'Forgot password?' to proceed.`);
        }
    }

    const heroOpacity = Math.max(0, 1 - scrollY / 500);
    const heroTranslate = Math.min(scrollY * 0.15, 60);

    return (
        <div className="landing">
            <div className="background"></div>
            <div className="background-overlay"></div>
            <div className="red-glow"></div>

            <header className="navbar">
                <Link to={user ? "/MainPage" : "/"} className="logo">
                    <span className="logo-box">N</span> NOWLINE
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
                        onClick={(e) => handleProtectedNav(e, "/MainPage", "Sign in to read stories →")}
                    >STORIES</Link>
                    <Link
                        to="/about"
                        className={currentPath === "/about" ? "nav-active" : ""}
                    >ABOUT</Link>
                    <Link
                        to="/live"
                        className={`live ${currentPath === "/live" ? "nav-active" : ""}`}
                        onClick={(e) => handleProtectedNav(e, "/live", "Sign in to watch live →")}
                    ><span></span> LIVE</Link>
                </nav>
                {user && (
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <button className="profile-btn" onClick={() => navigate("/MainPage")}>{user.displayName || user.email?.split("@")[0]}</button>
                        <button className="profile-btn" onClick={handleLogout}>Sign Out</button>
                    </div>
                )}
            </header>

            <section className="hero">
                <div
                    className="hero-content"
                    style={{
                        opacity: heroOpacity,
                        transform: `translateY(-${heroTranslate}px)`,
                        transition: "opacity 0.15s linear, transform 0.15s linear"
                    }}
                >
                    <div className="eyebrow">
                        <span></span> CURRENT AFFAIRS · SLOW NEWS · REAL CONTEXT
                    </div>
                    <h1>
                        KNOW WHAT <br />
                        <span>HAPPENED.</span> <br />
                        UNDERSTAND WHY.
                    </h1>
                                        <ul className="hero-bullets">
                        <li><strong>Wars · Quakes · Floods</strong> — tracked live, verified on-ground</li>
                        <li>Climate alerts, data leaks & disaster intelligence in real time</li>
                        <li>Direct routes to <strong>verified donation drives</strong> and relief orgs</li>
                        <li><strong>Slow news. Real context. Zero noise.</strong></li>
                    </ul>
                </div>

                <div className="auth-area">
                    <div className="auth-glow"></div>
                    <div className="auth-card">
                        <div className="top-red"></div>
                        <div className="auth-header">
                            <small>SECURE ACCESS</small>
                            <h2>{isLogin ? "Welcome back" : "Create Account"}</h2>
                            <div className="tabs">
                                <button className={isLogin ? "active" : ""} onClick={() => setMode("login")}>Sign in</button>
                                <button className={!isLogin ? "active" : ""} onClick={() => setMode("register")}>Create account</button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="input-group">
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder=" " required />
                                    <label>Full Name</label>
                                </div>
                            )}

                            <div className="input-group">
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder=" " required />
                                <label>Email address</label>
                            </div>

                            <div className="input-group">
                                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder=" " minLength="6" required />
                                <label>Password</label>
                                <button type="button" className="show-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "HIDE" : "SHOW"}
                                </button>
                            </div>

                            {!isLogin && (
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder=" " minLength="6" required />
                                    <label>Confirm Password</label>
                                </div>
                            )}

                            <div className="options">
                                <label>
                                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                                    Remember me
                                </label>
                            </div>

                            <div className="providers">
                                <button type="button" className="google" onClick={() => handleProviderLogin("google")}>
                                    <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.13 0 9.87 0 12s.43 3.87 1.18 5.39l4.09-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
                                    Google
                                </button>
                                <button type="button" className="apple" onClick={() => handleProviderLogin("apple")}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83-.87 1.29-1.78 2.55-3.16 2.58zM15.97 5.35c-.61.69-1.6 1.24-2.51 1.17-.12-.95.34-1.94.87-2.55.61-.69 1.63-1.21 2.45-1.25.11.99-.27 1.94-.81 2.63z"/></svg>
                                    Apple ID
                                </button>
                            </div>

                            <div className="submit-wrapper">
                                <button type="submit" className={loading ? "submit loading" : "submit"} disabled={loading}>
                                    →
                                </button>
                            </div>
                        </form>

                        <div className="bottom-auth">
                            <button type="button" onClick={handleCantSignIn} className="cant-signin-link">
                                Can't sign in?
                            </button>
                            <button type="button" onClick={forgotPassword} className="forgot-link">
                                Forgot password?
                            </button>
                        </div>
                        <p className="message">{message}</p>
                    </div>
                </div>
            </section>

            <section className="stories" id="stories">
                <div className="section-top">
                    <div>
                        <span>FROM AWARENESS TO ACTION</span>
                        <h2>News that moves us to act.</h2>
                    </div>
                    <small>CRISIS · CONTEXT · RELIEF</small>
                </div>
                <div className="story-grid">
                    {topics.map(topic => (
                        <div
                            className="story-card"
                            key={topic.id}
                            onClick={handleStoryClick}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="story-image" style={{ backgroundImage: `url(${topic.image})` }}></div>
                            <div className="story-overlay"></div>
                            <div className="story-content">
                                <span className="story-tag">{topic.name}</span>
                                <h3>{topic.title}</h3>
                                <p>{topic.text}</p>
                                <span className="read-prompt">
                                    {user ? "Read briefing →" : "Sign in to read →"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {user && (
                <>
                    <section className="stories" id="in-depth">
                        <div className="section-top">
                            <div>
                                <span>IN-DEPTH COVERAGE</span>
                                <h2>Stories that move us to act.</h2>
                            </div>
                            <small>CRISIS · CONTEXT · RELIEF</small>
                        </div>

                        <div className="stories-wrap">
                            {inDepthSections.map((s, idx) => (
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
                    </section>

                    <section className="about-section">
                        <h2>About Us</h2>
                    </section>
                </>
            )}

            {loginPrompt && (
                <div className="login-toast">
                    {loginPrompt}
                </div>
            )}

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