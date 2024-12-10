
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../Context/AppContext";


export default function Createmateriel(){

    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [formData, setFormData] = useState({
        type_materiel_id: "",
        post_id: "",
        salle_id : "",
        etat: "",
        localisation: "",
        date_entree: "",
        date_sortie: "",
        numero_serie: "",
       
  });
// État pour stocker les salles les erreurs
const [type_materiels, setTypes]=useState([]);
  const [posts, setPosts] = useState([]);
  const [salles, setSalles] = useState([]); 

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchTypes() {
      try {
        const res = await fetch("/api/type_materiels", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error(`Erreur : ${res.status}`);
        }
  
        const data = await res.json();
        console.log(data); 
  
        if (data.success) {
             // Stockez les données des salles dans l'état
            setTypes(data.data);
        } else {
          console.error("Erreur dans les données retournées par l'API");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des types matériels:", error);
      }
    }
  
    fetchTypes();
  }, [token]);


  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error(`Erreur : ${res.status}`);
        }
  
        const data = await res.json();
        console.log(data); 
  
        if (data.success) {
            // Stockez les données des posts dans l'état
            setPosts(data.data); 
        } else {
          console.error("Erreur dans les données retournées par l'API");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des postes:", error);
      }
    }
  
    fetchPosts();
  }, [token]);


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
        console.log(data); 
  
        if (data.success) {
        // Stockez les données des salles dans l'état
          setSalles(data.data); 
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
    console.log(formData);
    const res = await fetch("/api/materiels", {
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
        // Redirection vers la liste des matériaux après confirmation
        navigate("/materiels");
      });
    }
  }

    return (
        <>
         <h1 className="title">Enrégistrer un nouveau matériel</h1>

        <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div>
            <select
              value={formData.type_materiel_id}
              onChange={(e) =>
                setFormData({ ...formData, type_materiel_id: e.target.value })
              }
            >
              <option value="">Sélectionnez un type pour ce matériel</option>
              {type_materiels.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.libelle} 
                </option>
              ))}
            </select>
            {errors.type_materiel_id && <p className="error">{errors.type_materiel_id[0]}</p>}
        </div>
            <div>
            <select
                value={formData.post_id}
                onChange={(e) =>
                setFormData({ ...formData, post_id: e.target.value })
                }
            >
                <option value="">Sélectionnez un post pour ce matériel</option>
                {posts.map((post) => (
                <option key={post.id} value={post.id}>
                    {post.nom} 
                </option>
                ))}
            </select>
            {errors.post_id && <p className="error">{errors.post_id[0]}</p>}
        </div>


        <div>
            <select
              value={formData.salle_id}
              onChange={(e) =>
                setFormData({ ...formData, salle_id: e.target.value })
              }
            >
              <option value="">Sélectionnez une salle pour ce matériel</option>
              {salles.map((salle) => (
                <option key={salle.id} value={salle.id}>
                  {salle.nomination} 
                </option>
              ))}
            </select>
            {errors.salle_id && <p className="error">{errors.salle_id[0]}</p>}
        </div>

        <div>
            <select
                value={formData.etat}
                onChange={(e) =>
                setFormData({ 
                    ...formData, 
                    etat: e.target.value 
                })
                } >    
                <option value="">Sélectionnez un état</option> {/* Option par défaut */}
                <option value="Présent fonctionnel">Présent fonctionnel</option>
                <option value="Présent hors service">Présent hors service</option>
                <option value="Absent">Absent</option>
            </select>
            {errors.etat && <p className="error">{errors.etat[0]}</p>}
        </div>

        <div>
            <select
                value={formData.localisation}
                onChange={(e) =>
                setFormData({ 
                    ...formData, 
                    localisation: e.target.value 
                })
                }>  
                <option value="">Sélectionnez une localisation</option> {/* Option par défaut */}
                <option value="en magasin">En magasin</option>
                <option value="en utilisation">En utilisation</option>
                <option value="en reparation">En reparation</option>
                <option value="en location">En location</option>
                <option value="don">Don</option>
            </select>
            {errors.localisation && <p className="error">{errors.localisation[0]}</p>}
        </div>

        <div className="w-50 h-30 bg-slate-200">
            <label htmlFor="">Date entree</label>
            <input
              type="date"
              placeholder="Date d'entree"
              value={formData.date_entree}
              onChange={(e) =>
                setFormData({ 
                  ...formData, 
                  date_entree: e.target.value 
                })
              }
            />
            {errors.date_entree && <p className="error">{errors.date_entree[0]}</p>}
        </div>
        <div className="w-50 h-30 bg-slate-200">
            <label htmlFor="">Date sortie</label>
            <input
              type="date"
              placeholder="Date de sortie"
              value={formData.date_sortie}
              onChange={(e) =>
                setFormData({ 
                  ...formData, 
                  date_sortie: e.target.value 
                })
              }
            />
            {errors.date_sortie && <p className="error">{errors.date_sortie[0]}</p>}
        </div>
        <div>
            
            <input
              type="text"
              placeholder="Numero Série"
              value={formData.numero_serie}
              onChange={(e) =>
                setFormData({ 
                  ...formData, 
                  numero_serie: e.target.value 
                })
              }
            />
            {errors.numero_serie && <p className="error">{errors.numero_serie[0]}</p>}
        </div>
  
          <button className="primary-btn">Enregistrer</button>
        </form>
      </>
    );



}