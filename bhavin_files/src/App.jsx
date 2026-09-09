import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
    auth, firebaseReady, googleProvider, appleProvider, setPersistence,
    browserLocalPersistence, browserSessionPersistence,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signInWithPopup, sendPasswordResetEmail, signOut,
    updateProfile, onAuthStateChanged, saveUser
} from "./firebase";

const topics = [
    {
        id: "climate",
        name: "CLIMATE",
        title: "El Niño & Climate Change",
        text: "How ocean temperature anomalies alter global agricultural yields and weather patterns.",
        image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1400&q=85"
    },
    {
        id: "society",
        name: "SOCIETY",
        title: "Exam Controversies",
        text: "Deep-dive into structural policy leaks, accountability, and student reforms.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1300&q=85"
    },
    {
        id: "geopolitics",
        name: "GEOPOLITICS",
        title: "Wars & Global Conflicts",
        text: "Tracing the territorial vectors and diplomatic escalations shaping modern security.",
        image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1400&q=85"
    },
    {
        id: "history",
        name: "HISTORY",
        title: "History Behind Headlines",
        text: "Connect contemporary global events to the historical roots that shaped modern borders.",
        image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1400&q=85"
    }
];

const languages = [
    { code: "EN", label: "English" },
    { code: "ES", label: "Español" },
    { code: "HI", label: "हिन्दी" }
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
            <Route path="/feed" element={user ? <Dashboard user={user} setUser={setUser} /> : <LandingPage user={user} setUser={setUser} />} />
            <Route path="/topic/:id" element={<TopicPage user={user} />} />
        </Routes>
    );
}

