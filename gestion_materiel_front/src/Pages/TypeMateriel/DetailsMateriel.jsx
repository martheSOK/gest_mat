import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailsMateriel() {
  // Récupérer l'ID depuis l'URL
  const { id } = useParams();
  // Stocker les détails du matériel
  const [materiel, setMateriel] = useState(null);
  // Gérer l'état de chargement
  const [loading, setLoading] = useState(true);
  // Gérer les erreurs
  const [error, setError] = useState(null);

  // Fonction pour récupérer les détails d'un matériel spécifique
  async function fetchMaterielDetails() {
    try {
      const res = await fetch(`/api/type_materiels/${id}`);
      const data = await res.json();

      if (res.ok) {
        // Assigner les données du matériel
        setMateriel(data.data);
      } else {
        setError("Erreur lors de la récupération des détails du matériel");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Terminer le chargement
    }
  }

  useEffect(() => {
    fetchMaterielDetails();
  }, [id]); // Appeler fetchMaterielDetails lorsque l'ID change

  // Affichage du chargement ou des erreurs
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-xl">Chargement...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );

  // Afficher les détails une fois récupérés
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Détails du Matériel
        </h1>
        {materiel ? (
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold text-gray-700">ID:</span>{" "}
              <span className="text-gray-800">{materiel.id}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-700">Libellé:</span>{" "}
              <span className="text-gray-800">{materiel.libelle}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-700">Date de création:</span>{" "}
              <span className="text-gray-800">
                {new Date(materiel.created_at).toLocaleDateString()}
              </span>
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Aucun détail disponible pour ce matériel.</p>
        )}
      </div>
    </div>
  );
}
