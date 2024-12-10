import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function IndexPost() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate(); 

    async function getPosts() {
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (res.ok) {
            setPosts(data.data);
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
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                Swal.fire(
                    'Supprimé!',
                    'Le post a été supprimé.',
                    'success'
                );
                navigate("/posts");
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
        getPosts();
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
                    to="/create/post" 
                    className="bg-blue-700 text-white rounded-lg px-6 py-2 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                   Ajouter un post
                </Link>
            </div>

            <h1 className="title p-10 text-center text-2xl font-bold underline">Liste des Posts</h1>
            <table className="table-auto w-full border-collapse border border-slate-400 shadow-md">
                <thead>
                <tr className="bg-gray-500 text-white">
                        <th className="border border-slate-300 p-2 text-center">ID</th>
                        <th className="pborder border-slate-300 p-2 text-center">Salle</th>
                        <th className="border border-slate-300 p-2 text-center">Nom du Post</th>
                        <th className="border border-slate-300 p-2 text-center">État du Post</th>
                        <th className="border border-slate-300 p-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id} className="border-b">
                            <td className="border border-slate-300 p-2 text-center">{post.id}</td>
                            <td className="border border-slate-300 p-2 text-center">{post.salle.nomination}</td>
                            <td className="border border-slate-300 p-2 text-center">{post.nom}</td>
                            <td className="border border-slate-300 p-2 text-center">{post.etat}</td>
                            <td className="border border-slate-300 p-2 text-center">
                                <div className="flex justify-center space-x-4">
                                <Link 
                                    to={`/post/show/${post.id}`} 
                                    className="bg-blue-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
                                >
                                    Voir détails
                                </Link>

                                <Link 
                                    to={`/post/update/${post.id}`} 
                                    className="bg-green-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-green-700 transition-colors"
                                >
                                    Modifier
                                </Link>

                                <button 
                                    onClick={() => handleDelete(post.id)} 
                                    className="bg-red-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-red-700 transition-colors"
                                >
                                    Supprimer
                                </button>

                                {/* Bouton AssignerUser si le post est disponible ou partiellement disponible */}
                                {(post.etat === 'Disponible' || post.etat === 'Partielement disponible') && (
                                    <button 
                                        onClick={() => navigate(`/post/assign/${post.id}`)} 
                                        className="bg-yellow-500 text-white text-sm rounded-lg px-4 py-2 hover:bg-yellow-600 transition-colors"
                                    >
                                        AssignerUser
                                    </button>
                                )}

                                {/* Bouton DetachUser si le post est partiellement disponible ou occupé */}
                                {(post.etat === 'Partielement disponible' || post.etat === 'Occupe') && (
                                    <button 
                                        onClick={() => navigate(`/post/detach/${post.id}`)} 
                                        className="bg-zinc-500 text-white text-sm rounded-lg px-4 py-2 hover:bg-zinc-600 transition-colors"
                                    >
                                        DetachUser
                                    </button>
                                )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
