'use client';
import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import Auth from "./components/Auth";
import ProfileSetup from "./components/ProfileSetup";

const MusicMeetup = dynamic(() => import("./components/MusicMeetup"), { ssr: false });

export default function Page() {
  const [user, setUser] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const unsub = onAuthStateChanged(auth, async u => {
        setUser(u);
        if (u) {
          try {
            const snap = await getDoc(doc(db, "users", u.uid));
            setProfile(snap.exists() ? snap.data() : null);
          } catch (e) {
            setError(e.message);
          }
        } else {
          setProfile(null);
        }
      }, e => setError(e.message));
      return () => unsub();
    } catch (e) {
      setError(e.message);
    }
  }, []);

  if (error) return (
    <div style={{padding:32,background:"#1a1208",minHeight:"100vh",color:"#e6a84a",fontFamily:"monospace",fontSize:13}}>
      <div style={{marginBottom:16,color:"#f5efe6",fontSize:18}}>Error</div>
      {error}
    </div>
  );

  if (user === undefined || profile === undefined) return (
    <div style={{position:"fixed",inset:0,background:"#1a1208",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:"#e6a84a"}}>Music<span style={{fontStyle:"italic",color:"#f5efe6"}}>Meetup</span></div>
      <div style={{fontSize:12,color:"#7a6a58",letterSpacing:2,textTransform:"uppercase"}}>Loading...</div>
    </div>
  );

  if (!user) return <Auth />;
  if (!profile) return <ProfileSetup onComplete={async () => {
    const snap = await getDoc(doc(db, "users", user.uid));
    setProfile(snap.data());
  }} />;
  return <MusicMeetup user={user} profile={profile} />;
}