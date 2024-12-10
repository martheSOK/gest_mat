
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../Context/AppContext";


export default function CreatePost(){


    const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
        salle_id:"",
        nom:"",
        etat:""
  });
// État pour stocker les salles les erreurs
  const [salles, setSalles] = useState([]); 
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchSalles() {
      try {
        const res = await fetch("/api/salles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error(`Erreur : ${res.status}`);
        }
  
        const data = await res.json();
        console.log(data); // Pour déboguer
  
        if (data.success) {
          setSalles(data.data); // Stockez les données des salles dans l'état
        } else {
          console.error("Erreur dans les données retournées par l'API");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des salles:", error);
      }
    }
  
    fetchSalles();
  }, [token]);
  

  async function handleCreate(e) {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      // Afficher SweetAlert pour confirmer la création
      Swal.fire({
        title: "Succès!",
        text: "Le post a été créé avec succès.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirection vers la liste des posts après confirmation
        navigate("/posts");
      });
    }
  }

    return (
        <>
         <h1 className="title">Créer un nouveau post de travail</h1>
        <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
          <div>
            <select
              value={formData.salle_id}
              onChange={(e) =>
                setFormData({ ...formData, salle_id: e.target.value })
              }
            >
              <option value="">Sélectionnez une salle pour ce post</option>
              {salles.map((salle) => (
                <option key={salle.id} value={salle.id}>
                  {salle.nomination} 
                </option>
              ))}
            </select>
            {errors.salle_id && <p className="error">{errors.salle_id[0]}</p>}
          </div>
  
          <div>
            <input
              type="text"
              placeholder="Nom du post"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ 
                  ...formData, 
                  nom: e.target.value 
                })
              }
            />
            {errors.nom && <p className="error">{errors.nom[0]}</p>}
          </div>

          <div>
                <select
                    value={formData.etat}
                    onChange={(e) =>
                    setFormData({ 
                        ...formData, 
                        etat: e.target.value 
                    })
                    }
                >
                    <option value="">Sélectionnez un état</option> {/* Option par défaut */}
                    <option value="Disponible">Disponible</option>
                    <option value="Partiellement disponible">Partiellement disponible</option>
                    <option value="Occupé">Occupé</option>
                </select>
                {errors.etat && <p className="error">{errors.etat[0]}</p>}
            </div>
  
          <button className="primary-btn">Créer</button>
        </form>
      </>
    );



}