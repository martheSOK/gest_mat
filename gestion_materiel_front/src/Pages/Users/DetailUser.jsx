import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchUserDetails() {
        try {
            const res = await fetch(`/api/users/${id}`);
            const data = await res.json();

            if (res.ok) {
                setUser(data.data);
            } else {
                setError("Erreur lors de la récupération des détails de l'utilisateur.");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserDetails();
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
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 underline">
                    Détails du user
                </h1>
                {user ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-blue-50 px-4 py-2 rounded-md">
                            <span className="text-gray-600 font-medium">ID:</span>
                            <span className="text-gray-800">{user.id}</span>
                        </div>
                        <div className="flex justify-between items-center bg-blue-50 px-4 py-2 rounded-md">
                            <span className="text-gray-600 font-medium">Nom:</span>
                            <span className="text-gray-800">{user.name}</span>
                        </div>
                        <div className="flex justify-between items-center bg-blue-50 px-4 py-2 rounded-md">
                            <span className="text-gray-600 font-medium">Prénom:</span>
                            <span className="text-gray-800">{user.prenom}</span>
                        </div>
                        <div className="flex justify-between items-center bg-blue-50 px-4 py-2 rounded-md">
                            <span className="text-gray-600 font-medium">Contact:</span>
                            <span className="text-gray-800">{user.contact}</span>
                        </div>
                        <div className="flex justify-between items-center bg-blue-50 px-4 py-2 rounded-md">
                            <span className="text-gray-600 font-medium">Email:</span>
                            <span className="text-gray-800">{user.email}</span>
                        </div>
                        <div className="flex justify-between items-center bg-blue-50 px-4 py-2 rounded-md">
                            <span className="text-gray-600 font-medium">Date de création:</span>
                            <span className="text-gray-800">
                                {new Date(user.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Aucun détail disponible.</p>
                )}
            </div>
        </div>
    );
}
