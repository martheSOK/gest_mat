import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        prenom: '',
        contact: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState({});

    async function handleRegister(e) {
        e.preventDefault();

        const res = await fetch("/api/users", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/users");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-2xl font-bold text-center mb-6 underline">Inscrire un utilisateur</h1>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Nom"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Prénom"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.prenom}
                            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        />
                        {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="tel"
                            placeholder="Contact"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        />
                        {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Confirmez le mot de passe"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password_confirmation}
                            onChange={(e) =>
                                setFormData({ ...formData, password_confirmation: e.target.value })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Enregistrer
                    </button>
                </form>
            </div>
        </div>
    );
}
