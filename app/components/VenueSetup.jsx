'use client';
import { useState } from "react";
import { db, auth } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const GENRES = ["Blues", "Rock", "Jazz", "Folk", "Indie", "Country", "Funk", "Soul", "Americana", "Pop", "All Genres"];
const NIGHTS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TYPES = ["Bar/Tavern", "Restaurant", "Coffee Shop", "Brewery", "Winery", "Theatre", "Club", "Other"];

const S = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
.vs{max-width:430px;margin:0 auto;min-height:100vh;background:#faf6f0;font-family:'DM Sans',sans-serif;}
.vs-hero{background:linear-gradient(135deg,#2a1a08,#1a1208);padding:30px 20px 24px;text-align:center;}
.vs-title{font-family:'Playfair Display',serif;font-size:24px;color:#f5efe6;margin-bottom:6px;}
.vs-sub{font-size:13px;color:#7a6a58;}
.vs-body{padding:20px;}
.vs-sec{margin-bottom:20px;}
.vs-label{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#7a6a58;margin-bottom:8px;display:block;}
.vs-input{width:100%;padding:10px 14px;border:1px solid #d4c4a8;border-radius:8px;background:#fff;font-size:14px;font-family:'DM Sans',sans-serif;color:#1a1208;outline:none;}
.vs-input:focus{border-color:#c8852a;}
.vs-chips{display:flex;flex-wrap:wrap;gap:8px;}
.vs-chip{padding:6px 14px;border-radius:20px;border:1px solid #d4c4a8;background:#fff;font-size:12px;color:#7a6a58;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;}
.vs-chip.on{background:#c8852a;border-color:#c8852a;color:#fff;font-weight:500;}
.vs-btn{width:100%;padding:14px;background:#c8852a;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;margin-top:8px;}
.vs-err{font-size:12px;color:#9b3d1a;margin-bottom:10px;}
`;

function toggle(arr, val) {
    return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
}

export default function VenueSetup({ onComplete }) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [genres, setGenres] = useState([]);
    const [nights, setNights] = useState([]);
    const [about, setAbout] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const EMOJIS = { "Bar/Tavern": "🍺", "Restaurant": "🍽️", "Coffee Shop": "☕", "Brewery": "🍻", "Winery": "🍷", "Theatre": "🎭", "Club": "🎵", "Other": "🏢" };

    const save = async () => {
        if (!name.trim()) { setError("Please enter your venue name"); return; }
        if (!address.trim()) { setError("Please enter your address"); return; }
        if (!type) { setError("Please select venue type"); return; }
        if (genres.length === 0) { setError("Please select at least one genre"); return; }
        setError("");
        setLoading(true);
        try {
            const user = auth.currentUser;
            await setDoc(doc(db, "venues", user.uid), {
                uid: user.uid,
                email: user.email,
                name: name.trim(),
                address: address.trim(),
                type,
                emoji: EMOJIS[type] || "🏢",
                capacity: parseInt(capacity) || 0,
                genres,
                nights,
                about: about.trim(),
                createdAt: new Date().toISOString(),
            });
            onComplete();
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    };

    return (
        <>
            <style>{S}</style>
            <div className="vs">
                <div className="vs-hero">
                    <div className="vs-title">Register Your Venue</div>
                    <div className="vs-sub">Connect with local musicians and bands</div>
                </div>
                <div className="vs-body">
                    {error && <div className="vs-err">{error}</div>}
                    <div className="vs-sec">
                        <label className="vs-label">Venue Name *</label>
                        <input className="vs-input" placeholder="e.g. The Rabbit Hole Bar" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="vs-sec">
                        <label className="vs-label">Address *</label>
                        <input className="vs-input" placeholder="e.g. 520 Main St, Grand Junction" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className="vs-sec">
                        <label className="vs-label">Venue Type *</label>
                        <div className="vs-chips">
                            {TYPES.map(t => <div key={t} className={`vs-chip ${type === t ? "on" : ""}`} onClick={() => setType(t)}>{t}</div>)}
                        </div>
                    </div>
                    <div className="vs-sec">
                        <label className="vs-label">Music Genres You Book *</label>
                        <div className="vs-chips">
                            {GENRES.map(g => <div key={g} className={`vs-chip ${genres.includes(g) ? "on" : ""}`} onClick={() => setGenres(toggle(genres, g))}>{g}</div>)}
                        </div>
                    </div>
                    <div className="vs-sec">
                        <label className="vs-label">Music Nights</label>
                        <div className="vs-chips">
                            {NIGHTS.map(n => <div key={n} className={`vs-chip ${nights.includes(n) ? "on" : ""}`} onClick={() => setNights(toggle(nights, n))}>{n}</div>)}
                        </div>
                    </div>
                    <div className="vs-sec">
                        <label className="vs-label">Capacity</label>
                        <input className="vs-input" type="number" placeholder="e.g. 150" value={capacity} onChange={e => setCapacity(e.target.value)} />
                    </div>
                    <div className="vs-sec">
                        <label className="vs-label">About Your Venue</label>
                        <textarea className="vs-input" style={{ minHeight: 80, resize: "vertical" }} placeholder="Tell musicians about your space, vibe, and what kind of music you feature..." value={about} onChange={e => setAbout(e.target.value)} />
                    </div>
                    <button className="vs-btn" onClick={save} disabled={loading}>
                        {loading ? "Saving..." : "Complete Venue Setup →"}
                    </button>
                </div>
            </div>
        </>
    );
}