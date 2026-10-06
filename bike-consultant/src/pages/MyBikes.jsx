import { Plus } from "lucide-react";
import BikeCard from "../components/BikeCard";

function MyBikes({ bikes, user, favourites, onFavourite, onEdit, onDelete, onAdd }) {
  const mine = bikes.filter((bike) => bike.ownerId === user.id);
  return <main className="page-space"><div className="container"><div className="page-heading"><div><p className="eyebrow">MY LISTINGS</p><h1>My uploaded bikes</h1><p>Manage the bikes you have added to Motora.</p></div><button className="primary-btn" onClick={onAdd}><Plus size={17} /> Upload bike</button></div>{mine.length ? <div className="bike-grid cards-grid">{mine.map((bike) => <BikeCard key={bike.id} bike={bike} isFavourite={favourites.includes(bike.id)} onFavourite={onFavourite} user={user} onEdit={onEdit} onDelete={onDelete} />)}</div> : <div className="empty-state"><h3>No uploaded bikes</h3><p>Start your listing and let other riders contact you.</p><button className="primary-btn" onClick={onAdd}><Plus size={16} /> Upload your first bike</button></div>}</div></main>;
}
export default MyBikes;
