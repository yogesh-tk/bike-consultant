import { LogOut, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

function Account({ user, onLogout }) {
  return <main className="page-space"><div className="container account-page">
    <div className="account-cover"><div className="account-avatar"><UserRound size={32} /></div><div><p className="eyebrow">MY ACCOUNT</p><h1>{user.firstName} {user.lastName}</h1><span className="role-pill">{user.role}</span></div></div>
    <div className="account-grid"><div className="account-card"><h3>Profile</h3><div className="account-line"><Mail /><span><small>Email</small><b>{user.email}</b></span></div><div className="account-line"><Phone /><span><small>Username</small><b>{user.username}</b></span></div><div className="account-line"><ShieldCheck /><span><small>Access</small><b>{user.role === "admin" ? "Full listing management" : "Buy, sell & contact"}</b></span></div></div><div className="account-card"><h3>Quick actions</h3><Link className="account-action" to="/my-bikes">My uploaded bikes →</Link><Link className="account-action" to="/favourites">Saved favourites →</Link><button className="logout-btn" onClick={onLogout}><LogOut size={16} /> Sign out</button></div></div>
  </div></main>;
}
export default Account;
