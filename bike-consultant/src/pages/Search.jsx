import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import BikeCard from "../components/BikeCard";

function Search({ bikes, user, favourites, onFavourite, onEdit, onDelete }) {
  const [query, setQuery] = useState("");
  const results = bikes.filter((bike) => bike.title.toLowerCase().includes(query.toLowerCase()) || String(bike.brand || "").toLowerCase().includes(query.toLowerCase()));

  return <main className="page-space"><div className="container search-page">
    <div className="search-hero"><p className="eyebrow">SEARCH</p><h1>What are you looking for?</h1><p>Search across bike names and brands.</p><div className="big-search"><SearchIcon size={22} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try MT 15, Yamaha, KTM..." /></div></div>
    {query && <p className="search-result-label">Showing {results.length} results for “{query}”</p>}
    <div className="bike-grid cards-grid">{results.map((bike) => <BikeCard key={bike.id} bike={bike} isFavourite={favourites.includes(bike.id)} onFavourite={onFavourite} user={user} onEdit={onEdit} onDelete={onDelete} />)}</div>
  </div></main>;
}

export default Search;
