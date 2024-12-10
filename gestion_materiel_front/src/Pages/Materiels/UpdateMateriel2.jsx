import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../Context/AppContext";

export default function UpdateMateriel2() {
  const { id } = useParams(); // Récupère l'ID du matériel à partir de l'URL
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  // Stocker les données du formulaire
  const [formData, setFormData] = useState({
    type_materiel_id: "",
    post_id: "",
    salle_id: "",
    etat: "",
    localisation: "",
    date_entree: "",
    date_sortie: "",
    numero_serie: "",
  });

  // Stocker les types de matériel, posts, salles et erreurs
  const [type_materiels, setTypes] = useState([]);
  const [posts, setPosts] = useState([]);
  const [salles, setSalles] = useState([]);
  const [errors, setErrors] = useState({});

  // Fonction pour récupérer les détails du matériel à modifier
  useEffect(() => {
    async function fetchMaterielDetails() {
      try {
        const res = await fetch(`/api/materiels/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Erreur : ${res.status}`);
        }

        const data = await res.json();
        if (data.success) {
          // Préremplir les champs du formulaire avec les données existantes du matériel
          setFormData(data.data);
        } else {
          console.error("Erreur lors de la récupération du matériel.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du matériel:", error);
      }
    }

    fetchMaterielDetails();
  }, [id, token]);

  // Récupérer les types de matériel
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
        setTypes(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des types matériels:", error);
      }
    }

    fetchTypes();
  }, [token]);

  // Récupérer les posts
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
        setPosts(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
      }
    }

    fetchPosts();
  }, [token]);

  // Récupérer les salles
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
        setSalles(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des salles:", error);
      }
    }

    fetchSalles();
  }, [token]);



  const updatedFormData = {
    ...formData,
    date_entree: formData.date_entree ? new Date(formData.date_entree).toISOString().split('T')[0] : '',
    date_sortie: formData.date_sortie ? new Date(formData.date_sortie).toISOString().split('T')[0] : '',
  };
  // Gestion de la soumission du formulaire pour mettre à jour le matériel
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/materiels/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await res.json();
      if (data.errors) {
        setErrors(data.errors);
      } else {
        Swal.fire({
          title: "Succès!",
          text: "Le matériel a été mis à jour avec succès.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/materiels");
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du matériel:", error);
    }
  }

  return (
    <>
      <h1 className="title">Mettre à jour le matériel</h1>

      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
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
            onChange={(e) => setFormData({ ...formData, post_id: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, salle_id: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, etat: e.target.value })}
          >
            <option value="">Sélectionnez un état</option>
            <option value="Présent fonctionnel">Présent fonctionnel</option>
            <option value="Présent hors service">Présent hors service</option>
            <option value="Absent">Absent</option>
          </select>
          {errors.etat && <p className="error">{errors.etat[0]}</p>}
        </div>

        <div>
          <select
            value={formData.localisation}
            onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
          >
            <option value="">Sélectionnez une localisation</option>
            <option value="en magasin">En magasin</option>
            <option value="en utilisation">En utilisation</option>
            <option value="en reparation">En réparation</option>
            <option value="en location">En location</option>
            <option value="don">Don</option>
          </select>
          {errors.localisation && <p className="error">{errors.localisation[0]}</p>}
        </div>

        <div className="w-50 h-30 bg-slate-200">
          <label htmlFor="">Date entrée</label>
          <input
            type="date"
            placeholder="Date d'entrée"
            value={formData.date_entree}
            onChange={(e) =>
              setFormData({ ...formData, date_entree: e.target.value })
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
              setFormData({ ...formData, date_sortie: e.target.value })
            }
          />
          {errors.date_sortie && <p className="error">{errors.date_sortie[0]}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Numéro Série"
            value={formData.numero_serie}
            onChange={(e) =>
              setFormData({ ...formData, numero_serie: e.target.value })
            }
          />
          {errors.numero_serie && <p className="error">{errors.numero_serie[0]}</p>}
        </div>

        <div>
          <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
            Mettre à jour
          </button>
        </div>
      </form>
    </>
  );
}
