'use client';
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const S = `
  .auth-screen{position:fixed;inset:0;background:#1a1208;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center;}
  .auth-logo{font-family:'Playfair Display',serif;font-size:32px;color:#e6a84a;margin-bottom:6px;}
  .auth-logo span{font-style:italic;color:#f5efe6;}
  .auth-sub{font-size:11px;color:#7a6a58;letter-spacing:2px;text-transform:uppercase;margin-bottom:32px;}
  .auth-tabs{display:flex;gap:0;margin-bottom:20px;border-radius:10px;overflow:hidden;border:1px solid #2a2010;}
  .auth-tab{flex:1;padding:10px;background:none;border:none;color:#7a6a58;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;transition:all .15s;}
  .auth-tab.on{background:#c8852a;color:#fff;font-weight:500;}
  .auth-type{display:flex;gap:10px;margin-bottom:20px;width:100%;}
  .auth-type-btn{flex:1;padding:12px 8px;border-radius:10px;border:2px solid #2a2010;background:none;color:#7a6a58;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:4px;}
  .auth-type-btn.on{border-color:#c8852a;background:rgba(200,133,42,.1);color:#e6a84a;}
  .auth-type-em{font-size:24px;}
  .auth-input{width:100%;padding:12px 16px;border:1px solid #2a2010;border-radius:10px;background:#2a1a08;font-size:14px;font-family:'DM Sans',sans-serif;color:#f5efe6;outline:none;margin-bottom:12px;}
  .auth-input:focus{border-color:#c8852a;}
  .auth-input::placeholder{color:#7a6a58;}
  .auth-btn{width:100%;padding:14px;background:#c8852a;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;margin-top:4px;}
  .auth-err{font-size:12px;color:#e07050;margin-bottom:10px;text-align:left;}
`;

export default function Auth() {
    const [mode, setMode] = useState("signin");
    const [accountType, setAccountType] = useState("musician");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handle = async () => {
        setError("");
        setLoading(true);
        try {
            if (mode === "signup") {
                const cred = await createUserWithEmailAndPassword(auth, email, password);
                const { doc, setDoc } = await import("firebase/firestore");
                const { db } = await import("../../lib/firebase");
                await setDoc(doc(db, "accountTypes", cred.user.uid), { type: accountType });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (e) {
            setError(e.message.replace("Firebase: ", ""));
        }
        setLoading(false);
    };

    return (
        <>
            <style>{S}</style>
            <div className="auth-screen">
                <div className="auth-logo">Music<span>Meetup</span></div>
                <div className="auth-sub">Connect · Jam · Perform</div>
                <div className="auth-tabs">
                    <button className={`auth-tab ${mode === "signin" ? "on" : ""}`} onClick={() => setMode("signin")}>Sign In</button>
                    <button className={`auth-tab ${mode === "signup" ? "on" : ""}`} onClick={() => setMode("signup")}>Sign Up</button>
                </div>
                {mode === "signup" && (
                    <div className="auth-type">
                        <button className={`auth-type-btn ${accountType === "musician" ? "on" : ""}`} onClick={() => setAccountType("musician")}>
                            <span className="auth-type-em">🎸</span>Musician
                        </button>
                        <button className={`auth-type-btn ${accountType === "venue" ? "on" : ""}`} onClick={() => setAccountType("venue")}>
                            <span className="auth-type-em">🏢</span>Venue
                        </button>
                    </div>
                )}
                {error && <div className="auth-err">{error}</div>}
                <input className="auth-input" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="auth-input" placeholder="Password (min 6 chars)" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="auth-btn" onClick={handle} disabled={loading}>
                    {loading ? "Please wait..." : mode === "signup" ? `Create ${accountType === "venue" ? "Venue" : "Musician"} Account` : "Sign In"}
                </button>
            </div>
        </>
    );
}