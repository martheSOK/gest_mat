import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function IndexUser() {
    const [users, setUser] = useState([]);
    const navigate = useNavigate(); // Ajout de useNavigate

    async function getUser() {
        const res = await fetch("/api/users");
        const data = await res.json();
    
        if (res.ok) {
            setUser(data.data);
        }
    }

    // Fonction pour gérer la suppression d'un user
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
            try {
                const res = await fetch(`/api/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (res.ok) {
                    Swal.fire(
                        'Supprimé!',
                        'L\'utilisateur a été supprimé avec succès.',
                        'success'
                    );
                    // Mise à jour de la liste des utilisateurs
                    setUser(users.filter((user) => user.id !== id));
                } else {
                    const data = await res.json();
                    Swal.fire(
                        'Erreur!',
                        data.message || 'Une erreur est survenue lors de la suppression.',
                        'error'
                    );
                }
            } catch (error) {
                Swal.fire(
                    'Erreur!',
                    `Une erreur inattendue est survenue ${error.message}`,
                    'error'
                );
            }
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    
    return (
        <>
            
            
            {/* Conteneur des boutons d'action en haut */}
            <div className="flex justify-between items-center my-4">
                {/* Bouton de retour */}
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white text-sm rounded-lg px-4 py-2"
                >
                    Retour
                </button>

                {/* Bouton pour ajouter un utilisateur */}
                <Link
                    to="/create/users"
                    className="bg-blue-600 text-white text-sm rounded-lg px-4 py-2"
                >
                    Ajouter un utilisateur
                </Link>
            </div>

            {/* Table des utilisateurs */}

            <h1 className="title p-10 text-center text-2xl font-bold underline">Liste des utilisateurs</h1>
            {users.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-slate-400 shadow-md">
                <thead>
                    <tr className="bg-gray-500 text-white">
                            <th className="border border-slate-300 p-2 text-center">ID</th>
                            <th className="border border-slate-300 p-2 text-center">Nom</th>
                            <th className="border border-slate-300 p-2 text-center">Prénom</th>
                            <th className="border border-slate-300 p-2 text-center">Contact</th>
                            <th className="border border-slate-300 p-2 text-center">Email</th>
                            <th className="border border-slate-300 p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border border-slate-300">
                                <td className="border border-slate-300 p-2 text-center">{user.id}</td>
                                <td className="border border-slate-300 p-2 text-center">{user.name}</td>
                                <td className="border border-slate-300 p-2 text-center">{user.prenom}</td>
                                <td className="border border-slate-300 p-2 text-center">{user.contact}</td>
                                <td className="border border-slate-300 p-2 text-center">{user.email}</td>
                                <td className="border border-slate-300 p-2 text-center">
                                    <Link
                                        to={`/users/show/${user.id}`}
                                        className="bg-blue-600 text-white text-sm rounded-lg px-2 py-1 mr-2"
                                    >
                                        Voir détails
                                    </Link>

                                    <Link
                                        to={`/users/update/${user.id}`}
                                        className="bg-green-600 text-white text-sm rounded-lg px-2 py-1 mr-2"
                                    >
                                        Modifier
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(user.id)}
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
                <p>Aucun utilisateur disponible</p>
            )}
        </>
    );
}
