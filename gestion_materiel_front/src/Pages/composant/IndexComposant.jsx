import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function IndexComposant() {
    const [composants, setComposant] = useState([]);
    const navigate = useNavigate(); // Ajout de useNavigate

    async function getComposant() {
        const res = await fetch("/api/composants");
        const data = await res.json();
        if (res.ok) {
            setComposant(data);
        }
    }

    // Fonction pour gérer la suppression d'un composant
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Cette action ne peut pas être annulée!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            const res = await fetch(`/api/composants/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                Swal.fire(
                    'Supprimé!',
                    'Le composant a été supprimé.',
                    'success'
                );
                setComposant(composants.filter((c) => c.id !== id)); // Mise à jour de la liste
            } else {
                Swal.fire(
                    'Erreur!',
                    'Une erreur est survenue lors de la suppression.',
                    'error'
                );
            }
        }
    };

    useEffect(() => {
        getComposant();
    }, []);

    return (
        <div className="p-3">
            {/* En-tête avec titre et boutons */}
            <div className="flex justify-between items-center mb-6">
                {/* Bouton pour revenir à la page précédente */}
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-600 text-white text-sm rounded-lg px-4 py-2"
                >
                    Retour
                </button>

                {/* Titre centré */}
                <h1 className="text-2xl font-bold text-center flex-grow">
                    Liste des composants
                </h1>

                {/* Bouton pour créer un nouveau composant */}
                <button
                    onClick={() => navigate("/composant/create")}
                    className="bg-blue-600 text-white text-sm rounded-lg px-4 py-2"
                >
                    Créer un nouveau composant
                </button>
            </div>

            {/* Tableau ou message si aucun composant */}
            {composants.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-400 shadow-md">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="border border-gray-300 p-3 text-center">ID</th>
                            <th className="border border-gray-300 p-3 text-center">Matériel</th>
                            <th className="border border-gray-300 p-3 text-center">Nom du composant</th>
                            <th className="border border-gray-300 p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {composants.map((composant) => (
                            <tr key={composant.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300  text-center">{composant.id}</td>
                                <td className="border border-gray-300 p-3 text-center">{composant.materiel_id}</td>
                                <td className="border border-gray-300 p-3 text-center">{composant.designation}</td>
                                <td className="border border-gray-300 p-3 text-center space-x-2">
                                    <Link
                                        to={`/composant/show/${composant.id}`}
                                        className="bg-blue-600 text-white text-sm rounded-lg px-2 py-1"
                                    >
                                        Voir détails
                                    </Link>

                                    <Link
                                        to={`/composant/update/${composant.id}`}
                                        className="bg-green-600 text-white text-sm rounded-lg px-2 py-1"
                                    >
                                        Modifier
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(composant.id)}
                                        className="bg-red-600 text-white text-sm rounded-lg px-2 py-1"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-600">Aucun composant disponible</p>
            )}
        </div>
    );
}
