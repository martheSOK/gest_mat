import { useContext, useState } from "react";
import log from '/public/log.png'; // Assure-toi que le chemin de l'image est correct
import toggle from '/public/toggle.png';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); 
  const [isDropdownOpen0, setIsDropdownOpen0] = useState(false); 
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false); 
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
  const [isDropdownOpen5, setIsDropdownOpen5] = useState(false);
  const [isDropdownOpen6, setIsDropdownOpen6] = useState(false);
  const [isDropdownOpen7,   setIsDropdownOpen7 ] = useState(false);
  // Fonction pour basculer la sidebar
 const toggleSidebar = () => {
    setIsOpen(!isOpen); // Bascule l'état de la sidebar
  };

  
  // Fonction pour basculer le menu déroulant
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };
  const toggleDropdown0 = () => {
    setIsDropdownOpen0(!isDropdownOpen0);
  };


  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };

  const toggleDropdown4 = () => {
    setIsDropdownOpen4(!isDropdownOpen4);
  };

  const toggleDropdown5 = () => {
    setIsDropdownOpen5(!isDropdownOpen5);
  };

  const toggleDropdown6 = () => {
    setIsDropdownOpen6(!isDropdownOpen6);
  };
  
  const toggleDropdown7 = () => {
    setIsDropdownOpen7(!isDropdownOpen7);
  };

 
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

  return (
    <div className="relative">
      {/* Bouton pour ouvrir/fermer la sidebar */}
      <span
          className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
          onClick={toggleSidebar}>
            <img className="w-12" src={toggle} alt="affiche la sidbar"/>
      </span>
      {isOpen && (
        <div className="sidebar fixed top-11 bottom-0 lg:left-0 p-2 w-[230px] overflow-y-auto text-center bg-gray-500">
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <img className="w-[70px] h-[25px]" src={log} alt="logo ifnti" />
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">Ifnti</h1>
              <i
                className="bi bi-x cursor-pointer ml-28 lg:hidden"
                onClick={toggleDropdown1} // Utilise la même fonction pour fermer
              ></i>
            </div>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
          </div>

          {/* Liens de navigation */}
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
          </div>
          

          <div className="my-4 bg-gray-600 h-[1px]"></div>

           {/* Menu déroulant User */}
           <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={toggleDropdown0}
          >
            <i className="bi bi-chat-left-text-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">User</span>
              <span className={`text-sm ${isDropdownOpen0 ? "rotate-180" : ""}`}>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>

          {/* Sous-menu de users */}
          {isDropdownOpen0 && (
            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
              <Link to="/create/users" className="nav-link">Create</Link>
              <br />
              <br />
              <Link to="/users" className="nav-link">Index</Link> 
            </div>
          )}


          {/* Menu déroulant Type Materiel */}
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={toggleDropdown1}
          >
            <i className="bi bi-chat-left-text-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">Type Materiel</span>
              <span className={`text-sm ${isDropdownOpen1 ? "rotate-180" : ""}`}>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>

          {/* Sous-menu de Type Materiel */}
          {isDropdownOpen1 && (
            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
              <Link to="/create/type_materiel" className="nav-link">Create</Link>
              <br />
              <br />
              <Link to="/type_materiels" className="nav-link">Index</Link> 
            </div>
          )}

          {/* Menu déroulant Salle */}
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={toggleDropdown2}
          >
            <i className="bi bi-chat-left-text-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">Salle</span>
              <span className={`text-sm ${isDropdownOpen2 ? "rotate-180" : ""}`}>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>

          {/* Sous-menu de Salle */}
          {isDropdownOpen2 && (
            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
              <Link to="/create/salle" className="nav-link">Create</Link>
              <br />
              <br />
              <Link to="/salles" className="nav-link">Index</Link> 
            </div>
          )}


           {/* Menu déroulant composant */}
           <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={toggleDropdown3}
          >
            <i className="bi bi-chat-left-text-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">Composant</span>
              <span className={`text-sm ${isDropdownOpen3 ? "rotate-180" : ""}`}>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>

          {/* Sous-menu de composant */}
          {isDropdownOpen3 && (
            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
              <Link to="/create/composant" className="nav-link">Create</Link>
              <br />
              <br />
              <Link to="/composants" className="nav-link">Index</Link> 
            </div>
          )}


          {/* Menu déroulant post */}
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={toggleDropdown4}
          >
            <i className="bi bi-chat-left-text-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">Post</span>
              <span className={`text-sm ${isDropdownOpen4 ? "rotate-180" : ""}`}>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>

          {/* Sous-menu de post */}
          {isDropdownOpen4 && (
            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
              <Link to="/create/post" className="nav-link">Create</Link>
              <br />
              <br />
              <Link to="/posts" className="nav-link">Index</Link> 
            </div>
          )}
          {/* Menu déroulant materiel */}
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={toggleDropdown5}
          >
            <i className="bi bi-chat-left-text-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">Materiel</span>
              <span className={`text-sm ${isDropdownOpen5 ? "rotate-180" : ""}`}>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>

          {/* Sous-menu de materiel */}
          {isDropdownOpen5 && (
            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
              <Link to="/create/materiels" className="nav-link">Create</Link>
              <br />
              <br />
              <Link to="/materiels" className="nav-link">Index</Link> 
            </div>
          )}


        {/* Menu déroulant prets */}
        <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={toggleDropdown6}
                  >
                    <i className="bi bi-chat-left-text-fill"></i>
                    <div className="flex justify-between w-full items-center">
                      <span className="text-[15px] ml-4 text-gray-200 font-bold">Pret</span>
                      <span className={`text-sm ${isDropdownOpen6 ? "rotate-180" : ""}`}>
                        <i className="bi bi-chevron-down"></i>
                      </span>
                    </div>
                  </div>

                  {/* Sous-menu de prets */}
                  {isDropdownOpen6 && (
                    <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
                      <Link to="/pret/create" className="nav-link">Enregistrer</Link>
                      <br />
                      <br />
                      <Link to="/prets" className="nav-link">Voire les prêts</Link> 
                    </div>
                  )}



                   
                   
              {/* Menu déroulant Inventaire */}
              <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={toggleDropdown7}
                  >
                    <i className="bi bi-chat-left-text-fill"></i>
                    <div className="flex justify-between w-full items-center">
                      <span className="text-[15px] ml-4 text-gray-200 font-bold">Inventaire</span>
                      <span className={`text-sm ${isDropdownOpen7 ? "rotate-180" : ""}`}>
                        <i className="bi bi-chevron-down"></i>
                      </span>
                    </div>
                  </div>

                  {/* Sous-menu d'inventaire */}
                  {isDropdownOpen7 && (
                    <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
                      <Link to="/Inventaire" className="nav-link">Voir l inventaire</Link>
                    </div>
                  )}


      
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-box-arrow-in-right"></i>
            {/* <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span> */}
            <form onSubmit={handleLogout}>
                  <button  type="submit" className="nav-link text-[15px] ml-4 text-gray-200 font-bold">Logout <p>{user.name}</p> </button>
                  {/* <p>{user.name}</p> */}
                </form>
          </div>
        </div>
      )}
    </div>
  );
}
