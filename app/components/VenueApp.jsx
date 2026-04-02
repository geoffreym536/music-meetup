'use client';
import { useState, useEffect } from "react";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--ink:#1a1208;--parchment:#f5efe6;--warm:#f0e6d3;--amber:#c8852a;--al:#e6a84a;--rust:#9b3d1a;--sage:#4a6741;--cream:#faf6f0;--muted:#7a6a58;--border:#d4c4a8;}
body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);}
.vapp{max-width:430px;margin:0 auto;background:var(--cream);min-height:100vh;}
.vhdr{background:var(--ink);padding:18px 20px 14px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
.vlogo{font-family:'Playfair Display',serif;font-size:18px;color:var(--al);}
.vlogo span{font-style:italic;color:var(--parchment);}
.vbadge{background:rgba(200,133,42,.2);color:var(--al);font-size:10px;padding:3px 8px;border-radius:6px;font-weight:600;letter-spacing:.5px;}
.vbnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:var(--ink);border-top:1px solid #2a2010;display:flex;z-index:100;}
.vnbtn{flex:1;padding:10px 2px 8px;background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;color:var(--muted);font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:.3px;transition:color .2s;}
.vnbtn.on{color:var(--al);}
.vnbtn svg{width:18px;height:18px;}
.vpg{padding:0 0 80px;}
.vhero{background:linear-gradient(135deg,#2a1a08,#1a1208);padding:24px 20px 20px;border-bottom:3px solid var(--amber);}
.vhname{font-family:'Playfair Display',serif;font-size:24px;color:var(--parchment);margin-bottom:4px;}
.vhaddr{font-size:12px;color:var(--muted);margin-bottom:12px;}
.vhstats{display:flex;gap:20px;}
.vstn{font-family:'Playfair Display',serif;font-size:20px;color:var(--al);line-height:1;display:block;}
.vstl{font-size:10px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-top:2px;display:block;}
.vsh{display:flex;align-items:baseline;justify-content:space-between;padding:20px 20px 10px;}
.vst{font-family:'Playfair Display',serif;font-size:18px;color:var(--ink);}
.vsl{font-size:12px;color:var(--amber);cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif;text-decoration:underline;}
.vcard{margin:0 20px 12px;background:#fff;border-radius:12px;border:1px solid var(--border);overflow:hidden;}
.vcardt{padding:14px 16px;border-bottom:1px solid var(--warm);}
.vcardtitle{font-family:'Playfair Display',serif;font-size:16px;color:var(--ink);margin-bottom:3px;}
.vcardsub{font-size:12px;color:var(--muted);}
.vcardb{padding:12px 16px;display:flex;gap:8px;align-items:center;}
.vtag{font-size:10px;padding:3px 10px;border-radius:20px;font-weight:500;}
.vtag-g{background:#e8f5e9;color:var(--sage);border:1px solid #a5d6a7;}
.vtag-a{background:#fef3e2;color:var(--amber);border:1px solid #f5dba0;}
.vtag-r{background:#fce4ec;color:var(--rust);border:1px solid #f48fb1;}
.vbtn1{padding:8px 16px;background:var(--amber);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;}
.vbtn2{padding:8px 16px;background:var(--warm);color:var(--ink);border:1px solid var(--border);border-radius:8px;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;}
.brow{display:flex;gap:8px;padding:0 20px;margin-bottom:12px;flex-wrap:wrap;}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:200;display:flex;align-items:flex-end;justify-content:center;}
.mod{background:var(--cream);border-radius:20px 20px 0 0;width:100%;max-width:430px;max-height:90vh;overflow-y:auto;padding:20px;animation:su .25s ease;}
@keyframes su{from{transform:translateY(100%)}to{transform:translateY(0)}}
.mhnd{width:36px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 20px;}
.mtit{font-family:'Playfair Display',serif;font-size:20px;margin-bottom:16px;}
.fg{margin-bottom:14px;}
.fl{display:block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
.fi,.fsl,.fta{width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:8px;background:#fff;font-size:14px;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;}
.fta{min-height:72px;resize:vertical;}
.fi:focus,.fsl:focus,.fta:focus{border-color:var(--amber);}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.cbg{display:flex;flex-wrap:wrap;gap:8px;}
.cbl{padding:6px 14px;border-radius:20px;border:1px solid var(--border);background:#fff;font-size:12px;color:var(--muted);cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;}
.cbl.ck{background:var(--amber);border-color:var(--amber);color:#fff;font-weight:500;}
.bandcard{margin:0 20px 12px;background:#fff;border-radius:12px;border:1px solid var(--border);padding:14px 16px;cursor:pointer;transition:transform .15s;}
.bandcard:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.08);}
.bcname{font-family:'Playfair Display',serif;font-size:16px;color:var(--ink);margin-bottom:3px;}
.bcgens{font-size:12px;color:var(--amber);font-weight:500;margin-bottom:8px;}
.bcpills{display:flex;gap:6px;flex-wrap:wrap;}
.es{text-align:center;padding:40px 20px;color:var(--muted);}
.ei{font-size:48px;margin-bottom:12px;}
.et{font-family:'Playfair Display',serif;font-size:18px;color:var(--ink);margin-bottom:6px;}
.ed{font-size:13px;line-height:1.6;}
.toast{position:fixed;top:70px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--parchment);padding:12px 20px;border-radius:24px;font-size:13px;font-weight:500;z-index:500;border:1px solid var(--amber);white-space:nowrap;animation:fio 2.5s ease forwards;}
@keyframes fio{0%{opacity:0;transform:translateX(-50%) translateY(-8px)}15%{opacity:1;transform:translateX(-50%) translateY(0)}75%{opacity:1}100%{opacity:0}}
`;

const GENRES = ["Blues", "Rock", "Jazz", "Folk", "Indie", "Country", "Funk", "Soul", "Americana", "Pop", "All Genres"];
const MONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOWL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const IH = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>;
const IB = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>;
const IM = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>;
const IP = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>;

export default function VenueApp({ user, profile }) {
    const [tab, setTab] = useState("dashboard");
    const [bands, setBands] = useState([]);
    const [gigOpenings, setGigOpenings] = useState([]);
    const [venueEvents, setVenueEvents] = useState([]);
    const [showAddGig, setShowAddGig] = useState(false);
    const [showPostEvent, setShowPostEvent] = useState(false);
    const [toast, setToast] = useState(null);

    const doToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2600); };

    useEffect(() => {
        const fetchBands = async () => {
            try {
                const { collection, getDocs } = await import("firebase/firestore");
                const { db } = await import("../../lib/firebase");
                const snap = await getDocs(collection(db, "bands"));
                setBands(snap.docs.map(d => ({ ...d.data(), id: d.id })));
            } catch (e) { console.error(e); }
        };
        fetchBands();
    }, []);

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const { collection, getDocs, query, where } = await import("firebase/firestore");
                const { db } = await import("../../lib/firebase");
                const snap = await getDocs(query(collection(db, "gigOpenings"), where("venueId", "==", user.uid)));
                setGigOpenings(snap.docs.map(d => ({ ...d.data(), id: d.id })));
            } catch (e) { console.error(e); }
        };
        fetchGigs();
    }, []);

    useEffect(() => {
        const fetchVenueEvents = async () => {
            try {
                const { collection, getDocs, query, where } = await import("firebase/firestore");
                const { db } = await import("../../lib/firebase");
                const snap = await getDocs(query(collection(db, "events"), where("addedBy", "==", user.uid)));
                setVenueEvents(snap.docs.map(d => ({ ...d.data(), id: d.id })));
            } catch (e) { console.error(e); }
        };
        fetchVenueEvents();
    }, []);

    const signOut = () => import("firebase/auth").then(a => import("../../lib/firebase").then(m => a.signOut(m.auth)));

    return (
        <>
            <style>{S}</style>
            <div className="vapp">
                {toast && <div className="toast">✓ {toast}</div>}
                <div className="vhdr">
                    <div>
                        <div className="vlogo">Music<span>Meetup</span></div>
                        <div className="vbadge">VENUE</div>
                    </div>
                    <button onClick={signOut} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 12 }}>Sign Out</button>
                </div>

                <div style={{ display: tab === "messages" ? "none" : "block" }}>
                    {tab === "dashboard" && <VenueDashboard profile={profile} gigOpenings={gigOpenings} onAddGig={() => setShowAddGig(true)} onAddEvent={() => setShowPostEvent(true)} bands={bands} onDeleteGig={id => setGigOpenings(p => p.filter(g => g.id !== id))} />}
                    {tab === "bands" && <BandRoster bands={bands} venueProfile={profile} user={user} doToast={doToast} />}
                    {tab === "gigs" && <GigOpenings gigOpenings={gigOpenings} onAdd={() => setShowAddGig(true)} venueEvents={venueEvents} onDeleteEvent={id => setVenueEvents(p => p.filter(e => e.id !== id))} />}
                    {tab === "profile" && <VenueProfile profile={profile} onSignOut={signOut} />}

                    <nav className="vbnav">
                        {[{ id: "dashboard", icon: <IH />, label: "Dashboard" }, { id: "bands", icon: <IB />, label: "Find Bands" }, { id: "gigs", icon: <IM />, label: "Gig Openings" }, { id: "profile", icon: <IP />, label: "Profile" }].map(n => (
                            <button key={n.id} className={`vnbtn${tab === n.id ? " on" : ""}`} onClick={() => setTab(n.id)}>
                                {n.icon}{n.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {showAddGig && <AddGigModal onClose={() => setShowAddGig(false)} onAdd={async gigs => {
                    try {
                        const { collection, addDoc } = await import("firebase/firestore");
                        const { db } = await import("../../lib/firebase");
                        const added = [];
                        for (const d of gigs) {
                            const ref = await addDoc(collection(db, "gigOpenings"), {
                                ...d, venueId: user.uid, venueName: profile.name,
                                venueAddress: profile.address, status: "open",
                                createdAt: new Date().toISOString(), applications: [],
                            });
                            added.push({ ...d, id: ref.id, venueId: user.uid, venueName: profile.name, status: "open", applications: [] });
                        }
                        setGigOpenings(p => [...p, ...added]);
                        doToast(gigs.length > 1 ? `${gigs.length} gig openings posted!` : "Gig opening posted!");
                    } catch (e) { alert(e.message); }
                    setShowAddGig(false);
                }} />}

                {showPostEvent && <PostEventModal onClose={() => setShowPostEvent(false)} onAdd={async d => {
                    try {
                        const { collection, addDoc } = await import("firebase/firestore");
                        const { db } = await import("../../lib/firebase");
                        await addDoc(collection(db, "events"), {
                            ...d,
                            venue: profile.name,
                            addedBy: user.uid,
                            createdAt: new Date().toISOString(),
                            going: [], joined: false, slots: 0,
                        });
                        doToast("Event posted!");
                    } catch (e) { alert(e.message); }
                    setShowPostEvent(false);
                }} />}
            </div>
        </>
    );
}

function VenueDashboard({ profile, gigOpenings, onAddGig, onAddEvent, bands, onDeleteGig }) {
    const [viewingGig, setViewingGig] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loadingApps, setLoadingApps] = useState(false);
    const [confirmDeleteGig, setConfirmDeleteGig] = useState(false);
    const openGigs = gigOpenings.filter(g => g.status === "open");

    const openGigDetail = async gig => {
        setViewingGig(gig);
        setLoadingApps(true);
        try {
            const { collection, getDocs } = await import("firebase/firestore");
            const { db } = await import("../../lib/firebase");
            const snap = await getDocs(collection(db, "gigOpenings", gig.id, "applications"));
            setApplications(snap.docs.map(d => ({ ...d.data(), appId: d.id })));
        } catch (e) { console.error(e); }
        setLoadingApps(false);
    };

    const updateStatus = async (appId, status) => {
        try {
            const { doc, updateDoc, collection, addDoc } = await import("firebase/firestore");
            const { db } = await import("../../lib/firebase");
            await updateDoc(doc(db, "gigOpenings", viewingGig.id, "applications", appId), { status });
            setApplications(p => p.map(a => a.appId === appId ? { ...a, status } : a));
            if (status === "accepted") {
                await updateDoc(doc(db, "gigOpenings", viewingGig.id), { status: "booked" });
                setViewingGig(v => ({ ...v, status: "booked" }));
                // create a show in the events collection
                const acceptedApp = applications.find(a => a.appId === appId);
                await addDoc(collection(db, "events"), {
                    name: acceptedApp?.bandName || "Live Show",
                    venue: viewingGig.venueName,
                    month: viewingGig.month,
                    day: viewingGig.day,
                    dow: viewingGig.dow,
                    type: "gig",
                    allAges: viewingGig.allAges || false,
                    slots: 0,
                    going: [],
                    joined: false,
                    pay: viewingGig.pay || "",
                    createdAt: new Date().toISOString(),
                    addedBy: "venue",
                    fromGigId: viewingGig.id,
                });
            }
        } catch (e) { alert(e.message); }
    };

    if (viewingGig) return (
        <div className="vpg">
            <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: confirmDeleteGig ? "none" : "1px solid var(--border)" }}>
                <button onClick={() => { setViewingGig(null); setConfirmDeleteGig(false); }} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--ink)" }}>‹</button>
                <div style={{ fontFamily: "Playfair Display,serif", fontSize: 18, flex: 1 }}>{viewingGig.name}</div>
                <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 20, background: viewingGig.status === "booked" ? "#e8f5e9" : "#fef3e2", color: viewingGig.status === "booked" ? "var(--sage)" : "var(--amber)", border: `1px solid ${viewingGig.status === "booked" ? "#a5d6a7" : "#f5dba0"}` }}>{viewingGig.status}</span>
                <button
                    onClick={() => setConfirmDeleteGig(true)}
                    style={{ background: "#fce4ec", color: "var(--rust)", border: "1px solid #f48fb1", borderRadius: 8, padding: "5px 10px", fontSize: 12, cursor: "pointer", fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap" }}
                >
                    🗑 Delete
                </button>
            </div>
            {confirmDeleteGig && (
                <div style={{ margin: "0 20px", padding: 14, background: "#fce4ec", border: "1px solid #f48fb1", borderBottom: "1px solid var(--border)", borderRadius: "0 0 10px 10px" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--rust)", marginBottom: 10 }}>Are you sure? This cannot be undone.</div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button
                            style={{ flex: 1, padding: "8px 0", background: "var(--rust)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "DM Sans,sans-serif" }}
                            onClick={async () => {
                                try {
                                    const { doc, deleteDoc } = await import("firebase/firestore");
                                    const { db } = await import("../../lib/firebase");
                                    await deleteDoc(doc(db, "gigOpenings", viewingGig.id));
                                    onDeleteGig && onDeleteGig(viewingGig.id);
                                    setViewingGig(null);
                                    setConfirmDeleteGig(false);
                                } catch (e) { alert(e.message); }
                            }}
                        >
                            Confirm Delete
                        </button>
                        <button
                            style={{ flex: 1, padding: "8px 0", background: "var(--warm)", color: "var(--ink)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: "DM Sans,sans-serif" }}
                            onClick={() => setConfirmDeleteGig(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <div style={{ padding: "12px 20px 4px", fontSize: 12, color: "var(--muted)" }}>
                📅 {viewingGig.month} {viewingGig.day} · 💰 {viewingGig.pay || "Negotiable"}
            </div>
            <div style={{ padding: "4px 20px 16px", fontSize: 12, color: "var(--muted)" }}>
                {loadingApps ? "Loading applications..." : `${applications.length} application${applications.length !== 1 ? "s" : ""}`}
            </div>
            {!loadingApps && applications.length === 0 && (
                <div className="es"><div className="ei">📬</div><div className="et">No applications yet</div><div className="ed">Share this opening with local musicians to get applications.</div></div>
            )}
            {applications.map(app => (
                <div key={app.appId} style={{ margin: "0 20px 12px", background: "#fff", borderRadius: 12, border: "1px solid var(--border)", padding: "14px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div>
                            <div style={{ fontWeight: 500, fontSize: 15 }}>{app.applicantEmoji} {app.bandName || app.applicantName}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Applied {new Date(app.appliedAt).toLocaleDateString()}</div>
                        </div>
                        <span style={{
                            fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600,
                            background: app.status === "accepted" ? "#e8f5e9" : app.status === "declined" ? "#fce4ec" : "#fef3e2",
                            color: app.status === "accepted" ? "var(--sage)" : app.status === "declined" ? "var(--rust)" : "var(--amber)",
                            border: `1px solid ${app.status === "accepted" ? "#a5d6a7" : app.status === "declined" ? "#f48fb1" : "#f5dba0"}`
                        }}>
                            {app.status === "accepted" ? "✓ Accepted" : app.status === "declined" ? "✗ Declined" : "⏳ Pending"}
                        </span>
                    </div>
                    {app.message && (
                        <div style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.5, marginBottom: 12, padding: "10px 12px", background: "var(--warm)", borderRadius: 8 }}>
                            "{app.message}"
                        </div>
                    )}
                    {app.status === "pending" && (
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="vbtn1" style={{ flex: 1, fontSize: 12 }} onClick={() => updateStatus(app.appId, "accepted")}>✓ Accept</button>
                            <button className="vbtn2" style={{ flex: 1, fontSize: 12 }} onClick={() => updateStatus(app.appId, "declined")}>✗ Decline</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="vpg">
            <div className="vhero">
                <div style={{ fontSize: 32, marginBottom: 8 }}>{profile.emoji || "🏢"}</div>
                <div className="vhname">{profile.name}</div>
                <div className="vhaddr">📍 {profile.address}</div>
                <div className="vhstats">
                    <div><span className="vstn">{openGigs.length}</span><span className="vstl">Open Gigs</span></div>
                    <div><span className="vstn">{bands.length}</span><span className="vstl">Bands on App</span></div>
                </div>
            </div>
            <div className="vsh"><div className="vst">Quick Actions</div></div>
            <div className="brow">
                <button className="vbtn1" onClick={onAddGig}>🎸 Post Gig Opening</button>
                <button className="vbtn2" onClick={onAddEvent}>📅 Post Event</button>
            </div>
            <div className="vsh"><div className="vst">Your Gig Openings</div></div>
            {gigOpenings.length === 0 ? (
                <div className="es"><div className="ei">🎵</div><div className="et">No gig openings yet</div><div className="ed">Post your first opening to start receiving band applications.</div></div>
            ) : gigOpenings.map(g => (
                <div key={g.id} className="vcard" onClick={() => openGigDetail(g)} style={{ cursor: "pointer" }}>
                    <div className="vcardt">
                        <div className="vcardtitle">{g.name}</div>
                        <div className="vcardsub">📅 {g.month} {g.day} · 💰 {g.pay || "Negotiable"}</div>
                    </div>
                    <div className="vcardb">
                        <span className="vtag vtag-a">{g.type}</span>
                        {g.allAges && <span className="vtag vtag-g">All Ages</span>}
                        <span className={`vtag ${g.status === "booked" ? "vtag-g" : "vtag-a"}`}>{g.status}</span>
                        <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: "auto" }}>Tap to view applications →</span>
                    </div>
                </div>
            ))}
        </div>
    );
}


function BandRoster({ bands, venueProfile, user, doToast }) {
    const [filter, setFilter] = useState("All");
    const shown = bands.filter(b => filter === "All" || b.genres?.includes(filter));

    const msgBand = async band => {
        try {
            const { doc, setDoc } = await import("firebase/firestore");
            const { db } = await import("../../lib/firebase");
            const convId = [user.uid, band.createdBy].sort().join("_");
            await setDoc(doc(db, "conversations", convId), {
                participants: { [user.uid]: true, [band.createdBy]: true },
                participantNames: { [user.uid]: venueProfile.name, [band.createdBy]: band.name },
                participantEmojis: { [user.uid]: venueProfile.emoji || "🏢", [band.createdBy]: band.emoji || "🎵" },
                lastMessage: "",
                updatedAt: new Date().toISOString(),
            }, { merge: true });
            doToast(`Message thread opened with ${band.name}`);
        } catch (e) { alert(e.message); }
    };

    return (
        <div className="vpg">
            <div className="vhero" style={{ padding: "20px 20px 16px" }}>
                <div style={{ fontFamily: "Playfair Display,serif", fontSize: 22, color: "var(--parchment)" }}>Find <em style={{ color: "var(--al)", fontStyle: "italic" }}>Bands</em></div>
            </div>
            <div style={{ display: "flex", gap: 8, padding: "12px 20px", overflowX: "auto", scrollbarWidth: "none" }}>
                {["All", ...GENRES.slice(0, 8)].map(g => (
                    <div key={g} onClick={() => setFilter(g)} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid", borderColor: filter === g ? "var(--amber)" : "var(--border)", background: filter === g ? "var(--amber)" : "#fff", color: filter === g ? "#fff" : "var(--muted)", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "DM Sans,sans-serif" }}>
                        {g}
                    </div>
                ))}
            </div>
            {shown.length === 0 ? (
                <div className="es"><div className="ei">🎸</div><div className="et">No bands yet</div><div className="ed">Bands will appear here as musicians sign up.</div></div>
            ) : shown.map(b => (
                <div key={b.id} className="bandcard">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <div className="bcname">{b.emoji} {b.name}</div>
                            <div className="bcgens">{b.genres?.join(" · ")}</div>
                            <div className="bcpills">
                                <span className="vtag vtag-g">{b.members?.length || 0} members</span>
                                {b.dist && <span className="vtag vtag-a">📍 {b.dist}</span>}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <button className="vbtn1" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => msgBand(b)}>💬 Message</button>
                            <button className="vbtn2" style={{ fontSize: 12, padding: "6px 12px" }}>🎸 Invite</button>
                        </div>
                    </div>
                    {b.desc && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>{b.desc}</div>}
                </div>
            ))}
        </div>
    );
}

function GigOpenings({ gigOpenings, onAdd, venueEvents, onDeleteEvent }) {
    const TYPE_LABEL = { openmic: "Open Mic", jam: "Jam", gig: "Live Music" };
    return (
        <div className="vpg">
            <div className="vhero" style={{ padding: "20px 20px 16px" }}>
                <div style={{ fontFamily: "Playfair Display,serif", fontSize: 22, color: "var(--parchment)" }}>Gig <em style={{ color: "var(--al)", fontStyle: "italic" }}>Openings</em></div>
            </div>
            <div style={{ padding: "12px 20px" }}>
                <button className="vbtn1" style={{ width: "100%", padding: 12 }} onClick={onAdd}>+ Post New Gig Opening</button>
            </div>
            {gigOpenings.length === 0 ? (
                <div className="es"><div className="ei">🎵</div><div className="et">No gig openings posted</div><div className="ed">Post an opening and bands will be able to apply.</div></div>
            ) : gigOpenings.map(g => (
                <div key={g.id} className="vcard">
                    <div className="vcardt">
                        <div className="vcardtitle">{g.name}</div>
                        <div className="vcardsub">📅 {g.date} · 💰 {g.pay || "Negotiable"} · {g.type}</div>
                    </div>
                    <div className="vcardb">
                        <span className="vtag vtag-r">{g.applications?.length || 0} applications</span>
                        <span className={`vtag ${g.status === "open" ? "vtag-g" : "vtag-a"}`}>{g.status}</span>
                        {g.allAges && <span className="vtag vtag-g">All Ages</span>}
                    </div>
                </div>
            ))}

            {venueEvents?.length > 0 && (
                <>
                    <div className="vsh"><div className="vst">Posted Events</div></div>
                    {venueEvents.map(ev => (
                        <div key={ev.id} className="vcard" style={{ alignItems: "center" }}>
                            <div className="vcardt" style={{ flex: 1 }}>
                                <div className="vcardtitle">{ev.name}</div>
                                <div className="vcardsub">📅 {ev.month} {ev.day} · {TYPE_LABEL[ev.type] || ev.type}{ev.time ? ` · ${ev.time}` : ""}</div>
                            </div>
                            <button
                                style={{ background: "#fce4ec", color: "var(--rust)", border: "1px solid #f48fb1", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontFamily: "DM Sans,sans-serif", flexShrink: 0 }}
                                onClick={async () => {
                                    try {
                                        const { doc, deleteDoc } = await import("firebase/firestore");
                                        const { db } = await import("../../lib/firebase");
                                        await deleteDoc(doc(db, "events", ev.id));
                                        onDeleteEvent(ev.id);
                                    } catch (e) { alert(e.message); }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

function VenueProfile({ profile, onSignOut }) {
    return (
        <div className="vpg">
            <div className="vhero" style={{ padding: "30px 20px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>{profile.emoji || "🏢"}</div>
                <div style={{ fontFamily: "Playfair Display,serif", fontSize: 24, color: "var(--parchment)", marginBottom: 4 }}>{profile.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>📍 {profile.address}</div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                    {profile.genres?.map(g => <span key={g} style={{ padding: "4px 12px", borderRadius: 20, background: "rgba(200,133,42,.2)", color: "var(--al)", border: "1px solid rgba(200,133,42,.3)", fontSize: 11, fontWeight: 500 }}>{g}</span>)}
                </div>
            </div>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>About</div>
                <div style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.6 }}>{profile.about || "No description yet."}</div>
            </div>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>Music Nights</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {profile.nights?.map(n => <span key={n} style={{ padding: "5px 12px", borderRadius: 20, background: "var(--warm)", border: "1px solid var(--border)", fontSize: 12, color: "var(--ink)" }}>{n}</span>)}
                </div>
            </div>
            <div style={{ padding: "16px 20px" }}>
                <button onClick={onSignOut} style={{ width: "100%", padding: 12, background: "var(--warm)", color: "var(--rust)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "DM Sans,sans-serif" }}>🚪 Sign Out</button>
            </div>
        </div>
    );
}

function PostEventModal({ onClose, onAdd }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("openmic");
    const [time, setTime] = useState("");
    const [cover, setCover] = useState("");
    const [allAges, setAllAges] = useState(true);
    const [desc, setDesc] = useState("");

    const MONS_A = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const DOWS_A = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const go = () => {
        if (!name.trim() || !date) return;
        const d = new Date(date + "T12:00:00");
        onAdd({
            name: name.trim(),
            date,
            month: MONS_A[d.getMonth()].toUpperCase(),
            day: String(d.getDate()).padStart(2, "0"),
            dow: DOWS_A[d.getDay()].toUpperCase(),
            type,
            time: time.trim() || "TBD",
            cover: cover.trim() || "Free",
            allAges,
            desc: desc.trim(),
        });
    };

    return (
        <div className="ov" onClick={onClose}><div className="mod" onClick={e => e.stopPropagation()}>
            <div className="mhnd" /><div className="mtit">Post an Event</div>
            <div className="fg"><label className="fl">Event Name *</label><input className="fi" placeholder="e.g. Wednesday Open Mic" value={name} onChange={e => setName(e.target.value)} /></div>
            <div className="fg"><label className="fl">Date *</label><input className="fi" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
            <div className="fg"><label className="fl">Type</label>
                <div className="cbg">
                    {[["openmic","🎤 Open Mic"],["jam","🥁 Jam Night"],["gig","🎸 Live Music"]].map(([v, l]) => (
                        <div key={v} className={`cbl${type === v ? " ck" : ""}`} onClick={() => setType(v)}>{l}</div>
                    ))}
                </div>
            </div>
            <div className="fg"><label className="fl">Start Time</label><input className="fi" placeholder="e.g. 8:00 PM" value={time} onChange={e => setTime(e.target.value)} /></div>
            <div className="fg"><label className="fl">Cover Charge</label><input className="fi" placeholder="e.g. Free or $5" value={cover} onChange={e => setCover(e.target.value)} /></div>
            <div className="fg"><label className="fl">Age Policy</label>
                <div className="cbg">
                    <div className={`cbl${allAges ? " ck" : ""}`} onClick={() => setAllAges(true)}>✅ All Ages</div>
                    <div className={`cbl${!allAges ? " ck" : ""}`} onClick={() => setAllAges(false)}>🔞 18+ Only</div>
                </div>
            </div>
            <div className="fg"><label className="fl">Description</label><textarea className="fta" placeholder="What to expect, performers, vibe..." value={desc} onChange={e => setDesc(e.target.value)} /></div>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                <button className="vbtn1" style={{ flex: 1, padding: 14 }} onClick={go}>Post Event</button>
                <button className="vbtn2" style={{ padding: 14 }} onClick={onClose}>Cancel</button>
            </div>
        </div></div>
    );
}

function AddGigModal({ onClose, onAdd }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [pay, setPay] = useState("");
    const [type, setType] = useState("gig");
    const [allAges, setAllAges] = useState(false);
    const [genres, setGenres] = useState([]);
    const [notes, setNotes] = useState("");
    const [recurring, setRecurring] = useState(false);
    const [frequency, setFrequency] = useState("weekly");
    const [occurrences, setOccurrences] = useState(4);

    const MONS_A = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const DOWS_A = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const makeGig = d => ({
        name: name.trim(),
        date: d.toISOString().slice(0, 10),
        month: MONS_A[d.getMonth()].toUpperCase(),
        day: String(d.getDate()).padStart(2, "0"),
        dow: DOWS_A[d.getDay()].toUpperCase(),
        pay: pay.trim(), type, allAges, genres, notes: notes.trim(),
    });

    const go = () => {
        if (!name.trim() || !date) return;
        const base = new Date(date + "T12:00:00");
        let gigs;
        if (!recurring) {
            gigs = [makeGig(base)];
        } else {
            const groupId = Date.now().toString(36) + Math.random().toString(36).slice(2);
            const count = Math.min(Math.max(occurrences, 1), 12);
            gigs = Array.from({ length: count }, (_, i) => {
                const d = new Date(base);
                if (frequency === "weekly") d.setDate(d.getDate() + i * 7);
                else if (frequency === "biweekly") d.setDate(d.getDate() + i * 14);
                else d.setMonth(d.getMonth() + i);
                return { ...makeGig(d), recurringGroupId: groupId };
            });
        }
        onAdd(gigs);
    };

    return (
        <div className="ov" onClick={onClose}><div className="mod" onClick={e => e.stopPropagation()}>
            <div className="mhnd" /><div className="mtit">Post Gig Opening</div>
            <div className="fg"><label className="fl">Event Name *</label><input className="fi" placeholder="e.g. Friday Night Live" value={name} onChange={e => setName(e.target.value)} /></div>
            <div className="fg"><label className="fl">Date *</label><input className="fi" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
            <div className="fg">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <label className="fl" style={{ margin: 0 }}>Recurring</label>
                    <div
                        onClick={() => setRecurring(p => !p)}
                        style={{ width: 44, height: 24, borderRadius: 12, background: recurring ? "var(--amber)" : "var(--border)", cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}
                    >
                        <div style={{ position: "absolute", top: 3, left: recurring ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
                    </div>
                </div>
                {recurring && (
                    <div style={{ marginTop: 12 }}>
                        <label className="fl">Frequency</label>
                        <div className="cbg" style={{ marginBottom: 12 }}>
                            {[["weekly","Weekly"],["biweekly","Biweekly"],["monthly","Monthly"]].map(([v, l]) => (
                                <div key={v} className={`cbl${frequency === v ? " ck" : ""}`} onClick={() => setFrequency(v)}>{l}</div>
                            ))}
                        </div>
                        <label className="fl">Occurrences (max 12)</label>
                        <input
                            className="fi"
                            type="number"
                            min={1}
                            max={12}
                            value={occurrences}
                            onChange={e => setOccurrences(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))}
                        />
                    </div>
                )}
            </div>
            <div className="fg"><label className="fl">Pay</label><input className="fi" placeholder="e.g. $200 + tips" value={pay} onChange={e => setPay(e.target.value)} /></div>
            <div className="fg"><label className="fl">Type</label>
                <div className="cbg">
                    {[["gig", "🎸 Gig"], ["openmic", "🎤 Open Mic"], ["residency", "📅 Residency"]].map(([v, l]) => (
                        <div key={v} className={`cbl${type === v ? " ck" : ""}`} onClick={() => setType(v)}>{l}</div>
                    ))}
                </div>
            </div>
            <div className="fg"><label className="fl">Genres</label>
                <div className="cbg">
                    {["Blues", "Rock", "Jazz", "Folk", "Indie", "Country", "Funk", "Americana", "All"].map(g => (
                        <div key={g} className={`cbl${genres.includes(g) ? " ck" : ""}`} onClick={() => setGenres(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g])}>{g}</div>
                    ))}
                </div>
            </div>
            <div className="fg"><label className="fl">Age Policy</label>
                <div className="cbg">
                    <div className={`cbl${allAges ? " ck" : ""}`} onClick={() => setAllAges(true)}>✅ All Ages</div>
                    <div className={`cbl${!allAges ? " ck" : ""}`} onClick={() => setAllAges(false)}>🔞 18+ Only</div>
                </div>
            </div>
            <div className="fg"><label className="fl">Notes for Bands</label><textarea className="fta" placeholder="What kind of music, set length, load-in time, etc." value={notes} onChange={e => setNotes(e.target.value)} /></div>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                <button className="vbtn1" style={{ flex: 1, padding: 14 }} onClick={go}>{recurring ? `Post ${Math.min(Math.max(occurrences,1),12)} Openings` : "Post Opening"}</button>
                <button className="vbtn2" style={{ padding: 14 }} onClick={onClose}>Cancel</button>
            </div>
        </div></div>
    );
}