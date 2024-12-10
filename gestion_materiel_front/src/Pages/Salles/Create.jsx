import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AppContext } from "../../Context/AppContext";

export default function Create() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    nomination: "",
    nombre_post: ""

  });

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    const res = await fetch("/api/salles", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Ajout du Content-Type
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
        text: "La salle a été créé avec succès.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirection vers la liste des salles après confirmation
        navigate("/salles");
      });
    }
  }

  return (
    <>
      <h1 className="title">Créer une nouvelle salle</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Nom de la salle"
            value={formData.nomination}
            onChange={(e) =>
              setFormData({ ...formData, nomination: e.target.value })
            }
          />
          {errors.nomination && <p className="error">{errors.nomination[0]}</p>}
        </div>

        <div>
            <input
                type="text"
                placeholder="Nombre de post disponible"
                value={formData.nombre_post}
                onChange={(e) =>
                setFormData({ 
                    ...formData, 
                    nombre_post: parseInt(e.target.value, 10) || '' // Conversion en entier avec gestion du NaN
                })
                }
                
            />
            {errors.nombre_post && <p className="error">{errors.nombre_post[0]}</p>}
        </div>

        <button className="primary-btn">Créer</button>
      </form>
    </>
  );
}
