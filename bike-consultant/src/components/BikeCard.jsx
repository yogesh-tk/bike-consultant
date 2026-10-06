import { Edit3, Heart, MessageCircle, Phone, Trash2 } from "lucide-react";

function BikeCard({ bike, isFavourite, onFavourite, user, onEdit, onDelete }) {
  const phone = bike.sellerPhone || "919876543210";
  const whatsappText = "Hi, I am interested in your " + bike.title + ". Is it still available?";

  return (
    <article className="bike-card">
      <div className="bike-image-wrap">
        <img src={bike.thumbnail} alt={bike.title} className="bike-image" />
        <span className="bike-tag">{bike.condition || "Verified"}</span>
        <button className={isFavourite ? "heart-btn liked" : "heart-btn"} onClick={() => onFavourite(bike.id)} aria-label="Favourite">
          <Heart size={19} fill={isFavourite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="bike-card-body">
        <div className="card-topline">
          <span>{bike.brand || "Motora"}</span>
          <span className="rating">★ {bike.rating || "4.8"}</span>
        </div>
        <h3>{bike.title}</h3>
        <p className="bike-description">{bike.description}</p>
        <div className="spec-row">
          <span>{bike.year || "2024"}</span>
          <span>{bike.km || "12,500"} km</span>
          <span>{bike.fuel || "Petrol"}</span>
        </div>
        <div className="price-row">
          <strong>₹{Number(bike.price || 0).toLocaleString("en-IN")}</strong>
          <span>{bike.location || "Madurai"}</span>
        </div>

        <div className="card-actions">
          <a className="call-btn" href={"tel:" + phone}><Phone size={16} /> Call</a>
          <a className="whatsapp-btn" href={"https://wa.me/" + phone + "?text=" + encodeURIComponent(whatsappText)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
        </div>

        {user && user.role === "admin" && (
          <div className="admin-actions">
            <button onClick={() => onEdit(bike)}><Edit3 size={15} /> Edit</button>
            <button className="delete-btn" onClick={() => onDelete(bike.id)}><Trash2 size={15} /> Delete</button>
          </div>
        )}
      </div>
    </article>
  );
}

export default BikeCard;
