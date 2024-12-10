import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import de SweetAlert2

export default function IndexPret() {
    const [prets, setPrets] = useState([]);
    const navigate = useNavigate();
    
    async function getPrets() {
        const res = await fetch("/api/prets"); 
        const data = await res.json();
        if (res.ok) {
            setPrets(data.data);
        } else {
            console.error("Erreur lors de la récupération des prêts");
        }
    }

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
            const res = await fetch(`/api/prets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                Swal.fire('Supprimé!', 'Le prêt a été supprimé.', 'success');
                getPrets();
            } else {
                Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
            }
        }
    };

    useEffect(() => {
        getPrets();
    }, []);
    
    return (
        <>
        <div className="flex justify-between items-center mb-4 m-10">
            <button
                onClick={() => navigate(-1)}
                className="bg-gray-600 text-white text-sm rounded-lg px-6 py-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Retour
            </button>

            <Link
                to="/pret/create" 
                className="bg-blue-700 text-white rounded-lg px-6 py-2 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Enregistrer un prêt
            </Link>
        </div>

        <div className="my-56 mx-10">
            <h1 className="title p-10 text-center text-2xl font-bold">Liste des prêts</h1>
            {prets.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-slate-400 shadow-md">
                    <thead>
                        <tr className="bg-gray-500 text-white">
                            <th className="border border-slate-300 p-2 text-center">ID</th>
                            <th className="border border-slate-300 p-2 text-center">Utilisateur</th>
                            <th className="border border-slate-300 p-2 text-center">Date de prêt</th>
                            <th className="border border-slate-300 p-2 text-center">État</th>
                            <th className="border border-slate-300 p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prets.map((pret) => (
                            <tr key={pret.id} className="hover:bg-gray-100">
                                <td className="border border-slate-300 p-2 text-center">{pret.id}</td>
                                <td className="border border-slate-300 p-2 text-center">{pret.user?.name || "Utilisateur inconnu"}</td>
                                <td className="border border-slate-300 p-2 text-center">{new Date(pret.date_pret).toLocaleDateString('fr-FR')}</td>
                                <td className="border border-slate-300 p-2 text-center">{pret.etat}</td>
                                <td className="border border-slate-300 p-2 text-center">
                                    <div className="flex justify-center space-x-4">
                                        <Link
                                            to={`/pret/show/${pret.id}`}
                                            className="bg-blue-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Voir détails
                                        </Link>
                                        <Link
                                            to={`/pret/update/${pret.id}`}
                                            className="bg-green-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(pret.id)}
                                            className="bg-red-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                <p className="text-center text-gray-600">Aucun prêt disponible</p>
            )}
        </div>
        </>
    );
}
