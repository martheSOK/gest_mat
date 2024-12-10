import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../Context/AppContext";

export default function UpdatePost() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const { id } = useParams(); // Récupérer l'ID du post à partir des paramètres d'URL

  const [formData, setFormData] = useState({
    salle_id: "",
    nom: "",
    etat: "",
  });

  const [salles, setSalles] = useState([]); // État pour stocker les salles
  const [errors, setErrors] = useState({});

  // Récupérer les données existantes du post
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`, {
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
          // Pré-remplir le formulaire avec les valeurs du post récupéré
          setFormData({
            salle_id: data.data.salle_id,
            nom: data.data.nom,
            etat: data.data.etat,
          });
        } else {
          console.error("Erreur dans les données retournées par l'API");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du post:", error);
      }
    }

    fetchPost();
  }, [id, token]);

  // Récupérer la liste des salles
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
          setSalles(data.data); // Stocker les données des salles
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des salles:", error);
      }
    }

    fetchSalles();
  }, [token]);

  // Soumettre les modifications
  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: "put",
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
      // Afficher SweetAlert pour confirmer la mise à jour
      Swal.fire({
        title: "Succès!",
        text: "Le post a été mis à jour avec succès.",
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
      <h1 className="title">Mettre à jour le post de travail</h1>

      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
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
              setFormData({ ...formData, nom: e.target.value })
            }
          />
          {errors.nom && <p className="error">{errors.nom[0]}</p>}
        </div>

        <div>
          <select
            value={formData.etat}
            onChange={(e) =>
              setFormData({ ...formData, etat: e.target.value })
            }
          >
            <option value="">Sélectionnez un état</option>
            <option value="Disponible">Disponible</option>
            <option value="Partiellement disponible">Partiellement disponible</option>
            <option value="Occupé">Occupé</option>
          </select>
          {errors.etat && <p className="error">{errors.etat[0]}</p>}
        </div>

        <button className="primary-btn">Mettre à jour</button>
      </form>
    </>
  );
}
