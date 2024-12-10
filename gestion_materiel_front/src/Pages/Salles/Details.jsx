import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Details() {
    const { id } = useParams();
    const [salle, setSalle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchSalleDetails() {
        try {
            const res = await fetch(`/api/salles/${id}`);
            const data = await res.json();

            if (res.ok) {
                setSalle(data.data);
            } else {
                setError("Erreur lors de la récupération des détails de la salle.");
            }
        } catch (error) {
            setError("Erreur réseau ou serveur.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSalleDetails();
    }, [id]);

    if (loading) return <p className="text-center text-blue-500">Chargement...</p>;
    if (error)
        return (
            <p className="text-center text-red-500">
                Une erreur est survenue : {error}
            </p>
        );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Détails de la salle
                </h1>
                {salle ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-green-50 px-4 py-2 rounded-md">
                            <span className="text-gray-600 font-medium">ID:</span>
                            <span className="text-gray-800">{salle.id}</span>
                        </div>
                        <div className="flex justify-between items-center bg-green-50 px-4 py-2 rounded-md">
                            <span className="text-gray-600 font-medium">Nomination:</span>
                            <span className="text-gray-800">{salle.nomination}</span>
                        </div>
                        <div className="flex justify-between items-center bg-green-50 px-4 py-2 rounded-md">
                            <span className="text-gray-600 font-medium">Nombre de postes:</span>
                            <span className="text-gray-800">{salle.nombre_post}</span>
                        </div>
                        <div className="flex justify-between items-center bg-green-50 px-4 py-2 rounded-md">
                            <span className="text-gray-600 font-medium">Date de création:</span>
                            <span className="text-gray-800">
                                {new Date(salle.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Aucun détail disponible pour cette salle.</p>
                )}
            </div>
        </div>
    );
}
