**Currently Working ✅**

Auth & Accounts: sign up/sign in, musician and venue account types, age gate (minor safe mode), sign out.

Musician side: profile create/edit, Musicians Nearby (real Firestore users), instrument filter, message any musician (real-time Firestore), jam request scheduling, band modal with linked profiles.

Bands: create band profile, manage band (edit name/genres/description, add open slots, fill slots from app users or manually, remove slots), browse all bands, Discover/Seeking/My Bands tabs, gig openings tab, my applications tab with accept/decline status.

Gig flow: venues post gig openings, musicians apply (solo or as band) with message, venues review applications and accept/decline, accepted application auto-creates an event in Firestore, musician sees status in My Applications.

Events: community-posted events (open mics, jams, gigs), add event modal, join/going tracking, age filtering for minors.

Live Music: Tonight/Upcoming tabs (hardcoded GJ shows for now), Venues tab pulls real venue accounts from Firestore, genre filter on Upcoming.

Venue side: venue account setup, dashboard with gig openings and application review, Find Bands with genre filter and message/invite buttons, Gig Openings tab, Venue Profile.

Messaging: real-time Firestore messaging between any two users, conversation persists across sessions, jam request cards with accept/decline.

---

**Identified for Future Iterations 🔜**

Near term — these are partially built or blocked on something small: Apply to Join a band (button exists, does nothing), Message Band button in BModal (does nothing), real Tonight/Upcoming data from accepted gig events instead of hardcoded shows, real home stats (musicians nearby count, shows this month), security rules tightening before public launch, remove the hardcoded GJ venues from the Venues tab once enough real ones exist.

Medium term — meaningful features that need design decisions: activity feed showing confirmed shows from accepted gigs, venue invite flow (venue invites a specific band to a gig, not just posting an opening), band management notifications (someone applied to your band, your application was accepted), real-time message notifications/badge count, social links on musician profiles (Instagram, YouTube).

Long term / bigger features: Spotify-style year-end Wrapped (shows played, venues, reach), distance/geo filtering for Musicians Nearby, band member approval flow (band leader accepts/declines join requests), venue show posting independent of gig booking (just announcing a show), open mic slot sign-up system, photo/media on profiles, public-facing venue pages that non-users can view.