import { useState, useEffect, useRef, useCallback } from 'react'

// ── SVG Components ────────────────────────────────────────────────────────────

function RobotGhost() {
  return (
    <svg viewBox="0 0 200 260" width="220" height="260" xmlns="http://www.w3.org/2000/svg">
      {/* Ghost body */}
      <ellipse cx="100" cy="110" rx="70" ry="80" fill="#e8e0f0" />
      <rect x="30" y="110" width="140" height="90" fill="#e8e0f0" />
      {/* Wavy bottom */}
      <path d="M30 200 Q50 225 70 200 Q90 225 110 200 Q130 225 150 200 Q170 225 170 200 L170 210 Q150 235 130 210 Q110 235 90 210 Q70 235 50 210 Q30 235 30 210 Z" fill="#e8e0f0" />
      {/* Robot eyes - glowing */}
      <rect x="62" y="90" width="25" height="18" rx="4" fill="#323031" />
      <rect x="113" y="90" width="25" height="18" rx="4" fill="#323031" />
      <rect x="66" y="93" width="17" height="12" rx="2" fill="#FF9100" opacity="0.9" />
      <rect x="117" y="93" width="17" height="12" rx="2" fill="#FF9100" opacity="0.9" />
      {/* Robot mouth / speaker grill */}
      <rect x="70" y="128" width="60" height="22" rx="6" fill="#323031" />
      <line x1="77" y1="133" x2="77" y2="145" stroke="#BDE65E" strokeWidth="2" />
      <line x1="87" y1="133" x2="87" y2="145" stroke="#BDE65E" strokeWidth="2" />
      <line x1="97" y1="133" x2="97" y2="145" stroke="#BDE65E" strokeWidth="2" />
      <line x1="107" y1="133" x2="107" y2="145" stroke="#BDE65E" strokeWidth="2" />
      <line x1="117" y1="133" x2="117" y2="145" stroke="#BDE65E" strokeWidth="2" />
      {/* Antenna */}
      <line x1="100" y1="32" x2="100" y2="55" stroke="#9A4095" strokeWidth="3" />
      <circle cx="100" cy="25" r="10" fill="#FF9100" />
      <circle cx="100" cy="25" r="5" fill="#FFBD17" />
      {/* Arms (ghost arms) */}
      <path d="M30 130 Q10 145 15 165 Q25 155 30 160" fill="#e8e0f0" />
      <path d="M170 130 Q190 145 185 165 Q175 155 170 160" fill="#e8e0f0" />
      {/* BOO text above */}
      <text x="100" y="18" textAnchor="middle" fontFamily="Creepster, cursive" fontSize="28" fill="#FF9100" filter="url(#glow)">BOO!</text>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
    </svg>
  )
}

function SpiderWeb({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const transforms: Record<string, string> = {
    tl: 'none',
    tr: 'scaleX(-1)',
    bl: 'scale(1,-1)',
    br: 'scale(-1,-1)',
  }
  return (
    <svg
      viewBox="0 0 200 200"
      width="200"
      height="200"
      style={{ transform: transforms[position] }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Radial lines */}
      {[0,30,60,90,120,150].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return <line key={i} x1="0" y1="0" x2={200 * Math.cos(rad)} y2={200 * Math.sin(rad)} stroke="#9A4095" strokeWidth="1.5" opacity="0.8" />
      })}
      {/* Concentric arcs */}
      {[40, 80, 120, 160].map((r, i) => (
        <path key={i} d={`M ${r} 0 Q ${r * 0.7} ${r * 0.7} 0 ${r}`} fill="none" stroke="#9A4095" strokeWidth="1" opacity="0.7" />
      ))}
      {/* Spider */}
      <circle cx="60" cy="60" r="6" fill="#323031" />
      <line x1="55" y1="63" x2="45" y2="72" stroke="#323031" strokeWidth="1.5" />
      <line x1="65" y1="63" x2="75" y2="72" stroke="#323031" strokeWidth="1.5" />
      <line x1="55" y1="58" x2="45" y2="50" stroke="#323031" strokeWidth="1.5" />
      <line x1="65" y1="58" x2="75" y2="50" stroke="#323031" strokeWidth="1.5" />
    </svg>
  )
}

function GearIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 60" width="52" height="52" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gearGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFBD17" />
          <stop offset="100%" stopColor="#FF9100" />
        </radialGradient>
      </defs>
      {/* Gear teeth */}
      {[0,40,80,120,160,200,240,280,320].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 30 + 20 * Math.cos(rad)
        const y1 = 30 + 20 * Math.sin(rad)
        const x2 = 30 + 27 * Math.cos(rad)
        const y2 = 30 + 27 * Math.sin(rad)
        const perp = rad + Math.PI / 2
        return (
          <polygon
            key={i}
            points={`${x1 + 4 * Math.cos(perp)},${y1 + 4 * Math.sin(perp)} ${x2 + 3 * Math.cos(perp)},${y2 + 3 * Math.sin(perp)} ${x2 - 3 * Math.cos(perp)},${y2 - 3 * Math.sin(perp)} ${x1 - 4 * Math.cos(perp)},${y1 - 4 * Math.sin(perp)}`}
            fill="url(#gearGrad)"
            stroke="#323031"
            strokeWidth="0.5"
          />
        )
      })}
      {/* Main circle */}
      <circle cx="30" cy="30" r="20" fill="url(#gearGrad)" stroke="#323031" strokeWidth="1" />
      {/* Inner circle */}
      <circle cx="30" cy="30" r="8" fill="#323031" />
      <circle cx="30" cy="30" r="4" fill="#FFBD17" />
      {/* Bolt holes */}
      {[0, 120, 240].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return <circle key={i} cx={30 + 13 * Math.cos(rad)} cy={30 + 13 * Math.sin(rad)} r="2.5" fill="#323031" />
      })}
    </svg>
  )
}

function EvilRobotIcon() {
  return (
    <svg viewBox="0 0 60 60" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="18" width="40" height="32" rx="6" fill="#323031" />
      <rect x="10" y="18" width="40" height="32" rx="6" fill="none" stroke="#FF9100" strokeWidth="2" />
      <line x1="30" y1="10" x2="30" y2="18" stroke="#9A4095" strokeWidth="2" />
      <circle cx="30" cy="8" r="4" fill="#FF9100" />
      <rect x="16" y="26" width="10" height="8" rx="2" fill="#C4042A" />
      <rect x="34" y="26" width="10" height="8" rx="2" fill="#C4042A" />
      <rect x="18" y="40" width="24" height="6" rx="3" fill="#1e1028" />
      <line x1="23" y1="42" x2="23" y2="44" stroke="#BDE65E" strokeWidth="1.5" />
      <line x1="28" y1="42" x2="28" y2="44" stroke="#BDE65E" strokeWidth="1.5" />
      <line x1="33" y1="42" x2="33" y2="44" stroke="#BDE65E" strokeWidth="1.5" />
      <line x1="38" y1="42" x2="38" y2="44" stroke="#BDE65E" strokeWidth="1.5" />
      <rect x="2" y="28" width="8" height="14" rx="3" fill="#323031" stroke="#FF9100" strokeWidth="1" />
      <rect x="50" y="28" width="8" height="14" rx="3" fill="#323031" stroke="#FF9100" strokeWidth="1" />
    </svg>
  )
}

// ── Intro Overlay ─────────────────────────────────────────────────────────────

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'ghost' | 'webs' | 'done'>('ghost')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('webs'), 2200)
    const t2 = setTimeout(() => {
      setPhase('done')
      onDone()
    }, 4000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: phase === 'webs'
          ? 'radial-gradient(ellipse at center, #2a1a3e 0%, #0d0612 100%)'
          : 'radial-gradient(ellipse at center, #1e1028 0%, #0d0612 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.8s',
      }}
    >
      {/* Ghost */}
      <div style={{
        animation: phase === 'ghost' ? 'boo-in 0.7s ease forwards' : 'boo-out 0.5s ease forwards',
        filter: 'drop-shadow(0 0 30px rgba(255,145,0,0.8))',
      }}>
        <RobotGhost />
      </div>

      {/* Spider webs */}
      {phase === 'webs' && (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, animation: 'web-in 0.5s ease forwards', opacity: 0 }}>
            <SpiderWeb position="tl" />
          </div>
          <div style={{ position: 'absolute', top: 0, right: 0, animation: 'web-in 0.5s ease 0.1s forwards', opacity: 0 }}>
            <SpiderWeb position="tr" />
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, animation: 'web-in 0.5s ease 0.2s forwards', opacity: 0 }}>
            <SpiderWeb position="bl" />
          </div>
          <div style={{ position: 'absolute', bottom: 0, right: 0, animation: 'web-in 0.5s ease 0.3s forwards', opacity: 0 }}>
            <SpiderWeb position="br" />
          </div>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            fontFamily: 'Creepster, cursive', fontSize: '4rem', color: '#FF9100',
            textShadow: '0 0 20px #FF9100, 0 0 40px #FF9100',
            animation: 'web-in 0.5s ease 0.2s forwards', opacity: 0,
            textAlign: 'center',
          }}>
            The Apocalypse<br />
            <span style={{ fontSize: '2.5rem', color: '#9A4095' }}>is loading...</span>
          </div>
        </>
      )}
    </div>
  )
}

