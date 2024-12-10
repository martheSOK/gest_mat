import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../Context/AppContext";

export default function DetachUserToPost() {
    // Récupère l'ID du poste depuis les paramètres de l'URL
    const { post} = useParams();  
    //console.log(useParams);
    const navigate = useNavigate();
    // Récupère le token d'authentification depuis le contexte de l'application
    const { token } = useContext(AppContext);  
    // Utilisateurs sélectionnés pour détachement
    const [selectedUsers, setSelectedUsers] = useState([]); 
    // Liste de tous les utilisateurs associés au poste 
    const [allUsers, setAllUsers] = useState([]); 
    // Message de succès ou d'erreur 
    const [message, setMessage] = useState(''); 
    // Erreur générale 
    const [error, setError] = useState(''); 
    // Erreurs spécifiques au formulaire 
    const [errors, setErrors] = useState({});  

    // Récupération des utilisateurs liés à un poste
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/posts/users/${post}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                
                if (result) {
                    // Mets à jour la liste des utilisateurs 
                  // console.log("eeee"); 
                   setAllUsers(result);
                   //console.log(selectedUsers);
                    
                } 
                else {
                    setError('Erreur lors de la récupération des utilisateurs.');
                }
            } 
            catch (e) {
                console.error(e);
                setError('Erreur lors de la récupération des utilisateurs.');
            }
        };
        fetchUsers();
    }, [token, post]);
    
    // Gestion de la sélection des utilisateurs
    const handleUserSelection = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        // Mets à jour les utilisateurs sélectionnés
        setSelectedUsers(selectedOptions);  
    };

    // Soumission du formulaire pour détacher les utilisateurs
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (selectedUsers.length === 0) {
            setError('Veuillez sélectionner au moins un utilisateur.');
            return;
        }

        try {
            const formData = { user_ids: selectedUsers };  
            const response = await fetch(`/api/posts/detach/users/${post}`, { 
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                },
                // Envoie des IDs des utilisateurs à détacher
                body: JSON.stringify(formData),  
            });

            const result = await response.json();
            
            if (response.ok) {
                Swal.fire({
                    title: "Succès!",
                    text: "Les utilisateurs ont été détachés avec succès.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Redirige vers la page des postes après succès
                    navigate('/posts');  
                });
            }
             else {
                setErrors(result.errors || {});
                setError(result.message || 'Une erreur est survenue.');
            }
        } 
        catch (e) {
            console.error(e);
            setError('Une erreur est survenue lors de l\'envoi des données.');
        }
        
    };

    return (
        <div className="block p-4">
            <h2 className="title">Détacher des utilisateurs du poste {post}</h2> 
            <form onSubmit={handleSubmit} id="form">
                <div>
                    <label className="font-bold" htmlFor="users">Sélectionner des utilisateurs à détacher :</label>
                    <br />
                    <select className="bg-gray-200 w-80 h-40"
                        id="users" name="user_ids"  
                        multiple
                        value={selectedUsers}
                        onChange={handleUserSelection}
                        size="5"  
                    >
                        {allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} (ID: {user.id})
                            </option>
                        ))}
                    </select>
                    {errors.user_ids && <p className="error">{errors.user_ids[0]}</p>}
                </div>
                <button className="bg-blue-600 text-white w-40 h-8 ml-20 mt-9" type="submit">Détacher</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
