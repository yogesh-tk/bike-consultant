import { useMemo, useState } from "react";
import BikeCard from "../components/BikeCard";
import FilterBar from "../components/FilterBar";
import { SlidersHorizontal } from "lucide-react";

function Bikes({ bikes, user, favourites, onFavourite, onEdit, onDelete }) {
  const [filters, setFilters] = useState({ search: "", brand: "All Brands", type: "All Types", maxPrice: "1000000" });

  const filtered = useMemo(() => {
    return bikes.filter((bike) => {
      const search = filters.search.toLowerCase();
      const matchesSearch = !search || bike.title.toLowerCase().includes(search) || String(bike.brand || "").toLowerCase().includes(search);
      const matchesBrand = filters.brand === "All Brands" || bike.brand === filters.brand;
      const matchesType = filters.type === "All Types" || bike.type === filters.type;
      const matchesPrice = Number(bike.price || 0) <= Number(filters.maxPrice);
      return matchesSearch && matchesBrand && matchesType && matchesPrice;
    });
  }, [bikes, filters]);

  return (
    <main className="page-space">
      <div className="container">
        <div className="page-heading"><div><p className="eyebrow">EXPLORE</p><h1>Find your bike</h1><p>Search, filter and connect directly with sellers.</p></div><span className="result-count"><SlidersHorizontal size={16} /> {filtered.length} bikes</span></div>
        <FilterBar filters={filters} setFilters={setFilters} />
        <div className="bike-grid cards-grid">
          {filtered.map((bike) => <BikeCard key={bike.id} bike={bike} isFavourite={favourites.includes(bike.id)} onFavourite={onFavourite} user={user} onEdit={onEdit} onDelete={onDelete} />)}
        </div>
        {filtered.length === 0 && <div className="empty-state"><h3>No bikes found</h3><p>Try changing your search or filters.</p></div>}
      </div>
    </main>
  );
}

export default Bikes;
