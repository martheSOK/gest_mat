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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Créer un nouveau type de matériel
        </h1>

        <form onSubmit={handleCreate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Libellé
            </label>
            <input
              type="text"
              placeholder="Libellé"
              value={formData.libelle}
              onChange={(e) =>
                setFormData({ ...formData, libelle: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.libelle && (
              <p className="text-red-500 text-sm mt-1">{errors.libelle[0]}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Créer
          </button>
        </form>
      </div>
    </div>
  );
}
