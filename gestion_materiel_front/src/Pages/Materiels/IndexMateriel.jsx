import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function IndexMateriel() {
    const [materiels, setMateriel] = useState([]);
    const navigate = useNavigate(); // useNavigate for navigation

    async function getMateriel() {
        const res = await fetch("/api/materiels");
        const data = await res.json();
    
        if (res.ok) {
            setMateriel(data.data);
        }
    }

    // Function to handle deletion of a material
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
                const res = await fetch(`/api/materiels/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();  

                if (res.ok) {
                    Swal.fire(
                        'Supprimé!',
                        'Le matériel a été supprimé avec succès.',
                        'success'
                    );
                    navigate("/materiels");
                } else {
                    Swal.fire(
                        'Erreur!',
                        data.message || 'Une erreur est survenue lors de la suppression.',
                        'error'
                    );
                }
            } catch (error) {
              Swal.fire(
                  'Erreur!',
                  `Une erreur inattendue est survenue: ${error.message}`,
                  'error'
              );
          }
        }
    };

    useEffect(() => {
        getMateriel();
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
                    to="/create/materiels" 
                    className="bg-blue-700 text-white rounded-lg px-6 py-2 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Enregistrer un matériel
                </Link>
            </div>

            <div className="my-10 mx-10">
                <h1 className="title p-10 text-center text-2xl font-bold underline">Liste des Matériaux</h1>
                {materiels.length > 0 ? (
                    <table className="table-auto w-full border-collapse border border-slate-400 shadow-md">
                        <thead>
                            <tr className="bg-gray-500 text-white">
                                <th className="border border-slate-300 p-2 text-center">ID</th>
                                <th className="border border-slate-300 p-2 text-center">Type</th>
                                <th className="border border-slate-300 p-2 text-center">Numéro de Série</th>
                                <th className="border border-slate-300 p-2 text-center">Poste</th>
                                <th className="border border-slate-300 p-2 text-center">État</th>
                                <th className="border border-slate-300 p-2 text-center">Localisation</th>
                                <th className="border border-slate-300 p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materiels.map((materiel) => (
                                <tr key={materiel.id} className="hover:bg-gray-100">
                                    <td className="border border-slate-300 p-2 text-center">{materiel.id}</td>
                                    <td className="border border-slate-300 p-2 text-center">{materiel.type_materiel.libelle}</td>
                                    <td className="border border-slate-300 p-2 text-center">{materiel.numero_serie}</td>
                                    <td className="border border-slate-300 p-2 text-center">{materiel.post?.nom || "Non spécifié"}</td>
                                    <td className="border border-slate-300 p-2 text-center">{materiel.etat}</td>
                                    <td className="border border-slate-300 p-2 text-center">{materiel.localisation}</td>
                                    <td className="border border-slate-300 p-2 text-center">
                                        <div className="flex justify-center space-x-4">
                                            <Link
                                                to={`/materiels/show/${materiel.id}`}
                                                className="bg-blue-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                Voir détails
                                            </Link>
                                            <Link
                                                to={`/materiels/update/${materiel.id}`}
                                                className="bg-green-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(materiel.id)}
                                                className="bg-red-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                Supprimer
                                            </button>
                                            {materiel.post?.nom === "Non spécifié" || (materiel.etat === "Présent fonctionnel" && materiel.localisation === "en magasin") && (
                                                <button
                                                    onClick={() => navigate(`/materiel/assign/${materiel.id}`)}
                                                    className="bg-yellow-500 text-white text-sm rounded-lg px-4 py-2 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                >
                                                    Assigner à un poste
                                                </button>
                                            )}
                                            {materiel.post?.nom !== "Non spécifié" && materiel.etat === "Présent fonctionnel" && materiel.localisation === "en utilisation" && (
                                                <button
                                                    onClick={() => navigate(`/materiel/detach/${materiel.id}`)}
                                                    className="bg-yellow-500 text-white text-sm rounded-lg px-4 py-2 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                >
                                                    Détacher du poste
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-600">Aucun matériel disponible</p>
                )}
            </div>
        </>
    );
}
