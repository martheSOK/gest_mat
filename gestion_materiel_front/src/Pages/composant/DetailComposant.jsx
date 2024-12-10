import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailComposant() {
    // Récupérer l'ID depuis l'URL
    const { id } = useParams(); 
    // Stocker les détails de la salle
    const [composant, setComposant] = useState(null); 
    // Gérer l'état de chargement
    const [loading, setLoading] = useState(true); 
    // Gérer les erreurs
    const [error, setError] = useState(null); 

    // Fonction pour récupérer les détails d'une salle spécifique
    async function fetchSalleDetails() {
        try {
            const res = await fetch(`/api/composants/${id}`);
            const data = await res.json();

            if (res.ok) {
                // Assigner les données de la salle
                setComposant(data.data); 
            } else {
                setError("Erreur lors de la récupération des détails de la salle");
            }
        } catch (error) {
            setError("Erreur réseau ou serveur",error);
        } finally {
            setLoading(false); // Terminer le chargement
        }
    }

    useEffect(() => {
        fetchSalleDetails();
    }, [id]); // Appeler fetchMaterielDetails lorsque l'ID change

    // Affichage du chargement ou des erreurs
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    // Afficher les détails une fois récupérés
    return (
        <>
            <h1 className="title">Détails du composant</h1>
            <br />
            {composant ? (
                <div>
                    <p><strong>ID:</strong> {composant.id}</p>
                    <p><strong>Matériel au quel est associé se getComposant:</strong> {composant.materiel_id}</p>
                    <p><strong>Désignation:</strong> {composant.designation}</p>
                    <p><strong>Date de création:</strong> {new Date(composant.created_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Aucun détail disponible pour ce composant</p>
            )}
        </>
    );
}
