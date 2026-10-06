import { Link, useLocation } from "react-router-dom";
import { Bike, Heart, Menu, Search, UserRound, X } from "lucide-react";
import { useState } from "react";

function Navbar({ user, favouriteCount }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  function closeMenu() {
    setOpen(false);
  }

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark"><Bike size={21} /></span>
          <span>motora<span className="dot">.</span></span>
        </Link>

        <nav className={open ? "nav-links open" : "nav-links"}>
          <Link className={isActive("/") ? "active" : ""} to="/" onClick={closeMenu}>Home</Link>
          <Link className={isActive("/bikes") ? "active" : ""} to="/bikes" onClick={closeMenu}>Bikes</Link>
          <Link className={isActive("/brands") ? "active" : ""} to="/brands" onClick={closeMenu}>Brands</Link>
          <Link className={isActive("/search") ? "active" : ""} to="/search" onClick={closeMenu}><Search size={16} /> Search</Link>
          {user && <Link className={isActive("/my-bikes") ? "active" : ""} to="/my-bikes" onClick={closeMenu}>My Uploads</Link>}
          <Link className={isActive("/favourites") ? "active" : ""} to="/favourites" onClick={closeMenu}><Heart size={16} /> Favourites <span className="count-badge">{favouriteCount}</span></Link>
          <Link className="mobile-account" to={user ? "/account" : "/login"} onClick={closeMenu}><UserRound size={16} /> {user ? "Account" : "Login"}</Link>
        </nav>

        <Link className="account-btn" to={user ? "/account" : "/login"}>
          <UserRound size={17} />
          <span>{user ? user.firstName : "Login"}</span>
        </Link>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
