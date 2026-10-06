import { ArrowRight, BadgeCheck, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Home({ bikes }) {
  const featured = bikes.slice(0, 4);

  return (
    <main>
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill"><Sparkles size={14} /> Find your next ride</span>
            <h1>Ride smart.<br /><span>Choose better.</span></h1>
            <p>Explore bikes, compare prices, discover trusted listings and connect directly with sellers.</p>
            <div className="hero-buttons">
              <Link className="primary-btn" to="/bikes">Explore bikes <ArrowRight size={17} /></Link>
              <Link className="ghost-btn" to="/login">List your bike</Link>
            </div>
            <div className="hero-trust">
              <span><BadgeCheck size={17} /> Verified listings</span>
              <span><ShieldCheck size={17} /> Direct seller contact</span>
            </div>
          </div>
          <div className="hero-bike-card">
            <div className="hero-image-label"><span>FEATURED</span><span>01 / 04</span></div>
            <img src={featured[0]?.thumbnail || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=85"} alt="Featured motorcycle" />
            <div className="hero-bike-info">
              <div><small>Popular pick</small><h3>{featured[0]?.title || "Yamaha MT 15"}</h3></div>
              <strong>₹{Number(featured[0]?.price || 169000).toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="container quick-search-section">
        <div className="quick-search">
          <div><Search size={20} /><input placeholder="Search by bike name, brand or model" /><Link to="/search">Search</Link></div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading"><div><p className="eyebrow">HANDPICKED</p><h2>Trending bikes</h2></div><Link to="/bikes">View all <ArrowRight size={16} /></Link></div>
        <div className="bike-grid">{featured.map((bike) => <div className="mini-bike" key={bike.id}><img src={bike.thumbnail} alt={bike.title} /><div><strong>{bike.title}</strong><span>{bike.brand || "Motorcycle"}</span><b>₹{Number(bike.price || 0).toLocaleString("en-IN")}</b></div></div>)}</div>
      </section>

      <section className="dark-section">
        <div className="container feature-grid">
          <div><p className="eyebrow">WHY MOTORA</p><h2>A cleaner way to buy & sell bikes.</h2><p>Built for riders who want less noise and more confidence before making a decision.</p></div>
          <div className="feature-list"><div><BadgeCheck /><span><b>Real listings</b><small>Browse bikes fetched from a public REST API.</small></span></div><div><Search /><span><b>Smart filters</b><small>Search by brand, type, price and keywords.</small></span></div><div><ShieldCheck /><span><b>Direct contact</b><small>Call or WhatsApp the seller in one tap.</small></span></div></div>
        </div>
      </section>
    </main>
  );
}

export default Home;
