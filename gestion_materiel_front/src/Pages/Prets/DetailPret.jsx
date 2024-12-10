import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function DetailPret() {
    const { pret_id } = useParams();
    const [pret, setPret] = useState(null);
    const [lignePrets, setLignePrets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPret = async () => {
            try {
                const response = await fetch(`/api/prets/${pret_id}`);
                const data = await response.json();

                if (response.ok) {
                    setPret(data.data);
                }
                 else {
                    Swal.fire({
                        title: "Erreur!",
                        text: "Erreur lors de la récupération du prêt.",
                        icon: "error",
                    });
                }
            } 
            catch (error) {
                console.error("Erreur:", error);
                Swal.fire({
                    title: "Erreur!",
                    text: "Une erreur est survenue lors de la récupération des données.",
                    icon: "error",
                });
            } finally {
                setLoading(false);
            }
        };

        const fetchLignePrets = async () => {
            try {
                const response = await fetch(`/api/lignePrets/${pret_id}`);
                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    setLignePrets(data.data);
                } else {
                    Swal.fire({
                        title: "Erreur!",
                        text: "Erreur lors de la récupération des lignes de prêt.",
                        icon: "error",
                    });
                }
            } catch (error) {
                console.error("Erreur:", error);
                Swal.fire({
                    title: "Erreur!",
                    text: "Une erreur est survenue lors de la récupération des lignes de prêt.",
                    icon: "error",
                });
            }
        };

        fetchPret();
        fetchLignePrets();
    }, [pret_id]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!pret) {
        return <div>Aucun prêt trouvé.</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Détails du Prêt</h2>
            <div className="mb-4">
                <strong>ID du Prêt:</strong> {pret.id}
            </div>
            <div className="mb-4">
                <strong>Utilisateur:</strong> {pret.user.name}
            </div>
            <div className="mb-4">
                <strong>Date de Prêt:</strong> {new Date(pret.date_pret).toLocaleDateString()}
            </div>
            <div className="mb-4">
                <strong>Date de Retour Prévue:</strong> {new Date(pret.date_retour).toLocaleDateString()}
            </div>
            <div className="mb-4">
                <strong>Type de Prêt:</strong> {pret.type_pret}
            </div>
            <div className="mb-4">
                <strong>État:</strong> {pret.etat}
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Lignes de Prêt</h3>
            {lignePrets && lignePrets.length > 0 ? (
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Matériel</th>
                            <th className="border px-4 py-2">Quantité</th>
                            <th className="border px-4 py-2">Numéro de Série</th>
                            <th className="border px-4 py-2">État du Matériel</th>
                            <th className="border px-4 py-2">Localisation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lignePrets.map((ligne) => (
                            <tr key={ligne.id}>
                                <td className="border px-4 py-2">{ligne.materiel.type_materiel.libelle}</td>
                                <td className="border px-4 py-2">{ligne.quantite_preter}</td>
                                <td className="border px-4 py-2">{ligne.materiel.numero_serie}</td>
                                <td className="border px-4 py-2">{ligne.materiel.etat}</td>
                                <td className="border px-4 py-2">{ligne.materiel.localisation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Aucune ligne de prêt trouvée.</div>
            )}
        </div>
    );
}
