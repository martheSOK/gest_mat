import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailPost() {
    // Récupérer l'ID depuis l'URL
    const { id } = useParams(); 
    // Stocker les détails de la salle
    const [post, setPost] = useState(null); 
    // Gérer l'état de chargement
    const [loading, setLoading] = useState(true); 
    // Gérer les erreurs
    const [error, setError] = useState(null); 

    // Fonction pour récupérer les détails d'une salle spécifique
    async function fetchPostDetails() {
        try {
            const res = await fetch(`/api/posts/${id}`);
            const data = await res.json();

            if (res.ok) {
                // Assigner les données du post
                setPost(data.data); 
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
        fetchPostDetails();
    }, [id]); // Appeler fetchMaterielDetails lorsque l'ID change

    // Affichage du chargement ou des erreurs
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    // Afficher les détails une fois récupérés
    return (
        <>
            <h1 className="title">Détails du post</h1>
            <br />
            {post ? (
                <div>
                    <p><strong>ID:</strong> {post.id}</p>
                    <p><strong>Salle du post : </strong> {post.salle.nomination}</p>
                    <p><strong>Nom du post : </strong> {post.nom}</p>
                    <p><strong>Etat du post : </strong> {post.etat}</p>
                    <p><strong>Date de création : </strong> {new Date(post.created_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Aucun détail disponible pour ce post</p>
            )}
        </>
    );
}
