export default function Home() {
  return (
    <>
      {/* HERO / Intro Section */}
      <section style={{ padding: "5rem 6% 4rem", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "4rem", alignItems: "center" }}>
        <div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "3.1rem",
            lineHeight: 1.15,
            color: "#e2b56f",
            marginBottom: "1.5rem"
          }}>Exploring the Heritage & Legacy</h2>
          <p style={{
            maxWidth: "560px",
            margin: "0 0 2rem 0",
            color: "#a5a5b5",
            fontSize: "1.05rem"
          }}>
            Nuhro Thozhiyoor is an independent digital archive initiative dedicated to documenting the history, legacy, and ecclesial heritage of the Malabar Independent Syrian Church – Thozhiyoor.
          </p>
          <a href="#about" style={{
            display: "inline-block",
            padding: ".9rem 2.2rem",
            background: "linear-gradient(135deg,#f0c27b,#cfa24f)",
            color: "#000",
            textDecoration: "none",
            fontWeight: 600,
            borderRadius: "12px",
            boxShadow: "0 10px 35px rgba(226,181,111,.25)"
          }}>About Nuhro</a>
        </div>
        <img src="/assets/nuhrothozhiyoor.png" alt="Nuhro Logo" style={{
          width: "100%",
          borderRadius: "24px",
          border: "1px solid rgba(226,181,111,.15)"
        }}/>
      </section>

      {/* About Cards */}
      <section id="about" style={{ padding: "4.5rem 6%" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.2rem",
          color: "#e2b56f",
          marginBottom: "1.5rem"
        }}>About Nuhro</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "2rem"
        }}>
          <div style={{
            background: "linear-gradient(180deg,#171723,#101018)",
            border: "1px solid rgba(226,181,111,.15)",
            borderRadius: "22px",
            padding: "2.2rem"
          }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#e2b56f", marginBottom: ".6rem" }}>Meaning of Nuhro</h4>
            <p style={{ color: "#a5a5b5" }}><b>Nuhro</b> means Light in Syriac — symbolizing illumination of memory, history, and faith.</p>
          </div>
          <div style={{
            background: "linear-gradient(180deg,#171723,#101018)",
            border: "1px solid rgba(226,181,111,.15)",
            borderRadius: "22px",
            padding: "2.2rem"
          }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#e2b56f", marginBottom: ".6rem" }}>Nature</h4>
            <p style={{ color: "#a5a5b5" }}>This is <b>not an official website</b> of the Malabar Independent Syrian Church. It is an independent heritage and research initiative.</p>
          </div>
          <div style={{
            background: "linear-gradient(180deg,#171723,#101018)",
            border: "1px solid rgba(226,181,111,.15)",
            borderRadius: "22px",
            padding: "2.2rem"
          }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#e2b56f", marginBottom: ".6rem" }}>Mission</h4>
            <p style={{ color: "#a5a5b5" }}>Preserving ecclesial memory, manuscripts, traditions, and historical narratives using modern digital design.</p>
          </div>
        </div>
      </section>
      <section id="posts">
  <h3 class="title">Posts & Research</h3>
  <div class="grid">
    <div class="post-card">
      <div>
        <h3>Origins of the Thozhiyoor Episcopal See</h3>
        <p>Historical foundations of the Thozhiyoor episcopal tradition.</p>
      </div>
      <span>12 Jan 2026</span>
    </div>
    <div class="post-card">
      <div>
        <h3>Nuhro in Syriac Theology</h3>
        <p>Light imagery in Syriac scripture and liturgy.</p>
      </div>
      <span>05 Jan 2026</span>
    </div>
    <div class="post-card">
      <div>
        <h3>Thozhiyoor & Malankara</h3>
        <p>Relations with wider Malankara Syriac traditions.</p>
      </div>
      <span>28 Dec 2025</span>
    </div>
  </div>
</section>

<section id="contact">
  <h3 class="title">Connect</h3>
  <div class="social">
    <a href="https://instagram.com/nuhrothozhiyoor">IG</a>
    <a href="https://facebook.com/nuhrothozhiyoor">FB</a>
    <a href="https://x.com/nuhrothozhiyoor">X</a>
    <a href="mailto:nuhrothozhiyoor@gmail.com">@</a>
  </div>
</section>

    </>
  );
}
