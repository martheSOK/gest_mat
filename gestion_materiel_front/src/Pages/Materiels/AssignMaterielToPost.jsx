

import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../Context/AppContext";

export default function  AssignMaterielToPost() {
    const { materiel_id } = useParams();  
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [selectedPost, setSelectedPosts] = useState([]); 
    const [allposts, setPosts] = useState([]); 
    const [message, setMessage] = useState('');  
    const [error, setError] = useState(''); 
    const [errors, setErrors] = useState({});


    // Récupération des posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/posts/without-materiel/${materiel_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                //console.log("aaaaaaaaaaaaa");
                //console.log(result);
                
                if (Array.isArray(result) && result.length > 0) {
                    // On suppose que 'result' est directement le tableau des posts
                    setPosts(result); 
                   // console.log("Posts récupérés :", result);
                } 
                else {
                    setError('Aucun post disponible.');
                }
            } 
            catch (e) {
                console.error(e);
                setError('Erreur lors de la récupération des posts.');
            }
        };
        fetchPosts();
    }, [materiel_id]);

    // Gestion de la sélection des utilisateurs
    const handleUserSelection = (e) => {
        const selectedValue = e.target.value; 
        if (selectedValue) {
            setSelectedPosts([selectedValue]);
            setError('');
        } else {
            setError('Veuillez sélectionner un post.');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
    
        if (!selectedPost) {
            setError('Veuillez sélectionner un post.');
            return;
        }
    
        try {
            const formData = { post_id: parseInt(selectedPost) };
            console.log(formData);
            const response = await fetch(`/api/materiel/assign/${materiel_id}`, { 
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: "Succès!",
                    text: "Le matériel a été assigné avec succès.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate('/materiels');
                });
            } else {
                setErrors(result.errors || {});
                setError(result.message || 'Une erreur est survenue.');
            }
        } catch (e) {
            console.error(e);
            setError('Une erreur est survenue lors de l\'envoi des données.');
        }
    };

    return (
        <div className="block p-4">
            <h2 className="title">Assigner du materiel a un poste </h2> 
            <form onSubmit={handleSubmit} id="form">
                <div>
                    {/* <label className="font-bold" htmlFor="users">Sélectionner un post  :</label> */}
                    <br />
                    <select 
                        className="bg-gray-200 w-80 h-40"
                        id="post" 
                        name="post_id"
                        value={selectedPost.length > 0 ? selectedPost[0] : ""}
                        onChange={handleUserSelection}
                        size="5"
                        >
                         <option value="">Sélectionnez un post</option>   
                        {allposts.length > 0 ? (
                            allposts.map((post) => (
                                <option key={post.id} value={post.id}>
                                    {post.nom} (ID: {post.id})
                                </option>
                            ))
                        ) : (
                            <option value="">Aucun poste disponible</option> // Option par défaut
                        )}
                    </select>

                    {errors.data && <p className="error">{errors.data[0]}</p>}
                </div>
                <button className="bg-blue-600 text-white w-40 h-8 ml-20 mt-9" type="submit">Assigner</button>
            </form>
             {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} 
        </div>
    );

}