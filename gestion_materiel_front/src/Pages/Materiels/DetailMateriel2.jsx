import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailsMateriel2() {
    const { id } = useParams();
    const [materiel, setMateriel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchMaterielDetails() {
        try {
            const res = await fetch(`/api/materiels/${id}`);
            const data = await res.json();

            if (res.ok) {
                setMateriel(data.data);
            } else {
                setError("Erreur lors de la récupération des informations du matériel");
            }
        } catch (error) {
            setError("Une erreur s'est produite : " + error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMaterielDetails();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>Détails du matériel</h1>
            {materiel ? (
                <div>
                    <p><strong>ID:</strong> {materiel.id}</p>
                    <p><strong>Type matériel:</strong> {materiel.type_materiel?.libelle || "Non spécifié"}</p>
                    <p><strong>Post au quel est associé ce matériel:</strong> {materiel.post?.nom || "Non spécifié"}</p>
                    <p><strong>Salle dans laquelle se trouve ce matériel:</strong> {materiel.salle?.nomination || "Non spécifiée"}</p>
                    <p><strong>Etat du matériel:</strong> {materiel.etat || "Non spécifié"}</p>
                    <p><strong>Localisation actuelle :</strong> {materiel.localisation || "Non spécifiée"}</p>
                    <p><strong>Date enregistrement :</strong> {materiel.date_entree ? new Date(materiel.date_sortie).toLocaleDateString() : "Non spécifiée"}</p>
                    <p><strong>Date de sortie du matériel:</strong> {materiel.date_sortie ? new Date(materiel.date_sortie).toLocaleDateString() : "Non spécifiée"}</p>
                    <p><strong>Numéro de série:</strong> {materiel.numero_serie || "Non spécifié"}</p>
                    <p><strong>Date de création:</strong> {materiel.created_at ? new Date(materiel.created_at).toLocaleDateString() : "Non spécifiée"}</p>
                </div>
            ) : (
                <p>Aucun détail disponible pour ce matériel</p>
            )}
        </>
    );
}
