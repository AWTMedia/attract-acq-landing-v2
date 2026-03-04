import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Audit() {
  const navigate = useNavigate();
  const [contactMode, setContactMode] = useState<"whatsapp" | "email">(
    "whatsapp"
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      navigate("/audit-confirmation");
    }, 1200);
  };

  return (
    <>
      {/* KEEP YOUR ENTIRE <style> BLOCK FROM ORIGINAL FILE HERE */}
      {/* Paste it exactly as-is below */}

      <div className="glow-top"></div>
      <div className="glow-bottom"></div>

      <nav>
        <a href="/" className="nav-logo">
          <div className="nav-badge">AA</div>
          <span className="nav-name">Attract Acquisition</span>
        </a>
        <span className="nav-tag">Free Missed Jobs Report</span>
      </nav>

      <div className="page">
        <main className="hero">
          {/* LEFT SIDE CONTENT */}
          {/* 👉 KEEP ALL YOUR EXISTING LEFT HERO MARKUP EXACTLY THE SAME */}

          {/* RIGHT SIDE FORM */}
          <div>
            <div className="form-card">
              <span className="form-eyebrow">
                Step 1 of 1 — 30 seconds
              </span>
              <div className="form-title">
                Get Your Free Missed Jobs Report
              </div>
              <p className="form-subtitle">
                We'll analyse your market and send your personalised report
                within 24 hours.
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
                    <select>
                      <option value="">How many Google reviews?</option>
                      <option value="0">0</option>
                      <option value="1-10">1–10</option>
                      <option value="11-30">11–30</option>
                      <option value="31-60">31–60</option>
                      <option value="61+">61+</option>
                    </select>
                  </div>
                </div>

                {/* Contact Toggle */}
                <div className="field">
                  <label>Preferred Contact</label>

                  <div className="contact-toggle">
                    <button
                      type="button"
                      className={`toggle-btn ${
                        contactMode === "whatsapp" ? "active" : ""
                      }`}
                      onClick={() => setContactMode("whatsapp")}
                    >
                      💬 WhatsApp
                    </button>

                    <button
                      type="button"
                      className={`toggle-btn ${
                        contactMode === "email" ? "active" : ""
                      }`}
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
                      type={contactMode === "whatsapp" ? "tel" : "email"}
                      placeholder={
                        contactMode === "whatsapp"
                          ? "+27 81 234 5678"
                          : "your@email.com"
                      }
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading}
                  style={{ opacity: loading ? 0.8 : 1 }}
                >
                  {loading ? "Preparing your report..." : "Send Me My Free Report →"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
