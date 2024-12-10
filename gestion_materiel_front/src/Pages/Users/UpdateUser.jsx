import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert2 pour les alertes stylisées
import { AppContext } from "../../Context/AppContext";

export default function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AppContext);

    const [formData, setFormData] = useState({
        name: "",
        prenom: "",
        contact: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [errors, setErrors] = useState({});

    // Fonction pour récupérer les données utilisateur
    async function getUser() {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        if (res.ok) {
            setFormData({
                name: data.data.name,
                prenom: data.data.prenom,
                contact: data.data.contact,
                email: data.data.email,
                password: "",
                password_confirmation: ""
            });
        }
    }

    // Fonction pour gérer la mise à jour
    async function handleUpdate(e) {
        e.preventDefault();

        const result = await Swal.fire({
            title: "Confirmer la mise à jour",
            text: "Voulez-vous vraiment mettre à jour cet utilisateur ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, mettre à jour",
            cancelButtonText: "Annuler"
        });

        if (result.isConfirmed) {
            const res = await fetch(`/api/users/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.errors) {
                setErrors(data.errors);
            } else {
                Swal.fire(
                    "Mise à jour réussie",
                    "Les informations utilisateur ont été mises à jour avec succès.",
                    "success"
                );
                navigate("/users");
            }
        }
    }

    useEffect(() => {
        getUser();
    }, [token]);

    // Formulaire stylisé
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6 underline">
                    Modification du user
                </h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    {[
                        { label: "Nom", value: "name", type: "text", placeholder: "Entrez le nom" },
                        { label: "Prénom", value: "prenom", type: "text", placeholder: "Entrez le prénom" },
                        { label: "Contact", value: "contact", type: "tel", placeholder: "Entrez le contact" },
                        { label: "Email", value: "email", type: "email", placeholder: "Entrez l'email" },
                        { label: "Mot de passe", value: "password", type: "password", placeholder: "Nouveau mot de passe" },
                        { label: "Confirmation du mot de passe", value: "password_confirmation", type: "password", placeholder: "Confirmez le mot de passe" }
                    ].map((field) => (
                        <div key={field.value}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                value={formData[field.value]}
                                placeholder={field.placeholder}
                                onChange={(e) =>
                                    setFormData({ ...formData, [field.value]: e.target.value })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                            {errors[field.value] && (
                                <p className="text-sm text-red-600">{errors[field.value][0]}</p>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Mettre à jour
                    </button>
                </form>
            </div>
        </div>
    );
}
