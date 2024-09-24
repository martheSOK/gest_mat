import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AppContext } from "../../Context/AppContext";

export default function CreateMateriel() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    libelle: "",
  });

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    const res = await fetch("/api/type_materiels", {
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
        text: "Le type de matériel a été créé avec succès.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirection vers la liste des types de matériels après confirmation
        navigate("/type_materiels");
      });
    }
  }

  return (
    <>
      <h1 className="title">Créer un nouveau type de matériel</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Libellé"
            value={formData.libelle}
            onChange={(e) =>
              setFormData({ ...formData, libelle: e.target.value })
            }
          />
          {errors.libelle && <p className="error">{errors.libelle[0]}</p>}
        </div>
        <button className="primary-btn">Créer</button>
      </form>
    </>
  );
}
