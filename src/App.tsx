/**
 * Teacher Toolkit - Protected Web App
 * Motor AppShield integrado com proteção multicamada contra clonagem e inspeção de código.
 */

import { useState, useEffect, useRef } from 'react';
import './pageStyles.css';
import { ShieldEngine, DEFAULT_SHIELD_CONFIG, ShieldOptions } from './utils/shieldEngine';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Sliders, 
  X, 
  ExternalLink, 
  CopyCheck, 
  AlertTriangle,
  Code
} from 'lucide-react';

interface LightboxState {
  src: string;
  caption: string;
}

export default function App() {
  const [shieldConfig, setShieldConfig] = useState<ShieldOptions>(DEFAULT_SHIELD_CONFIG);
  const [shieldNotice, setShieldNotice] = useState<string | null>(null);
  const [showShieldPanel, setShowShieldPanel] = useState<boolean>(false);
  const [isShieldMinimized, setIsShieldMinimized] = useState<boolean>(false);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const shieldEngineRef = useRef<ShieldEngine | null>(null);
  const noticeTimerRef = useRef<number | null>(null);

  // Exibe notificação temporária quando uma tentativa de clonagem/inspeção for bloqueada
  const handleViolation = (_type: string, detail: string) => {
    setShieldNotice(detail);
    if (noticeTimerRef.current) {
      clearTimeout(noticeTimerRef.current);
    }
    noticeTimerRef.current = window.setTimeout(() => {
      setShieldNotice(null);
    }, 3800);
  };

  // Inicializa o motor de proteção Shield
  useEffect(() => {
    const engine = new ShieldEngine(shieldConfig, handleViolation);
    engine.init();
    shieldEngineRef.current = engine;

    return () => {
      engine.destroy();
    };
  }, []);

  // Atualiza regras se o usuário alterar no painel de controle
  useEffect(() => {
    if (shieldEngineRef.current) {
      shieldEngineRef.current.updateConfig(shieldConfig);
    }
  }, [shieldConfig]);

  // Tecla Escape fecha o Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightbox) {
        setLightbox(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  // Trava scroll ao abrir lightbox
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [lightbox]);

  const openLightbox = (src: string, caption: string) => {
    setLightbox({ src, caption });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const toggleConfig = (key: keyof ShieldOptions) => {
    setShieldConfig((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={`min-h-screen ${shieldConfig.blockSelection ? 'app-shield-protected' : ''}`}>
      
      {/* ============================================================== */}
      {/* 1. HERO SECTION                                                */}
      {/* ============================================================== */}
      <header className="hero-section">
        <div className="hero-wrap">
          <div className="hero-badges">
            <span className="badge-pill">★ 560+ printable pages</span>
            <span className="badge-pill">✓ 6 complete PDF kits</span>
            <span className="badge-pill">⚡ Instant digital access</span>
          </div>

          <h1 className="hero-h1">Stop Planning Preschool Activities From Scratch!</h1>

          <p className="hero-sub">
            Six ready-to-print activity kits to help you manage classroom transitions, keep little hands busy and make learning easier — without hours of preparation.
          </p>

          <div className="hero-price-tag">
            <span className="hero-price-amount">$9.90 USD</span>
            <span className="hero-price-sub">· ONE-TIME · No subscription</span>
          </div>

          <div className="hero-cta">
            <a 
              href="https://pay.hotmart.com/M106630378O?checkoutMode=10&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=&sck=" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-pink"
            >
              DOWNLOAD ALL 6 KITS — $9.90
            </a>
          </div>

          <p className="hero-trust">
            Digital PDF files · Print at home or school · No physical products shipped
          </p>

          <div className="hero-media">
            <img 
              src="https://preschool-playprint-bundle.lovable.app/images/hero/teacher-toolkit-tabletop.webp" 
              alt="Complete Preschool Teacher Toolkit printed booklets spread on classroom table" 
              width="1200" 
              height="750" 
              loading="eager"
              draggable={false}
            />
            <div className="hero-media-caption">
              Five featured booklets shown. The Routine & Behavior Pack is also included.
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. BENEFITS SECTION                                            */}
      {/* ============================================================== */}
      <section className="landing-section alt-bg">
        <div className="section-wrap">
          <div className="section-header">
            <div className="section-eyebrow">Made for real classroom moments</div>
            <h2 className="section-title">Spend less time preparing. More time teaching.</h2>
            <p className="section-desc">Designed by educators to turn chaos into calm, meaningful early childhood moments.</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3 className="benefit-title">Get their attention</h3>
              <p className="benefit-text">Fun listening prompts and quick transitions for busy preschool classrooms that redirect wandering minds without raising your voice.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⏱️</div>
              <h3 className="benefit-title">Fill the gaps</h3>
              <p className="benefit-text">Have purposeful, low-prep activities ready when your lesson ends early or unexpected schedule delays pop up.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🧩</div>
              <h3 className="benefit-title">Support different learners</h3>
              <p className="benefit-text">Visual routines, choices and printable practice for ages 2–7 to ensure every child feels included, calm, and ready to learn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. WHAT'S INCLUDED                                             */}
      {/* ============================================================== */}
      <section className="landing-section">
        <div className="section-wrap">
          <div className="section-header">
            <div className="section-eyebrow">Everything inside the bundle</div>
            <h2 className="section-title">Everything you get for $9.90</h2>
            <p className="section-desc">All six kits are included in one purchase. Choose the pages you need, download and print.</p>
          </div>

          <div className="kits-grid">
            {/* Kit 1 */}
            <div className="kit-card">
              <div className="kit-img-box">
                <img 
                  src="https://preschool-playprint-bundle.lovable.app/images/mockups/01_attention_rescue.svg" 
                  alt="Classroom Attention Rescue Kit cover mockup" 
                  loading="lazy" 
                  draggable={false}
                />
              </div>
              <div className="kit-body">
                <div className="kit-tag-row">
                  <span className="kit-pages-badge">50 Pages</span>
                </div>
                <h3 className="kit-title">Classroom Attention Rescue Kit</h3>
                <p className="kit-desc">Attention-getters, listening games, call-and-response and playful prompts for clean-up, line-up and transitions.</p>
              </div>
            </div>

            {/* Kit 2 */}
            <div className="kit-card">
              <div className="kit-img-box">
                <img 
                  src="https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/00-capa-classroom-rescue-kit-full.webp" 
                  alt="Classroom Rescue Kit cover" 
                  loading="lazy" 
                  draggable={false}
                />
              </div>
              <div className="kit-body">
                <div className="kit-tag-row">
                  <span className="kit-pages-badge">72 Pages</span>
                </div>
                <h3 className="kit-title">Classroom Rescue Kit</h3>
                <p className="kit-desc">Purposeful, low-prep activities for movement, group time, coordination and those unexpected gaps in the school day.</p>
              </div>
            </div>

            {/* Kit 3 */}
            <div className="kit-card">
              <div className="kit-img-box">
                <img 
                  src="https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-cover-full.webp" 
                  alt="Preschool Routine and Behavior Pack cover" 
                  loading="lazy" 
                  draggable={false}
                />
              </div>
              <div className="kit-body">
                <div className="kit-tag-row">
                  <span className="kit-pages-badge">50 Pages</span>
                </div>
                <h3 className="kit-title">Preschool Routine & Behavior Pack</h3>
                <p className="kit-desc">Visual schedules, simple classroom expectations and routine supports to help children anticipate what comes next.</p>
              </div>
            </div>

            {/* Kit 4 */}
            <div className="kit-card">
              <div className="kit-img-box">
                <img 
                  src="https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/00-capa-preschool-mega-activity-bundle-full.webp" 
                  alt="Preschool Mega Activity Bundle cover" 
                  loading="lazy" 
                  draggable={false}
                />
              </div>
              <div className="kit-body">
                <div className="kit-tag-row">
                  <span className="kit-pages-badge">170+ Pages</span>
                </div>
                <h3 className="kit-title">Preschool Mega Activity Bundle</h3>
                <p className="kit-desc">Printable learning for letters, early sounds, numbers, shapes, matching, tracing and fine motor development.</p>
              </div>
            </div>

            {/* Kit 5 */}
            <div className="kit-card">
              <div className="kit-img-box">
                <img 
                  src="https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/00-capa-screen-free-back-to-school-full.webp" 
                  alt="Screen-Free Back-to-School Mega Kit cover" 
                  loading="lazy" 
                  draggable={false}
                />
              </div>
              <div className="kit-body">
                <div className="kit-tag-row">
                  <span className="kit-pages-badge">100 Pages</span>
                </div>
                <h3 className="kit-title">Screen-Free Back-to-School Mega Kit</h3>
                <p className="kit-desc">Hands-on printables for tracing, matching, early literacy, school themes and everyday learning through play.</p>
              </div>
            </div>

            {/* Kit 6 */}
            <div className="kit-card">
              <div className="kit-img-box">
                <img 
                  src="https://preschool-playprint-bundle.lovable.app/images/mockups/02_independence_kit.svg" 
                  alt="My Everyday Independence Kit cover mockup" 
                  loading="lazy" 
                  draggable={false}
                />
              </div>
              <div className="kit-body">
                <div className="kit-tag-row">
                  <span className="kit-pages-badge">120 Pages</span>
                </div>
                <h3 className="kit-title">My Everyday Independence Kit</h3>
                <p className="kit-desc">Adaptable visual choices and supports for needs, feelings, self-care and everyday independence, including children who benefit from extra communication support.</p>
              </div>
            </div>
          </div>

          <div className="kits-note">
            <strong>PDF downloads only.</strong> The hero photo features five kits; the Routine & Behavior Pack is included as the sixth.
          </div>

          <div style={{ textAlign: 'center' }}>
            <a 
              href="https://pay.hotmart.com/M106630378O?checkoutMode=10&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=&sck=" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-pink"
            >
              GET THE COMPLETE TOOLKIT — $9.90
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. GALLERY WITH CONTINUOUS MARQUEE CONVEYOR BELT               */}
      {/* ============================================================== */}
      <section className="landing-section alt-bg">
        <div className="section-wrap">
          <div className="section-header">
            <div className="section-eyebrow">Real pages from the printable kits</div>
            <h2 className="section-title">Look inside before you buy.</h2>
            <p className="section-desc">Real, ready-to-print activities — not just pretty covers. See the exact kinds of pages you can use in your classroom.</p>
            
            <div className="gallery-badges">
              <span className="badge-pill">🔍 21 real sample pages</span>
              <span className="badge-pill">🖨️ Print what you need</span>
              <span className="badge-pill">👆 Tap to enlarge</span>
            </div>
          </div>

          {/* TWO CONTINUOUS INFINITE MARQUEE ROWS */}
          <div className="gallery-conveyor" aria-label="Interactive sample pages conveyor">
            
            {/* ROW 1: scrolls from LEFT to RIGHT */}
            <div className="marquee-row" role="region" aria-label="Sample pages row 1">
              <div className="marquee-track marquee-track-ltr">
                {/* Group 1 */}
                <div className="marquee-group">
                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-10-thumb.webp", "Ready, Set, Eyes! · p.10 (Attention Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-10-thumb.webp" alt="Ready, Set, Eyes! sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Ready, Set, Eyes! · p.10</span>
                      <span className="gallery-kit-name">Attention Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/01-pagina-08-find-the-blue-objects-thumb.webp", "Find the Blue Objects (Mega Activity Bundle)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/01-pagina-08-find-the-blue-objects-thumb.webp" alt="Find the Blue Objects sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Find the Blue Objects</span>
                      <span className="gallery-kit-name">Mega Activity Bundle</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/07-pagina-23-number-delivery-thumb.webp", "Number Delivery (Classroom Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/07-pagina-23-number-delivery-thumb.webp" alt="Number Delivery sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Number Delivery</span>
                      <span className="gallery-kit-name">Classroom Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/02-pagina-15-match-the-shadows-thumb.webp", "Match the Shadows (Screen-Free Mega Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/02-pagina-15-match-the-shadows-thumb.webp" alt="Match the Shadows sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Match the Shadows</span>
                      <span className="gallery-kit-name">Screen-Free Mega Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-visual-cards-thumb.webp", "Visual Cards (Preschool Routine & Behavior)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-visual-cards-thumb.webp" alt="Visual Cards sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Visual Cards</span>
                      <span className="gallery-kit-name">Routine & Behavior</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-47-thumb.webp", "Print & Prep Guide · p.47 (Attention Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-47-thumb.webp" alt="Print & Prep Guide sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Print & Prep Guide · p.47</span>
                      <span className="gallery-kit-name">Attention Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/03-pagina-119-logic-review-thumb.webp", "Logic Review (Mega Activity Bundle)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/03-pagina-119-logic-review-thumb.webp" alt="Logic Review sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Logic Review</span>
                      <span className="gallery-kit-name">Mega Activity Bundle</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/01-pagina-44-build-a-puppet-pieces-thumb.webp", "Build a Puppet (Classroom Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/01-pagina-44-build-a-puppet-pieces-thumb.webp" alt="Build a Puppet sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Build a Puppet</span>
                      <span className="gallery-kit-name">Classroom Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/01-pagina-14-trace-the-lines-thumb.webp", "Trace the Lines (Screen-Free Mega Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/01-pagina-14-trace-the-lines-thumb.webp" alt="Trace the Lines sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Trace the Lines</span>
                      <span className="gallery-kit-name">Screen-Free Mega Kit</span>
                    </div>
                  </button>
                </div>

                {/* Duplicated Group for Infinite Seamless Scroll */}
                <div className="marquee-group" aria-hidden="true">
                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-10-thumb.webp", "Ready, Set, Eyes! · p.10 (Attention Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-10-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Ready, Set, Eyes! · p.10</span>
                      <span className="gallery-kit-name">Attention Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/01-pagina-08-find-the-blue-objects-thumb.webp", "Find the Blue Objects (Mega Activity Bundle)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/01-pagina-08-find-the-blue-objects-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Find the Blue Objects</span>
                      <span className="gallery-kit-name">Mega Activity Bundle</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/07-pagina-23-number-delivery-thumb.webp", "Number Delivery (Classroom Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/07-pagina-23-number-delivery-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Number Delivery</span>
                      <span className="gallery-kit-name">Classroom Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/02-pagina-15-match-the-shadows-thumb.webp", "Match the Shadows (Screen-Free Mega Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/02-pagina-15-match-the-shadows-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Match the Shadows</span>
                      <span className="gallery-kit-name">Screen-Free Mega Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-visual-cards-thumb.webp", "Visual Cards (Preschool Routine & Behavior)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-visual-cards-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Visual Cards</span>
                      <span className="gallery-kit-name">Routine & Behavior</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-47-thumb.webp", "Print & Prep Guide · p.47 (Attention Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-47-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Print & Prep Guide · p.47</span>
                      <span className="gallery-kit-name">Attention Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/03-pagina-119-logic-review-thumb.webp", "Logic Review (Mega Activity Bundle)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/03-pagina-119-logic-review-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Logic Review</span>
                      <span className="gallery-kit-name">Mega Activity Bundle</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/01-pagina-44-build-a-puppet-pieces-thumb.webp", "Build a Puppet (Classroom Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/01-pagina-44-build-a-puppet-pieces-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Build a Puppet</span>
                      <span className="gallery-kit-name">Classroom Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/01-pagina-14-trace-the-lines-thumb.webp", "Trace the Lines (Screen-Free Mega Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/01-pagina-14-trace-the-lines-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Trace the Lines</span>
                      <span className="gallery-kit-name">Screen-Free Mega Kit</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* ROW 2: scrolls from RIGHT to LEFT */}
            <div className="marquee-row" role="region" aria-label="Sample pages row 2">
              <div className="marquee-track marquee-track-rtl">
                {/* Group 1 */}
                <div className="marquee-group">
                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-school-day-thumb.webp", "School Day (Preschool Routine & Behavior)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-school-day-thumb.webp" alt="School Day sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">School Day</span>
                      <span className="gallery-kit-name">Routine & Behavior</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-46-thumb.webp", "Age Adaptation Guide · p.46 (Attention Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-46-thumb.webp" alt="Age Adaptation Guide sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Age Adaptation · p.46</span>
                      <span className="gallery-kit-name">Attention Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/06-pagina-60-shape-review-thumb.webp", "Shape Review (Mega Activity Bundle)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/06-pagina-60-shape-review-thumb.webp" alt="Shape Review sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Shape Review</span>
                      <span className="gallery-kit-name">Mega Activity Bundle</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/06-pagina-20-describe-and-build-thumb.webp", "Describe and Build (Classroom Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/06-pagina-20-describe-and-build-thumb.webp" alt="Describe and Build sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Describe and Build</span>
                      <span className="gallery-kit-name">Classroom Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/06-pagina-38-emotions-at-school-thumb.webp", "Emotions at School (Screen-Free Mega Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/06-pagina-38-emotions-at-school-thumb.webp" alt="Emotions at School sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Emotions at School</span>
                      <span className="gallery-kit-name">Screen-Free Mega Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-morning-thumb.webp", "Morning Routine (Preschool Routine & Behavior)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-morning-thumb.webp" alt="Morning Routine sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Morning Routine</span>
                      <span className="gallery-kit-name">Routine & Behavior</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-23-thumb.webp", "Quiet Cactus & Sleepy Sloth · p.23 (Attention Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-23-thumb.webp" alt="Quiet Cactus & Sleepy Sloth sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Quiet Cactus · p.23</span>
                      <span className="gallery-kit-name">Attention Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/02-pagina-24-beginning-sounds-thumb.webp", "Beginning Sounds (Mega Activity Bundle)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/02-pagina-24-beginning-sounds-thumb.webp" alt="Beginning Sounds sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Beginning Sounds</span>
                      <span className="gallery-kit-name">Mega Activity Bundle</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/08-pagina-32-object-sorting-cards-thumb.webp", "Object Sorting (Classroom Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/08-pagina-32-object-sorting-cards-thumb.webp" alt="Object Sorting sample page" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Object Sorting</span>
                      <span className="gallery-kit-name">Classroom Rescue Kit</span>
                    </div>
                  </button>
                </div>

                {/* Duplicated Group for Infinite Seamless Scroll */}
                <div className="marquee-group" aria-hidden="true">
                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-school-day-thumb.webp", "School Day (Preschool Routine & Behavior)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-school-day-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">School Day</span>
                      <span className="gallery-kit-name">Routine & Behavior</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-46-thumb.webp", "Age Adaptation Guide · p.46 (Attention Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-46-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Age Adaptation · p.46</span>
                      <span className="gallery-kit-name">Attention Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/06-pagina-60-shape-review-thumb.webp", "Shape Review (Mega Activity Bundle)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/06-pagina-60-shape-review-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Shape Review</span>
                      <span className="gallery-kit-name">Mega Activity Bundle</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/06-pagina-20-describe-and-build-thumb.webp", "Describe and Build (Classroom Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/06-pagina-20-describe-and-build-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Describe and Build</span>
                      <span className="gallery-kit-name">Classroom Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/06-pagina-38-emotions-at-school-thumb.webp", "Emotions at School (Screen-Free Mega Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/screen-free/06-pagina-38-emotions-at-school-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Emotions at School</span>
                      <span className="gallery-kit-name">Screen-Free Mega Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-morning-thumb.webp", "Morning Routine (Preschool Routine & Behavior)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/playprint/behavior-morning-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Morning Routine</span>
                      <span className="gallery-kit-name">Routine & Behavior</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-23-thumb.webp", "Quiet Cactus & Sleepy Sloth · p.23 (Attention Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/attention/attention-page-23-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Quiet Cactus · p.23</span>
                      <span className="gallery-kit-name">Attention Rescue Kit</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/02-pagina-24-beginning-sounds-thumb.webp", "Beginning Sounds (Mega Activity Bundle)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/mega-activities/02-pagina-24-beginning-sounds-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Beginning Sounds</span>
                      <span className="gallery-kit-name">Mega Activity Bundle</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    tabIndex={-1}
                    className="gallery-item"
                    onClick={() => openLightbox("https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/08-pagina-32-object-sorting-cards-thumb.webp", "Object Sorting (Classroom Rescue Kit)")}
                  >
                    <div className="gallery-thumb-wrap">
                      <img src="https://preschool-playprint-bundle.lovable.app/images/kits/classroom-rescue/08-pagina-32-object-sorting-cards-thumb.webp" alt="" loading="lazy" draggable={false} />
                      <span className="gallery-zoom-badge">🔍 Tap to see full page</span>
                    </div>
                    <div className="gallery-caption">
                      <span className="gallery-page-title">Object Sorting</span>
                      <span className="gallery-kit-name">Classroom Rescue Kit</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <p className="gallery-footer-note">
            These are real preview pages from five of the six included kits. The complete purchase includes six downloadable PDF kits; no printed books are shipped.
          </p>

          <div className="gallery-cta-block">
            <a 
              href="https://pay.hotmart.com/M106630378O?checkoutMode=10&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=&sck=" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-pink"
            >
              GET ALL 6 KITS — ONLY $9.90
            </a>
            <div className="gallery-guarantee-line">
              Instant digital access · One-time payment · 7-day guarantee
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PRICE BLOCK                                                 */}
      {/* ============================================================== */}
      <section className="landing-section">
        <div className="section-wrap">
          <div className="price-box">
            <div className="section-eyebrow">Complete Teacher Bundle</div>
            <h2 className="price-box-title">Six practical preschool kits. One small price.</h2>
            
            <div className="price-big-row">
              <div className="price-big-number">$9.90</div>
              <div className="price-big-sub">USD · Digital download · 560+ printable pages</div>
            </div>

            <ul className="price-bullets">
              <li>All 6 printable PDF kits</li>
              <li>Ready-to-use preschool activities</li>
              <li>Print the pages you need</li>
              <li>Instant access after payment approval</li>
            </ul>

            <div>
              <a 
                href="https://pay.hotmart.com/M106630378O?checkoutMode=10&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=&sck=" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-pink"
              >
                YES — GET ALL 6 KITS FOR $9.90
              </a>
            </div>

            <div className="price-box-trust">
              🔒 Secure Hotmart payment · 7-day refund guarantee
            </div>

            <p className="price-guarantee-text">
              If the toolkit is not right for you, request a refund within 7 days according to Hotmart's policy.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. FAQ ACCORDION                                               */}
      {/* ============================================================== */}
      <section className="landing-section alt-bg">
        <div className="section-wrap">
          <div className="section-header">
            <div className="section-eyebrow">Got questions?</div>
            <h2 className="section-title">Quick questions, clear answers.</h2>
          </div>

          <div className="faq-container">
            <details className="faq-item" open>
              <summary className="faq-summary">What exactly will I receive?</summary>
              <div className="faq-content">
                Six digital PDF kits with more than 560 printable pages in total, covering attention, classroom activities, routines, early learning, screen-free activities and independence. Optional products at checkout are separate and are not included in this offer.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-summary">Are these printed books mailed to me?</summary>
              <div className="faq-content">
                No. These are DIGITAL PDF files, not physical books. After payment approval, download the files and print the pages you want at home or at school. Some activities need ordinary classroom materials.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-summary">Is it a subscription? What currency will I pay in?</summary>
              <div className="faq-content">
                No subscription. The six-kit collection costs US$9.90 as a one-time payment. Hotmart will show any available local currency, applicable taxes and the final total before you pay.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-summary">Can I request a refund?</summary>
              <div className="faq-content">
                Yes. Purchases are protected by a 7-day guarantee according to Hotmart's refund policy.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. FINAL CTA                                                   */}
      {/* ============================================================== */}
      <section className="final-cta-section">
        <div className="section-wrap">
          <div className="section-header" style={{ marginBottom: '1.5rem' }}>
            <h2 className="section-title">Make tomorrow's classroom a little easier.</h2>
            <p className="final-cta-sub">Download the six-kit printable collection for US$9.90.</p>
          </div>

          <div>
            <a 
              href="https://pay.hotmart.com/M106630378O?checkoutMode=10&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=&sck=" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-pink"
            >
              GET INSTANT PDF ACCESS — $9.90
            </a>
          </div>

          <p className="final-trust-line">
            One-time payment · 7-day guarantee · No physical books
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. STICKY BOTTOM BAR                                           */}
      {/* ============================================================== */}
      <aside className="sticky-bar" aria-label="Quick checkout action">
        <div className="sticky-bar-info">
          <span className="sticky-bar-title">Six PDF kits</span>
          <span className="sticky-bar-price">$9.90 USD · One-time</span>
        </div>
        <a 
          href="https://pay.hotmart.com/M106630378O?checkoutMode=10&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=&sck=" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-pink"
        >
          DOWNLOAD NOW
        </a>
      </aside>

      {/* ============================================================== */}
      {/* 9. FOOTER                                                      */}
      {/* ============================================================== */}
      <footer className="landing-footer">
        <div className="section-wrap">
          <p>© 2026 Complete Preschool Teacher Toolkit. Digital PDF product. No physical items shipped.</p>
          <p className="landing-footer-policy">If the toolkit is not right for you, request a refund within 7 days according to Hotmart's policy.</p>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* LIGHTBOX MODAL                                                 */}
      {/* ============================================================== */}
      {lightbox && (
        <div 
          className="lightbox-backdrop active" 
          role="dialog" 
          aria-modal="true" 
          onClick={closeLightbox}
        >
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="lightbox-close-btn" 
              onClick={closeLightbox} 
              aria-label="Close preview"
            >
              ×
            </button>
            <img 
              src={lightbox.src} 
              alt="Preview page" 
              className="lightbox-img" 
              draggable={false}
            />
            <div className="lightbox-caption">{lightbox.caption}</div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIOLATION TOAST (Alerta quando tentam inspecionar/copiar)      */}
      {/* ============================================================== */}
      {shieldNotice && (
        <div className="fixed top-5 right-5 z-[99999] max-w-sm bg-slate-900/95 text-white p-4 rounded-xl shadow-2xl border border-pink-500/40 backdrop-blur-md animate-fade-in flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-0.5">
              Shield Ativo: Ação Bloqueada
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              {shieldNotice}
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => setShieldNotice(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* SHIELD CONTROL BADGE (Discreto / Flutuante no canto inferior)   */}
      {/* ============================================================== */}
      {!isShieldMinimized ? (
        <div className="fixed bottom-24 left-4 z-[9000] hidden sm:block">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowShieldPanel(!showShieldPanel)}
              className="bg-slate-900/90 hover:bg-slate-900 text-white px-3.5 py-2 rounded-full shadow-lg border border-slate-700/60 backdrop-blur-md flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-105"
              title="Gerenciador do Shield Anti-Clonagem"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>AppShield Ativo</span>
            </button>

            {/* Shield Config Flyout Panel */}
            {showShieldPanel && (
              <div className="absolute bottom-11 left-0 w-80 bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-xl animate-fade-in text-xs z-[9001]">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-sm">Status de Proteção</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setIsShieldMinimized(true)}
                      className="text-slate-400 hover:text-slate-200 px-1.5 py-0.5 rounded text-[10px] bg-slate-800"
                      title="Ocultar para visitantes normais"
                    >
                      Ocultar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowShieldPanel(false)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-3.5">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                    <div className="flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 text-pink-400" />
                      <div>
                        <div className="font-medium text-slate-200">View Source (Ctrl+U)</div>
                        <div className="text-[10px] text-slate-400">Código original 100% invisível</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                      IMUNIZADO
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-pink-400" />
                      <div>
                        <div className="font-medium text-slate-200">Botão Direito</div>
                        <div className="text-[10px] text-slate-400">Menu de contexto bloqueado</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleConfig('blockRightClick')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        shieldConfig.blockRightClick
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {shieldConfig.blockRightClick ? 'LIGADO' : 'DESLIGADO'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-3.5 h-3.5 text-pink-400" />
                      <div>
                        <div className="font-medium text-slate-200">F12 & Inspecionar</div>
                        <div className="text-[10px] text-slate-400">Atalhos dev desativados</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleConfig('blockShortcuts')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        shieldConfig.blockShortcuts
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {shieldConfig.blockShortcuts ? 'LIGADO' : 'DESLIGADO'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                    <div className="flex items-center gap-2">
                      <CopyCheck className="w-3.5 h-3.5 text-pink-400" />
                      <div>
                        <div className="font-medium text-slate-200">Anti-Seleção / Cópia</div>
                        <div className="text-[10px] text-slate-400">Impede cópia de texto e fotos</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleConfig('blockSelection')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        shieldConfig.blockSelection
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {shieldConfig.blockSelection ? 'LIGADO' : 'DESLIGADO'}
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-pink-950/40 border border-pink-500/30 text-[10px] text-pink-200 leading-normal">
                  💡 <strong>Como testar:</strong> Tente clicar com botão direito ou pressionar F12/Ctrl+U nesta tela. Você verá o bloqueio em ação!
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Botão mini para reabrir o controle se o dono quiser */
        <button
          type="button"
          onClick={() => {
            setIsShieldMinimized(false);
            setShowShieldPanel(true);
          }}
          className="fixed bottom-24 left-2 z-[9000] opacity-40 hover:opacity-100 transition-opacity bg-slate-900/80 text-white p-2 rounded-full border border-slate-700 shadow"
          title="Reabrir Painel Shield"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      )}

    </div>
  );
}
