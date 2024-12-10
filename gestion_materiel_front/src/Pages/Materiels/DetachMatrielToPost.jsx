import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../Context/AppContext";

export default function DetachMaterielToPost() {
    const { materiel_id } = useParams();  
    const { token } = useContext(AppContext);
    const [post, setPost] = useState(null);
    const [etat, setEtat] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Récupération du poste lié au matériel
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/materiels/${materiel_id}/post`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                console.log(result);
                if (result) {
                    setPost(result); 
                } else {
                    setError('Aucun poste lié à ce matériel.');
                }
            } catch (e) {
                console.error(e);
                setError('Erreur lors de la récupération du poste.');
            }
        };
        fetchPost();
    }, [materiel_id, token]);

    // Gestion de l'envoi du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Données du formulaire avec l'état et la localisation
        const formData = {
            post_id: post?.id,
            etat,
            localisation,
        };

        try {
            const response = await fetch(`/api/materiels/detach/${materiel_id}`, { 
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),  
            });

            const result = await response.json();
            
            if (response.ok) {
                Swal.fire({
                    title: "Succès!",
                    text: "Le matériel a été détaché avec succès.",
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
            <h2 className="title">Détacher un matériel d un poste</h2> 
            <form onSubmit={handleSubmit} id="form">
                <div>
                    <select id="post" value={post?.id || ''} disabled={!post}>
                        <option value="">Cliquez pour sélectionner un post</option>
                        {post && (
                            <option key={post.id} value={post.id}>
                                {post.nom}
                            </option>
                        )}
                    </select>
                </div> <br />
                <div>
                    <select
                        value={etat}
                        onChange={(e) => setEtat(e.target.value)}  
                    >    
                        <option value="">Sélectionnez un état</option>
                        <option value="Présent fonctionnel">Présent fonctionnel</option>
                        <option value="Présent hors service">Présent hors service</option>
                        <option value="Absent">Absent</option>
                    </select>
                    {errors.etat && <p className="error">{errors.etat[0]}</p>}
                 </div><br />

                <div>
                    <select
                        value={localisation}
                        onChange={(e) => setLocalisation(e.target.value)}  
                    >  
                        <option value="">Sélectionnez une localisation</option>
                        <option value="en magasin">En magasin</option>
                        <option value="en utilisation">En utilisation</option>
                        <option value="en reparation">En reparation</option>
                        <option value="en location">En location</option>
                        <option value="don">Don</option>
                    </select>
                    {errors.localisation && <p className="error">{errors.localisation[0]}</p>}
                </div>

                
                <button className="bg-blue-600 text-white w-40 h-8 ml-20 mt-9" type="submit">
                    Détacher
                </button><br />
                        <br />
                {error && <p className="bg-red-500">{error}</p>}
            </form>
        </div>
    );
}