function LandingPage({ user, setUser }) {
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const isLogin = mode === "login";

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
                navigate("/feed");
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
                navigate("/feed");
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
            const provider = providerType === 'google' ? googleProvider : appleProvider;
            const result = await signInWithPopup(auth, provider);
            await saveUser(result.user, providerType);
            setUser(result.user);
            navigate("/feed");
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

    const enforceLogin = (e) => {
        if (!user) {
            e.preventDefault();
            alert("You must log in or create an account to read this briefing.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="landing">
            <div className="background"></div>
            <div className="background-overlay"></div>
            <div className="red-glow"></div>

            <header className="navbar">
                <Link to="/" className="logo">
                    <span className="logo-box">N</span> NOWLINE
                </Link>
                <nav>
                    <a href="#stories">STORIES</a>
                    <a href="#about">ABOUT</a>
                    <span className="live"><span></span> LIVE</span>
                </nav>
                {user && (
                    <button className="profile-btn" onClick={() => navigate("/feed")}>
                        {user.displayName || user.email?.split("@")[0]}
                    </button>
                )}
            </header>

            <section className="hero">
                <div className="hero-content">
                    <div className="eyebrow">
                        <span></span> CURRENT AFFAIRS / GLOBAL CONTEXT
                    </div>
                    <h1>
                        KNOW WHAT <br />
                        <span>HAPPENED.</span> <br />
                        UNDERSTAND WHY.
                    </h1>
                    <p>
                        A rigorous journalistic platform breaking down complex global conflicts, active climate anomalies, and critical policy shifts with verified clarity.
                    </p>
                    <div className="chips">
                        {topics.map(topic => (
                            <Link key={topic.id} to={`/topic/${topic.id}`} className="chip" onClick={enforceLogin}>
                                {topic.name}
                            </Link>
                        ))}
                    </div>
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
                                <button type="button" className="google" onClick={() => handleProviderLogin('google')}>
                                    <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.13 0 9.87 0 12s.43 3.87 1.18 5.39l4.09-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
                                    Google
                                </button>
                                <button type="button" className="apple" onClick={() => handleProviderLogin('apple')}>
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
                            <button type="button" onClick={forgotPassword} className="forgot-link">CAN'T SIGN IN? FORGOT PASSWORD?</button>
                        </div>
                        <p className="message">{message}</p>
                    </div>
                </div>
            </section>

            <section className="stories" id="stories">
                <div className="section-top">
                    <div>
                        <span>LATEST SIGNALS</span>
                        <h2>Stories worth understanding.</h2>
                    </div>
                    <small>ANALYSIS / BRIEFINGS</small>
                </div>
                <div className="story-grid">
                    {topics.map(topic => (
                        <div className="story-card" key={topic.id}>
                            <Link to={`/topic/${topic.id}`} onClick={enforceLogin}>
                                <div className="story-image" style={{ backgroundImage: `url(${topic.image})` }}></div>
                                <div className="story-overlay"></div>
                                <div className="story-content">
                                    <span className="story-tag">{topic.name}</span>
                                    <h3>{topic.title}</h3>
                                    <p>{topic.text}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <SiteFooter />
        </div>
    );
}

function Dashboard({ user, setUser }) {
    const navigate = useNavigate();
    async function logout() {
        await signOut(auth);
        setUser(null);
        navigate("/");
    }

    return (
        <div className="dashboard">
            <header className="dashboard-nav">
                <Link to="/" className="logo"><span className="logo-box">N</span> NOWLINE</Link>
                <div className="dashboard-user">
                    <span>{user.displayName || user.email?.split("@")[0]}</span>
                    <button onClick={logout}>LOG OUT</button>
                </div>
            </header>
            <main className="dashboard-main">
                <div className="dashboard-heading">
                    <span>YOUR BRIEFING ROOM</span>
                    <h1>What's happening?</h1>
                    <p>Select a briefing topic below to examine background context and future implications.</p>
                </div>
                <div className="topic-grid">
                    {topics.map(topic => (
                        <Link to={`/topic/${topic.id}`} key={topic.id} className="topic-card" style={{ backgroundImage: `url(${topic.image})` }}>
                            <div className="topic-overlay"></div>
                            <div className="topic-info">
                                <span>{topic.name}</span>
                                <h2>{topic.title}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}

function TopicPage({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const topic = topics.find(t => t.id === id);

    // Protected route: redirect straight back if someone types the URL
    // in without being logged in, instead of only blocking the link click.
    useEffect(() => {
        if (!user) {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    if (!topic) {
        return <div className="not-found">Topic not found.</div>;
    }

    return (
        <div className="topic-page">
            <header className="dashboard-nav">
                <Link to="/" className="logo"><span className="logo-box">N</span> NOWLINE</Link>
                <Link to="/feed" className="back-button">BACK TO FEED</Link>
            </header>

            <section className="topic-hero" style={{ backgroundImage: `url(${topic.image})` }}>
                <div className="topic-dark"></div>
                <div className="topic-text">
                    <span>{topic.name}</span>
                    <h1>{topic.title}</h1>
                    <p>{topic.text}</p>
                </div>
            </section>

            <section className="context">
                <span>EDITORIAL FRAMEWORK</span>
                <h2>From headline to context.</h2>
                <div className="context-grid">
                    <div className="context-card">
                        <div className="context-bg" style={{ backgroundImage: `url(${topic.image})` }}></div>
                        <b>01</b>
                        <h3>WHAT HAPPENED?</h3>
                        <p>Unpack the core facts, timelines, regions, and immediate context behind the headlines.</p>
                    </div>
                    <div className="context-card">
                        <div className="context-bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=80')` }}></div>
                        <b>02</b>
                        <h3>WHY DOES IT MATTER?</h3>
                        <p>Examine the deeper geopolitical, economic, social, or environmental implications.</p>
                    </div>
                    <div className="context-card">
                        <div className="context-bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80')` }}></div>
                        <b>03</b>
                        <h3>WHAT NEXT?</h3>
                        <p>Analyze upcoming policy shifts, escalation vectors, and long-term consequences.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function SiteFooter() {
    const [lang, setLang] = useState("EN");
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close the dropdown if the user clicks anywhere outside it.
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function selectLang(code) {
        setLang(code);
        setOpen(false);
    }

    return (
        <footer>
            <div className="footer-left">
                <span>© 2026 NOWLINE</span>
                <span>BUILT FOR CONTEXT, NOT CHAOS.</span>
            </div>
            <div className="footer-links">
                <div className="lang-dropdown" ref={dropdownRef}>
                    <button
                        type="button"
                        className="lang-toggle-btn"
                        onClick={() => setOpen(!open)}
                        aria-haspopup="listbox"
                        aria-expanded={open}
                    >
                        🌐 {lang} <span className={open ? "caret up" : "caret"}>▾</span>
                    </button>
                    {open && (
                        <ul className="lang-menu" role="listbox">
                            {languages.map(l => (
                                <li key={l.code}>
                                    <button
                                        type="button"
                                        className={l.code === lang ? "lang-option active" : "lang-option"}
                                        onClick={() => selectLang(l.code)}
                                        role="option"
                                        aria-selected={l.code === lang}
                                    >
                                        {l.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <a href="#support">SUPPORT</a>
                <a href="#privacy">PRIVACY POLICY</a>
                <a href="#terms">TERMS OF SERVICE</a>
                <a href="#cookies">COOKIE PREFERENCES</a>
            </div>
        </footer>
    );
}
