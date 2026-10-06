import BikeCard from "../components/BikeCard";

function Favourites({ bikes, favourites, user, onFavourite, onEdit, onDelete }) {
  const liked = bikes.filter((bike) => favourites.includes(bike.id));
  return <main className="page-space"><div className="container"><div className="page-heading"><div><p className="eyebrow">SAVED</p><h1>Your favourites</h1><p>Keep your shortlisted bikes in one place.</p></div></div>{liked.length ? <div className="bike-grid cards-grid">{liked.map((bike) => <BikeCard key={bike.id} bike={bike} isFavourite={true} onFavourite={onFavourite} user={user} onEdit={onEdit} onDelete={onDelete} />)}</div> : <div className="empty-state"><h3>No favourites yet</h3><p>Tap the heart on a bike card to save it.</p></div>}</div></main>;
}
export default Favourites;
