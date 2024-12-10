import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../Context/AppContext";

export default function AssignUserToPost() {
    const { post } = useParams();  
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [selectedUsers, setSelectedUsers] = useState([]); 
    const [allUsers, setAllUsers] = useState([]); 
    const [message, setMessage] = useState('');  
    const [error, setError] = useState(''); 
    const [errors, setErrors] = useState({});

    // Récupération des utilisateurs
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                
                if (result.success) {
                    setAllUsers(result.data);
                } 
                else {
                    setError('Erreur lors de la récupération des utilisateurs.');
                }
            } catch (e) {
                console.error(e);
                setError('Erreur lors de la récupération des utilisateurs.');
            }
        };
        fetchUsers();
    }, [token]);

    // Gestion de la sélection des utilisateurs
    const handleUserSelection = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        if (selectedOptions.length <= 2) {
            setSelectedUsers(selectedOptions);
            setError(''); // Réinitialise l'erreur
        } else {
            setError('Vous ne pouvez sélectionner que deux utilisateurs au maximum.');
        }
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (selectedUsers.length === 0) {
            setError('Veuillez sélectionner au moins un utilisateur.');
            return;
        }

        try {
            const formData = { data: selectedUsers };
            //console.log(formData);
            const response = await fetch(`/api/posts/assigne/users/${post}`, { 
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
                    text: "Les utilisateurs ont été assignés avec succès.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate('/posts');
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
            <h2 className="title">Assigner des utilisateurs au poste {post}</h2> 
            <form onSubmit={handleSubmit} id="form">
                <div>
                    <label className="font-bold" htmlFor="users">Sélectionner des utilisateurs (max 2) :</label>
                    <br />
                    <select className="bg-gray-200 w-80 h-40"
                        id="users" name="data"
                        multiple
                        value={selectedUsers}
                        onChange={handleUserSelection}
                        size="5"  
                    >
                        <option value="">selectionnez </option>
                        {allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} (ID: {user.id})
                            </option>
                        ))}
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
