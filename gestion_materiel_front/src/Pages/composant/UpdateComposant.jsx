import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Importer SweetAlert2
import { AppContext } from "../../Context/AppContext";

export default function UpdateComposant() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    
    const [formData, setFormData] = useState({
        materiel_id: "",
        designation: "",
    });
    
    const [materiels, setMateriels] = useState([]); // Stocker les matériels
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true); // Ajouter un état de chargement

    // Fonction pour récupérer les matériels
    useEffect(() => {
        async function fetchMateriels() {
            try {
                const res = await fetch("/api/materiels", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data.success) {
                    setMateriels(data.data); // Stocker les matériels
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des matériels :", error);
            }
        }

        fetchMateriels();
    }, [token]);

    // Fonction pour récupérer les informations du composant
    async function getComposant() {
        try {
            const res = await fetch(`/api/composants/${id}`);
            const data = await res.json();
            if (res.ok) {
                setFormData({
                    materiel_id: data.data.materiel_id,  // Charger le matériel initial
                    designation: data.data.designation,
                });
            }
            setLoading(false); // Arrêter le chargement
        } catch (error) {
            console.error("Erreur lors de la récupération du composant :", error);
            setLoading(false); // Arrêter le chargement même en cas d'erreur
        }
    }

    useEffect(() => {
        getComposant();
    }, []);

    // Gérer la soumission de la mise à jour
    async function handleUpdate(e) {
        e.preventDefault();
        const result = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Voulez-vous vraiment mettre à jour ce composant ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, mettre à jour!',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            const res = await fetch(`/api/composants/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.errors) {
                setErrors(data.errors);
            } else {
                Swal.fire(
                    'Mis à jour!',
                    'Le composant a été mis à jour avec succès.',
                    'success'
                );
                navigate("/composants");
            }
        }
    }

    // Afficher un message de chargement pendant que les données sont récupérées
    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    return (
        <>
            <h1 className="title">Mettre à jour le composant</h1>
            <br />
            <br />
            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
                {/* Champ pour sélectionner un matériel */}
                <div>
                    <select
                        value={formData.materiel_id}
                        onChange={(e) =>
                            setFormData({ ...formData, materiel_id: e.target.value })
                        }
                    >
                        <option value="">Sélectionnez un matériel</option>
                        {materiels.length > 0 ? (
                            materiels.map((materiel) => (
                                <option 
                                    key={materiel.id} 
                                    value={materiel.id}
                                >
                                    {`${materiel.type_materiel_id} - ${materiel.numero_serie}`}
                                </option>
                            ))
                        ) : (
                            <option disabled>Aucun matériel disponible</option>
                        )}
                    </select>
                    {errors.materiel_id && <p className="error">{errors.materiel_id[0]}</p>}
                </div>

                {/* Champ pour entrer la désignation */}
                <div>
                    <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) =>
                            setFormData({ ...formData, designation: e.target.value })
                        }
                    />
                    {errors.designation && <p className="error">{errors.designation[0]}</p>}
                </div>

                <button className="primary-btn">Mettre à jour</button>
            </form>
        </>
    );
}
