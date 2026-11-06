// app/about/page.js
export default function About() {
  return (
    <section id="about">
      <h3 className="title">About Nuhro Thozhiyoor</h3>
      <div className="grid">
        <div className="card">
          <h3>Meaning of Nuhro</h3>
          <p><b>Nuhro</b> means Light in Syriac — symbolising illumination of memory, history, and faith.</p>
        </div>
        <div className="card">
          <h3>Nature</h3>
          <p>This is <b>not an official website</b> of the Malabar Independent Syrian Church. It is an independent heritage and research initiative.</p>
        </div>
        <div className="card">
          <h3>Mission</h3>
          <p>Preserving ecclesial memory, manuscripts, traditions, and historical narratives using modern digital design.</p>
        </div>
      </div>
    </section>
  );
}
