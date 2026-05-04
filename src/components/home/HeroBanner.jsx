import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Users, ChevronLeft, ChevronRight, Tag, Shield, Repeat } from 'lucide-react';

const SLIDES = [
  {
    badge:       '📚 India\'s #1 Book Marketplace',
    headline:    'Every book has a',
    highlight:   'second story',
    tail:        'to tell.',
    sub:         'Discover affordable pre-loved books or earn by selling yours. Thousands of titles, hand-picked by readers across India.',
    ctaLabel:    'Start Selling',
    ctaTo:       '/signup',
    ctaLoggedIn: 'Sell Your Books',
    ctaToLoggedIn: '/dashboard',
    visual: {
      icon:  BookOpen,
      title: 'Why sell on Bookify?',
      points: [
        { icon: Tag,    text: 'Set your own price — no middlemen' },
        { icon: Shield, text: 'Secure buyer-seller transactions' },
        { icon: Repeat, text: 'Fast re-listing in under 2 minutes' },
      ],
      accent: '#D97706',
    },
  },
  {
    badge:       '🔍 Find Rare & Affordable Books',
    headline:    'Great reads at',
    highlight:   'half the price.',
    tail:        '',
    sub:         'Browse thousands of secondhand books — fiction, textbooks, biographies and more. Save up to 80% compared to new copies.',
    ctaLabel:    'Browse Books',
    ctaTo:       '/#browse',
    ctaLoggedIn: 'Browse Books',
    ctaToLoggedIn: '/#browse',
    visual: {
      icon:  TrendingUp,
      title: 'Popular right now',
      points: [
        { icon: BookOpen, text: '"Atomic Habits" — ₹120 (was ₹499)' },
        { icon: BookOpen, text: '"Rich Dad Poor Dad" — ₹90' },
        { icon: BookOpen, text: '"The Alchemist" — ₹75' },
      ],
      accent: '#059669',
    },
  },
  {
    badge:       '🤝 Join 100+ Readers & Sellers',
    headline:    'A community built',
    highlight:   'for book lovers.',
    tail:        '',
    sub:         'Connect with fellow readers. List books you\'ve finished, discover hidden gems, and keep stories alive by passing them forward.',
    ctaLabel:    'Join Free',
    ctaTo:       '/signup',
    ctaLoggedIn: 'My Dashboard',
    ctaToLoggedIn: '/dashboard',
    visual: {
      icon:  Users,
      title: 'What sellers say',
      points: [
        { icon: Users, text: '"Sold 12 books in a week!" — Priya, Delhi' },
        { icon: Users, text: '"Super easy to list." — Rahul, Mumbai' },
        { icon: Users, text: '"Best platform for students." — Aisha, Pune' },
      ],
      accent: '#7C3AED',
    },
  },
];

const STATS = [
  { icon: BookOpen,   value: '1,200+', label: 'Books Listed' },
  { icon: Users,      value: '100+',   label: 'Readers'      },
  { icon: TrendingUp, value: '800+',   label: 'Books Sold'   },
];

/* ── tiny hook: returns true when the viewport is ≤ 640px ── */
function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 640 : false
  );
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

