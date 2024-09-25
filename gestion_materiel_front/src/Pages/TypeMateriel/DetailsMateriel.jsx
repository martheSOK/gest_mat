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
            setError("Erreur réseau ou serveur");
        } finally {
            setLoading(false); // Terminer le chargement
        }
    }

    useEffect(() => {
        fetchMaterielDetails();
    }, [id]); // Appeler fetchMaterielDetails lorsque l'ID change

    // Affichage du chargement ou des erreurs
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    // Afficher les détails une fois récupérés
    return (
        <>
            <h1>Détails du matériel</h1>
            {materiel ? (
                <div>
                    <p><strong>ID:</strong> {materiel.id}</p>
                    <p><strong>Libellé:</strong> {materiel.libelle}</p>
                    <p><strong>Date de création:</strong> {new Date(materiel.created_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Aucun détail disponible pour ce matériel</p>
            )}
        </>
    );
}
