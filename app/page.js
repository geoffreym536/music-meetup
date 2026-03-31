'use client';
import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import Auth from "./components/Auth";
import ProfileSetup from "./components/ProfileSetup";

const MusicMeetup = dynamic(() => import("./components/MusicMeetup"), { ssr: false });
const VenueApp = dynamic(() => import("./components/VenueApp"), { ssr: false });
const VenueSetup = dynamic(() => import("./components/VenueSetup"), { ssr: false });

export default function Page() {
  const [user, setUser] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [accountType, setAccountType] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async u => {
      setUser(u);
      if (u) {
        try {
          const [profileSnap, typeSnap] = await Promise.all([
            getDoc(doc(db, "users", u.uid)),
            getDoc(doc(db, "accountTypes", u.uid)),
          ]);
          const type = typeSnap.exists() ? typeSnap.data().type : "musician";
          setAccountType(type);
          if (type === "venue") {
            const venueSnap = await getDoc(doc(db, "venues", u.uid));
            setProfile(venueSnap.exists() ? venueSnap.data() : null);
          } else {
            setProfile(profileSnap.exists() ? profileSnap.data() : null);
          }
        } catch (e) {
          setError(e.message);
        }
      } else {
        setProfile(null);
        setAccountType(null);
      }
    }, e => setError(e.message));
    return () => unsub();
  }, []);

  const handleProfileComplete = async () => {
    if (!user) return;
    if (accountType === "venue") {
      const snap = await getDoc(doc(db, "venues", user.uid));
      setProfile(snap.exists() ? snap.data() : null);
    } else {
      const snap = await getDoc(doc(db, "users", user.uid));
      setProfile(snap.exists() ? snap.data() : null);
    }
  };

  if (error) return (
    <div style={{ padding: 32, background: "#1a1208", minHeight: "100vh", color: "#e6a84a", fontFamily: "monospace", fontSize: 13 }}>
      <div style={{ marginBottom: 16, color: "#f5efe6", fontSize: 18 }}>Error</div>{error}
    </div>
  );

  if (user === undefined || profile === undefined) return (
    <div style={{ position: "fixed", inset: 0, background: "#1a1208", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#e6a84a" }}>Music<span style={{ fontStyle: "italic", color: "#f5efe6" }}>Meetup</span></div>
      <div style={{ fontSize: 12, color: "#7a6a58", letterSpacing: 2, textTransform: "uppercase" }}>Loading...</div>
    </div>
  );

  if (!user) return <Auth />;
  if (!profile && accountType === "venue") return <VenueSetup onComplete={handleProfileComplete} />;
  if (!profile) return <ProfileSetup onComplete={handleProfileComplete} />;
  if (accountType === "venue") return <VenueApp user={user} profile={profile} />;
  return <MusicMeetup user={user} profile={profile} />;
}