'use client';
import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import dynamic from "next/dynamic";
import Auth from "./components/Auth";

const MusicMeetup = dynamic(() => import("./components/MusicMeetup"), { ssr: false });

export default function Page() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return () => unsub();
  }, []);

  if (user === undefined) return null;
  if (!user) return <Auth />;
  return <MusicMeetup user={user} />;
}