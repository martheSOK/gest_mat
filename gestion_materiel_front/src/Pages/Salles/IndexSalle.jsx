import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function IndexSalle() {
    const [salles, setSalle] = useState([]);
    const navigate = useNavigate(); 

    async function getSalle() {
        const res = await fetch("/api/salles");
        const data = await res.json();
        console.log(data);
    
        if (res.ok) {
            setSalle(data.data);
        }
    }

    // Fonction pour gérer la suppression d'une salle
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Cette action peut être annulée!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`/api/salles/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();

                if (res.ok) {
                    Swal.fire(
                        'Supprimé!',
                        'La salle a été supprimée avec succès.',
                        'success'
                    );
                    navigate("/salles"); 
                } else {
                    // Affiche le message d'erreur spécifique venant de l'API
                    Swal.fire(
                        'Erreur!',
                        data.message || 'Une erreur est survenue lors de la suppression.',
                        'error'
                    );
                }
            } catch (error) {
                Swal.fire(
                    'Erreur!',
                    'Une erreur inattendue est survenue.',
                    'error',
                    error
                );
            }
        }
    };

    useEffect(() => {
        getSalle();
    }, []);

    return (
        <>
            {/* Boutons de Retour et Ajouter */}
            <div className="flex justify-between items-center mb-4 m-10">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-600 text-white text-sm rounded-lg px-6 py-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Retour
                </button>

                <Link
                    to="/create/salle" 
                    className="bg-blue-700 text-white rounded-lg px-6 py-2 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Enregistrer une salle
                </Link>
            </div>

            <h1 className="title p-10 text-center text-2xl font-bold underline">Liste des Salles</h1>
            {salles.length > 0 ? (
                 <table className="table-auto w-full border-collapse border border-slate-400 shadow-md">
                 <thead>
                     <tr className="bg-gray-500 text-white">
                            <th className="border border-slate-300 p-2 text-center">ID</th>
                            <th className="border border-slate-300 p-2 text-center">Nomination</th>
                            <th className="border border-slate-300 p-2 text-center">Nombre_postes</th>
                            <th className="border border-slate-300 p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salles.map((salle) => (
                            <tr key={salle.id} className="border border-slate-300">
                                <td className="border border-slate-300 p-2 text-center">{salle.id}</td>
                                <td className="border border-slate-300 p-2 text-center">{salle.nomination}</td>
                                <td className="border border-slate-300 p-2 text-center">{salle.nombre_post}</td>
                                <td className="border border-slate-300 p-2 text-center">
                                <div className="flex justify-center space-x-4">
                                    <Link
                                        to={`/salle/show/${salle.id}`}
                                        className="bg-blue-600 text-white text-sm rounded-lg px-2 py-1"
                                    >
                                        Voir détails
                                    </Link>

                                    <Link
                                        to={`/salle/update/${salle.id}`}
                                        className="bg-green-600 text-white text-sm rounded-lg px-2 py-1"
                                    >
                                        Modifier
                                    </Link>

                                    {/* Bouton de suppression */}
                                    <button
                                        onClick={() => handleDelete(salle.id)}
                                        className="bg-red-600 text-white text-sm rounded-lg px-2 py-1"
                                    >
                                        Supprimer
                                    </button>
                                  </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucune salle disponible</p>
            )}
        </>
    );
}
