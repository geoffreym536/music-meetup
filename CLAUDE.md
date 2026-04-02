# MusicMeetup — Claude Code Context

## What This Is
A local music networking app for Grand Junction, CO. Musicians find each other, form bands, apply for paid gigs. Venues post gig openings and connect with local talent.

## Live URLs
- App: https://music-meetup.vercel.app
- GitHub: https://github.com/geoffreym536/music-meetup
- Firebase: music-meetup-52401

## Tech Stack
- Next.js (app router), single-file React components, no TypeScript
- Firebase Auth + Firestore for backend
- Vercel for deployment (auto-deploys on push to main)
- All styles are inline CSS-in-JS inside the `S` template literal at the top of each component file

## Project Structure
- app/components/MusicMeetup.jsx — main musician-facing app (~2500+ lines)
- app/components/VenueApp.jsx — venue dashboard
- app/components/Auth.jsx — sign in / sign up
- app/components/ProfileSetup.jsx — musician profile creation
- app/components/VenueSetup.jsx — venue profile creation
- app/page.js — routing logic (auth state → correct component)
- lib/firebase.js — Firebase config

## Coding Conventions
- Functional components only, no classes
- No TypeScript, plain JSX
- All CSS lives in the `S` constant as a template literal string, using CSS variables defined in :root
- CSS variables: --ink, --parchment, --warm, --amber, --al, --rust, --sage, --cream, --muted, --border, --safe, --safel, --safeb, --warn
- Firebase is always imported dynamically inside functions: `const { doc, setDoc } = await import("firebase/firestore")`
- No external UI libraries — all components built from scratch

## Firestore Collections
- users — musician profiles (uid, name, emoji, instrument, genres, looking, availability, about)
- venues — venue profiles (name, address, emoji, genres, nights, about)
- accountTypes — maps uid to "musician" or "venue"
- bands — band profiles (name, emoji, genres, desc, members[], createdBy, createdAt)
- events — community and venue events (name, venue, type, month, day, dow, allAges, addedBy, createdAt)
- gigOpenings — venue-posted gig opportunities (name, venueName, venueId, month, day, pay, type, status, createdAt)
- gigOpenings/{gigId}/applications/{userId} — band/musician applications
- conversations — messaging threads (participants{}, participantNames{}, participantEmojis{})
- conversations/{convId}/messages — individual messages

## Key Patterns
- convId: [uid1, uid2].sort().join("_")
- isMyBand: d.data().createdBy === user.uid
- Age gate stored in localStorage as "ageVerified" = "minor" or "adult"
- Shows (Live Music) fetched from events where addedBy=="venue" and type=="gig"
- All Firestore fetches are in useEffect hooks with dynamic imports

## Current Nav Tabs (Musician)
Home, Live (Tonight/Upcoming/Scene/Venues), Bands, Events, Messages

## What's Working
Full auth, musician profiles, musicians nearby, real-time messaging, jam scheduling, bands (create/manage/apply/fill slots), gig openings (post/apply/accept/decline), events (community + venue), live music feed, activity feed (Scene tab), age gate with safe mode for minors, venue accounts and dashboard

## Known Pending Items
- Band member approval flow (accept/decline join requests in-app)
- Real-time message notifications across sessions
- Year-end Wrapped feature
- Geo/distance filtering for musicians
- Social links on profiles