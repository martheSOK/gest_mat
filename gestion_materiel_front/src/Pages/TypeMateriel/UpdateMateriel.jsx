import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AppContext } from "../../Context/AppContext";

export default function UpdateMateriel() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [formData, setFormData] = useState({
        libelle: "",
    });
    const [errors, setErrors] = useState({});

    async function getTypeMateriel() {
        const res = await fetch(`/api/type_materiels/${id}`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setFormData({
                libelle: data.data.libelle,
            });
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        // Affiche la boîte de dialogue de confirmation
        const result = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Voulez-vous vraiment mettre à jour ce type de matériel?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, mettre à jour!',
            cancelButtonText: 'Annuler'
        });

        // Si l'utilisateur confirme, procéder à la mise à jour
        if (result.isConfirmed) {
            const res = await fetch(`/api/type_materiels/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Assurez-vous d'ajouter ce header
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
                    'Le type de matériel a été mis à jour avec succès.',
                    'success'
                );
                navigate("/type_materiels");
            }
        }
    }

    useEffect(() => {
        getTypeMateriel();
    }, []);

    return (
        <>
            <h1 className="title">Update your Type Materiel</h1>
            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input
                        type="text"
                        value={formData.libelle}
                        onChange={(e) =>
                            setFormData({ ...formData, libelle: e.target.value })
                        }
                    />
                    {errors.libelle && <p className="error">{errors.libelle[0]}</p>}
                </div>
                <button className="primary-btn">Update</button>
            </form>
        </>
    );
}
