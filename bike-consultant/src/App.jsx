import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BikeForm from "./components/BikeForm";
import Home from "./pages/Home";
import Bikes from "./pages/Bikes";
import Brands from "./pages/Brands";
import Search from "./pages/Search";
import Favourites from "./pages/Favourites";
import Login from "./pages/Login";
import Account from "./pages/Account";
import MyBikes from "./pages/MyBikes";
import { addBike, deleteBike, getBikes, updateBike } from "./api";
import { clearStoredUser, getFavourites, getLocalBikes, getStoredUser, saveFavourites, saveLocalBikes, saveStoredUser } from "./storage";

function App() {
  const [bikes, setBikes] = useState([]);
  const [user, setUser] = useState(getStoredUser());
  const [favourites, setFavourites] = useState(getFavourites());
  const [formOpen, setFormOpen] = useState(false);
  const [editingBike, setEditingBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadBikes();
  }, []);

  async function loadBikes() {
    setLoading(true);
    try {
      const apiBikes = await getBikes();
      const localBikes = getLocalBikes();
      const localIds = localBikes.map((bike) => bike.id);
      const merged = apiBikes.filter((bike) => !localIds.includes(bike.id)).concat(localBikes);
      const formatted = merged.map(formatBike);
      setBikes(formatted);
    } catch (error) {
      setBikes(getLocalBikes().map(formatBike));
      showNotice("API could not be reached. Showing saved local listings.");
    }
    setLoading(false);
  }

  function formatBike(bike) {
    return {
      ...bike,
      title: bike.title || bike.name || "Unnamed Bike",
      thumbnail: bike.thumbnail || bike.image || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85",
      description: bike.description || "Well maintained bike. Contact the seller for more details.",
      brand: bike.brand || "Yamaha",
      price: bike.price || 125000,
      year: bike.year || 2024,
      km: bike.km || 12500,
      type: bike.type || "Sport",
      fuel: bike.fuel || "Petrol",
      location: bike.location || "Madurai",
      sellerPhone: bike.sellerPhone || "919876543210",
      condition: bike.condition || "Good Condition"
    };
  }

  function showNotice(message) {
    setNotice(message);
    setTimeout(() => setNotice(""), 3000);
  }

  function handleLogin(nextUser) {
    saveStoredUser(nextUser);
    setUser(nextUser);
    showNotice("Welcome to Motora!");
  }

  function handleLogout() {
    clearStoredUser();
    setUser(null);
    navigate("/");
  }

  function toggleFavourite(id) {
    let next = [];
    if (favourites.includes(id)) {
      next = favourites.filter((item) => item !== id);
    } else {
      next = favourites.concat(id);
    }
    setFavourites(next);
    saveFavourites(next);
  }

  function openAdd() {
    if (!user) {
      navigate("/login");
      return;
    }
    setEditingBike(null);
    setFormOpen(true);
  }

  function openEdit(bike) {
    if (!user || user.role !== "admin") {
      showNotice("Only admins can update listings.");
      return;
    }
    setEditingBike(bike);
    setFormOpen(true);
  }

  async function saveBike(form) {
    try {
      if (editingBike) {
        const updated = await updateBike(editingBike.id, form);
        const nextBike = formatBike({ ...editingBike, ...form, ...updated });
        const next = bikes.map((bike) => bike.id === editingBike.id ? nextBike : bike);
        setBikes(next);
        saveLocalBikes(next.filter((bike) => bike.ownerId));
        showNotice("Bike updated successfully.");
      } else {
        const created = await addBike(form);
        const nextBike = formatBike({ ...form, ...created, ownerId: user.id, ownerName: user.firstName + " " + user.lastName });
        const next = [nextBike].concat(bikes);
        setBikes(next);
        saveLocalBikes(next.filter((bike) => bike.ownerId));
        showNotice("Bike published successfully.");
      }
      setFormOpen(false);
      setEditingBike(null);
    } catch (error) {
      showNotice(error.message || "Something went wrong.");
    }
  }

  async function handleDelete(id) {
    if (!user || user.role !== "admin") return;
    const bike = bikes.find((item) => item.id === id);
    if (!bike) return;
    const confirmed = window.confirm("Delete this bike listing?");
    if (!confirmed) return;
    try {
      await deleteBike(id);
      const next = bikes.filter((item) => item.id !== id);
      setBikes(next);
      saveLocalBikes(next.filter((item) => item.ownerId));
      showNotice("Bike deleted successfully.");
    } catch (error) {
      showNotice(error.message || "Could not delete bike.");
    }
  }

  return <div className="app">
    <Navbar user={user} favouriteCount={favourites.length} />
    {notice && <div className="toast">{notice}</div>}
    {loading ? <div className="loading-screen"><div className="loader"></div><p>Loading bikes...</p></div> : <Routes>
      <Route path="/" element={<Home bikes={bikes} />} />
      <Route path="/bikes" element={<Bikes bikes={bikes} user={user} favourites={favourites} onFavourite={toggleFavourite} onEdit={openEdit} onDelete={handleDelete} />} />
      <Route path="/brands" element={<Brands bikes={bikes} />} />
      <Route path="/search" element={<Search bikes={bikes} user={user} favourites={favourites} onFavourite={toggleFavourite} onEdit={openEdit} onDelete={handleDelete} />} />
      <Route path="/favourites" element={<Favourites bikes={bikes} favourites={favourites} user={user} onFavourite={toggleFavourite} onEdit={openEdit} onDelete={handleDelete} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/account" element={user ? <Account user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
      <Route path="/my-bikes" element={user ? <MyBikes bikes={bikes} user={user} favourites={favourites} onFavourite={toggleFavourite} onEdit={openEdit} onDelete={handleDelete} onAdd={openAdd} /> : <Login onLogin={handleLogin} />} />
      <Route path="*" element={<Home bikes={bikes} />} />
    </Routes>}
    {user && user.role !== "" && <button className="floating-upload" onClick={openAdd}>＋ Upload bike</button>}
    {formOpen && <BikeForm editingBike={editingBike} onClose={() => { setFormOpen(false); setEditingBike(null); }} onSave={saveBike} />}
    <footer><div className="container footer-inner"><div><div className="brand footer-brand"><span className="brand-mark">M</span><span>motora<span className="dot">.</span></span></div><p>Ride smarter. Choose better.</p></div><span>Frontend demo · React + REST API</span></div></footer>
  </div>;
}

export default App;
