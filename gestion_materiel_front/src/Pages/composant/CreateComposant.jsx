import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../Context/AppContext";

export default function CreateComposant() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    materiel_id: "",
    designation: "",
  });

  const [materiels, setMateriels] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchMateriels() {
      setLoading(true);
      try {
        const res = await fetch("/api/materiels", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setMateriels(data.data);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des matériels:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMateriels();
  }, [token]);

  function validateForm() {
    const newErrors = {};
    if (!formData.materiel_id)
      newErrors.materiel_id = ["Veuillez sélectionner un matériel."];
    if (!formData.designation)
      newErrors.designation = ["Veuillez entrer une désignation."];
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/composants", {
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
      } 
      else {
        Swal.fire({
          title: "Succès!",
          text: "Le composant a été créé avec succès.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/composants");
        });
      }
    }
    catch (err) {
      Swal.fire({
        title: "Erreur",
        text: `Une erreur est survenue : ${err.message || "Veuillez réessayer plus tard."}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
    
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Créer un nouveau composant
      </h1>

      <form onSubmit={handleCreate} className="space-y-6">
        {/* Sélecteur de matériel */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Matériel
          </label>
          {loading ? (
            <p className="text-gray-500">Chargement des matériels...</p>
          ) : (
            <select
              value={formData.materiel_id}
              onChange={(e) =>
                setFormData({ ...formData, materiel_id: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Sélectionnez un matériel</option>
              {materiels.map((materiel) => (
                <option key={materiel.id} value={materiel.id}>
                  {`${materiel.type_materiel_id} - ${materiel.numero_serie}`}
                </option>
              ))}
            </select>
          )}
          {errors.materiel_id && (
            <p className="text-red-500 text-sm mt-2">{errors.materiel_id[0]}</p>
          )}
        </div>

        {/* Champ de désignation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Désignation
          </label>
          <input
            type="text"
            placeholder="Nom du composant"
            value={formData.designation}
            onChange={(e) =>
              setFormData({ ...formData, designation: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm mt-2">{errors.designation[0]}</p>
          )}
        </div>

        {/* Boutons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)} // Retour à la page précédente
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md"
          >
            Retour
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-2 px-4 rounded-md font-semibold ${
              isSubmitting
                ? "bg-indigo-300 text-white cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
          >
            {isSubmitting ? "Création en cours..." : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}
