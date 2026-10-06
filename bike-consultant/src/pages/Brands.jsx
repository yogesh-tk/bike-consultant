import { Link } from "react-router-dom";
import { ArrowUpRight, Bike } from "lucide-react";
import { brands } from "../data/brands";

function Brands({ bikes }) {
  return (
    <main className="page-space"><div className="container">
      <div className="page-heading"><div><p className="eyebrow">BRANDWISE</p><h1>Choose by brand</h1><p>Explore popular names and discover available bikes.</p></div></div>
      <div className="brand-grid">
        {brands.slice(1).map((brand) => {
          const count = bikes.filter((bike) => bike.brand === brand).length;
          return <Link to={"/bikes?brand=" + encodeURIComponent(brand)} className="brand-card" key={brand}><div className="brand-icon"><Bike /></div><div><h3>{brand}</h3><p>{count} bikes available</p></div><ArrowUpRight /></Link>;
        })}
      </div>
    </div></main>
  );
}

export default Brands;
