import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Index() {
    const [type_materiels, setType_materiel] = useState([]);
    const navigate = useNavigate(); // Ajout de useNavigate

    async function getType_materiel() {
        const res = await fetch("/api/type_materiels");
        const data = await res.json();
        console.log(data);
    
        if (res.ok) {
            setType_materiel(data.data);
        }
    }

    // Fonction pour gérer la suppression d'un type de matériel
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
            const res = await fetch(`/api/type_materiels/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                Swal.fire(
                    'Supprimé!',
                    'Le type de matériel a été supprimé.',
                    'success'
                );
                // Redirection vers la page d'index après la suppression
                navigate("/type_materiels"); // Redirection vers l'index
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
        getType_materiel();
    }, []);
    
    return (
        <>
          <h1 className="title">Liste des types de matériels</h1>
          {type_materiels.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-slate-400">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2">ID</th>
                  <th className="border border-slate-300 p-2">Libellé</th>
                  <th className="border border-slate-300 p-2">Date de création</th>
                  <th className="border border-slate-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {type_materiels.map((type_materiel) => (
                  <tr key={type_materiel.id} className="border border-slate-300">
                    <td className="border border-slate-300 p-2">{type_materiel.id}</td>
                    <td className="border border-slate-300 p-2">{type_materiel.libelle}</td>
                    <td className="border border-slate-300 p-2">
                      {new Date(type_materiel.created_at).toLocaleDateString('fr-FR')}{" "}
                      {new Date(type_materiel.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} 
                    </td>
                    <td className="border border-slate-300 px-2 py-2">
                      <Link
                        to={`/type_materiel/show/${type_materiel.id}`}
                        className="bg-blue-600 text-white text-sm rounded-lg px-2 py-1"
                      >
                        Voir détails
                      </Link>

                      <Link
                        to={`/type_materiel/update/${type_materiel.id}`}
                        className="bg-green-600 text-white text-sm rounded-lg px-2 py-1"
                      >
                        Update
                      </Link>

                      {/* Bouton de suppression */}
                      <button
                        onClick={() => handleDelete(type_materiel.id)}
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
            <p>Aucun type de matériel disponible</p>
          )}
        </>
    );
}
