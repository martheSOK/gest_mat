import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AppContext } from "../../Context/AppContext";

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [formData, setFormData] = useState({
        nomination: "",
        nombre_post: ""
    });
    const [errors, setErrors] = useState({});

    async function getTypeMateriel() {
        const res = await fetch(`/api/salles/${id}`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setFormData({
                nomination: data.data.nomination,
                nombre_post: data.data.nombre_post,
            });
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        // Affiche la boîte de dialogue de confirmation
        const result = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Voulez-vous vraiment mettre à jour cette salle ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, mettre à jour!',
            cancelButtonText: 'Annuler'
        });

        // procéder à la mise à jour Si l'utilisateur confirme
        if (result.isConfirmed) {
            const res = await fetch(`/api/salles/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            if (data.errors) {
                setErrors(data.errors);
            } else {
                // Affiche une notification de succès si la mise à jour réussit
                Swal.fire(
                    'Mis à jour!',
                    'La salle a été mis à jour avec succès.',
                    'success'
                );
                navigate("/salles");
            }
        }
    }

    useEffect(() => {
        getTypeMateriel();
    }, []);
             
    return (
        <>
            <h1 className="title">Update your Room</h1>
            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input
                        type="text"
                        value={formData.nomination}
                        onChange={(e) =>
                            setFormData({ ...formData, nomination: e.target.value })
                        }
                    />
                    {errors.nomination && <p className="error">{errors.nomination[0]}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        value={formData.nombre_post}
                        onChange={(e) =>
                            setFormData({ ...formData, nombre_post: e.target.value })
                        }
                    />
                    {errors.nombre_post && <p className="error">{errors.nombre_post[0]}</p>}
                </div>
                <button className="primary-btn">Update</button>
            </form>
        </>
    );
}
