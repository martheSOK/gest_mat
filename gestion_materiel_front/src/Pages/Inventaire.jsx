import { useState } from "react";

export default function Inventaire() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  // Fonction pour récupérer les statistiques
  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/inventaire/statistiques/${dateDebut}/${dateFin}`
        
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des statistiques.");
      }
      const data = await response.json();
      console.log("aaaaaaaa");
      
      console.log(data);
      
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (dateDebut && dateFin) {
      fetchStats();
    } else {
      setError("Veuillez renseigner les deux dates.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Inventaire du Matériel entre deux dates</h1>

      {/* Formulaire */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Date début
          </label>
          <input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Date fin
          </label>
          <input
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleSearch}
          className="self-end md:self-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Rechercher
        </button>
      </div>

      {/* Erreur */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Chargement */}
      {loading && <p className="text-gray-500 text-center">Chargement...</p>}
{/* Tableau des statistiques */}
{stats && (
  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-left">Total début année</th>
        <th className="py-3 px-6 text-left">En utilisation</th>
        <th className="py-3 px-6 text-left">En stock</th>
        <th className="py-3 px-6 text-left">En location</th>
        <th className="py-3 px-6 text-left">En réparation</th>
        <th className="py-3 px-6 text-left">Stock hors service</th>
        <th className="py-3 px-6 text-left">Location hors service</th>
        <th className="py-3 px-6 text-left">Réparation hors service</th>
      </tr>
    </thead>
    <tbody className="text-gray-700 text-sm">
      {Object.entries(stats).map(([id, item], index) => (
        <tr
          key={id}
          className={`${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } border-b`}
        >
          <td className="py-3 px-6">{id}</td>
          <td className="py-3 px-6">{item.total_debut_annee}</td>
          <td className="py-3 px-6">{item.pf_en_utilisation}</td>
          <td className="py-3 px-6">{item.pf_en_stock}</td>
          <td className="py-3 px-6">{item.pf_en_location}</td>
          <td className="py-3 px-6">{item.ab_en_reparation}</td>
          <td className="py-3 px-6">{item.stock_et_hors_service}</td>
          <td className="py-3 px-6">{item.location_et_hors_service}</td>
          <td className="py-3 px-6">{item.reparation_et_hors_service}</td>
        </tr>
      ))}
    </tbody>
  </table>

      )}
    </div>
  );
}
