'use client';
import { useState } from "react";
import { db, auth } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const GENRES = ["Blues","Rock","Jazz","Folk","Indie","Country","Funk","Soul","Classical","Metal","Americana","Pop"];
const INSTS = ["Guitar","Bass","Drums","Keys","Violin","Sax","Vocals","Trumpet","Banjo","Mandolin","Other"];
const LOOKING = ["Jam Session","Open Mic","Band","Gigging","Recording","Teaching"];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const EMOJIS = {"Guitar":"🎸","Bass":"🎸","Drums":"🥁","Keys":"🎹","Violin":"🎻","Sax":"🎷","Vocals":"🎵","Trumpet":"🎺","Banjo":"🪕","Mandolin":"🎸","Other":"🎵"};

const S = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
.ps{max-width:430px;margin:0 auto;min-height:100vh;background:#faf6f0;font-family:'DM Sans',sans-serif;}
.ps-hero{background:linear-gradient(135deg,#2a1a08,#1a1208);padding:30px 20px 24px;text-align:center;}
.ps-title{font-family:'Playfair Display',serif;font-size:24px;color:#f5efe6;margin-bottom:6px;}
.ps-sub{font-size:13px;color:#7a6a58;}
.ps-body{padding:20px;}
.ps-sec{margin-bottom:20px;}
.ps-label{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#7a6a58;margin-bottom:8px;display:block;}
.ps-input{width:100%;padding:10px 14px;border:1px solid #d4c4a8;border-radius:8px;background:#fff;font-size:14px;font-family:'DM Sans',sans-serif;color:#1a1208;outline:none;}
.ps-input:focus{border-color:#c8852a;}
.ps-chips{display:flex;flex-wrap:wrap;gap:8px;}
.ps-chip{padding:6px 14px;border-radius:20px;border:1px solid #d4c4a8;background:#fff;font-size:12px;color:#7a6a58;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;}
.ps-chip.on{background:#c8852a;border-color:#c8852a;color:#fff;font-weight:500;}
.ps-days{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;}
.ps-day{padding:8px 4px;border-radius:8px;border:1px solid #d4c4a8;background:#fff;font-size:11px;color:#7a6a58;cursor:pointer;text-align:center;font-family:'DM Sans',sans-serif;}
.ps-day.on{background:#e8f5e9;color:#4a6741;border-color:#a5d6a7;}
.ps-btn{width:100%;padding:14px;background:#c8852a;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;margin-top:8px;}
.ps-err{font-size:12px;color:#9b3d1a;margin-bottom:10px;}
`;

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
}

export default function ProfileSetup({ onComplete }) {
  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("");
  const [genres, setGenres] = useState([]);
  const [looking, setLooking] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("Grand Junction, CO");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const save = async () => {
    if (!name.trim()) { setError("Please enter your name"); return; }
    if (!instrument) { setError("Please select your instrument"); return; }
    if (genres.length === 0) { setError("Please select at least one genre"); return; }
    setError("");
    setLoading(true);
    try {
      const user = auth.currentUser;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name.trim(),
        instrument,
        emoji: EMOJIS[instrument] || "🎵",
        genres,
        looking,
        availability,
        about: about.trim(),
        location: location.trim(),
        createdAt: new Date().toISOString(),
        online: true,
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
      {!ageConfirmed ? (
        <div style={{position:"fixed",inset:0,background:"#1a1208",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center",fontFamily:"'DM Sans',sans-serif"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,color:"#e6a84a",marginBottom:6}}>Music<span style={{fontStyle:"italic",color:"#f5efe6"}}>Meetup</span></div>
          <div style={{fontSize:11,color:"#7a6a58",letterSpacing:2,textTransform:"uppercase",marginBottom:40}}>Connect · Jam · Perform</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:"#f5efe6",marginBottom:8}}>How old are you?</div>
          <div style={{fontSize:13,color:"#7a6a58",marginBottom:32,lineHeight:1.5}}>We use this to keep younger musicians safe and connect you with the right people.</div>
          <button style={{width:"100%",padding:15,background:"#c8852a",color:"#fff",border:"none",borderRadius:12,fontSize:16,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",marginBottom:10}} onClick={() => setAgeConfirmed(true)}>18 or older</button>
          <button style={{width:"100%",padding:15,background:"#1565c0",color:"#fff",border:"none",borderRadius:12,fontSize:16,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}} onClick={() => window.location.href="/"}>Under 18</button>
          <div style={{fontSize:11,color:"#7a6a58",marginTop:16,lineHeight:1.6}}>Under-18 users have Safe Mode enabled automatically.</div>
        </div>
      ) : (
        <div className="ps">
          <div className="ps-hero">
            <div className="ps-title">Welcome to MusicMeetup</div>
            <div className="ps-sub">Tell us about yourself so musicians can find you</div>
          </div>
          <div className="ps-body">
            {error && <div className="ps-err">{error}</div>}
            <div className="ps-sec">
              <label className="ps-label">Your Name *</label>
              <input className="ps-input" placeholder="e.g. Geoff M." value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="ps-sec">
              <label className="ps-label">Primary Instrument *</label>
              <div className="ps-chips">
                {INSTS.map(i => <div key={i} className={`ps-chip ${instrument === i ? "on" : ""}`} onClick={() => setInstrument(i)}>{i}</div>)}
              </div>
            </div>
            <div className="ps-sec">
              <label className="ps-label">Genres *</label>
              <div className="ps-chips">
                {GENRES.map(g => <div key={g} className={`ps-chip ${genres.includes(g) ? "on" : ""}`} onClick={() => setGenres(toggle(genres, g))}>{g}</div>)}
              </div>
            </div>
            <div className="ps-sec">
              <label className="ps-label">Looking For</label>
              <div className="ps-chips">
                {LOOKING.map(l => <div key={l} className={`ps-chip ${looking.includes(l) ? "on" : ""}`} onClick={() => setLooking(toggle(looking, l))}>{l}</div>)}
              </div>
            </div>
            <div className="ps-sec">
              <label className="ps-label">Available Days</label>
              <div className="ps-days">
                {DAYS.map(d => <div key={d} className={`ps-day ${availability.includes(d) ? "on" : ""}`} onClick={() => setAvailability(toggle(availability, d))}>{d}</div>)}
              </div>
            </div>
            <div className="ps-sec">
              <label className="ps-label">Location</label>
              <input className="ps-input" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div className="ps-sec">
              <label className="ps-label">About You</label>
              <textarea className="ps-input" style={{minHeight:80,resize:"vertical"}} placeholder="Tell other musicians about your style, experience, and what you're looking for..." value={about} onChange={e => setAbout(e.target.value)} />
            </div>
            <button className="ps-btn" onClick={save} disabled={loading}>
              {loading ? "Saving..." : "Complete Profile →"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}