'use client';
import { useState, useRef, useEffect } from "react";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--ink:#1a1208;--parchment:#f5efe6;--warm:#f0e6d3;--amber:#c8852a;--al:#e6a84a;--rust:#9b3d1a;--sage:#4a6741;--cream:#faf6f0;--muted:#7a6a58;--border:#d4c4a8;--safe:#1565c0;--safel:#e3f2fd;--safeb:#90caf9;--warn:#e65100;}
body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);}
.app{max-width:430px;margin:0 auto;background:var(--cream);min-height:100vh;position:relative;overflow-x:hidden;}
.hdr{background:var(--ink);padding:18px 20px 14px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
.logo{font-family:'Playfair Display',serif;font-size:22px;color:var(--al);}
.logo span{font-style:italic;color:var(--parchment);}
.hsub{font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-top:1px;}
.avbtn{width:36px;height:36px;border-radius:50%;background:var(--amber);border:2px solid var(--al);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;}
.bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:var(--ink);border-top:1px solid #2a2010;display:flex;z-index:100;}
.nbtn{flex:1;padding:10px 2px 8px;background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;color:var(--muted);font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:.3px;transition:color .2s;position:relative;}
.nbtn.on{color:var(--al);}
.nbtn svg{width:18px;height:18px;}
.nbadge{min-width:15px;height:15px;background:var(--rust);border-radius:8px;position:absolute;top:5px;right:3px;font-size:8px;color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 3px;}
.pg{padding:0 0 80px;}
.hero{background:linear-gradient(135deg,#2a1a08,#1a1208 60%,#0f0a04);padding:24px 20px 20px;border-bottom:3px solid var(--amber);position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;top:-40px;right:-40px;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(200,133,42,.15),transparent 70%);}
.hgreet{font-size:12px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;}
.htitle{font-family:'Playfair Display',serif;font-size:26px;color:var(--parchment);line-height:1.2;margin-bottom:16px;}
.htitle em{color:var(--al);font-style:italic;}
.hstats{display:flex;gap:20px;}
.stn{font-family:'Playfair Display',serif;font-size:22px;color:var(--al);line-height:1;display:block;}
.stl{font-size:10px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-top:2px;display:block;}
.sh{display:flex;align-items:baseline;justify-content:space-between;padding:20px 20px 10px;}
.st{font-family:'Playfair Display',serif;font-size:18px;color:var(--ink);}
.sl{font-size:12px;color:var(--amber);cursor:pointer;text-decoration:underline;text-underline-offset:3px;background:none;border:none;font-family:'DM Sans',sans-serif;}
.chips{display:flex;gap:8px;padding:0 20px 12px;overflow-x:auto;scrollbar-width:none;}
.chips::-webkit-scrollbar{display:none;}
.chip{padding:6px 14px;border-radius:20px;border:1px solid var(--border);background:var(--warm);font-size:12px;color:var(--muted);cursor:pointer;white-space:nowrap;transition:all .15s;font-family:'DM Sans',sans-serif;}
.chip.on{background:var(--amber);border-color:var(--amber);color:#fff;font-weight:500;}
.cscroll{display:flex;gap:12px;padding:0 20px 4px;overflow-x:auto;scrollbar-width:none;}
.cscroll::-webkit-scrollbar{display:none;}
.mcard{min-width:160px;background:#fff;border-radius:12px;border:1px solid var(--border);overflow:hidden;cursor:pointer;transition:transform .15s,box-shadow .15s;flex-shrink:0;}
.mcard:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.1);}
.cav{width:100%;height:100px;display:flex;align-items:center;justify-content:center;font-size:42px;position:relative;}
.con{position:absolute;top:8px;right:8px;width:8px;height:8px;border-radius:50%;background:#4CAF50;border:2px solid #fff;}
.u18b{position:absolute;top:8px;left:8px;background:var(--safe);color:#fff;font-size:9px;padding:2px 5px;border-radius:4px;font-weight:600;}
.cbody{padding:10px 12px 12px;}
.cname{font-weight:500;font-size:14px;color:var(--ink);margin-bottom:2px;}
.cinst{font-size:11px;color:var(--amber);font-weight:500;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;}
.cgens{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;}
.gtag{font-size:10px;padding:2px 7px;border-radius:10px;background:var(--warm);color:var(--muted);border:1px solid var(--border);}
.clook{font-size:11px;color:var(--sage);font-weight:500;}
.cdist{font-size:10px;color:var(--muted);margin-top:2px;}
.bcard{margin:0 20px 12px;background:#fff;border-radius:14px;border:2px solid var(--border);overflow:hidden;cursor:pointer;transition:transform .15s,box-shadow .15s;}
.bcard:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,0,0,.1);}
.bchdr{background:linear-gradient(135deg,#2a1a08,#1a1208);padding:16px;display:flex;gap:12px;align-items:flex-start;}
.bew{width:52px;height:52px;border-radius:12px;background:rgba(200,133,42,.15);border:1px solid rgba(200,133,42,.3);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;}
.bname{font-family:'Playfair Display',serif;font-size:18px;color:var(--parchment);margin-bottom:2px;}
.bgl{font-size:11px;color:var(--al);font-weight:500;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;}
.bloc{font-size:11px;color:var(--muted);}
.bbody{padding:14px 16px;}
.sbar{margin-bottom:12px;}
.sblab{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-bottom:5px;}
.sbtr{height:6px;background:var(--warm);border-radius:3px;overflow:hidden;}
.sbfi{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--amber),var(--al));transition:width .4s;}
.bmrow{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.bmavs{display:flex;}
.bmav{width:28px;height:28px;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:14px;margin-left:-8px;}
.bmav:first-child{margin-left:0;}
.bseek{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
.stag{display:flex;align-items:center;gap:4px;padding:5px 10px;border-radius:20px;font-size:11px;font-weight:600;}
.sopen{background:#fff3e0;color:var(--warn);border:1px solid #ffcc80;}
.sfill{background:#e8f5e9;color:var(--sage);border:1px solid #a5d6a7;}
.bdesc{font-size:12px;color:var(--muted);line-height:1.5;}
.bfoot{padding:10px 16px 14px;border-top:1px solid var(--warm);display:flex;gap:8px;}
.ecard{margin:0 20px 12px;background:#fff;border-radius:12px;border:1px solid var(--border);overflow:hidden;cursor:pointer;transition:transform .15s;}
.ecard:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.08);}
.etop{display:flex;padding:14px;gap:14px;align-items:flex-start;}
.edb{min-width:46px;background:var(--ink);border-radius:8px;padding:6px 4px;text-align:center;flex-shrink:0;}
.emon{font-size:9px;color:var(--amber);text-transform:uppercase;letter-spacing:1px;font-weight:500;}
.eday{font-family:'Playfair Display',serif;font-size:22px;color:#fff;line-height:1;}
.edow{font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;}
.enam{font-family:'Playfair Display',serif;font-size:16px;color:var(--ink);margin-bottom:3px;}
.even{font-size:12px;color:var(--muted);margin-bottom:6px;}
.etags{display:flex;gap:6px;flex-wrap:wrap;}
.etag{font-size:10px;padding:2px 8px;border-radius:10px;font-weight:500;}
.tom{background:#fef3e2;color:var(--amber);border:1px solid #f5dba0;}
.tjam{background:#e8f5e9;color:var(--sage);border:1px solid #a5d6a7;}
.tgig{background:#fce4ec;color:var(--rust);border:1px solid #f48fb1;}
.tall{background:var(--safel);color:var(--safe);border:1px solid var(--safeb);}
.ebot{padding:8px 14px 12px;border-top:1px solid var(--warm);display:flex;align-items:center;justify-content:space-between;}
.egav{display:flex;}
.goa{width:22px;height:22px;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:11px;margin-left:-6px;}
.goa:first-child{margin-left:0;}
.jbtn{padding:6px 16px;background:var(--amber);color:#fff;border:none;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;}
.jbtn.jd{background:var(--sage);}
.sban{margin:0 20px 12px;background:var(--safel);border:1px solid var(--safeb);border-radius:12px;padding:12px 14px;display:flex;gap:10px;align-items:flex-start;}
.sico{font-size:20px;flex-shrink:0;margin-top:1px;}
.stit{font-size:12px;font-weight:600;color:var(--safe);margin-bottom:3px;}
.stxt{font-size:11px;color:#1976d2;line-height:1.5;}
.mmbar{background:var(--safe);padding:8px 20px;display:flex;align-items:center;gap:8px;}
.mmtxt{font-size:11px;color:#fff;font-weight:500;}
.phero{background:linear-gradient(160deg,#2a1a08,#1a1208);padding:30px 20px 24px;text-align:center;}
.pem{font-size:64px;margin-bottom:12px;display:block;}
.pnam{font-family:'Playfair Display',serif;font-size:26px;color:var(--parchment);margin-bottom:4px;}
.ptag{font-size:13px;color:var(--muted);margin-bottom:16px;}
.pbdg{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}
.bdg{padding:5px 12px;border-radius:20px;font-size:11px;font-weight:500;}
.bda{background:rgba(200,133,42,.2);color:var(--al);border:1px solid rgba(200,133,42,.3);}
.bds{background:rgba(74,103,65,.2);color:#7ab870;border:1px solid rgba(74,103,65,.3);}
.bdr{background:rgba(155,61,26,.2);color:#e07050;border:1px solid rgba(155,61,26,.3);}
.psec{padding:18px 20px;border-bottom:1px solid var(--border);}
.pstit{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:12px;}
.plook{display:flex;flex-wrap:wrap;gap:8px;}
.li{display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:8px;background:var(--warm);border:1px solid var(--border);font-size:12px;color:var(--ink);}
.agr{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;}
.ad{text-align:center;padding:8px 4px;border-radius:8px;font-size:11px;}
.ad.av{background:#e8f5e9;color:var(--sage);border:1px solid #a5d6a7;}
.ad.bz{background:var(--warm);color:var(--muted);border:1px solid var(--border);}
.bp{font-weight:500;display:block;}
.bs{font-size:9px;margin-top:2px;display:block;}
.btn1{flex:1;padding:12px;background:var(--amber);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background .15s;}
.btn1:hover{background:var(--al);}
.btn2{padding:12px 18px;background:var(--warm);color:var(--ink);border:1px solid var(--border);border-radius:10px;font-size:14px;cursor:pointer;font-family:'DM Sans',sans-serif;}
.btnd{padding:10px 16px;background:#fce4ec;color:var(--rust);border:1px solid #f48fb1;border-radius:10px;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;}
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
.cbl{display:flex;align-items:center;gap:6px;padding:7px 12px;border:1px solid var(--border);border-radius:8px;background:#fff;font-size:13px;cursor:pointer;transition:all .15s;}
.cbl.ck{background:var(--warm);border-color:var(--amber);color:var(--amber);}
.trow{display:flex;border-bottom:1px solid var(--border);background:#fff;}
.ti{flex:1;padding:12px 8px;text-align:center;font-size:13px;font-weight:500;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;transition:all .15s;}
.ti.on{color:var(--amber);border-bottom-color:var(--amber);}
.rop{display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid var(--warm);cursor:pointer;}
.rop:last-child{border-bottom:none;}
.roico{font-size:20px;width:32px;text-align:center;}
.rola{font-size:14px;color:var(--ink);font-weight:500;}
.rosu{font-size:11px;color:var(--muted);margin-top:1px;}
.inch{font-size:16px;margin-left:auto;color:var(--muted);}
.ilist{overflow-y:auto;}
.iit{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid var(--warm);cursor:pointer;transition:background .1s;}
.iit:hover{background:var(--warm);}
.iit.unr{background:rgba(200,133,42,.05);}
.iav{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;position:relative;}
.ionl{position:absolute;bottom:1px;right:1px;width:11px;height:11px;border-radius:50%;background:#4CAF50;border:2px solid #fff;}
.iinf{flex:1;min-width:0;}
.inam{font-weight:500;font-size:14px;color:var(--ink);margin-bottom:2px;}
.ipre{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.imet{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;}
.itim{font-size:10px;color:var(--muted);}
.iudot{width:8px;height:8px;border-radius:50%;background:var(--amber);}
.cs{display:flex;flex-direction:column;height:calc(100vh - 56px);position:fixed;top:56px;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:var(--cream);z-index:150;}
.chdr{background:var(--ink);padding:12px 16px;display:flex;align-items:center;gap:12px;flex-shrink:0;}
.chav{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.chnm{font-weight:500;font-size:15px;color:var(--parchment);}
.chst{font-size:11px;color:var(--muted);margin-top:1px;}
.chac{display:flex;gap:6px;}
.chab{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.1);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;}
.cback{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.1);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--parchment);font-size:20px;}
.cmsgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;}
.cdiv{text-align:center;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);padding:4px 0;}
.mr{display:flex;align-items:flex-end;gap:8px;}
.mr.me{flex-direction:row-reverse;}
.masm{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.mb{max-width:72%;padding:10px 14px;border-radius:18px;font-size:13px;line-height:1.5;}
.mb.th{background:#fff;color:var(--ink);border:1px solid var(--border);border-bottom-left-radius:4px;}
.mb.me{background:var(--amber);color:#fff;border-bottom-right-radius:4px;}
.mt{font-size:10px;color:var(--muted);margin-top:2px;text-align:right;}
.mt.lft{text-align:left;}
.jrc{background:#fff;border:1px solid var(--border);border-radius:14px;padding:14px;max-width:240px;}
.jrh{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
.jrt{font-family:'Playfair Display',serif;font-size:15px;color:var(--ink);margin-bottom:3px;}
.jrd{font-size:12px;color:var(--muted);margin-bottom:10px;}
.jra{display:flex;gap:6px;}
.jracc{flex:1;padding:7px;background:var(--sage);color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;}
.jrdec{flex:1;padding:7px;background:var(--warm);color:var(--muted);border:1px solid var(--border);border-radius:8px;font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif;}
.cinp{background:#fff;border-top:1px solid var(--border);padding:10px 14px;display:flex;align-items:flex-end;gap:10px;flex-shrink:0;}
.cxb{width:36px;height:36px;border-radius:50%;background:var(--warm);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;flex-shrink:0;}
.ctxt{flex:1;border:1px solid var(--border);border-radius:20px;padding:8px 16px;font-size:14px;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;resize:none;max-height:80px;background:var(--cream);}
.ctxt:focus{border-color:var(--amber);}
.csnd{width:36px;height:36px;border-radius:50%;background:var(--amber);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;flex-shrink:0;}
.csnd:disabled{background:var(--border);cursor:default;}
.jsch{background:#fff;border:1px solid var(--border);border-radius:14px;margin:0 14px 8px;padding:14px;}
.jstit{font-size:12px;font-weight:600;color:var(--ink);margin-bottom:10px;}
.jtgr{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px;}
.jtb{padding:7px 4px;border:1px solid var(--border);border-radius:8px;background:var(--warm);font-size:11px;color:var(--muted);cursor:pointer;text-align:center;transition:all .15s;font-family:'DM Sans',sans-serif;}
.jtb.on{background:var(--amber);border-color:var(--amber);color:#fff;}
.jsnd{width:100%;padding:9px;background:var(--sage);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;}
.ag{position:fixed;inset:0;background:var(--ink);z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center;}
.aglo{font-family:'Playfair Display',serif;font-size:32px;color:var(--al);margin-bottom:6px;}
.aglo span{font-style:italic;color:var(--parchment);}
.agsub{font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:40px;}
.agq{font-family:'Playfair Display',serif;font-size:22px;color:var(--parchment);margin-bottom:8px;}
.agh{font-size:13px;color:var(--muted);margin-bottom:32px;line-height:1.5;}
.agb{width:100%;padding:15px;border:none;border-radius:12px;font-size:16px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;margin-bottom:10px;}
.agba{background:var(--amber);color:#fff;}
.agbt{background:var(--safe);color:#fff;}
.agn{font-size:11px;color:var(--muted);margin-top:16px;line-height:1.6;}
.toast{position:fixed;top:70px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--parchment);padding:12px 20px;border-radius:24px;font-size:13px;font-weight:500;z-index:500;border:1px solid var(--amber);white-space:nowrap;animation:fio 2.5s ease forwards;}
@keyframes fio{0%{opacity:0;transform:translateX(-50%) translateY(-8px)}15%{opacity:1;transform:translateX(-50%) translateY(0)}75%{opacity:1}100%{opacity:0}}
.es{text-align:center;padding:40px 20px;color:var(--muted);}
.ei{font-size:48px;margin-bottom:12px;}
.et{font-family:'Playfair Display',serif;font-size:18px;color:var(--ink);margin-bottom:6px;}
.ed{font-size:13px;line-height:1.6;}
.cg{padding:4px 12px;border-radius:20px;background:var(--warm);border:1px solid var(--border);font-size:12px;color:var(--muted);}

/* LIVE MUSIC */
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
.live-dot{width:8px;height:8px;border-radius:50%;background:#f44336;animation:pulse 1.4s ease infinite;display:inline-block;}
.lm-feat{margin:12px 20px 0;border-radius:16px;overflow:hidden;background:linear-gradient(135deg,#1a0800,#2a1005);cursor:pointer;}
.lm-feat-inner{padding:18px;}
.lm-feat-top{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.lm-feat-badge{font-size:10px;color:#ff8a80;font-weight:600;letter-spacing:1px;text-transform:uppercase;}
.lm-feat-title{font-family:'Playfair Display',serif;font-size:20px;color:var(--parchment);margin-bottom:3px;line-height:1.2;}
.lm-feat-venue{font-size:12px;color:var(--muted);margin-bottom:12px;}
.lm-feat-pills{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
.lm-pill{padding:4px 12px;border-radius:20px;font-size:11px;font-weight:500;}
.lm-pill-t{background:rgba(230,168,74,.15);color:var(--al);border:1px solid rgba(230,168,74,.25);}
.lm-pill-c{background:rgba(74,103,65,.15);color:#81c784;border:1px solid rgba(74,103,65,.25);}
.lm-pill-a{background:rgba(21,101,192,.15);color:#90caf9;border:1px solid rgba(21,101,192,.25);}
.lm-pill-g{background:rgba(155,61,26,.15);color:#ef9a9a;border:1px solid rgba(155,61,26,.25);}
.lm-feat-band{display:flex;align-items:center;gap:10px;padding-top:12px;border-top:1px solid rgba(255,255,255,.07);}
.lm-bavs{display:flex;}
.lm-bav{width:28px;height:28px;border-radius:50%;border:2px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:13px;margin-left:-7px;}
.lm-bav:first-child{margin-left:0;}
.lm-binfo{font-size:12px;color:var(--muted);}
.lm-bnm{color:var(--al);font-weight:500;}
.lm-feat-bot{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;background:rgba(0,0,0,.25);}
.lm-int-btn{padding:7px 18px;background:var(--amber);color:#fff;border:none;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background .15s;}
.lm-int-btn.on{background:var(--sage);}
.show-card{margin:0 20px 10px;background:#fff;border-radius:14px;border:1px solid var(--border);overflow:hidden;cursor:pointer;transition:transform .15s,box-shadow .15s;}
.show-card:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.08);}
.show-left{min-width:58px;background:var(--ink);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px 6px;flex-shrink:0;}
.show-mon{font-size:9px;color:var(--amber);text-transform:uppercase;letter-spacing:1px;font-weight:500;}
.show-day{font-family:'Playfair Display',serif;font-size:24px;color:#fff;line-height:1;}
.show-dow{font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-top:2px;}
.show-body{flex:1;padding:13px 14px 10px;}
.show-nm{font-family:'Playfair Display',serif;font-size:15px;color:var(--ink);margin-bottom:2px;}
.show-ven{font-size:11px;color:var(--muted);margin-bottom:8px;}
.show-pills{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px;}
.sp{font-size:10px;padding:2px 8px;border-radius:10px;font-weight:500;}
.sp-r{background:#fce4ec;color:var(--rust);border:1px solid #f48fb1;}
.sp-g{background:#e8f5e9;color:var(--sage);border:1px solid #a5d6a7;}
.sp-a{background:#fef3e2;color:var(--amber);border:1px solid #f5dba0;}
.sp-b{background:var(--safel);color:var(--safe);border:1px solid var(--safeb);}
.show-band{display:flex;align-items:center;gap:7px;}
.show-bavs{display:flex;}
.show-bav{width:20px;height:20px;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:10px;margin-left:-5px;}
.show-bav:first-child{margin-left:0;}
.show-bnm{font-size:11px;color:var(--amber);font-weight:500;}
.show-app{font-size:9px;color:var(--al);background:rgba(200,133,42,.1);padding:1px 5px;border-radius:6px;margin-left:4px;}
.show-bot{padding:8px 14px 12px;border-top:1px solid var(--warm);display:flex;align-items:center;justify-content:space-between;}
.venue-card{margin:0 20px 12px;background:#fff;border-radius:14px;border:1px solid var(--border);overflow:hidden;cursor:pointer;transition:transform .15s;}
.venue-card:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.08);}
.venue-hdr{background:linear-gradient(135deg,#2a1a08,#1a1208);padding:14px 16px;display:flex;gap:12px;align-items:center;}
.venue-em{font-size:28px;}
.venue-nm{font-family:'Playfair Display',serif;font-size:15px;color:var(--parchment);margin-bottom:2px;}
.venue-addr{font-size:11px;color:var(--muted);}
.venue-body{padding:12px 16px;}
.venue-nights{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;}
.vn{padding:3px 10px;border-radius:20px;font-size:11px;}
.vn-r{background:rgba(200,133,42,.1);border:1px solid rgba(200,133,42,.25);color:var(--amber);}
.vn-g{background:var(--warm);border:1px solid var(--border);color:var(--muted);}
.venue-stats{display:flex;gap:20px;}
.vstat-n{font-family:'Playfair Display',serif;font-size:18px;color:var(--amber);display:block;}
.vstat-l{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;display:block;}
`;

const MUSICIANS = [{ id: 1, name: "Maria T.", emoji: "🎸", instrument: "Guitar", genres: ["Blues", "Indie"], looking: "Jam Session", dist: "1.2 mi", online: true, bg: "#f0e6d3", age: "adult" }, { id: 2, name: "Dev R.", emoji: "🥁", instrument: "Drums", genres: ["Rock", "Funk"], looking: "Open Mic", dist: "2.8 mi", online: true, bg: "#e8f0e6", age: "adult" }, { id: 3, name: "Sam K.", emoji: "🎹", instrument: "Keys", genres: ["Jazz", "Soul"], looking: "Band", dist: "0.9 mi", online: false, bg: "#e6eaf0", age: "adult" }, { id: 4, name: "Lucia M.", emoji: "🎻", instrument: "Violin", genres: ["Folk", "Indie"], looking: "Recording", dist: "3.4 mi", online: true, bg: "#f0e6ea", age: "minor" }, { id: 5, name: "Jordan B.", emoji: "🎷", instrument: "Sax", genres: ["Jazz", "Blues"], looking: "Gigging", dist: "1.7 mi", online: false, bg: "#eef0e6", age: "adult" }];
const INIT_BANDS = [{ id: 1, name: "Patchwork Sound", emoji: "🎸", genres: ["Blues", "90s Rock", "Acoustic Indie"], dist: "Your Band", members: [{ name: "Geoff M.", emoji: "🎸", role: "Guitar (Slide)", filled: true }, { name: "Karci R.", emoji: "🎵", role: "Vocals", filled: true }, { name: "Pete L.", emoji: "🎹", role: "Keys", filled: true }, { name: "Open", emoji: "🥁", role: "Drums", filled: false }, { name: "Open", emoji: "🎸", role: "Bass", filled: false }], desc: "Blues and 90s rock with acoustic indie twist. Playing the Grand Junction circuit.", isMyBand: true }, { id: 2, name: "The Copper Rails", emoji: "🚂", genres: ["Americana", "Country", "Folk"], dist: "2.1 mi", members: [{ name: "Tom V.", emoji: "🎸", role: "Guitar", filled: true }, { name: "Ana D.", emoji: "🎻", role: "Fiddle", filled: true }, { name: "Open", emoji: "🎹", role: "Keys", filled: false }, { name: "Open", emoji: "🥁", role: "Drums", filled: false }], desc: "Americana band, deep roots influences. Active gigging schedule.", isMyBand: false }, { id: 3, name: "Mesa Verde Jazz", emoji: "🎷", genres: ["Jazz", "Soul", "Funk"], dist: "0.8 mi", members: [{ name: "Dev R.", emoji: "🥁", role: "Drums", filled: true }, { name: "Sam K.", emoji: "🎹", role: "Piano", filled: true }, { name: "Jordan B.", emoji: "🎷", role: "Sax", filled: true }, { name: "Open", emoji: "🎸", role: "Bass", filled: false }], desc: "Jazz collective. Sunday residency at Mesa Verde Coffee Co.", isMyBand: false }];
const INIT_EVENTS = [{ id: 1, name: "Downtown Open Mic Night", venue: "The Rabbit Hole Bar", month: "APR", day: "04", dow: "FRI", type: "openmic", allAges: true, going: ["🎸", "🥁", "🎹"], slots: 3, joined: false }, { id: 2, name: "Sunday Jazz Jam", venue: "Mesa Verde Coffee Co.", month: "APR", day: "06", dow: "SUN", type: "jam", allAges: false, going: ["🎷", "🎻"], slots: 5, joined: false }, { id: 3, name: "Spring Acoustic Showcase", venue: "Avalon Theatre", month: "APR", day: "12", dow: "SAT", type: "gig", allAges: true, going: ["🎸", "🎹", "🥁", "🎻"], slots: 0, joined: false }, { id: 4, name: "Roots & Blues Meetup", venue: "Palisade Brewery", month: "APR", day: "18", dow: "FRI", type: "jam", allAges: false, going: ["🎸", "🎷"], slots: 4, joined: false }];
const INIT_CONVS = [{ id: 1, mid: 1, unread: true, messages: [{ id: 1, from: "them", text: "Hey! Saw you play open slide — great tone. Ever jammed in open E?", time: "2:14 PM", type: "text" }, { id: 2, from: "me", text: "Thanks! Yeah open E is basically all I do. What style are you into?", time: "2:31 PM", type: "text" }, { id: 3, from: "them", text: "Mostly delta blues and some indie. Would love to jam this weekend?", time: "2:45 PM", type: "text" }] }, { id: 2, mid: 2, unread: true, messages: [{ id: 1, from: "them", text: "Yo! Heard Patchwork Sound needs a drummer. I'm interested!", time: "Yesterday", type: "text" }, { id: 2, from: "me", text: "Hey Dev! Yeah we're looking. We do Fri/Sat evenings mostly.", time: "Yesterday", type: "text" }, { id: 3, from: "them", type: "jam_request", time: "10:22 AM", proposed: "Sat Apr 5 · 7:00 PM", status: "pending" }] }, { id: 3, mid: 5, unread: false, messages: [{ id: 1, from: "them", text: "Great seeing you at the Rabbit Hole! That slide work was 🔥", time: "Fri 11:02 PM", type: "text" }, { id: 2, from: "me", text: "Appreciate it! You were killing it on sax. Let's link up.", time: "Sat 9:14 AM", type: "text" }] }];

const INIT_SHOWS = [
    { id: 1, name: "Patchwork Sound", venue: "The Rabbit Hole Bar", month: "APR", day: "04", dow: "FRI", time: "9:00 PM", cover: "$5", allAges: false, genres: ["Blues", "Rock"], band: { name: "Patchwork Sound", members: ["🎸", "🎵", "🎹"], appBand: true }, interested: 12, tonight: true, iMe: false },
    { id: 2, name: "Mesa Verde Jazz Collective", venue: "Mesa Verde Coffee Co.", month: "APR", day: "06", dow: "SUN", time: "6:00 PM", cover: "Free", allAges: true, genres: ["Jazz", "Soul"], band: { name: "Mesa Verde Jazz", members: ["🥁", "🎹", "🎷"], appBand: true }, interested: 8, tonight: false, iMe: false },
    { id: 3, name: "The Copper Rails", venue: "Palisade Brewery", month: "APR", day: "11", dow: "FRI", time: "8:00 PM", cover: "$8", allAges: false, genres: ["Americana", "Country"], band: { name: "The Copper Rails", members: ["🎸", "🎻"], appBand: true }, interested: 19, tonight: false, iMe: false },
    { id: 4, name: "Grand Valley Bluegrass Night", venue: "Avalon Theatre", month: "APR", day: "12", dow: "SAT", time: "7:30 PM", cover: "$15", allAges: true, genres: ["Bluegrass", "Folk"], band: { name: "Various Artists", members: ["🎸", "🎻", "🥁"], appBand: false }, interested: 34, tonight: false, iMe: false },
    { id: 5, name: "Open Blues Jam", venue: "The Rabbit Hole Bar", month: "APR", day: "18", dow: "FRI", time: "8:00 PM", cover: "Free", allAges: false, genres: ["Blues"], band: { name: "House Band + Guests", members: ["🎸", "🥁", "🎹"], appBand: false }, interested: 21, tonight: false, iMe: false },
    { id: 6, name: "Acoustic Sunday Sessions", venue: "Bin 707 Foodbar", month: "APR", day: "20", dow: "SUN", time: "5:00 PM", cover: "Free", allAges: true, genres: ["Acoustic", "Indie"], band: { name: "Rotating Artists", members: ["🎸", "🎵"], appBand: false }, interested: 15, tonight: false, iMe: false },
];

const VENUES = [
    { id: 1, emoji: "🍺", name: "The Rabbit Hole Bar", addr: "520 Main St · Downtown", nights: ["Every Friday", "Every Saturday"], genres: ["Blues", "Rock", "Indie"], shows: 3, followers: 142 },
    { id: 2, emoji: "☕", name: "Mesa Verde Coffee Co.", addr: "321 Colorado Ave", nights: ["Every Sunday"], genres: ["Jazz", "Folk", "Acoustic"], shows: 1, followers: 89 },
    { id: 3, emoji: "🎭", name: "Avalon Theatre", addr: "645 Main St · Downtown", nights: ["Monthly Events"], genres: ["All Genres"], shows: 2, followers: 203 },
    { id: 4, emoji: "🍻", name: "Palisade Brewery", addr: "200 Kluge Ave · Palisade", nights: ["Every Friday"], genres: ["Americana", "Country", "Blues"], shows: 2, followers: 76 },
    { id: 5, emoji: "🍷", name: "Bin 707 Foodbar", addr: "225 N 5th St · Downtown", nights: ["Every Sunday"], genres: ["Acoustic", "Jazz"], shows: 1, followers: 94 },
];

const GENRES = ["Blues", "Rock", "Jazz", "Folk", "Indie", "Country", "Funk", "Soul", "Classical", "Metal", "Americana", "Pop"];
const INSTS = ["Guitar", "Bass", "Drums", "Keys", "Violin", "Sax", "Vocals", "Trumpet", "Cello", "Banjo", "Mandolin", "Other"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const LOOK = ["Jam Session", "Open Mic", "Band", "Gigging", "Recording", "Teaching", "Other"];
const MONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOWL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EMOJ = { Guitar: "🎸", Bass: "🎸", Drums: "🥁", Keys: "🎹", Vocals: "🎵", Violin: "🎻", Sax: "🎷", Trumpet: "🎺", Other: "🎵" };

const IH = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>;
const IC = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" /></svg>;
const IM = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>;
const IP = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>;
const IB = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>;
const ILM = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>;

const getM = id => MUSICIANS.find(m => m.id === id);
function useToggle(i = []) { const [l, s] = useState(i); return [l, v => s(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v])]; }

function ShowCard({ show, onInt }) {
    return (
        <div className="show-card">
            <div style={{ display: "flex" }}>
                <div className="show-left">
                    <div className="show-mon">{show.month}</div>
                    <div className="show-day">{show.day}</div>
                    <div className="show-dow">{show.dow}</div>
                </div>
                <div className="show-body">
                    <div className="show-nm">{show.name}</div>
                    <div className="show-ven">📍 {show.venue}</div>
                    <div className="show-pills">
                        <span className="sp sp-a">🕐 {show.time}</span>
                        <span className="sp sp-g">{show.cover === "Free" ? "🆓 Free" : `🎟 ${show.cover}`}</span>
                        {show.allAges && <span className="sp sp-b">✅ All Ages</span>}
                        {show.genres.map(g => <span key={g} className="sp sp-r">{g}</span>)}
                    </div>
                    <div className="show-band">
                        <div className="show-bavs">{show.band.members.map((m, i) => <div key={i} className="show-bav" style={{ background: ["#f0e6d3", "#e8f0e6", "#e6eaf0"][i % 3] }}>{m}</div>)}</div>
                        <span className="show-bnm">{show.band.name}</span>
                        {show.band.appBand && <span className="show-app">on app</span>}
                    </div>
                </div>
            </div>
            <div className="show-bot">
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{show.interested} interested</span>
                <button className={`lm-int-btn${show.iMe ? " on" : ""}`} onClick={() => onInt(show.id)}>{show.iMe ? "✓ Interested" : "Interested"}</button>
            </div>
        </div>
    );
}

function VenueCard({ v }) {
    return (
        <div className="venue-card">
            <div className="venue-hdr">
                <div className="venue-em">{v.emoji}</div>
                <div><div className="venue-nm">{v.name}</div><div className="venue-addr">📍 {v.addr}</div></div>
            </div>
            <div className="venue-body">
                <div className="venue-nights">
                    {v.nights.map(n => <span key={n} className="vn vn-r">🎵 {n}</span>)}
                    {v.genres.map(g => <span key={g} className="vn vn-g">{g}</span>)}
                </div>
                <div className="venue-stats">
                    <div><span className="vstat-n">{v.shows}</span><span className="vstat-l">Shows</span></div>
                    <div><span className="vstat-n">{v.followers}</span><span className="vstat-l">Followers</span></div>
                </div>
            </div>
        </div>
    );
}

function LiveMusic({ shows, setShows }) {
    const [sub, setSub] = useState("tonight");
    const [gf, setGf] = useState("All");
    const tonight = shows.find(s => s.tonight);
    const toggleInt = id => setShows(p => p.map(s => s.id === id ? { ...s, iMe: !s.iMe, interested: s.interested + (s.iMe ? -1 : 1) } : s));
    const upcoming = shows.filter(s => gf === "All" || s.genres.includes(gf));

    return (
        <div className="pg">
            <div className="hero" style={{ padding: "20px 20px 16px" }}>
                <div className="hgreet">Grand Junction, CO</div>
                <div className="htitle" style={{ fontSize: 22, marginBottom: 0 }}>Live Music & <em>Shows</em></div>
            </div>
            <div className="trow">
                {[["tonight", "Tonight"], ["upcoming", "Upcoming"], ["venues", "Venues"]].map(([id, l]) => (
                    <div key={id} className={`ti${sub === id ? " on" : ""}`} onClick={() => setSub(id)}>{l}</div>
                ))}
            </div>

            {sub === "tonight" && (
                <div>
                    {tonight ? (
                        <>
                            <div className="lm-feat">
                                <div className="lm-feat-inner">
                                    <div className="lm-feat-top">
                                        <div className="live-dot" />
                                        <span className="lm-feat-badge">Live Tonight</span>
                                    </div>
                                    <div className="lm-feat-title">{tonight.name}</div>
                                    <div className="lm-feat-venue">📍 {tonight.venue}</div>
                                    <div className="lm-feat-pills">
                                        <span className="lm-pill lm-pill-t">🕐 {tonight.time}</span>
                                        <span className="lm-pill lm-pill-c">{tonight.cover === "Free" ? "🆓 Free" : `🎟 ${tonight.cover}`}</span>
                                        <span className="lm-pill lm-pill-a">{tonight.allAges ? "✅ All Ages" : "🔞 18+"}</span>
                                        {tonight.genres.map(g => <span key={g} className="lm-pill lm-pill-g">{g}</span>)}
                                    </div>
                                    <div className="lm-feat-band">
                                        <div className="lm-bavs">{tonight.band.members.map((m, i) => <div key={i} className="lm-bav" style={{ background: ["#3a1a08", "#1a2a08", "#08182a"][i % 3] }}>{m}</div>)}</div>
                                        <div className="lm-binfo">
                                            <span className="lm-bnm">{tonight.band.name}</span>
                                            {tonight.band.appBand && <span style={{ fontSize: 10, color: "var(--al)", marginLeft: 6, background: "rgba(230,168,74,.15)", padding: "1px 6px", borderRadius: 6 }}>on app</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="lm-feat-bot">
                                    <span style={{ fontSize: 12, color: "var(--muted)" }}>{tonight.interested} people interested</span>
                                    <button className={`lm-int-btn${tonight.iMe ? " on" : ""}`} onClick={() => toggleInt(tonight.id)}>{tonight.iMe ? "✓ Interested" : "I'm Interested"}</button>
                                </div>
                            </div>
                            <div className="sh"><div className="st">Also This Week</div></div>
                            {shows.filter(s => !s.tonight).slice(0, 3).map(s => <ShowCard key={s.id} show={s} onInt={toggleInt} />)}
                        </>
                    ) : (
                        <div style={{ margin: "16px 20px", padding: 30, background: "#fff", borderRadius: 14, border: "1px solid var(--border)", textAlign: "center" }}>
                            <div style={{ fontSize: 40, marginBottom: 10 }}>🎸</div>
                            <div style={{ fontFamily: "Playfair Display,serif", fontSize: 16, marginBottom: 6 }}>No shows tonight</div>
                            <div style={{ fontSize: 12, color: "var(--muted)" }}>Check Upcoming for this weekend</div>
                        </div>
                    )}
                </div>
            )}

            {sub === "upcoming" && (
                <div style={{ paddingTop: 8 }}>
                    <div className="chips">
                        {["All", "Blues", "Jazz", "Rock", "Americana", "Folk", "Acoustic"].map(g => (
                            <div key={g} className={`chip${gf === g ? " on" : ""}`} onClick={() => setGf(g)}>{g}</div>
                        ))}
                    </div>
                    {upcoming.map(s => <ShowCard key={s.id} show={s} onInt={toggleInt} />)}
                    {upcoming.length === 0 && <div className="es"><div className="ei">🎵</div><div className="et">No shows found</div><div className="ed">Try a different genre filter</div></div>}
                </div>
            )}

            {sub === "venues" && (
                <div style={{ paddingTop: 12 }}>
                    <div style={{ padding: "0 20px 10px", fontSize: 12, color: "var(--muted)" }}>{VENUES.length} venues with regular music nights</div>
                    {VENUES.map(v => <VenueCard key={v.id} v={v} />)}
                    <div style={{ margin: "0 20px 16px", padding: 16, background: "#fff", borderRadius: 12, border: "2px dashed var(--border)", textAlign: "center", cursor: "pointer" }}>
                        <div style={{ fontSize: 24, marginBottom: 6 }}>🏢</div>
                        <div style={{ fontFamily: "Playfair Display,serif", fontSize: 15, color: "var(--ink)", marginBottom: 3 }}>Add Your Venue</div>
                        <div style={{ fontSize: 12, color: "var(--muted)" }}>List your music nights · reach local musicians</div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MCard({ m, onClick, minor }) {
    const blocked = minor === false && m.age === "minor";
    return (
        <div className="mcard" onClick={() => !blocked && onClick(m)} style={{ opacity: blocked ? .5 : 1 }}>
            <div className="cav" style={{ background: m.bg }}>
                {m.emoji}{m.online && !blocked && <div className="con" />}
                {m.age === "minor" && <div className="u18b">U18</div>}
            </div>
            <div className="cbody">
                <div className="cname">{m.name}</div><div className="cinst">{m.instrument}</div>
                <div className="cgens">{m.genres.map(g => <span key={g} className="gtag">{g}</span>)}</div>
                {blocked ? <div style={{ fontSize: 11, color: "var(--safe)", fontWeight: 500 }}>🔒 Minor profile</div>
                    : <><div className="clook">🎯 {m.looking}</div><div className="cdist">📍 {m.dist}</div></>}
            </div>
        </div>
    );
}

function BCard({ b, onClick }) {
    const open = b.members.filter(m => !m.filled);
    const filled = b.members.filter(m => m.filled).length;
    const pct = Math.round((filled / b.members.length) * 100);
    return (
        <div className="bcard" onClick={() => onClick(b)}>
            <div className="bchdr">
                <div className="bew">{b.emoji}</div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="bname">{b.name}</div>
                        {b.isMyBand && <span style={{ fontSize: 10, background: "rgba(200,133,42,.3)", color: "var(--al)", padding: "2px 7px", borderRadius: 8, fontWeight: 600 }}>YOUR BAND</span>}
                    </div>
                    <div className="bgl">{b.genres.join(" · ")}</div>
                    <div className="bloc">📍 {b.dist}</div>
                </div>
            </div>
            <div className="bbody">
                <div className="sbar"><div className="sblab"><span>Roster</span><span>{filled}/{b.members.length} filled</span></div><div className="sbtr"><div className="sbfi" style={{ width: `${pct}%` }} /></div></div>
                <div className="bmrow">
                    <div className="bmavs">{b.members.map((m, i) => <div key={i} className="bmav" style={{ background: m.filled ? ["#f0e6d3", "#e8f0e6", "#e6eaf0", "#f0e6ea", "#eef0e6"][i % 5] : "#eee", opacity: m.filled ? 1 : .4 }}>{m.filled ? m.emoji : "?"}</div>)}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{b.members.length} members · {open.length} open</div>
                </div>
                <div className="bseek">{b.members.map((m, i) => <span key={i} className={`stag ${m.filled ? "sfill" : "sopen"}`}>{m.filled ? "✓" : "!"} {m.role}</span>)}</div>
                <div className="bdesc">{b.desc}</div>
            </div>
            <div className="bfoot">
                {b.isMyBand ? <button className="btn1" style={{ fontSize: 13 }}>⚙️ Manage Band</button>
                    : <><button className="btn1" style={{ fontSize: 13 }} onClick={e => e.stopPropagation()}>Apply to Join</button><button className="btn2" style={{ fontSize: 13 }} onClick={e => e.stopPropagation()}>Message</button></>}
            </div>
        </div>
    );
}

function ECard({ ev, onJoin, minor }) {
    const tc = { openmic: "tom", jam: "tjam", gig: "tgig" }[ev.type];
    const tl = { openmic: "Open Mic", jam: "Jam Session", gig: "Gig" }[ev.type];
    const restricted = minor && !ev.allAges;
    return (
        <div className="ecard" style={{ opacity: restricted ? .6 : 1 }}>
            <div className="etop">
                <div className="edb"><div className="emon">{ev.month}</div><div className="eday">{ev.day}</div><div className="edow">{ev.dow}</div></div>
                <div style={{ flex: 1 }}>
                    <div className="enam">{ev.name}</div><div className="even">📍 {ev.venue}</div>
                    <div className="etags">
                        <span className={`etag ${tc}`}>{tl}</span>
                        {ev.allAges && <span className="etag tall">✅ All Ages</span>}
                        {ev.slots > 0 && <span className="etag tom">{ev.slots} slots</span>}
                        {restricted && <span className="etag tgig">18+ Only</span>}
                    </div>
                </div>
            </div>
            <div className="ebot">
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)" }}>
                    <div className="egav">{ev.going.map((g, i) => <div key={i} className="goa" style={{ background: ["#f0e6d3", "#e8f0e6", "#e6eaf0"][i % 3] }}>{g}</div>)}</div>
                    <span>{ev.going.length} going</span>
                </div>
                {restricted ? <span style={{ fontSize: 11, color: "var(--rust)", fontWeight: 500 }}>🔒 18+</span>
                    : <button className={`jbtn${ev.joined ? " jd" : ""}`} onClick={() => onJoin(ev.id)}>{ev.joined ? "✓ Going" : "Join"}</button>}
            </div>
        </div>
    );
}

function Chat({ conv, musician, onBack, onSend, onJamReq }) {
    const [txt, setTxt] = useState(""); const [showSched, setShowSched] = useState(false); const [selTime, setSelTime] = useState(null); const [accepted, setAccepted] = useState({});
    const endRef = useRef(null);
    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [conv.messages]);
    const times = ["Fri Apr 4 · 7PM", "Sat Apr 5 · 3PM", "Sat Apr 5 · 7PM", "Sun Apr 6 · 2PM", "Sun Apr 6 · 6PM", "Fri Apr 11 · 7PM"];
    const send = () => { if (!txt.trim()) return; onSend(conv.id, txt.trim()); setTxt(""); };
    return (
        <div className="cs">
            <div className="chdr">
                <button className="cback" onClick={onBack}>‹</button>
                <div className="chav" style={{ background: musician.bg }}>{musician.emoji}</div>
                <div style={{ flex: 1 }}><div className="chnm">{musician.name}</div><div className="chst">{musician.instrument} · {musician.online ? "🟢 Online" : "⚪ Offline"}</div></div>
                <div className="chac"><button className="chab" onClick={() => setShowSched(v => !v)}>📅</button></div>
            </div>
            <div className="cmsgs">
                <div className="cdiv">Today</div>
                {conv.messages.map(msg => {
                    const me = msg.from === "me";
                    if (msg.type === "jam_request") {
                        const acc = accepted[msg.id];
                        return (
                            <div key={msg.id} className="mr" style={{ justifyContent: me ? "flex-end" : "flex-start" }}>
                                {!me && <div className="masm" style={{ background: musician.bg }}>{musician.emoji}</div>}
                                <div>
                                    <div className="jrc">
                                        <div className="jrh">📅 Jam Request</div><div className="jrt">Let's jam!</div>
                                        <div className="jrd">🕐 {msg.proposed}<br />📍 Venue TBD</div>
                                        {acc === undefined && !me ? <div className="jra"><button className="jracc" onClick={() => setAccepted(p => ({ ...p, [msg.id]: true }))}>✓ Accept</button><button className="jrdec" onClick={() => setAccepted(p => ({ ...p, [msg.id]: false }))}>✗ Decline</button></div>
                                            : <div style={{ fontSize: 12, fontWeight: 600, color: acc === false ? "var(--rust)" : "var(--sage)", marginTop: 6 }}>{acc === false ? "✗ Declined" : me ? "⏳ Awaiting…" : "✓ Accepted!"}</div>}
                                    </div>
                                    <div className={`mt${me ? "" : " lft"}`}>{msg.time}</div>
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div key={msg.id} className={`mr${me ? " me" : ""}`}>
                            {!me && <div className="masm" style={{ background: musician.bg }}>{musician.emoji}</div>}
                            <div><div className={`mb ${me ? "me" : "th"}`}>{msg.text}</div><div className={`mt${me ? "" : " lft"}`}>{msg.time}</div></div>
                        </div>
                    );
                })}
                <div ref={endRef} />
            </div>
            {showSched && (
                <div className="jsch">
                    <div className="jstit">📅 Propose a Jam Time</div>
                    <div className="jtgr">{times.map(t => <div key={t} className={`jtb${selTime === t ? " on" : ""}`} onClick={() => setSelTime(t)}>{t}</div>)}</div>
                    <button className="jsnd" style={{ opacity: selTime ? 1 : .5 }} onClick={() => { if (!selTime) return; onJamReq(conv.id, selTime); setSelTime(null); setShowSched(false); }}>Send Jam Request</button>
                </div>
            )}
            <div className="cinp">
                <button className="cxb" onClick={() => setShowSched(v => !v)}>📅</button>
                <textarea className="ctxt" placeholder="Message..." value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} rows={1} />
                <button className="csnd" disabled={!txt.trim()} onClick={send}>➤</button>
            </div>
        </div>
    );
}

function Inbox({ convs, onOpen }) {
    const uc = convs.filter(c => c.unread).length;
    return (
        <div className="pg">
            <div className="hero" style={{ padding: "20px 20px 16px" }}><div className="htitle" style={{ fontSize: 22, marginBottom: 0 }}>Messages {uc > 0 && <em style={{ fontSize: 16 }}>· {uc} new</em>}</div></div>
            <div className="ilist">
                {convs.map(c => {
                    const m = getM(c.mid); const last = c.messages[c.messages.length - 1];
                    const prev = last.type === "jam_request" ? "📅 Jam request" : (last.from === "me" ? `You: ${last.text}` : last.text);
                    return (
                        <div key={c.id} className={`iit${c.unread ? " unr" : ""}`} onClick={() => onOpen(c.id)}>
                            <div className="iav" style={{ background: m.bg }}>{m.emoji}{m.online && <div className="ionl" />}</div>
                            <div className="iinf"><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div className="inam">{m.name}</div><span style={{ fontSize: 10, color: "var(--amber)", fontWeight: 500 }}>{m.instrument}</span></div><div className="ipre">{prev}</div></div>
                            <div className="imet"><div className="itim">{last.time}</div>{c.unread && <div className="iudot" />}</div>
                        </div>
                    );
                })}
                {convs.length === 0 && <div className="es"><div className="ei">💬</div><div className="et">No messages yet</div><div className="ed">Tap Message on any musician to start a conversation.</div></div>}
            </div>
        </div>
    );
}

function Home({ musicians, events, bands, shows, onM, onB, onJoin, filter, setFilter, minor, goLive }) {
    const tonight = shows.find(s => s.tonight);
    return (
        <div className="pg">
            {minor && <div className="mmbar"><span>🛡️</span><span className="mmtxt">Safe Mode active · Some content restricted for under-18 users</span></div>}
            <div className="hero">
                <div className="hgreet">Good evening</div>
                <div className="htitle">Find your next <em>sound</em></div>
                <div className="hstats">
                    <div><span className="stn">24</span><span className="stl">Near you</span></div>
                    <div><span className="stn">8</span><span className="stl">Online now</span></div>
                    <div><span className="stn">{shows.length}</span><span className="stl">Shows this month</span></div>
                </div>
            </div>
            {tonight && (
                <>
                    <div className="sh"><div className="st">Live Tonight</div><button className="sl" onClick={goLive}>See all</button></div>
                    <div style={{ margin: "0 20px 16px", background: "linear-gradient(135deg,#1a0800,#2a1005)", borderRadius: 14, padding: 16, cursor: "pointer" }} onClick={goLive}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <div className="live-dot" />
                            <span style={{ fontSize: 10, color: "#ff8a80", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>On Tonight</span>
                        </div>
                        <div style={{ fontFamily: "Playfair Display,serif", fontSize: 18, color: "var(--parchment)", marginBottom: 3 }}>{tonight.name}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>📍 {tonight.venue} · {tonight.time}</div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, background: "rgba(230,168,74,.15)", color: "var(--al)", border: "1px solid rgba(230,168,74,.25)" }}>🎟 {tonight.cover}</span>
                            <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, background: "rgba(74,103,65,.15)", color: "#81c784", border: "1px solid rgba(74,103,65,.25)" }}>🎸 {tonight.band.name}</span>
                        </div>
                    </div>
                </>
            )}
            <div className="sh"><div className="st">Musicians Nearby</div><button className="sl">See all</button></div>
            <div className="chips">{["All", "Guitar", "Drums", "Keys", "Vocals", "Bass"].map(f => <div key={f} className={`chip${filter === f ? " on" : ""}`} onClick={() => setFilter(f)}>{f}</div>)}</div>
            <div className="cscroll">{musicians.map(m => <MCard key={m.id} m={m} onClick={onM} minor={minor} />)}</div>
            <div className="sh" style={{ marginTop: 8 }}><div className="st">Bands Seeking Members</div></div>
            {bands.filter(b => b.members.some(m => !m.filled)).slice(0, 2).map(b => <BCard key={b.id} b={b} onClick={onB} />)}
            <div className="sh"><div className="st">Upcoming Events</div></div>
            {minor && <div className="sban"><div className="sico">🛡️</div><div><div className="stit">Showing all-ages events only</div><div className="stxt">Always let a trusted adult know where you're going.</div></div></div>}
            {events.filter(e => !minor || e.allAges).slice(0, 3).map(e => <ECard key={e.id} ev={e} onJoin={onJoin} minor={minor} />)}
        </div>
    );
}

function Bands({ bands, onB, onCreate }) {
    const [tab, setTab] = useState("discover");
    const shown = tab === "mybands" ? bands.filter(b => b.isMyBand) : tab === "seeking" ? bands.filter(b => b.members.some(m => !m.filled)) : bands;
    return (
        <div className="pg">
            <div className="hero" style={{ padding: "20px 20px 16px" }}><div className="htitle" style={{ fontSize: 22, marginBottom: 0 }}>Bands & <em>Ensembles</em></div></div>
            <div className="trow">{[["discover", "Discover"], ["seeking", "Seeking"], ["mybands", "My Bands"]].map(([id, l]) => <div key={id} className={`ti${tab === id ? " on" : ""}`} onClick={() => setTab(id)}>{l}</div>)}</div>
            <div style={{ height: 12 }} />
            {shown.map(b => <BCard key={b.id} b={b} onClick={onB} />)}
            <div style={{ margin: "0 20px 12px", padding: 16, background: "#fff", borderRadius: 12, border: "2px dashed var(--border)", textAlign: "center", cursor: "pointer" }} onClick={onCreate}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>🎵</div>
                <div style={{ fontFamily: "Playfair Display,serif", fontSize: 15, color: "var(--ink)", marginBottom: 3 }}>Create a Band Profile</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>List your open slots and find members</div>
            </div>
        </div>
    );
}

function Events({ events, onJoin, minor, onAdd }) {
    const [f, setF] = useState("All");
    const shown = events.filter(e => f === "All" || (f === "Open Mic" && e.type === "openmic") || (f === "Jam" && e.type === "jam") || (f === "Gig" && e.type === "gig") || (f === "All Ages" && e.allAges));
    return (
        <div className="pg">
            <div className="hero" style={{ padding: "20px 20px 16px" }}><div className="hgreet">Grand Junction, CO</div><div className="htitle" style={{ fontSize: 22, marginBottom: 0 }}>Musician Events & <em>Jams</em></div></div>
            <div className="sh"><div className="st">April 2026</div></div>
            <div className="chips">{["All", "Open Mic", "Jam", "Gig", "All Ages"].map(x => <div key={x} className={`chip${f === x ? " on" : ""}`} onClick={() => setF(x)}>{x}</div>)}</div>
            {minor && <div className="sban"><div className="sico">🛡️</div><div><div className="stit">Your safety matters</div><div className="stxt">18+ events are marked. Always go with someone you trust.</div></div></div>}
            <div style={{ paddingTop: 4 }}>{shown.map(e => <ECard key={e.id} ev={e} onJoin={onJoin} minor={minor} />)}</div>
            <div style={{ margin: "0 20px 12px", padding: 16, background: "#fff", borderRadius: 12, border: "2px dashed var(--border)", textAlign: "center", cursor: "pointer" }} onClick={onAdd}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>➕</div>
                <div style={{ fontFamily: "Playfair Display,serif", fontSize: 15, color: "var(--ink)", marginBottom: 3 }}>Add an Event</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>Know of an open mic? Add it for the community</div>
            </div>
        </div>
    );
}

function Profile({onEdit, profile}){
  return(
    <div className="pg">
      <div className="phero">
        <span className="pem">{profile.emoji || "🎵"}</span>
        <div className="pnam">{profile.name}</div>
        <div className="ptag">{profile.instrument} · {profile.location}</div>
        <div className="pbdg">
          {profile.genres.map(g=><span key={g} className="bdg bda">{g}</span>)}
          {profile.looking.map(l=><span key={l} className="bdg bds">{l}</span>)}
        </div>
      </div>
      <div className="psec"><div className="pstit">Looking For</div><div className="plook">{profile.looking.map(l=><div key={l} className="li">🎯 {l}</div>)}</div></div>
      <div className="psec"><div className="pstit">Availability</div><div className="agr">{DAYS.map(d=><div key={d} className={`ad ${profile.availability.includes(d)?"av":"bz"}`}><span className="bp">{d}</span><span className="bs">{profile.availability.includes(d)?"Free":"Busy"}</span></div>)}</div></div>
      <div className="psec"><div className="pstit">About</div><div style={{fontSize:13,color:"var(--ink)",lineHeight:1.6}}>{profile.about||"No bio yet."}</div></div>
      <div style={{padding:"16px 20px 8px",display:"flex",flexDirection:"column",gap:10}}>
        <button className="btn1" style={{width:"100%",padding:14,fontSize:15}} onClick={onEdit}>✏️ Edit Profile</button>
        <button className="btn2" style={{width:"100%",padding:12,textAlign:"center",fontSize:14}}>🛡️ Privacy & Safety Settings</button>
        <button className="btn2" style={{width:"100%",padding:12,textAlign:"center",fontSize:14,color:"var(--rust)"}} onClick={()=>import("../../lib/firebase").then(m=>import("firebase/auth").then(a=>a.signOut(m.auth)))}>🚪 Sign Out</button>
      </div>
    </div>
  );
}
function AddEventModal({ onClose, onAdd }) {
    const [name, setName] = useState(""); const [venue, setVenue] = useState(""); const [type, setType] = useState("openmic"); const [allAges, setAllAges] = useState(false); const [slots, setSlots] = useState(""); const [date, setDate] = useState(""); const [errs, setErrs] = useState({});
    const go = () => { const e = {}; if (!name.trim()) e.name = "Required"; if (!venue.trim()) e.venue = "Required"; if (!date) e.date = "Required"; setErrs(e); if (Object.keys(e).length) return; const d = new Date(date + "T12:00:00"); onAdd({ name: name.trim(), venue: venue.trim(), type, allAges, slots: parseInt(slots) || 0, month: MONS[d.getMonth()].toUpperCase(), day: String(d.getDate()).padStart(2, "0"), dow: DOWL[d.getDay()].toUpperCase(), going: [], joined: false }); onClose(); };
    return (
        <div className="ov" onClick={onClose}><div className="mod" onClick={e => e.stopPropagation()}>
            <div className="mhnd" /><div className="mtit">Add an Event</div>
            <div className="fg"><label className="fl">Event Name *</label><input className="fi" placeholder="e.g. Wednesday Open Mic" value={name} onChange={e => setName(e.target.value)} style={{ borderColor: errs.name ? "var(--rust)" : "" }} />{errs.name && <div style={{ fontSize: 11, color: "var(--rust)", marginTop: 4 }}>{errs.name}</div>}</div>
            <div className="fg"><label className="fl">Venue *</label><input className="fi" placeholder="e.g. The Rabbit Hole Bar" value={venue} onChange={e => setVenue(e.target.value)} style={{ borderColor: errs.venue ? "var(--rust)" : "" }} /></div>
            <div className="frow"><div className="fg"><label className="fl">Date *</label><input className="fi" type="date" value={date} onChange={e => setDate(e.target.value)} style={{ borderColor: errs.date ? "var(--rust)" : "" }} /></div><div className="fg"><label className="fl">Slots</label><input className="fi" type="number" placeholder="0" min="0" max="30" value={slots} onChange={e => setSlots(e.target.value)} /></div></div>
            <div className="fg"><label className="fl">Type</label><div className="cbg">{[["openmic", "🎤 Open Mic"], ["jam", "🥁 Jam"], ["gig", "🎸 Gig"]].map(([v, l]) => <div key={v} className={`cbl${type === v ? " ck" : ""}`} onClick={() => setType(v)}>{l}</div>)}</div></div>
            <div className="fg"><label className="fl">Age Policy</label><div className="cbg"><div className={`cbl${allAges ? " ck" : ""}`} onClick={() => setAllAges(true)}>✅ All Ages</div><div className={`cbl${!allAges ? " ck" : ""}`} onClick={() => setAllAges(false)}>🔞 18+ Only</div></div></div>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}><button className="btn1" onClick={go}>Add Event</button><button className="btn2" onClick={onClose}>Cancel</button></div>
        </div></div>
    );
}

function CreateBandModal({ onClose, onCreate }) {
    const [nm, setNm] = useState(""); const [desc, setDesc] = useState(""); const [loc, setLoc] = useState("Grand Junction, CO"); const [genres, togG] = useToggle([]); const [insts, togI] = useToggle([]); const [errs, setErrs] = useState({});
    const go = () => { const e = {}; if (!nm.trim()) e.name = "Required"; if (!genres.length) e.g = "Select at least one"; if (!insts.length) e.i = "Select at least one"; setErrs(e); if (Object.keys(e).length) return; onCreate({ name: nm.trim(), emoji: "🎵", genres, dist: "Your Band", desc: desc.trim() || `${nm} is looking for musicians.`, isMyBand: true, members: [{ name: "Geoff M.", emoji: "🎸", role: "Guitar (Slide)", filled: true }, ...insts.map(i => ({ name: "Open", emoji: EMOJ[i] || "🎵", role: i, filled: false }))] }); onClose(); };
    return (
        <div className="ov" onClick={onClose}><div className="mod" onClick={e => e.stopPropagation()}>
            <div className="mhnd" /><div className="mtit">Create Band Profile</div>
            <div className="fg"><label className="fl">Band Name *</label><input className="fi" placeholder="e.g. Patchwork Sound" value={nm} onChange={e => setNm(e.target.value)} style={{ borderColor: errs.name ? "var(--rust)" : "" }} />{errs.name && <div style={{ fontSize: 11, color: "var(--rust)", marginTop: 4 }}>{errs.name}</div>}</div>
            <div className="fg"><label className="fl">Genres * {errs.g && <span style={{ color: "var(--rust)", textTransform: "none", letterSpacing: 0 }}>— {errs.g}</span>}</label><div className="cbg">{GENRES.map(g => <div key={g} className={`cbl${genres.includes(g) ? " ck" : ""}`} onClick={() => togG(g)}>{g}</div>)}</div></div>
            <div className="fg"><label className="fl">Open Slots * {errs.i && <span style={{ color: "var(--rust)", textTransform: "none", letterSpacing: 0 }}>— {errs.i}</span>}</label><div className="cbg">{["Guitar", "Bass", "Drums", "Keys", "Vocals", "Violin", "Sax", "Trumpet", "Other"].map(i => <div key={i} className={`cbl${insts.includes(i) ? " ck" : ""}`} onClick={() => togI(i)}>{EMOJ[i]} {i}</div>)}</div></div>
            <div className="fg"><label className="fl">About</label><textarea className="fta" placeholder="Tell musicians about your style..." value={desc} onChange={e => setDesc(e.target.value)} /></div>
            <div className="fg"><label className="fl">Location</label><input className="fi" value={loc} onChange={e => setLoc(e.target.value)} /></div>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}><button className="btn1" onClick={go}>Create Band Profile</button><button className="btn2" onClick={onClose}>Cancel</button></div>
        </div></div>
    );
}

function MModal({ m, onClose, minor, onMsg }) {
    const [showRep, setShowRep] = useState(false); const [reported, setReported] = useState(false);
    if (!m) return null;
    if (showRep) return (
        <div className="ov" onClick={onClose}><div className="mod" onClick={e => e.stopPropagation()}>
            <div className="mhnd" /><div className="mtit">Report or Block</div>
            {reported ? (<div style={{ textAlign: "center", padding: "20px 0" }}><div style={{ fontSize: 48, marginBottom: 12 }}>✅</div><div style={{ fontFamily: "Playfair Display,serif", fontSize: 18, marginBottom: 8 }}>Report submitted</div><div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{m.name} has been blocked.</div><button className="btn1" style={{ marginTop: 20, width: "100%" }} onClick={onClose}>Done</button></div>)
                : (<>{[{ i: "🚫", l: "Block this user", s: "They won't be able to message you" }, { i: "⚠️", l: "Inappropriate behavior", s: "Harassment, spam, or misconduct" }, { i: "🔞", l: "Inappropriate contact with minor", s: "Adult contacting someone under 18" }, { i: "🤥", l: "Fake or misleading profile", s: "Impersonation or false info" }, { i: "😰", l: "I feel unsafe", s: "Something doesn't feel right" }].map((r, i) => (<div key={i} className="rop" onClick={() => setReported(true)}><div className="roico">{r.i}</div><div><div className="rola">{r.l}</div><div className="rosu">{r.s}</div></div><div className="inch">›</div></div>))}<button className="btn2" style={{ width: "100%", marginTop: 12, textAlign: "center" }} onClick={() => setShowRep(false)}>Cancel</button></>)}
        </div></div>
    );
    return (
        <div className="ov" onClick={onClose}><div className="mod" onClick={e => e.stopPropagation()}>
            <div className="mhnd" />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{m.emoji}</div>
                <div><div style={{ fontFamily: "Playfair Display,serif", fontSize: 22 }}>{m.name}</div><div style={{ fontSize: 12, color: "var(--amber)", fontWeight: 500, textTransform: "uppercase" }}>{m.instrument}</div><div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>📍 {m.dist} · {m.online ? "🟢 Online" : "⚪ Offline"}</div></div>
            </div>
            {minor && <div className="sban" style={{ margin: "0 0 14px" }}><div className="sico">🛡️</div><div><div className="stit">Safety reminder</div><div className="stxt">Only meet people in public places. Tell a trusted adult who you're meeting.</div></div></div>}
            <div style={{ marginBottom: 14 }}><div className="fl">Genres</div><div style={{ display: "flex", gap: 6 }}>{m.genres.map(g => <span key={g} className="cg">{g}</span>)}</div></div>
            <div style={{ marginBottom: 18 }}><div className="fl">Looking For</div><div className="li" style={{ display: "inline-flex" }}>🎯 {m.looking}</div></div>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}><button className="btn1" style={{ flex: 1 }} onClick={() => { onMsg(m); onClose(); }}>💬 Message</button><button className="btn1" style={{ flex: 1, background: "var(--sage)" }} onClick={() => { onMsg(m); onClose(); }}>📅 Schedule Jam</button></div>
            <div style={{ display: "flex", gap: 10 }}><button className="btnd" style={{ flex: 1 }} onClick={() => setShowRep(true)}>🚩 Report / Block</button><button className="btn2" style={{ flex: 1, textAlign: "center" }} onClick={onClose}>Close</button></div>
        </div></div>
    );
}

function BModal({ b, onClose }) {
    if (!b) return null;
    return (
        <div className="ov" onClick={onClose}><div className="mod" onClick={e => e.stopPropagation()}>
            <div className="mhnd" />
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}><div style={{ width: 56, height: 56, borderRadius: 14, background: "#f0e6d3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{b.emoji}</div><div><div style={{ fontFamily: "Playfair Display,serif", fontSize: 22, marginBottom: 2 }}>{b.name}</div><div style={{ fontSize: 11, color: "var(--amber)", fontWeight: 500, textTransform: "uppercase" }}>{b.genres.join(" · ")}</div><div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>📍 {b.dist}</div></div></div>
            <div style={{ marginBottom: 14 }}><div className="fl">About</div><div style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.6 }}>{b.desc}</div></div>
            <div style={{ marginBottom: 16 }}><div className="fl">Roster</div>{b.members.map((m, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--warm)" }}><div style={{ width: 32, height: 32, borderRadius: 8, background: m.filled ? "#f0e6d3" : "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, opacity: m.filled ? 1 : .4 }}>{m.filled ? m.emoji : "?"}</div><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, color: m.filled ? "var(--ink)" : "var(--muted)" }}>{m.filled ? m.name : "Open slot"}</div><div style={{ fontSize: 11, color: m.filled ? "var(--amber)" : "var(--rust)", fontWeight: 500 }}>{m.role}</div></div>{!m.filled && <span className="stag sopen">OPEN</span>}</div>))}</div>
            {!b.isMyBand && b.members.some(m => !m.filled) && <div style={{ display: "flex", gap: 10, marginBottom: 10 }}><button className="btn1" style={{ flex: 1 }}>🎵 Apply to Join</button><button className="btn1" style={{ flex: 1, background: "var(--sage)" }}>💬 Message Band</button></div>}
            {b.isMyBand && <button className="btn1" style={{ width: "100%", marginBottom: 10 }}>⚙️ Manage Band Profile</button>}
            <button className="btn2" style={{ width: "100%", textAlign: "center" }} onClick={onClose}>Close</button>
        </div></div>
    );
}

function AgeGate({ onSelect }) {
    return (
        <div className="ag">
            <div className="aglo">Music<span>Meetup</span></div>
            <div className="agsub">Connect · Jam · Perform</div>
            <div className="agq">How old are you?</div>
            <div className="agh">We use this to keep younger musicians safe and connect you with the right people.</div>
            <button className="agb agba" onClick={() => onSelect(false)}>18 or older</button>
            <button className="agb agbt" onClick={() => onSelect(true)}>Under 18</button>
            <div className="agn">Under-18 users have Safe Mode enabled automatically.</div>
        </div>
    );
}

export default function App({user, profile}){
    const [ageSet, setAgeSet] = useState(false);
    const [minor, setMinor] = useState(false);
    const [tab, setTab] = useState("home");
    const [filter, setFilter] = useState("All");
    const [events, setEvents] = useState(INIT_EVENTS);
    const [bands, setBands] = useState(INIT_BANDS);
    const [shows, setShows] = useState(INIT_SHOWS);
    const [convs, setConvs] = useState(INIT_CONVS);
    const [convId, setConvId] = useState(null);
    const [selM, setSelM] = useState(null);
    const [selB, setSelB] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showAddEv, setShowAddEv] = useState(false);
    const [showCB, setShowCB] = useState(false);
    const [toast, setToast] = useState(null);
    const [currentProfile, setCurrentProfile] = useState(profile);
    const [editName, setEditName] = useState(profile?.name||"");
    const [editInstrument, setEditInstrument] = useState(profile?.instrument||"");
    const [editGenres, setEditGenres] = useState(profile?.genres||[]);
    const [editLooking, setEditLooking] = useState(profile?.looking||[]);
    const [editAbout, setEditAbout] = useState(profile?.about||"");
    const [savingProfile, setSavingProfile] = useState(false);

    const doToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2600); };
    const openChat = id => { setConvs(p => p.map(c => c.id === id ? { ...c, unread: false } : c)); setConvId(id); setTab("messages"); };
    const msgMusician = m => { const ex = convs.find(c => c.mid === m.id); if (ex) { openChat(ex.id); return; } const nc = { id: Date.now(), mid: m.id, unread: false, messages: [{ id: 1, from: "me", text: `Hey ${m.name}! Saw your profile — would love to connect and jam sometime.`, time: "Just now", type: "text" }] }; setConvs(p => [...p, nc]); setConvId(nc.id); setTab("messages"); };
    const sendMsg = (cid, txt) => {
        setConvs(p => p.map(c => c.id === cid ? { ...c, messages: [...c.messages, { id: Date.now(), from: "me", text: txt, time: "Just now", type: "text" }] } : c));
        setTimeout(() => { const replies = ["Sounds great! I'm free this weekend.", "Nice! What style are you into?", "Let's do it! I know a good spot.", "Yeah for sure, hit me up Friday.", "That works for me 👍"]; setConvs(p => p.map(c => c.id === cid ? { ...c, messages: [...c.messages, { id: Date.now() + 1, from: "them", text: replies[Math.floor(Math.random() * replies.length)], time: "Just now", type: "text" }] } : c)); }, 1200);
    };
    const sendJam = (cid, proposed) => setConvs(p => p.map(c => c.id === cid ? { ...c, messages: [...c.messages, { id: Date.now(), from: "me", type: "jam_request", proposed, time: "Just now", status: "pending" }] } : c));

    const saveProfile = async () => {
        setSavingProfile(true);
        try {
            const {doc, setDoc} = await import("firebase/firestore");
            const {db} = await import("../../lib/firebase");
            const EMAP = {Guitar:"🎸",Bass:"🎸",Drums:"🥁",Keys:"🎹",Violin:"🎻",Sax:"🎷",Vocals:"🎵",Trumpet:"🎺",Banjo:"🪕",Mandolin:"🎸",Other:"🎵"};
            const updated = {...currentProfile, name:editName, instrument:editInstrument, emoji:EMAP[editInstrument]||"🎵", genres:editGenres, looking:editLooking, about:editAbout};
            await setDoc(doc(db, "users", user.uid), updated);
            setCurrentProfile(updated);
            setShowEdit(false);
            doToast("Profile saved!");
        } catch(e) { alert(e.message); }
        setSavingProfile(false);
    };

    const uc = convs.filter(c => c.unread).length;
    const activeConv = convs.find(c => c.id === convId);
    const activeM = activeConv ? getM(activeConv.mid) : null;

    if (!ageSet) return (<><style>{S}</style><AgeGate onSelect={m => { setMinor(m); setAgeSet(true); }} /></>);

    return (
        <>
            <style>{S}</style>
            <div className="app">
                {toast && <div className="toast">✓ {toast}</div>}
                {tab === "messages" && activeConv && activeM && <Chat conv={activeConv} musician={activeM} onBack={() => setConvId(null)} onSend={sendMsg} onJamReq={sendJam} />}
                <div style={{ display: tab === "messages" && activeConv ? "none" : "block" }}>
                    <div className="hdr">
                        <div><div className="logo">Music<span>Meetup</span></div><div className="hsub">Grand Junction, CO</div></div>
                        <div className="avbtn" onClick={() => setTab("profile")}>{currentProfile?.emoji||"🎵"}</div>
                    </div>
                    {tab === "home" && <Home musicians={MUSICIANS} events={events} bands={bands} shows={shows} onM={setSelM} onB={setSelB} onJoin={id => setEvents(p => p.map(e => e.id === id ? { ...e, joined: !e.joined } : e))} filter={filter} setFilter={setFilter} minor={minor} goLive={() => setTab("live")} />}
                    {tab === "live" && <LiveMusic shows={shows} setShows={setShows} />}
                    {tab === "bands" && <Bands bands={bands} onB={setSelB} onCreate={() => setShowCB(true)} />}
                    {tab === "events" && <Events events={events} onJoin={id => setEvents(p => p.map(e => e.id === id ? { ...e, joined: !e.joined } : e))} minor={minor} onAdd={() => setShowAddEv(true)} />}
                    {tab === "messages" && !activeConv && <Inbox convs={convs} onOpen={openChat} />}
                    {tab === "profile" && <Profile onEdit={() => setShowEdit(true)} profile={currentProfile} />}
                    <nav className="bnav">
                        {[{ id: "home", icon: <IH />, label: "Home" }, { id: "live", icon: <ILM />, label: "Live" }, { id: "bands", icon: <IB />, label: "Bands" }, { id: "events", icon: <IC />, label: "Events" }, { id: "messages", icon: <IM />, label: "Messages", badge: uc }].map(n => (
                            <button key={n.id} className={`nbtn${tab === n.id ? " on" : ""}`} onClick={() => { setTab(n.id); if (n.id !== "messages") setConvId(null); }}>
                                {n.icon}{n.label}
                                {n.badge > 0 && <div className="nbadge">{n.badge}</div>}
                            </button>
                        ))}
                    </nav>
                </div>
                <MModal m={selM} onClose={() => setSelM(null)} minor={minor} onMsg={msgMusician} />
                <BModal b={selB} onClose={() => setSelB(null)} />
                {showAddEv && <AddEventModal onClose={() => setShowAddEv(false)} onAdd={d => { setEvents(p => [...p, { ...d, id: Date.now() }]); doToast("Event added!"); }} />}
                {showCB && <CreateBandModal onClose={() => setShowCB(false)} onCreate={d => { setBands(p => [...p, { ...d, id: Date.now() }]); doToast("Band profile created!"); setTab("bands"); }} />}
                {showEdit && (
                    <div className="ov" onClick={() => setShowEdit(false)}><div className="mod" onClick={e => e.stopPropagation()}>
                        <div className="mhnd" /><div className="mtit">Edit Your Profile</div>
                        <div className="fg"><label className="fl">Display Name</label><input className="fi" value={editName} onChange={e => setEditName(e.target.value)} /></div>
                        <div className="fg"><label className="fl">Primary Instrument</label><select className="fsl" value={editInstrument} onChange={e => setEditInstrument(e.target.value)}>{INSTS.map(i => <option key={i}>{i}</option>)}</select></div>
                        <div className="fg"><label className="fl">Genres</label><div className="cbg">{GENRES.map(g => <div key={g} className={`cbl${editGenres.includes(g) ? " ck" : ""}`} onClick={() => setEditGenres(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g])}>{g}</div>)}</div></div>
                        <div className="fg"><label className="fl">Looking For</label><div className="cbg">{LOOK.map(l => <div key={l} className={`cbl${editLooking.includes(l) ? " ck" : ""}`} onClick={() => setEditLooking(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l])}>{l}</div>)}</div></div>
                        <div className="fg"><label className="fl">About You</label><textarea className="fta" value={editAbout} onChange={e => setEditAbout(e.target.value)} /></div>
                        <button className="btn1" style={{ width: "100%", padding: 14, marginTop: 6 }} onClick={saveProfile} disabled={savingProfile}>{savingProfile ? "Saving..." : "Save Profile"}</button>
                    </div></div>
                )}
            </div>
        </>
    );
}