export default function HeroBanner() {
  const { isLoggedIn } = useAuth();
  const isMobile = useIsMobile();
  const [active, setActive]   = useState(0);
  const [animDir, setAnimDir] = useState('right');
  const [visible, setVisible] = useState(true);

  const go = useCallback((dir) => {
    setAnimDir(dir);
    setVisible(false);
    setTimeout(() => {
      setActive(prev => dir === 'right'
        ? (prev + 1) % SLIDES.length
        : (prev - 1 + SLIDES.length) % SLIDES.length
      );
      setVisible(true);
    }, 220);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go('right'), 5000);
    return () => clearInterval(t);
  }, [go]);

  const slide = SLIDES[active];
  const Visual = slide.visual.icon;

  /* ── shared animation state ── */
  const anim = {
    opacity:   visible ? 1 : 0,
    transform: visible
      ? 'translateX(0)'
      : `translateX(${animDir === 'right' ? '-24px' : '24px'})`,
    transition: 'opacity 0.22s ease, transform 0.22s ease',
  };

  /* ── accent icon colour helper ── */
  const accentIcon = slide.visual.accent === '#059669'
    ? '#34D399'
    : slide.visual.accent === '#7C3AED'
    ? '#A78BFA'
    : '#FCD34D';

  return (
    <>
      {/* ── scoped responsive styles ── */}
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 380px;
          position: relative;
          z-index: 1;
        }
        .hero-left {
          padding: 48px 0 48px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .hero-right {
          padding: 48px 48px 48px 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-headline {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(26px, 3.2vw, 44px);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.14;
          letter-spacing: -0.4px;
          margin-bottom: 16px;
        }
        .hero-sub {
          color: rgba(255,255,255,0.62);
          font-size: 14px;
          line-height: 1.75;
          margin-bottom: 28px;
          max-width: 380px;
        }
        .hero-stats {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .hero-ctas {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .hero-visual-card {
          width: 100%;
          max-width: 320px;
          border-radius: 20px;
          padding: 28px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.10);
        }
        /* ── arrow buttons ── */
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
        }
        /* ── MOBILE overrides ── */
        @media (max-width: 640px) {
          .hero-grid {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .hero-left {
            padding: 32px 20px 20px 20px;
          }
          .hero-right {
            padding: 0 20px 28px 20px;
          }
          .hero-headline {
            font-size: clamp(22px, 7vw, 30px);
            margin-bottom: 12px;
          }
          .hero-sub {
            font-size: 13px;
            margin-bottom: 20px;
            max-width: 100%;
          }
          .hero-ctas {
            margin-bottom: 24px;
          }
          .hero-stats {
            gap: 12px;
          }
          .hero-visual-card {
            max-width: 100%;
          }
          /* shrink arrows on mobile, move them to bottom-ish */
          .hero-arrow {
            top: unset;
            transform: none;
            bottom: 16px;
            width: 30px;
            height: 30px;
          }
          .hero-arrow-left  { left: 16px; }
          .hero-arrow-right { right: 16px; }
        }
        @media (min-width: 641px) {
          .hero-arrow-left  { left: 16px; }
          .hero-arrow-right { right: 16px; }
        }
      `}</style>

      <div
        className="relative overflow-hidden rounded-3xl mb-10"
        style={{
          background: 'linear-gradient(120deg,#1A0E06 0%,#2D1A0E 38%,#4A2510 68%,#6B3318 100%)',
          boxShadow: '0 20px 60px rgba(28,20,16,0.28), 0 4px 16px rgba(28,20,16,0.20)',
        }}
      >
        {/* Grain texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity: 0.18,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
        }} />

        {/* Glow orbs */}
        <div className="absolute pointer-events-none" style={{ top:-80, right:-60, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle,rgba(217,119,6,0.22) 0%,transparent 70%)' }} />
        <div className="absolute pointer-events-none" style={{ bottom:-80, left:'25%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(146,64,14,0.16) 0%,transparent 70%)' }} />

        {/* ── GRID ── */}
        <div className="hero-grid">

          {/* LEFT — text content */}
          <div className="hero-left" style={anim}>
            {/* Badge */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:isMobile?14:20, padding:'5px 14px', borderRadius:99, background:'rgba(217,119,6,0.15)', border:'1px solid rgba(217,119,6,0.30)', width:'fit-content' }}>
              <span style={{ color:'#FCD34D', fontSize:11, fontWeight:700, letterSpacing:'0.08em' }}>{slide.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline">
              {slide.headline}{' '}
              <em style={{ fontStyle:'italic', background:'linear-gradient(90deg,#FCD34D,#F59E0B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                {slide.highlight}
              </em>
              {slide.tail && <><br/>{slide.tail}</>}
            </h1>

            {/* Sub */}
            <p className="hero-sub">{slide.sub}</p>

            {/* CTAs */}
            <div className="hero-ctas">
              <Link
                to={isLoggedIn ? slide.ctaToLoggedIn : slide.ctaTo}
                style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'11px 22px', borderRadius:11, background:'linear-gradient(135deg,#D97706,#B45309)', color:'#fff', fontWeight:700, fontSize:13, boxShadow:'0 4px 18px rgba(217,119,6,0.45)', textDecoration:'none', transition:'transform 0.15s,box-shadow 0.15s' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(217,119,6,0.55)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 18px rgba(217,119,6,0.45)'; }}
              >
                {isLoggedIn ? slide.ctaLoggedIn : slide.ctaLabel} →
              </Link>
              <a
                href="#browse"
                style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'11px 20px', borderRadius:11, background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.82)', fontWeight:600, fontSize:13, border:'1px solid rgba(255,255,255,0.18)', textDecoration:'none', transition:'all 0.15s' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.14)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.08)'; }}
              >Browse Books ↓</a>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {STATS.map(({ icon:Icon, value, label }) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:28, height:28, borderRadius:7, background:'rgba(217,119,6,0.18)', border:'1px solid rgba(217,119,6,0.26)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={13} color="#FCD34D" />
                  </div>
                  <div>
                    <div style={{ color:'#fff', fontWeight:700, fontSize:13, lineHeight:1.1 }}>{value}</div>
                    <div style={{ color:'rgba(255,255,255,0.38)', fontSize:10 }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — visual card */}
          <div className="hero-right" style={anim}>
            <div className="hero-visual-card">
              {/* Card header */}
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, paddingBottom:16, borderBottom:'1px solid rgba(255,255,255,0.10)' }}>
                <div style={{ width:36, height:36, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:`${slide.visual.accent}26`, border:`1px solid ${slide.visual.accent}44` }}>
                  <Visual size={17} color={accentIcon} />
                </div>
                <span style={{ color:'#fff', fontWeight:700, fontSize:14, fontFamily:"'Playfair Display',Georgia,serif" }}>
                  {slide.visual.title}
                </span>
              </div>

              {/* Points */}
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {slide.visual.points.map(({ icon:PIcon, text }, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                    <div style={{ width:28, height:28, borderRadius:7, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.10)' }}>
                      <PIcon size={13} color="rgba(255,255,255,0.60)" />
                    </div>
                    <span style={{ color:'rgba(255,255,255,0.75)', fontSize:13, lineHeight:1.55, paddingTop:4 }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Slide indicator dots */}
              <div style={{ display:'flex', gap:5, marginTop:22, justifyContent:'center' }}>
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setAnimDir(i > active ? 'right' : 'left'); setActive(i); }}
                    style={{ width: i===active ? 20 : 6, height:6, borderRadius:99, border:'none', cursor:'pointer', transition:'all 0.25s', background: i===active ? '#FCD34D' : 'rgba(255,255,255,0.25)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Prev / Next arrows ── */}
        {[
          { dir:'left',  Icon:ChevronLeft,  cls:'hero-arrow-left'  },
          { dir:'right', Icon:ChevronRight, cls:'hero-arrow-right' },
        ].map(({ dir, Icon, cls }) => (
          <button
            key={dir}
            onClick={() => go(dir)}
            className={`hero-arrow ${cls}`}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.20)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.10)'}
          >
            <Icon size={18} color="rgba(255,255,255,0.80)" />
          </button>
        ))}
      </div>
    </>
  );
}