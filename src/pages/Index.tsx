import { useEffect, useRef } from "react";
import "./Index.css";

const Index = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };
    document.addEventListener("mousemove", onMouseMove);

    function animateRing() {
      rx += (mx - rx - 16) * 0.12;
      ry += (my - ry - 16) * 0.12;
      ring!.style.transform = `translate(${rx}px, ${ry}px)`;
      animId = requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverEls = document.querySelectorAll("a, button, .faq-q, .voice-item, .sector-tile");
    const enter = () => ring.classList.add("hovered");
    const leave = () => ring.classList.remove("hovered");
    hoverEls.forEach(el => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    // Reveal on scroll
    const reveals = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    reveals.forEach(el => obs.observe(el));

    // Counter animation
    function animateCounter(el: Element, target: number, format: string) {
      const duration = 1800;
      const start = performance.now();
      function update(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * ease);
        el.textContent = format === "comma" ? current.toLocaleString() : current.toString();
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
    const counterObs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.target || "0");
          const format = el.dataset.format || "";
          animateCounter(el, target, format);
          counterObs.unobserve(el);
        }
      }),
      { threshold: 0.3 }
    );
    document.querySelectorAll(".counter").forEach(el => counterObs.observe(el));

    // FAQ
    document.querySelectorAll(".faq-q").forEach(q => {
      (q as HTMLElement).style.cursor = "none";
      q.addEventListener("click", () => {
        const item = q.parentElement!;
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(i => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });

    // Pipeline bar animation
    const pipelineCard = document.querySelector(".pipeline-card");
    if (pipelineCard) {
      document.querySelectorAll(".p-bar").forEach(b => (b as HTMLElement).style.width = "0%");
      const pipelineObs = new IntersectionObserver(
        (entries) => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".p-bar").forEach(bar => {
              const w = (bar as HTMLElement).dataset.width;
              setTimeout(() => { (bar as HTMLElement).style.width = w + "%"; }, 300);
            });
            pipelineObs.unobserve(e.target);
          }
        }),
        { threshold: 0.3 }
      );
      pipelineObs.observe(pipelineCard);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
      hoverEls.forEach(el => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      obs.disconnect();
      counterObs.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">
          <div className="nav-aa">AA</div>
          <div className="nav-brand">Attract Acquisition<span>Brand Infrastructure</span></div>
        </a>
        <ul className="nav-links">
          <li><a href="#how">How It Works</a></li>
          <li><a href="#sectors">Who We Serve</a></li>
          <li><a href="#results">Results</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <a href="#cta" className="nav-cta">Book a Call →</a>
      </nav>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner" id="tickerInner">
          <span className="ticker-item">Proof-first model — we earn results before we charge management fees <span className="ticker-dot"></span></span>
          <span className="ticker-item">100+ Proof Sprints delivered <span className="ticker-dot"></span></span>
          <span className="ticker-item">4.5★ Trustpilot rating <span className="ticker-dot"></span></span>
          <span className="ticker-item">14 days to first results <span className="ticker-dot"></span></span>
          <span className="ticker-item">Built for service businesses that run the real economy <span className="ticker-dot"></span></span>
          <span className="ticker-item">Brand = Proof × Volume × Consistency <span className="ticker-dot"></span></span>
          <span className="ticker-item">Proof-first model — we earn results before we charge management fees <span className="ticker-dot"></span></span>
          <span className="ticker-item">100+ Proof Sprints delivered <span className="ticker-dot"></span></span>
          <span className="ticker-item">4.5★ Trustpilot rating <span className="ticker-dot"></span></span>
          <span className="ticker-item">14 days to first results <span className="ticker-dot"></span></span>
          <span className="ticker-item">Built for service businesses that run the real economy <span className="ticker-dot"></span></span>
          <span className="ticker-item">Brand = Proof × Volume × Consistency <span className="ticker-dot"></span></span>
        </div>
      </div>

      {/* HERO */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="hero">
          <div className="hero-glow"></div>
          <div className="hero-glow2"></div>
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-text">Brand Infrastructure for Service Businesses</span>
            </div>
            <h1>
              Your work is<br />
              world-class.<span className="line2"><em>Nobody</em><br />knows it yet.</span>
            </h1>
            <p className="hero-sub">
              We install the brand infrastructure that turns your service business from invisible to the most trusted name in your local market — consistently, measurably, and without you becoming a content creator.
            </p>
            <div className="hero-ctas">
              <a href="#cta" className="btn-hero">Book a Free Call →</a>
              <a href="#how" className="btn-ghost">See How It Works</a>
            </div>
            <div className="hero-trust">
              <div className="trust-item"><span className="tval">100+</span>&nbsp;Proof Sprints</div>
              <div className="trust-sep"></div>
              <div className="trust-item"><span className="tval">4.5★</span>&nbsp;Trustpilot</div>
              <div className="trust-sep"></div>
              <div className="trust-item"><span className="tval">R0</span>&nbsp;Mgmt fee trial</div>
              <div className="trust-sep"></div>
              <div className="trust-item"><span className="tval">14d</span>&nbsp;To first results</div>
            </div>
          </div>
          <div className="hero-right">
            <div className="pipeline-card">
              <div className="pipeline-header">
                <span className="pipeline-title">Live Client Pipeline — Cape Town Detailer</span>
                <span className="live-badge"><span className="live-dot"></span>Live</span>
              </div>
              <div className="pipeline-rows">
                <div className="p-row">
                  <span className="p-label"><span className="p-icon">👁</span>Profile Visits</span>
                  <div className="p-bar-wrap"><div className="p-bar" style={{ width: "100%" }} data-width="100"></div></div>
                  <span className="p-num"><span className="counter" data-target="32637">0</span></span>
                </div>
                <div className="p-row">
                  <span className="p-label"><span className="p-icon">✓</span>Qualified Followers</span>
                  <div className="p-bar-wrap"><div className="p-bar" style={{ width: "70%" }} data-width="70"></div></div>
                  <span className="p-num"><span className="counter" data-target="2292">0</span></span>
                </div>
                <div className="p-row">
                  <span className="p-label"><span className="p-icon">💬</span>DMs Started</span>
                  <div className="p-bar-wrap"><div className="p-bar" style={{ width: "48%" }} data-width="48"></div></div>
                  <span className="p-num"><span className="counter" data-target="1576">0</span></span>
                </div>
                <div className="p-row">
                  <span className="p-label"><span className="p-icon">📅</span>Appointments Booked</span>
                  <div className="p-bar-wrap"><div className="p-bar" style={{ width: "28%" }} data-width="28"></div></div>
                  <span className="p-num"><span className="counter" data-target="134">0</span></span>
                </div>
                <div className="p-row">
                  <span className="p-label"><span className="p-icon">💰</span>Cash Collected</span>
                  <div className="p-bar-wrap"><div className="p-bar" style={{ width: "22%" }} data-width="22"></div></div>
                  <span className="p-num" style={{ fontSize: 11 }}>R<span className="counter" data-target="241670" data-format="comma">0</span></span>
                </div>
              </div>
              <div className="pipeline-footer">
                <div className="pf-item">
                  <span className="pf-val">81%</span>
                  <span className="pf-label">Show-up rate</span>
                </div>
                <div className="pf-item">
                  <span className="pf-val">14.15%</span>
                  <span className="pf-label">Profile conversion</span>
                </div>
              </div>
              <div className="pipeline-note">AA Client Portal · Real data from a running engine · Updated daily</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROBLEM SECTION */}
      <section className="section" id="problem">
        <div className="container">
          <div className="problem-grid">
            <div className="reveal">
              <span className="label">Sound Familiar?</span>
              <div className="voice-stack">
                <div className="voice-item"><strong>"We rely on word of mouth."</strong>Unpredictable. Unscalable. Invisible to anyone not already in your network.</div>
                <div className="voice-item"><strong>"We tried an agency. Didn't work."</strong>They posted content. Followers grew. Clients didn't. Content without conversion infrastructure is just noise.</div>
                <div className="voice-item"><strong>"Our competitors look bigger than us."</strong>Perceived authority is built online. The business with better brand infrastructure wins — regardless of who does better work.</div>
                <div className="voice-item"><strong>"I don't know what marketing is working."</strong>No pipeline visibility. No way to tie a post to a booked appointment. Just guessing.</div>
                <div className="voice-item"><strong>"I need to build our brand."</strong>Exactly. This is the gap you already feel. We built the infrastructure to close it.</div>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <span className="label">The Real Problem</span>
              <h2 className="sec-h2">You don't have a marketing problem.<br /><em style={{ fontStyle: "italic", color: "var(--teal)" }}>You have an infrastructure problem.</em></h2>
              <p className="sec-p">Every agency you've tried added content. Nobody built the system behind it — the positioning, the conversion pathways, the qualifying sequences, the pipeline tracking. Without infrastructure, all the content in the world produces inconsistent results.</p>
              <p className="sec-p" style={{ marginTop: 12 }}>Your business has something most personal brands will never have: <strong style={{ color: "var(--white)" }}>undeniable, physical proof of work.</strong> A weld. A finished vehicle wrap. A grooming transformation. A delivery tracked from A to B. The raw material for a compelling brand is already there — it just hasn't been systematised.</p>
              <div className="problem-badge">
                <span style={{ color: "var(--teal)" }}>◉</span> That is the gap we were built to close
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM SECTION */}
      <section className="section alt" id="system">
        <div className="container">
          <div className="system-intro reveal">
            <span className="label">The Solution</span>
            <h2 className="sec-h2">Brand is not aesthetics.<br />It is engineered trust, at volume.</h2>
            <p className="sec-p">A brand is a set of associations people hold about your business. It is reputation at scale — built through repeated proof and strategic presence. We build that systematically, using AI-driven infrastructure that operates whether you're on camera or not.</p>
            <div className="formula-line">
              <span className="f-item">Proof</span>
              <span className="f-op">×</span>
              <span className="f-item">Volume</span>
              <span className="f-op">×</span>
              <span className="f-item">Consistency</span>
              <span className="f-op">=</span>
              <span className="f-item" style={{ color: "var(--white)" }}>Brand</span>
            </div>
          </div>

          <div className="tiers-row reveal reveal-delay-1">
            <div className="tier-card featured" data-num="1">
              <span className="tier-label">Tier 1 — Core Offer</span>
              <h3>The Proof Brand</h3>
              <p>Credibility-driven content built entirely from your existing work. Job documentation, results, testimonials, process footage. <strong style={{ color: "var(--white)" }}>No face required. No personality required.</strong> Just systematic distribution of what you already do.</p>
              <ul className="tier-includes">
                <li>Full 3-stage Attraction Engine™ build</li>
                <li>AI-powered brand content system (AA Studio)</li>
                <li>Hyper-targeted Meta ad campaigns</li>
                <li>Profile funnel + lead-qualifying sequences</li>
                <li>DM → booking conversion flow</li>
                <li>AA Client Portal — live pipeline tracking</li>
              </ul>
              <div className="tier-price-row">
                <span className="t-price">R15–25k</span>
                <span className="t-per">setup + R8–12k/month</span>
              </div>
            </div>
            <div className="tier-card" data-num="2">
              <span className="tier-label">Tier 2 — Authority Upsell</span>
              <h3>The Authority Brand</h3>
              <p>A human element introduced to your brand — either a <strong style={{ color: "var(--white)" }}>Brand Avatar</strong> (a professionally directed on-camera representative) or <strong style={{ color: "var(--white)" }}>UGC creators</strong> who produce associative content. Moves the brand from "they do good work" to "I feel like I know and trust these people."</p>
              <ul className="tier-includes">
                <li>Everything in Tier 1 — Proof Brand</li>
                <li>Brand Avatar sourcing + professional direction</li>
                <li>Or UGC creator brief framework + management</li>
                <li>Educational and value-driven content</li>
                <li>Wider algorithmic reach via human-led content</li>
                <li>Priority account management</li>
              </ul>
              <div className="tier-price-row">
                <span className="t-price">R20–33k</span>
                <span className="t-per">setup + R14–21k/month</span>
              </div>
            </div>
          </div>

          {/* PROOF SPRINT BANNER */}
          <div className="sprint-banner reveal reveal-delay-2">
            <div className="sprint-left">
              <span className="label">Before You Spend Anything</span>
              <h3>The 14-Day Proof Sprint</h3>
              <p>We prove the system works before we charge a single cent in management fees. We run a live 14-day test — one ad set, real local enquiries, real results. You see the system working before you commit to the full engine.</p>
              <div className="sprint-pills">
                <span className="pill">You pay ad spend only</span>
                <span className="pill">R0 management fee</span>
                <span className="pill">Up to 10 qualified enquiries</span>
                <span className="pill">14 days</span>
              </div>
            </div>
            <div className="sprint-right">
              <span className="sprint-fee">R0</span>
              <span className="sprint-fee-label">Management fee<br />during trial</span>
              <a href="#cta" className="btn-hero" style={{ marginTop: 20, justifyContent: "center" }}>Start the Sprint →</a>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="container">
          <div className="two-col-grid">
            <div className="reveal">
              <span className="label">The Three-Touch Process</span>
              <h2 className="sec-h2">We don't turn the ads on until the brand is ready to receive them.</h2>
              <p className="sec-p">This is the critical logic that separates us from every performance agency. Running traffic to a weak brand is expensive and ineffective. Building the brand first means every rand of ad spend lands in a prepared, trust-primed environment.</p>
              <p className="sec-p" style={{ marginTop: 12 }}>The sequence is not arbitrary. Brand built first. Amplified second. Converted third. That order is the compounding architecture that makes results repeatable — not just once, but every single month.</p>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="touches-wrap">
                <div className="touch-item">
                  <div className="touch-num-col">
                    <div className="touch-num-circle">01</div>
                    <div className="touch-connector"></div>
                  </div>
                  <div className="touch-body">
                    <span className="touch-tag">Build Brand — AA Studio</span>
                    <h3>Proof Infrastructure First</h3>
                    <p>Credibility content system installed. Brand voice established. Proof documentation running. No ads switched on until the profile is primed and the brand is ready to receive traffic.</p>
                    <span className="touch-cost">Brand content engine live</span>
                  </div>
                </div>
                <div className="touch-item">
                  <div className="touch-num-col">
                    <div className="touch-num-circle">02</div>
                    <div className="touch-connector"></div>
                  </div>
                  <div className="touch-body">
                    <span className="touch-tag">Amplify — Profile Funnel + Meta Ads</span>
                    <h3>Drive Traffic Into a Primed Brand</h3>
                    <p>Hyper-targeted Meta campaigns drive local prospects into a brand already positioned to convert. Every rand of ad spend lands in a prepared environment. Profile funnel built and live.</p>
                    <span className="touch-cost">Meta ads + profile funnel active</span>
                  </div>
                </div>
                <div className="touch-item">
                  <div className="touch-num-col">
                    <div className="touch-num-circle">03</div>
                  </div>
                  <div className="touch-body">
                    <span className="touch-tag">Convert — DM → Booking → Cash</span>
                    <h3>Turn Conversations Into Revenue</h3>
                    <p>Lead-qualifying sequences, DM-to-booking flow, and live pipeline tracking via AA Portal. Every stage visible and measurable. From profile visit to cash collected — tracked in real time.</p>
                    <span className="touch-cost">Live pipeline · Full visibility</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="section alt" id="sectors">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 48px" }}>
            <span className="label">Who We Serve</span>
            <h2 className="sec-h2">The businesses that run the real economy — and have never had the tools to look like it.</h2>
          </div>
          <div className="sectors-grid reveal reveal-delay-1">
            <div className="sector-tile">
              <span className="sector-icon">🔧</span>
              <h4>Metal Fabrication &amp; Engineering</h4>
              <p>Your finished builds are proof of world-class craftsmanship. Nobody has ever documented it systematically.</p>
              <span className="sector-proof">Proof material: finished builds, project documentation</span>
            </div>
            <div className="sector-tile">
              <span className="sector-icon">🚗</span>
              <h4>Car Detailing &amp; Vehicle Wrapping</h4>
              <p>Before/after transformations are some of the most compelling content available — and yours are real.</p>
              <span className="sector-proof">Proof material: before/after, transformation reels</span>
            </div>
            <div className="sector-tile">
              <span className="sector-icon">🐾</span>
              <h4>Pet Grooming &amp; Wellness</h4>
              <p>High repeat client businesses where trust is the primary purchase driver. Brand infrastructure compounds every month.</p>
              <span className="sector-proof">Proof material: grooming results, happy client moments</span>
            </div>
            <div className="sector-tile">
              <span className="sector-icon">🚚</span>
              <h4>Logistics &amp; Courier Services</h4>
              <p>Reliability is your brand. Documenting it at scale — on-time records, volume, client testimonials — is untapped territory.</p>
              <span className="sector-proof">Proof material: delivery tracking, reliability records</span>
            </div>
            <div className="sector-tile">
              <span className="sector-icon">🏗️</span>
              <h4>Specialist Trades &amp; Construction</h4>
              <p>You do brilliant work and nobody knows it. The craftsman narrative is one of the most compelling content angles available.</p>
              <span className="sector-proof">Proof material: project progress, finished quality</span>
            </div>
            <div className="sector-tile">
              <span className="sector-icon">🏥</span>
              <h4>Clinics, Physio &amp; Wellness Studios</h4>
              <p>Patient outcomes and transformation stories are the most powerful trust-builders in local service markets.</p>
              <span className="sector-proof">Proof material: outcomes, testimonials, case studies</span>
            </div>
          </div>
          <div className="reveal reveal-delay-3" style={{ marginTop: 24, border: "1px solid var(--border)", background: "var(--teal-faint)", borderRadius: 6, padding: "24px 32px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontStyle: "italic", color: "var(--white)", lineHeight: 1.5, maxWidth: 680, margin: "0 auto" }}>
              "Every branding agency chases coaches and ecom stores. Nobody is walking into a fabrication yard saying 'we can turn this into the most trusted brand in your market.' That is exactly what we do."
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="section">
        <div className="container">
          <div className="two-col-grid">
            <div className="reveal">
              <span className="label">The Difference</span>
              <h2 className="sec-h2">Not another agency.<br /><em style={{ fontStyle: "italic", color: "var(--teal)" }}>An infrastructure company.</em></h2>
              <p className="sec-p">Most agencies deliver content. We install the system behind your content — the conversion pathways, the qualifying sequences, the pipeline tracking, and the proof-first commercial model that no competitor in South Africa offers.</p>
              <p className="sec-p" style={{ marginTop: 12 }}>The difference is not just what we build. It is how we sell it. We prove the system works before we charge a management fee. Because infrastructure that works does not need to be sold — it needs to be demonstrated.</p>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="compare-grid">
                <div className="compare-col">
                  <div className="compare-head">Every Other Agency</div>
                  <div className="compare-rows">
                    <div className="c-row"><span className="c-icon">✗</span> Post content and boost</div>
                    <div className="c-row"><span className="c-icon">✗</span> Run ads to a weak profile</div>
                    <div className="c-row"><span className="c-icon">✗</span> No conversion funnel</div>
                    <div className="c-row"><span className="c-icon">✗</span> No pipeline tracking</div>
                    <div className="c-row"><span className="c-icon">✗</span> Charge whether it works or not</div>
                    <div className="c-row"><span className="c-icon">✗</span> Vanity metrics, not revenue</div>
                    <div className="c-row"><span className="c-icon">✗</span> Content without infrastructure</div>
                  </div>
                </div>
                <div className="compare-col us">
                  <div className="compare-head">Attract Acquisition</div>
                  <div className="compare-rows">
                    <div className="c-row"><span className="c-icon">✓</span> Build brand infrastructure first</div>
                    <div className="c-row"><span className="c-icon">✓</span> Amplify into a primed profile</div>
                    <div className="c-row"><span className="c-icon">✓</span> Full 3-stage conversion system</div>
                    <div className="c-row"><span className="c-icon">✓</span> Live pipeline dashboard</div>
                    <div className="c-row"><span className="c-icon">✓</span> Prove results before billing</div>
                    <div className="c-row"><span className="c-icon">✓</span> Revenue tracking, not likes</div>
                    <div className="c-row"><span className="c-icon">✓</span> Infrastructure that compounds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section alt" id="results">
        <div className="container">
          <div className="results-grid">
            <div className="reveal">
              <span className="label">Proof of System</span>
              <h2 className="sec-h2">The track record is the proposition.</h2>
              <p className="sec-p">100+ Proof Sprints delivered. Every client who completes a Proof Sprint and sees results is maximally motivated to proceed to the full Engine. The data speaks for itself.</p>
              <div className="results-metrics" style={{ marginTop: 32 }}>
                <div className="r-metric">
                  <span className="r-num">100+</span>
                  <span className="r-label">Proof Sprints<br />Delivered</span>
                </div>
                <div className="r-metric">
                  <span className="r-num">4.5★</span>
                  <span className="r-label">Trustpilot<br />Rating</span>
                </div>
                <div className="r-metric">
                  <span className="r-num">14d</span>
                  <span className="r-label">Average Time to<br />First Results</span>
                </div>
                <div className="r-metric">
                  <span className="r-num">81%</span>
                  <span className="r-label">Client<br />Show-up Rate</span>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="testimonial-stack">
                <div className="t-card">
                  <div className="t-stars">★★★★★</div>
                  <div className="t-text">"The biggest shift wasn't more content — it was structure. Now we have a clear path from local attention to enquiry to booking to sale. We know exactly what's working."</div>
                  <div className="t-author">
                    <div className="t-avatar">GO</div>
                    <div>
                      <div className="t-name">Gareth O.</div>
                      <div className="t-biz">Auto Detailing Studio, Cape Town</div>
                    </div>
                  </div>
                </div>
                <div className="t-card">
                  <div className="t-stars">★★★★★</div>
                  <div className="t-text">"DMs became qualified conversations and we track exactly what converts. Growth is predictable now. We stopped guessing and started building."</div>
                  <div className="t-author">
                    <div className="t-avatar">SK</div>
                    <div>
                      <div className="t-name">Samantha K.</div>
                      <div className="t-biz">Specialist Physiotherapy Clinic, JHB</div>
                    </div>
                  </div>
                </div>
                <div className="t-card">
                  <div className="t-stars">★★★★☆</div>
                  <div className="t-text">"We were invisible online despite 12 years of excellent work. In 6 weeks the system had us booked two weeks ahead. The proof-first model meant we had nothing to lose."</div>
                  <div className="t-author">
                    <div className="t-avatar">LM</div>
                    <div>
                      <div className="t-name">Lance M.</div>
                      <div className="t-biz">Fabrication &amp; Steel Works, Pretoria</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tp-row">
                <span className="tp-logo">★</span>
                <span>Rated 4.5/5 on Trustpilot · 100+ verified reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <div className="two-col-grid">
            <div className="reveal">
              <span className="label">Questions</span>
              <h2 className="sec-h2">Everything you need to know before you book.</h2>
              <p className="sec-p">The most common questions from business owners who haven't worked with an infrastructure-first agency before.</p>
              <div style={{ marginTop: 32, padding: "24px 28px", background: "var(--teal-faint)", border: "1px solid var(--border)", borderRadius: 6 }}>
                <span className="label" style={{ marginBottom: 10, display: "block" }}>Still have questions?</span>
                <p style={{ fontSize: 14, color: "rgba(238,242,241,0.7)", marginBottom: 16 }}>Book a 15-minute call. No pitch, no pressure — just a clear answer to whether the system is right for your business.</p>
                <a href="#cta" className="btn-hero" style={{ display: "inline-flex" }}>Book 15-Min Call →</a>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="faq-list">
                <div className="faq-item">
                  <div className="faq-q">How is this different from social media management?<span className="faq-icon">+</span></div>
                  <div className="faq-a">We don't just post content. We build the system behind your Instagram — positioning, profile funnel, lead-qualifying sequences, and a DM-to-booking flow. Social media management builds followers. We build revenue infrastructure.</div>
                </div>
                <div className="faq-item">
                  <div className="faq-q">Do I have to be on camera or create content myself?<span className="faq-icon">+</span></div>
                  <div className="faq-a">No. The Tier 1 Proof Brand is built entirely from your existing work — job documentation, results, testimonials, and process footage. No face required. No personality required. If you want to unlock educational content and wider reach, that's the Tier 2 upsell.</div>
                </div>
                <div className="faq-item">
                  <div className="faq-q">What does the 14-Day Proof Sprint actually cost?<span className="faq-icon">+</span></div>
                  <div className="faq-a">You pay ad spend only — typically R1,500 to R3,000 depending on your market. Our management fee during the trial is R0. If the sprint demonstrates results, we move to engine installation. If it doesn't, you've spent a small ad budget and lost nothing else.</div>
                </div>
                <div className="faq-item">
                  <div className="faq-q">How long before I see results?<span className="faq-icon">+</span></div>
                  <div className="faq-a">The Proof Sprint produces its first results within 14 days. Full engine installation takes 3–6 weeks to build. After that, the system operates continuously — and compounds over time as brand authority grows.</div>
                </div>
                <div className="faq-item">
                  <div className="faq-q">What platforms do you work on?<span className="faq-icon">+</span></div>
                  <div className="faq-a">Primarily Instagram and Meta advertising — the dominant local service discovery platforms in South Africa. The full engine builds on Instagram's profile funnel, with Meta ads driving targeted local traffic into the system.</div>
                </div>
                <div className="faq-item">
                  <div className="faq-q">Do you work with businesses outside South Africa?<span className="faq-icon">+</span></div>
                  <div className="faq-a">Currently serving South Africa with UK expansion in development. If you're based in another market, book a call and we'll advise on whether the system is a fit.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section" id="cta">
        <div className="cta-glow"></div>
        <div className="container">
          <div className="reveal">
            <span className="label" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>Start Here</span>
            <h2>Your work deserves to be<br /><em>the most trusted name</em><br />in your market.</h2>
            <p>Book a 15-minute call. We'll map your Acquisition Engine — profile funnel, content structure, and DM-to-booking flow — specific to your business. No pitch. No pressure. Just clarity.</p>
            <div className="cta-row">
              <a href="https://attractacq.com" className="btn-large">Book a 15-Min Call →</a>
              <a href="https://attractacq.com" className="btn-large-ghost">Get a Free Demand Audit</a>
            </div>
            <p className="cta-note">15 minutes · Free · No obligation · Clear next step</p>
          </div>
          <div className="cta-steps-grid reveal reveal-delay-2">
            <div>
              <span className="label" style={{ marginBottom: 10, display: "block" }}>Step 01</span>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Book a Call</div>
              <p style={{ fontSize: 13, color: "var(--grey)", lineHeight: 1.5 }}>15 minutes. Map the engine for your specific business — profile funnel, content structure, DM-to-booking flow.</p>
            </div>
            <div>
              <span className="label" style={{ marginBottom: 10, display: "block" }}>Step 02</span>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Run the Sprint</div>
              <p style={{ fontSize: 13, color: "var(--grey)", lineHeight: 1.5 }}>14 days. Ad spend only. R0 management fee. See real local enquiries generated before you commit to anything.</p>
            </div>
            <div>
              <span className="label" style={{ marginBottom: 10, display: "block" }}>Step 03</span>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Install the Engine</div>
              <p style={{ fontSize: 13, color: "var(--grey)", lineHeight: 1.5 }}>Full brand infrastructure. Predictable clients every month. Live pipeline tracking. Your acquisition problem — solved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <div className="nav-aa">AA</div>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--grey)" }}>Attract Acquisition</span>
            </div>
            <span className="footer-copy">© 2026 Attract Acquisition · attractacq.com · South Africa</span>
            <div className="footer-links">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">POPIA</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
