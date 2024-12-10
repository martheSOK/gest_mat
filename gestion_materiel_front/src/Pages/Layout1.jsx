import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Sidebar from "./Sidebar";
import toggle from '/public/toggle.png';

export default function Layout1() {
  const [isOpen, setIsOpen] = useState(true); 
  const { user, setToken, setUser, token } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const confirmation = window.confirm("Voulez-vous vraiment vous déconnecter ?");

    if (confirmation) {
      const res = await fetch("api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert(data.message);

      if (data.statut === "success") {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert("Erreur lors de la déconnexion");
      }
    } else {
      alert("Déconnexion annulée");
    }
  }
  
// Bascule l'état de la sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      {user && (
        <div className={`${isOpen ? 'block' : 'hidden'} transition-all duration-300`}>
          <Sidebar />
        </div>
      )}
      <div className="flex-grow">
        <header>
          <nav className="bg-gray-500 max-w-full">
            <div className="flex justify-items-center pl-18 space-x-20">
              <Link to="/" className="nav-link">Home</Link>

              {/* Bouton pour ouvrir/fermer la sidebar */}
              <span
                className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
                onClick={toggleSidebar}>
                <img className="w-12" src={toggle} alt="affiche la sidbar" />
              </span>
            </div>
            {user ? (
              <div className="flex items-center space-x-4">
                <p className="text-slate-700 text-xs justify-items-center">Bienvenue {user.name}</p>
                <form onSubmit={handleLogout}>
                  <button type="submit" className="nav-link">Logout</button>
                </form>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/register" className="nav-link">Register</Link>
                <Link to="/login" className="nav-link">Login</Link>
              </div>
            )}
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
