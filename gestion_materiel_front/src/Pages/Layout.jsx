import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, setToken, setUser, token } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    
    // Demande de confirmation à l'utilisateur
    const confirmation = window.confirm("Voulez-vous vraiment vous déconnecter ?");
  
    if (confirmation) {
      // Si l'utilisateur confirme, procéder au logout
      const res = await fetch("api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json(); // Convertir la réponse en JSON
      alert(data.message); // Afficher le message de déconnexion
  
      if (data.statut === "success") {
       // alert("Vous êtes déconnecté");
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert("Erreur lors de la déconnexion");
      }
    } else {
      // Si l'utilisateur annule, ne rien faire
      alert("Déconnexion annulée");
    }
  }
  
  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <p className="text-slate-400 text-xs">Welcome back {user.name}</p>
              <Link to="/create/type_materiel" className="nav-link">
                New Type material
              </Link>
              <form onSubmit={handleLogout}>
                <button type="submit" className="nav-link">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </div>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
