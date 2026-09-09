import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    OAuthProvider,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
    onAuthStateChanged
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "firebase/firestore";

// NOTE: for a real deployment, move these into a .env file and read them
// via import.meta.env.VITE_FIREBASE_API_KEY etc. Kept inline here to match
// your existing project structure — mention this to your teacher as a
// "next step" if asked about security.
const firebaseConfig = {
    apiKey: "AIzaSyC-GUYd0wkDETkVQ6gUogTe8sfsv71VF5k",
    authDomain: "fee-sem-3-react-nowline-de1af.firebaseapp.com",
    projectId: "fee-sem-3-react-nowline-de1af",
    storageBucket: "fee-sem-3-react-nowline-de1af.firebasestorage.app",
    messagingSenderId: "132324849316",
    appId: "1:132324849316:web:763be2443fbc0a6a365831",
    measurementId: "G-WBYNNXBXD1"
};

const firebaseReady = !firebaseConfig.apiKey.startsWith("PASTE_") && !firebaseConfig.projectId.startsWith("PASTE_");

let app = null;
let auth = null;
let db = null;
let googleProvider = null;
let appleProvider = null;

if (firebaseReady) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    appleProvider = new OAuthProvider('apple.com');
}

export async function saveUser(user, provider = "password") {
    if (!db || !user) return;
    await setDoc(
        doc(db, "users", user.uid),
        {
            uid: user.uid,
            name: user.displayName || user.email?.split("@")[0] || "Reader",
            email: user.email,
            photoURL: user.photoURL || "",
            provider: provider,
            lastLogin: serverTimestamp()
        },
        { merge: true }
    );
}

export {
    firebaseReady,
    auth,
    db,
    googleProvider,
    appleProvider,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
    onAuthStateChanged
};
