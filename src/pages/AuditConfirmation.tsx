import { useEffect, useState } from "react";

export default function AuditConfirmation() {
  const [copied, setCopied] = useState(false);

  // Optional: could add a fake "progress" or timer if you want
  useEffect(() => {
    // Example: auto-reset "copied" state after 2.5 seconds
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://attractacquisition.com/referral?ref=example123");
    setCopied(true);
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

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        .glow-center {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          width: 900px;
          height: 900px;
          background: radial-gradient(circle, rgba(0,229,195,0.055) 0%, transparent 55%);
          pointer-events: none;
          z-index: 0;
        }

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
        }

        .nav-name {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--white);
        }

        .page {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 140px 24px 80px;
        }

        .confirm-wrap {
          width: 100%;
          max-width: 640px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .check-ring {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--t-faint2);
          border: 2px solid var(--t-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
          animation: checkPop 0.6s 0.2s cubic-bezier(0.175,0.885,0.32,1.275) both;
          position: relative;
        }

        .check-ring::before,
        .check-ring::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(0,229,195,0.12);
          animation: ringExpand 1.2s 0.5s ease-out both;
        }

        .check-ring::after {
          inset: -18px;
          border-color: rgba(0,229,195,0.06);
          animation-delay: 0.7s;
        }

        .check-icon {
          font-size: 32px;
          color: var(--teal);
          line-height: 1;
          animation: checkFade 0.4s 0.6s ease both;
        }

        @keyframes checkPop {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }

        @keyframes ringExpand {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }

        @keyframes checkFade {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 16px;
          animation: fadeUp 0.6s 0.4s ease both;
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
          50%      { box-shadow: 0 0 0 5px rgba(0,229,195,0); }
        }

        .confirm-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 5vw, 54px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          animation: fadeUp 0.6s 0.5s ease both;
        }

        .confirm-h1 em {
          color: var(--teal);
          font-style: italic;
        }

        .confirm-sub {
          font-size: 17px;
          color: rgba(238,242,241,0.65);
          line-height: 1.7;
          max-width: 500px;
          margin: 0 auto 44px;
          animation: fadeUp 0.6s 0.6s ease both;
        }

        .confirm-sub strong {
          color: var(--white);
        }

        .timeline-card {
          width: 100%;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 32px 36px;
          text-align: left;
          margin-bottom: 24px;
          box-shadow: 0 20px 56px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,229,195,0.07);
          animation: fadeUp 0.6s 0.7s ease both;
          position: relative;
          overflow: hidden;
        }

        .timeline-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--teal), var(--teal-dark));
        }

        .tc-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 20px;
          display: block;
        }

        .tc-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .tl-item {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 16px;
          align-items: flex-start;
          padding-bottom: 20px;
          position: relative;
        }

        .tl-item:last-child {
          padding-bottom: 0;
        }

        .tl-item:not(:last-child) .tl-dot-col::after {
          content: '';
          position: absolute;
          left: 15px;
          top: 32px;
          width: 1px;
          height: calc(100% - 16px);
          background: linear-gradient(to bottom, var(--t-border), transparent);
        }

        .tl-dot-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding-top: 2px;
        }

        .tl-dot {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          flex-shrink: 0;
        }

        .tl-dot.done {
          background: var(--t-faint2);
          border: 1px solid var(--t-border);
          color: var(--teal);
        }

        .tl-dot.next {
          background: var(--bg3);
          border: 1px solid var(--grey-d);
          color: var(--grey-m);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 500;
        }

        .tl-content {
          padding-top: 2px;
        }

        .tl-time {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 3px;
          display: block;
        }

        .tl-time.now {
          color: var(--teal);
        }

        .tl-time.soon {
          color: var(--grey-m);
        }

        .tl-desc {
          font-size: 14px;
          color: rgba(238,242,241,0.75);
          line-height: 1.55;
        }

        .tl-desc strong {
          color: var(--white);
        }

        .whats-next {
          background: var(--bg3);
          border-radius: 6px;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-top: 32px;
        }

        .wn-icon {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .wn-text {
          font-size: 13px;
          color: var(--grey-m);
          line-height: 1.6;
        }

        .wn-text strong {
          color: var(--grey-l);
        }

        .share-card {
          width: 100%;
          background: var(--t-faint);
          border: 1px solid var(--t-border);
          border-radius: 10px;
          padding: 28px 32px;
          text-align: left;
          margin: 32px 0;
          animation: fadeUp 0.6s 0.85s ease both;
        }

        .sc-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 10px;
          display: block;
        }

        .sc-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .sc-body {
          font-size: 14px;
          color: var(--grey-m);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .share-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .share-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          text-decoration: none;
          border: none;
        }

        .share-btn:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        .share-btn.whatsapp {
          background: #25D366;
          color: #fff;
        }

        .share-btn.copy {
          background: var(--bg3);
          color: var(--grey-l);
          border: 1px solid var(--border);
        }

        .share-btn.copy.copied {
          color: var(--teal);
          border-color: var(--t-border);
          background: var(--t-faint2);
        }

        .secondary-cta {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          animation: fadeUp 0.6s 1.05s ease both;
          margin-top: 40px;
        }

        .cta-body {
          font-size: 14px;
          color: var(--grey-m);
          line-height: 1.6;
          max-width: 440px;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--teal);
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 12px 22px;
          border-radius: 4px;
          border: 1px solid rgba(0,229,195,0.25);
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }

        .btn-secondary:hover {
          background: var(--t-faint);
          border-color: var(--t-border);
          transform: translateY(-1px);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 700px) {
          nav { padding: 0 20px; }
          .page { padding: 120px 20px 60px; }
          .timeline-card, .share-card { padding: 24px 20px; }
          .bottom-strip { padding: 16px 20px; flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="glow-center" />

      <nav>
        <a href="/" className="nav-logo">
          <div className="nav-badge">AA</div>
          <span className="nav-name">Attract Acquisition</span>
        </a>
      </nav>

      <div className="page">
        <div className="confirm-wrap">
          <div className="check-ring">
            <div className="check-icon">✓</div>
          </div>

          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Report In Progress
          </span>

          <h1 className="confirm-h1">
            Your Report Is <em>On Its Way</em>
          </h1>

          <p className="confirm-sub">
            We’re analysing your local market now. <strong>You’ll receive your personalised Missed Jobs Report within 24 hours.</strong>
          </p>

          {/* Optional timeline / next steps section */}
          <div className="timeline-card">
            <span className="tc-label">What happens next</span>
            <div className="tc-title">Your personalised report journey</div>

            <div className="timeline">
              <div className="tl-item">
                <div className="tl-dot-col">
                  <div className="tl-dot done">✓</div>
                </div>
                <div className="tl-content">
                  <span className="tl-time now">Right now</span>
                  <p className="tl-desc">
                    We received your business details successfully
                  </p>
                </div>
              </div>

              <div className="tl-item">
                <div className="tl-dot-col">
                  <div className="tl-dot done">2</div>
                </div>
                <div className="tl-content">
                  <span className="tl-time now">Processing</span>
                  <p className="tl-desc">
                    Analysing local search & competitor data
                  </p>
                </div>
              </div>

              <div className="tl-item">
                <div className="tl-dot-col">
                  <div className="tl-dot next">3</div>
                </div>
                <div className="tl-content">
                  <span className="tl-time soon">Within 24 hrs</span>
                  <p className="tl-desc">
                    <strong>Your full Missed Jobs Report</strong> delivered via { /* you could make this dynamic */ "WhatsApp" }
                  </p>
                </div>
              </div>
            </div>

            <div className="whats-next">
              <span className="wn-icon">⏰</span>
              <p className="wn-text">
                Most reports are delivered in <strong>under 12 hours</strong> — especially during quieter periods.
              </p>
            </div>
          </div>

          {/* Share / Referral section */}
          <div className="share-card">
            <span className="sc-eyebrow">Love free value?</span>
            <div className="sc-title">Refer a friend, get priority reports</div>
            <p className="sc-body">
              Know another business owner who’d benefit? Share your unique link — when they claim a report, yours jumps the queue.
            </p>

            <div className="share-buttons">
              <button
                type="button"
                className={`share-btn copy ${copied ? "copied" : ""}`}
                onClick={handleCopyLink}
              >
                {copied ? "✓ Copied!" : "Copy Referral Link"}
              </button>

              <a
                href="https://wa.me/?text=Check%20this%20out%20—%20free%20Missed%20Jobs%20Report%20for%20your%20business!%20https://attractacquisition.com/referral?ref=example123"
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn whatsapp"
              >
                Share on WhatsApp
              </a>
            </div>
          </div>

          <div className="secondary-cta">
            <p className="cta-body">
              Questions? Just reply to the WhatsApp message you’ll receive — we’re here to help.
            </p>
            <a href="/" className="btn-secondary">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