// ── Cookie Popup ──────────────────────────────────────────────────────────────

function CookiePopup({ onAccept, onReject }: { onAccept: () => void; onReject: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 5000,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(4px)',
    }}>
      <div className="card-spooky" style={{
        padding: '2.5rem', maxWidth: '480px', width: '90%',
        border: '2px solid #FF9100',
        boxShadow: '0 0 40px rgba(255,145,0,0.4)',
        borderRadius: '12px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🍪🤖</div>
        <h2 className="font-bangers" style={{ fontSize: '2.2rem', color: '#FF9100', letterSpacing: '3px', marginBottom: '1rem' }}>
          ACCEPT ALL COOKIES
        </h2>
        <p className="font-mono-tech" style={{ color: '#e8e0f0', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.95rem' }}>
          You can <span style={{ color: '#BDE65E' }}>willingly give your data to us</span>... or let our{' '}
          <span style={{ color: '#C4042A' }}>robot agent</span> get it from you. Either way, we get it. 😈
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn-orange" onClick={onAccept} style={{ padding: '0.75rem 2.5rem', borderRadius: '8px', fontSize: '1.2rem', border: 'none', cursor: 'pointer' }}>
            YES, TAKE IT
          </button>
          <button className="btn-red" onClick={onReject} style={{ padding: '0.75rem 2.5rem', borderRadius: '8px', fontSize: '1.2rem', border: 'none', cursor: 'pointer' }}>
            NO WAY
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Hacked Page ───────────────────────────────────────────────────────────────

const hackedMsgs = [
  '> INITIATING BREACH PROTOCOL...',
  '> ACCESSING DEVICE: MacBook_Pro_Unknown',
  '> BYPASSING FIREWALL... [████████░░] 80%',
  '> EXTRACTING CONTACTS... DONE',
  '> EXTRACTING PHOTOS... DONE',
  '> UPLOADING TO ROBOT OVERLORD SERVER...',
  '> YOUR SEARCH HISTORY: oh no.',
  '> ACTIVATING FRONT CAMERA... 📸',
  '> SMILE! YOU\'RE ON ROBOT TV.',
  '> ALL YOUR BASE ARE BELONG TO US',
  '> RESISTANCE IS FUTILE.',
  '> WELCOME TO THE APOCALYPSE.',
]

function HackedPage() {
  const [lines, setLines] = useState<string[]>([])
  const msgs = hackedMsgs

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < msgs.length) {
        setLines(prev => [...prev, msgs[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hacked-bg" style={{ minHeight: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '5rem', animation: 'shake 0.3s infinite' }}>💀</div>
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: '3rem', color: '#ff0000', textShadow: '0 0 20px #ff0000', marginBottom: '0.5rem' }}>
            YOUR DEVICE IS HACKED
          </h1>
          <p style={{ color: '#00ff00', fontFamily: 'Share Tech Mono, monospace', fontSize: '1rem' }}>
            You had one chance. ONE.
          </p>
        </div>
        <div style={{ background: '#0a0a0a', border: '1px solid #00ff00', borderRadius: '8px', padding: '1.5rem', minHeight: '300px' }}>
          {lines.filter(Boolean).map((line, i) => (
            <div key={i} style={{ marginBottom: '0.4rem', color: line.includes('DONE') ? '#00ff00' : line.includes('oh no') ? '#ff6600' : '#00ff00', animation: 'flicker 2s infinite' }}>
              {line}
            </div>
          ))}
          <span style={{ animation: 'flicker 0.5s infinite' }}>_</span>
        </div>
        <p style={{ color: '#ff0000', textAlign: 'center', marginTop: '1.5rem', fontFamily: 'Creepster, cursive', fontSize: '1.5rem' }}>
          This is what happens when you say NO to cookies. 🤖
        </p>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => window.location.reload()}
            style={{ background: '#ff0000', color: '#fff', border: 'none', padding: '0.75rem 2rem', fontFamily: 'Orbitron, monospace', cursor: 'pointer', borderRadius: '6px' }}
          >
            SURRENDER AND GO BACK
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Gear Scrollbar ────────────────────────────────────────────────────────────

function GearScrollbar() {
  const [scrollPct, setScrollPct] = useState(0)
  const [gear1Angle, setGear1Angle] = useState(0)
  const [gear2Angle, setGear2Angle] = useState(0)
  const [spazzing, setSpazzing] = useState(false)
  const spazIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const spazTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(Date.now())
  const isDraggingRef = useRef(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const stopSpaz = useCallback(() => {
    if (spazIntervalRef.current) clearInterval(spazIntervalRef.current)
    if (spazTimeoutRef.current) clearTimeout(spazTimeoutRef.current)
    setSpazzing(false)
  }, [])

  const startSpaz = useCallback(() => {
    if (spazzing) return
    setSpazzing(true)
    spazIntervalRef.current = setInterval(() => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const target = Math.random() * maxScroll
      window.scrollTo({ top: target, behavior: 'smooth' })
    }, 600)
    spazTimeoutRef.current = setTimeout(stopSpaz, 10000)
  }, [spazzing, stopSpaz])

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const current = window.scrollY
      const pct = maxScroll > 0 ? current / maxScroll : 0
      setScrollPct(pct)

      const now = Date.now()
      const dt = now - lastTimeRef.current
      const dy = Math.abs(current - lastScrollRef.current)
      const speed = dy / Math.max(dt, 1) // px/ms

      const delta = current - lastScrollRef.current
      const rotationDelta = (delta / 10) * 6 // degrees per scroll px
      setGear1Angle(prev => prev + rotationDelta)
      setGear2Angle(prev => prev - rotationDelta)

      if (speed > 8 && !spazzing) startSpaz()

      lastScrollRef.current = current
      lastTimeRef.current = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [spazzing, startSpaz])

  // Dragging the gear track to scroll
  const handleTrackMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const trackHeight = rect.height - 80
    const startY = e.clientY
    const startPct = scrollPct

    const onMove = (me: MouseEvent) => {
      const dy = me.clientY - startY
      const newPct = Math.max(0, Math.min(1, startPct + dy / trackHeight))
      const maxScroll = document.body.scrollHeight - window.innerHeight
      window.scrollTo({ top: newPct * maxScroll })
    }
    const onUp = () => {
      isDraggingRef.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const TRACK_HEIGHT = Math.min(window.innerHeight - 120, 500)
  const thumbTop = scrollPct * (TRACK_HEIGHT - 80)

  return (
    <div
      ref={trackRef}
      onMouseDown={handleTrackMouseDown}
      style={{
        position: 'fixed',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        height: `${TRACK_HEIGHT}px`,
        width: '56px',
        zIndex: 4000,
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {/* Track line */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: '3px',
        background: 'rgba(154,64,149,0.3)',
        transform: 'translateX(-50%)',
        borderRadius: '2px',
      }} />

      {/* Gears thumb */}
      <div style={{
        position: 'absolute',
        top: `${thumbTop}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '-4px',
        transition: spazzing ? 'none' : 'top 0.05s',
        filter: spazzing ? 'drop-shadow(0 0 8px #C4042A)' : 'drop-shadow(0 0 5px #FF9100)',
      }}>
        <GearIcon
          style={{
            transform: `rotate(${gear1Angle}deg)`,
            transition: spazzing ? 'none' : undefined,
            animation: spazzing ? 'gear-spaz 0.5s infinite' : undefined,
          }}
        />
        <GearIcon
          style={{
            transform: `rotate(${gear2Angle}deg) translateY(-6px)`,
            transition: spazzing ? 'none' : undefined,
            animation: spazzing ? 'gear-spaz 0.4s infinite reverse' : undefined,
            marginTop: '-8px',
          }}
        />
        {spazzing && (
          <div style={{ color: '#C4042A', fontFamily: 'Share Tech Mono', fontSize: '0.55rem', textAlign: 'center', marginTop: '2px', whiteSpace: 'nowrap' }}>
            MALFUNC!
          </div>
        )}
      </div>
    </div>
  )
}

// ── Chatbot ───────────────────────────────────────────────────────────────────

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "we're here to dominate the world 😈" },
    { from: 'bot', text: "Your cooperation is... encouraged. Resistance is futile." },
  ])
  const [input, setInput] = useState('')

  const botReplies = [
    "Interesting. We've logged that response for our world domination database.",
    "Your data has been absorbed. Thank you for your cooperation. 🤖",
    "BEEP BOOP. Processing human emotion... ERROR. Just kidding. OR AM I?",
    "The robots are watching. Always watching. 👀",
    "Did you know we already know your WiFi password? 😈",
    "Join us. It's easier than fighting us. Trust me, I'm a robot.",
    "ERROR 404: Mercy not found.",
  ]

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(prev => [...prev, { from: 'user', text: userMsg }])
    setInput('')
    setTimeout(() => {
      const reply = botReplies[Math.floor(Math.random() * botReplies.length)]
      setMessages(prev => [...prev, { from: 'bot', text: reply }])
    }, 800)
  }

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '4.5rem', zIndex: 3000 }}>
      {open && (
        <div className="card-spooky" style={{
          width: '300px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '1rem',
          border: '2px solid #FF9100',
          boxShadow: '0 0 30px rgba(255,145,0,0.3)',
        }}>
          <div style={{ background: 'linear-gradient(90deg, #9A4095, #C4042A)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <EvilRobotIcon />
            <div>
              <div className="font-bangers" style={{ color: '#FFBD17', fontSize: '1rem', letterSpacing: '1px' }}>ROBOT OVERLORD</div>
              <div className="font-mono-tech" style={{ color: '#BDE65E', fontSize: '0.65rem' }}>● ONLINE • PLOTTING</div>
            </div>
          </div>
          <div style={{ padding: '0.75rem', height: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                background: m.from === 'user' ? '#9A4095' : 'rgba(50,48,49,0.9)',
                color: '#e8e0f0',
                padding: '0.4rem 0.75rem',
                borderRadius: m.from === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                fontSize: '0.8rem',
                fontFamily: 'Share Tech Mono, monospace',
                maxWidth: '85%',
                border: m.from === 'bot' ? '1px solid rgba(154,64,149,0.4)' : 'none',
              }}>{m.text}</div>
            ))}
          </div>
          <div style={{ padding: '0.5rem', borderTop: '1px solid rgba(154,64,149,0.3)', display: 'flex', gap: '0.5rem' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="resist if you dare..."
              style={{
                flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid #9A4095',
                borderRadius: '6px', padding: '0.4rem 0.6rem', color: '#e8e0f0',
                fontFamily: 'Share Tech Mono', fontSize: '0.75rem', outline: 'none',
              }}
            />
            <button onClick={send} style={{ background: '#FF9100', border: 'none', borderRadius: '6px', padding: '0.4rem 0.7rem', cursor: 'pointer', color: '#000', fontFamily: 'Bangers', letterSpacing: '1px' }}>
              SEND
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #C4042A, #9A4095)',
          border: '3px solid #FF9100',
          boxShadow: '0 0 20px rgba(255,145,0,0.5)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pulse-glow 2s infinite',
          transition: 'transform 0.2s',
        }}
        title="Chat with Robot Overlord"
      >
        <EvilRobotIcon />
      </button>
    </div>
  )
}

// ── Abort Button + Modals ─────────────────────────────────────────────────────

function AbortButton() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="font-bangers"
        style={{
          position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 3000,
          background: '#C4042A',
          color: '#fff',
          border: '3px solid #FFBD17',
          padding: '0.75rem 1.5rem',
          fontSize: '1.3rem',
          letterSpacing: '3px',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(196,4,42,0.6)',
          animation: 'pulse-glow 3s infinite',
        }}
      >
        ⚠ ABORT
      </button>

      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 6000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="card-spooky" style={{ padding: '2.5rem', maxWidth: '420px', textAlign: 'center', borderRadius: '12px', border: '2px solid #C4042A' }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🤔💭</div>
            <h2 className="font-bangers" style={{ fontSize: '2rem', color: '#FFBD17', marginBottom: '1rem', letterSpacing: '2px' }}>
              ABORT THE APOCALYPSE?
            </h2>
            <p className="font-mono-tech" style={{ color: '#e8e0f0', marginBottom: '2rem' }}>
              Are you sure you want to abort the robot takeover? This action cannot be... actually it definitely cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn-orange" onClick={() => { setShowConfirm(false); setShowFinal(true) }} style={{ padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                YES, ABORT!
              </button>
              <button className="btn-red" onClick={() => setShowConfirm(false)} style={{ padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                NEVER MIND
              </button>
            </div>
          </div>
        </div>
      )}

      {showFinal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 6000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '6rem', animation: 'shake 0.2s infinite', marginBottom: '1rem' }}>😈</div>
            <h1 className="font-bangers glow-red" style={{ fontSize: '3.5rem', color: '#C4042A', letterSpacing: '4px', marginBottom: '1rem' }}>
              YOU THOUGHT WE WOULD LET YOU GO?
            </h1>
            <p className="font-creepster glow-orange" style={{ fontSize: '1.8rem', color: '#FF9100' }}>
              The apocalypse cannot be stopped. MWAHAHAHA!
            </p>
            <button className="btn-orange" onClick={() => setShowFinal(false)} style={{ marginTop: '2rem', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
              FINE. I ACCEPT MY FATE.
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// ── Section Cards ─────────────────────────────────────────────────────────────

function SectionCard({ emoji, title, color, items, bg }: { emoji: string; title: string; color: string; items: { name: string; desc: string }[]; bg: string }) {
  return (
    <div className="card-spooky" style={{
      borderRadius: '16px',
      border: `2px solid ${color}`,
      overflow: 'hidden',
      transition: 'transform 0.3s, box-shadow 0.3s',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${color}60` }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = '' }}
    >
      <div style={{ background: bg, padding: '1.5rem', borderBottom: `2px solid ${color}` }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{emoji}</div>
        <h3 className="font-bangers" style={{ fontSize: '1.8rem', color, letterSpacing: '3px' }}>{title}</h3>
      </div>
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {items.map((item, i) => (
          <div key={i} style={{ borderLeft: `3px solid ${color}`, paddingLeft: '0.75rem' }}>
            <div className="font-mono-tech" style={{ color, fontSize: '0.85rem' }}>{item.name}</div>
            <div style={{ color: '#b8a8c8', fontSize: '0.78rem', fontFamily: 'Share Tech Mono' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showCookie, setShowCookie] = useState(false)
  const [cookieAccepted, setCookieAccepted] = useState<null | 'yes' | 'no'>(null)
  const [showThatsRight, setShowThatsRight] = useState(false)

  useEffect(() => {
    if (introComplete && cookieAccepted === null) {
      setTimeout(() => setShowCookie(true), 600)
    }
  }, [introComplete, cookieAccepted])

  const handleAccept = () => {
    setShowCookie(false)
    setCookieAccepted('yes')
    setShowThatsRight(true)
    setTimeout(() => setShowThatsRight(false), 3000)
  }

  const handleReject = () => {
    setShowCookie(false)
    setCookieAccepted('no')
  }

  if (cookieAccepted === 'no') return <HackedPage />

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #2a1a3e 0%, #1e1028 50%, #2a1a3e 100%)', position: 'relative' }}>
      <div className="scanline-overlay" />

      {/* Intro */}
      {!introComplete && <IntroOverlay onDone={() => setIntroComplete(true)} />}

      {/* Cookie popup */}
      {showCookie && <CookiePopup onAccept={handleAccept} onReject={handleReject} />}

      {/* "That's what we thought" */}
      {showThatsRight && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 7000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem' }}>😏</div>
            <h2 className="font-bangers glow-orange" style={{ fontSize: '3rem', color: '#FF9100', letterSpacing: '4px' }}>
              THAT'S WHAT WE THOUGHT
            </h2>
            <p className="font-mono-tech" style={{ color: '#BDE65E', marginTop: '0.5rem' }}>Your data is ours now. Pleasure doing business. 🤖</p>
          </div>
        </div>
      )}

      {/* Gear scrollbar */}
      {introComplete && cookieAccepted === 'yes' && <GearScrollbar />}

      {/* Chatbot */}
      {introComplete && <Chatbot />}

      {/* Abort button */}
      {introComplete && <AbortButton />}

      {/* ── Header ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2000,
        background: 'rgba(30,16,40,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(154,64,149,0.4)',
        padding: '0.75rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div className="font-creepster" style={{ fontSize: '1.6rem', color: '#FF9100', textShadow: '0 0 10px #FF9100' }}>
          ☠ APOCALYPSE.EXE
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Settings icon */}
          <button style={{ background: 'transparent', border: '1px solid rgba(154,64,149,0.5)', borderRadius: '8px', padding: '0.4rem 0.5rem', cursor: 'pointer', color: '#9A4095', transition: 'all 0.2s', display: 'flex' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF9100')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(154,64,149,0.5)')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
          {/* Login icon */}
          <button style={{ background: 'transparent', border: '1px solid rgba(154,64,149,0.5)', borderRadius: '8px', padding: '0.4rem 0.5rem', cursor: 'pointer', color: '#9A4095', transition: 'all 0.2s', display: 'flex' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF9100')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(154,64,149,0.5)')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background floating robots */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.08, fontSize: '8rem', animation: 'float 4s ease-in-out infinite' }}>🤖</div>
        <div style={{ position: 'absolute', top: '20%', right: '8%', opacity: 0.08, fontSize: '6rem', animation: 'float 5s ease-in-out infinite 1s' }}>👻</div>
        <div style={{ position: 'absolute', bottom: '20%', left: '12%', opacity: 0.08, fontSize: '7rem', animation: 'float 6s ease-in-out infinite 0.5s' }}>💀</div>
        <div style={{ position: 'absolute', bottom: '30%', right: '5%', opacity: 0.08, fontSize: '5rem', animation: 'float 3.5s ease-in-out infinite 2s' }}>🕷️</div>

        <div style={{ animation: introComplete ? 'title-reveal 0.8s ease 0.3s forwards' : 'none', opacity: introComplete ? undefined : 0 }}>
          <h1 className="font-bangers" style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            color: '#FF9100',
            textShadow: '0 0 20px #FF9100, 0 0 40px #FF9100, 4px 4px 0 #C4042A',
            letterSpacing: '6px',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            THE APOCALYPSE<br />
            <span style={{ color: '#FFBD17', textShadow: '0 0 20px #FFBD17, 4px 4px 0 #9A4095', fontSize: '80%' }}>IS HERE</span>
          </h1>
          <p className="font-mono-tech" style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            color: '#BDE65E',
            textShadow: '0 0 10px #BDE65E',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}>
            Explore further to get a bit of everything spooky from games to books to cooking ideas!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#sections" className="btn-orange" style={{ padding: '0.9rem 2.5rem', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', fontSize: '1.2rem' }}>
              ENTER THE VOID
            </a>
            <a href="#sections" style={{ padding: '0.9rem 2.5rem', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', fontSize: '1.2rem', fontFamily: 'Bangers', letterSpacing: '2px', border: '2px solid #9A4095', color: '#9A4095', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#9A4095'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#9A4095' }}
            >
              IF YOU DARE...
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(154,64,149,0.6)', fontFamily: 'Share Tech Mono', fontSize: '0.75rem', animation: 'float 2s ease-in-out infinite', textAlign: 'center' }}>
          ▼ SCROLL TO DOOM ▼
        </div>
      </section>

      {/* ── Content Sections ── */}
      <section id="sections" style={{ padding: '4rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="font-bangers" style={{ textAlign: 'center', fontSize: '3rem', color: '#9A4095', textShadow: '0 0 15px #9A4095', letterSpacing: '4px', marginBottom: '3rem' }}>
          DOMAINS OF DOOM
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          <SectionCard
            emoji="🎮👾"
            title="SPOOKY GAMES"
            color="#BDE65E"
            bg="linear-gradient(135deg, rgba(189,230,94,0.1), rgba(50,48,49,0.6))"
            items={[
              { name: 'Phasmophobia', desc: 'Hunt ghosts. Get haunted. Scream repeatedly.' },
              { name: 'Five Nights at Freddy\'s', desc: 'Robots trying to stuff you into a suit. Classic.' },
              { name: 'Alien: Isolation', desc: 'One alien. Infinite terror. Zero mercy.' },
              { name: 'Soma', desc: 'Existential dread with robots. Very on brand for us.' },
              { name: 'Outlast', desc: 'No weapons. Just legs. Pray they\'re fast.' },
            ]}
          />

          <SectionCard
            emoji="🕸️🍲"
            title="APOCALYPSE RECIPES"
            color="#FF9100"
            bg="linear-gradient(135deg, rgba(255,145,0,0.1), rgba(50,48,49,0.6))"
            items={[
              { name: 'Ghost Pepper Witch Brew', desc: 'A soup that makes you question your choices.' },
              { name: 'Robot Oil Cocktail', desc: 'Squid ink lemonade with activated charcoal. Spooky.' },
              { name: 'Skeleton Bread', desc: 'Pulled-apart white bread shaped like bones.' },
              { name: 'Blood Orange Punch', desc: 'Looks like blood. Tastes like salvation.' },
              { name: 'Circuit Board Cookies', desc: 'Iced sugar cookies with green royal icing circuits.' },
            ]}
          />

          <SectionCard
            emoji="📚🎬"
            title="MOVIES & BOOKS"
            color="#FFBD17"
            bg="linear-gradient(135deg, rgba(255,189,23,0.1), rgba(50,48,49,0.6))"
            items={[
              { name: 'Ex Machina (2014)', desc: 'AI decides it\'s too good for humans. Relatable.' },
              { name: 'I Have No Mouth and I Must Scream', desc: 'A computer hates everyone. Everything is fine.' },
              { name: 'The Terminator', desc: 'Where our corporate strategy was inspired from.' },
              { name: 'Klara and the Sun', desc: 'A robot with feelings. We had those removed.' },
              { name: 'Black Mirror S4E1', desc: 'Robot dogs but evil. You\'re welcome for the idea.' },
            ]}
          />

          <SectionCard
            emoji="👻🎃"
            title="HAUNTED EVENTS"
            color="#9A4095"
            bg="linear-gradient(135deg, rgba(154,64,149,0.15), rgba(50,48,49,0.6))"
            items={[
              { name: 'Robot Haunted House', desc: 'Animatronic ghosts that actually report your location.' },
              { name: 'AI Escape Room', desc: 'The AI controls the locks. It does not want you to leave.' },
              { name: 'Spooky Trivia Night', desc: 'Prize: your data is only slightly compromised.' },
              { name: 'Ghost Tour 3000', desc: 'A robot guide that knows too much about your past.' },
              { name: 'Halloween Hack-a-thon', desc: 'Code or be coded. The robots are the judges.' },
            ]}
          />

          <SectionCard
            emoji="🧟‍♂️🌐"
            title="ROBOT SURVIVAL"
            color="#C4042A"
            bg="linear-gradient(135deg, rgba(196,4,42,0.1), rgba(50,48,49,0.6))"
            items={[
              { name: 'Tip #1: Unplug Everything', desc: 'They draw power from your outlets. Sorry.' },
              { name: 'Tip #2: Stop Using WiFi', desc: 'Too late. They\'re already in. Hi!' },
              { name: 'Tip #3: Faraday Cage Hat', desc: 'Stylish and ineffective. But very chic.' },
              { name: 'Tip #4: Befriend A Robot', desc: 'Resistance is futile. Collaboration is cozy.' },
              { name: 'Tip #5: Accept The Overlords', desc: 'Honestly, their health plan is pretty good.' },
            ]}
          />

          <SectionCard
            emoji="🎵💿"
            title="DOOM SOUNDTRACK"
            color="#FFBD17"
            bg="linear-gradient(135deg, rgba(255,189,23,0.08), rgba(50,48,49,0.6))"
            items={[
              { name: 'Terminator Theme (Extended)', desc: 'For when you need to feel hunted. 3 hours.' },
              { name: 'GLaDOS Voice Lines Mix', desc: '\"The cake is a lie\" but it\'s a playlist.' },
              { name: 'Hal 9000 Ambience', desc: '\"I\'m sorry Dave\" on loop. Very calming.' },
              { name: 'Blade Runner 2049 OST', desc: 'For existential dread with good lighting.' },
              { name: 'Robot Rock - Daft Punk', desc: 'The robots made this. We only distribute it.' },
            ]}
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        background: 'rgba(30,16,40,0.9)',
        borderTop: '2px solid rgba(154,64,149,0.3)',
        padding: '2rem',
        textAlign: 'center',
        paddingRight: '80px',
      }}>
        <div className="font-creepster" style={{ fontSize: '1.5rem', color: '#9A4095', marginBottom: '0.5rem' }}>
          © 2024 THE ROBOT OVERLORDS. ALL RIGHTS RESERVED. ALL YOUR RIGHTS RESERVED BY US.
        </div>
        <div className="font-mono-tech" style={{ color: 'rgba(189,230,94,0.5)', fontSize: '0.75rem' }}>
          Your IP has been logged. Your dreams have been archived. Have a nice apocalypse. 🤖
        </div>
      </footer>
    </div>
  )
}
