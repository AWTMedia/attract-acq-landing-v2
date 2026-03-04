import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Audit() {
  const navigate = useNavigate();
  const [contactMode, setContactMode] = useState<"whatsapp" | "email">("whatsapp");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      navigate("/audit-confirmation");
    }, 1200);
  };

  return (
    <>
      <style>{`
        :root {
          --teal: #00E5C3;
          --teal-dark: #00B89E;
          --teal-deeper: #007A6A;
          --bg: #070F0D;
          --bg2: #0A1714;
          --bg3: #0E1E1A;
          --bg4: #122420;
          --white: #EEF2F1;
          --grey-l: #A8BCBA;
          --grey-m: #7A9490;
          --grey-d: #3D5550;
          --border: rgba(255,255,255,0.06);
          --border2: rgba(255,255,255,0.04);
          --t-faint: rgba(0,229,195,0.07);
          --t-faint2: rgba(0,229,195,0.12);
          --t-border: rgba(0,229,195,0.15);
          --t-border2: rgba(0,229,195,0.25);
        }

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: var(--bg);
          color: var(--white);
          font-family: 'Barlow', sans-serif;
          font-size: 16px;
          line-height: 1.65;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* NOISE */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        /* GLOW ORBS */
        .glow-top {
          position: fixed;
          top: -200px;
          right: -100px;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(0,229,195,0.06) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .glow-bottom {
          position: fixed;
          bottom: -200px;
          left: -150px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0,229,195,0.04) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* NAV */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 58px;
          background: rgba(7,15,13,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .nav-badge {
          width: 28px;
          height: 28px;
          background: var(--teal);
          color: var(--bg);
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .nav-name {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--white);
        }

        .nav-tag {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-m);
          border: 1px solid var(--border);
          padding: 4px 10px;
          border-radius: 3px;
        }

        /* MAIN WRAPPER */
        .page {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding-top: 58px;
        }

        /* HERO */
        .hero {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 480px;
          gap: 80px;
          align-items: center;
          max-width: 1120px;
          margin: 0 auto;
          padding: 80px 48px 80px;
          width: 100%;
        }

        /* LEFT COPY */
        .hero-copy {
          display: flex;
          flex-direction: column;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 24px;
          animation: fadeUp 0.7s ease both;
        }

        .eyebrow-dot {
          width: 5px;
          height: 5px;
          background: var(--teal);
          border-radius: 50%;
          animation: pulsedot 1.5s ease infinite;
        }

        @keyframes pulsedot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,229,195,0.4); }
          50% { box-shadow: 0 0 0 5px rgba(0,229,195,0); }
        }

        .hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4.5vw, 58px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
          animation: fadeUp 0.7s 0.1s ease both;
        }

        .hero-h1 em {
          color: var(--teal);
          font-style: italic;
          display: block;
        }

        .hero-sub {
          font-size: 17px;
          color: rgba(238,242,241,0.6);
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: 40px;
          animation: fadeUp 0.7s 0.2s ease both;
        }

        /* TRUST SIGNALS */
        .trust-row {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          animation: fadeUp 0.7s 0.3s ease both;
          margin-bottom: 0;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-m);
        }

        .trust-icon {
          font-size: 14px;
        }

        .trust-item strong {
          color: var(--teal);
        }

        /* ═══ FORM CARD ═══ */
        .form-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 40px 36px;
          position: relative;
          box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,195,0.08);
          animation: fadeUp 0.7s 0.15s ease both;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--teal), var(--teal-dark));
          border-radius: 12px 12px 0 0;
        }

        .form-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 10px;
          display: block;
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .form-subtitle {
          font-size: 13px;
          color: var(--grey-m);
          line-height: 1.55;
          margin-bottom: 28px;
        }

        /* FORM */
        .form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--grey-m);
        }

        .field-inner {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          pointer-events: none;
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        input,
        select {
          width: 100%;
          background: var(--bg3);
          border: 1px solid var(--grey-d);
          border-radius: 5px;
          color: var(--white);
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          padding: 13px 14px 13px 42px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
          appearance: none;
        }

        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A9490' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }

        select option {
          background: var(--bg3);
          color: var(--white);
        }

        input::placeholder {
          color: var(--grey-d);
          font-size: 14px;
        }

        input:focus,
        select:focus {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px rgba(0,229,195,0.1);
        }

        input:focus + .field-icon,
        select:focus + .field-icon {
          opacity: 0.9;
        }

        /* CONTACT TOGGLE */
        .contact-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: var(--bg);
          border-radius: 5px;
          padding: 3px;
          border: 1px solid var(--grey-d);
          margin-bottom: 4px;
        }

        .toggle-btn {
          padding: 9px 12px;
          border-radius: 4px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-m);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .toggle-btn.active {
          background: var(--t-faint2);
          color: var(--teal);
          border: 1px solid var(--t-border);
        }

        .contact-input-wrap {
          position: relative;
        }

        #contact-input {
          padding-left: 42px;
        }

        #contact-prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: var(--grey-m);
          pointer-events: none;
        }

        /* SUBMIT */
        .btn-submit {
          width: 100%;
          background: var(--teal);
          color: var(--bg);
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 16px 24px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 4px;
          transition: background 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }

        .btn-submit:hover {
          background: var(--teal-dark);
          transform: translateY(-2px);
        }

        .btn-submit:active {
          transform: translateY(0);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* MOBILE */
        @media (max-width: 900px) {
          nav { padding: 0 20px; }
          .hero {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 60px 20px 60px;
          }
          .form-card { padding: 28px 22px; }
        }
      `}</style>

      <div className="glow-top" />
      <div className="glow-bottom" />

      <nav>
        <a href="/" className="nav-logo">
          <div className="nav-badge">AA</div>
          <span className="nav-name">Attract Acquisition</span>
        </a>
        <span className="nav-tag">Free Missed Jobs Report</span>
      </nav>

      <div className="page">
        <main className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> Free Report — No Obligation
            </span>

            <h1 className="hero-h1">
              <span>Claim Your FREE</span>
              <em>Missed Jobs Report</em>
              <span
                style={{
                  fontSize: "0.72em",
                  fontWeight: 700,
                  display: "block",
                  marginTop: 8,
                  letterSpacing: 0,
                  color: "rgba(238,242,241,0.85)",
                }}
              >
                See exactly how much revenue your business is losing this month.
              </span>
            </h1>

            <p className="hero-sub">
              In just 30 seconds, we'll analyse your business and show you exactly
              where clients are slipping through the cracks — the ones who searched,
              found someone else, and paid them instead.
            </p>

            <div className="trust-row">
              <div className="trust-item">
                <span className="trust-icon">⚡</span>
                Delivered within <strong>24 hours</strong>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <strong>R0</strong> cost, no obligation
              </div>
              <div className="trust-item">
                <span className="trust-icon">📊</span>
                Real local data, not estimates
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — FORM */}
          <div className="form-card">
            <span className="form-eyebrow">Step 1 of 1 — 30 seconds</span>
            <div className="form-title">Get Your Free Missed Jobs Report</div>
            <p className="form-subtitle">
              We'll analyse your market and send your personalised report within 24 hours.
            </p>

            <form className="form" onSubmit={handleSubmit}>
              {/* Business Name */}
              <div className="field">
                <label>Business Name</label>
                <div className="field-inner">
                  <span className="field-icon">🏢</span>
                  <input
                    type="text"
                    placeholder="e.g. Cape Cuts Pet Grooming"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="field">
                <label>Location / Area Served</label>
                <div className="field-inner">
                  <span className="field-icon">📍</span>
                  <input
                    type="text"
                    placeholder="e.g. Claremont, Cape Town"
                    required
                  />
                </div>
              </div>

              {/* Google Reviews */}
              <div className="field">
                <label>Google Reviews</label>
                <div className="field-inner">
                  <span className="field-icon">⭐</span>
                  <select required>
                    <option value="">How many Google reviews?</option>
                    <option value="0">0</option>
                    <option value="1-10">1–10</option>
                    <option value="11-30">11–30</option>
                    <option value="31-60">31–60</option>
                    <option value="61+">61+</option>
                  </select>
                </div>
              </div>

              {/* Preferred Contact */}
              <div className="field">
                <label>Preferred Contact</label>
                <div className="contact-toggle">
                  <button
                    type="button"
                    className={`toggle-btn ${contactMode === "whatsapp" ? "active" : ""}`}
                    onClick={() => setContactMode("whatsapp")}
                  >
                    💬 WhatsApp
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${contactMode === "email" ? "active" : ""}`}
                    onClick={() => setContactMode("email")}
                  >
                    ✉️ Email
                  </button>
                </div>

                <div className="contact-input-wrap">
                  <span id="contact-prefix">
                    {contactMode === "whatsapp" ? "📱" : "✉️"}
                  </span>
                  <input
                    id="contact-input"
                    type={contactMode === "whatsapp" ? "tel" : "email"}
                    placeholder={
                      contactMode === "whatsapp" ? "+27 81 234 5678" : "your@email.com"
                    }
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? "Preparing your report..." : "Send Me My Free Report →"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
