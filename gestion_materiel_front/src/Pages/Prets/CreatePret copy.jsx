import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreatePret() {
    const [userId, setUserId] = useState('');
    const [datePret, setDatePret] = useState('');
    const [dateRetour, setDateRetour] = useState('');
    const [typePret, setTypePret] = useState(''); 
    const [etat, setEtat] = useState('en cours'); 
    const [users, setUsers] = useState([]); 
    const [materiaux, setMateriaux] = useState([]); 
    const [lignesPret, setLignesPret] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users");
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.data);
                } else {
                    console.error("Erreur lors de la récupération des utilisateurs");
                }
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        const fetchMateriaux = async () => {
            try {
                const response = await fetch("/api/materiels");
                const data = await response.json();
                if (response.ok) {
                    setMateriaux(data.data);
                } else {
                    console.error("Erreur lors de la récupération des matériaux");
                }
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        fetchUsers();
        fetchMateriaux();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Créer le prêt avec les lignes de prêt
        const formData = {
            user_id: userId,
            date_pret: datePret,
            date_retour: dateRetour,
            type_pret: typePret,
            etat: etat,
            ligne_prets: lignesPret,
        };

        try {
            const response = await fetch("/api/prets", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            
            if (response.ok) {
                Swal.fire({
                    title: "Succès!",
                    text: "Le prêt a été créé avec succès.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/prets"); 
                });
            } else {
                Swal.fire({
                    title: "Erreur!",
                    text: result.message || "Une erreur est survenue.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Erreur!",
                text: "Une erreur est survenue lors de l'envoi des données.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleAddLigne = () => {
        setLignesPret([...lignesPret, { materiel_id: '', quantite_preter: '' }]);
    };

    const handleLigneChange = (index, field, value) => {
        const newLignesPret = [...lignesPret];
        newLignesPret[index][field] = value;
        setLignesPret(newLignesPret);
    };

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4 m-10">
                <Link
                    to="/prets" 
                    className="bg-blue-700 text-white rounded-lg px-4 py-2"
                >
                    Voir les prêts
                </Link>
            </div>
            <h2 className="title">Enregistrer un Prêt</h2>
            <form onSubmit={handleSubmit}>
                {/* Champ Utilisateur */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="user_id">Utilisateur</label>
                    <select
                        id="user_id"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        required
                    >
                        <option value="">Sélectionnez un utilisateur</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Champ Date de Prêt */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="date_pret">Date de Prêt</label>
                    <input
                        type="date"
                        id="date_pret"
                        value={datePret}
                        onChange={(e) => setDatePret(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        required
                    />
                </div>

                {/* Champ Date de Retour Prévue */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="date_retour">Date de Retour Prévue</label>
                    <input
                        type="date"
                        id="date_retour"
                        value={dateRetour}
                        onChange={(e) => setDateRetour(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Champ Type de Prêt */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="type_pret">Type de Prêt</label>
                    <select
                        id="type_pret"
                        value={typePret}
                        onChange={(e) => setTypePret(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        required
                    >
                        <option value="réparation">Réparation</option>
                        <option value="emprunt">Emprunt</option>
                    </select>
                </div>

                {/* Champ État */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="etat">État</label>
                    <select
                        id="etat"
                        value={etat}
                        onChange={(e) => setEtat(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        required
                    >
                        <option value="en cours">En cours</option>
                        <option value="restitué">Restitué</option>
                    </select>
                </div>

                {/* Section pour Ajouter des Lignes de Prêt */}
                <h3 className="title">Lignes de Prêt</h3>
                {lignesPret.map((ligne, index) => (
                    <div key={index} className="mb-4">
                        <label className="block mb-2" htmlFor={`materiel_id_${index}`}>Matériel</label>
                        <select
                            id={`materiel_id_${index}`}
                            value={ligne.materiel_id}
                            onChange={(e) => handleLigneChange(index, 'materiel_id', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            required
                        >
                            <option value="">Sélectionnez un matériel</option>
                            {materiaux.map(materiel => (
                                <option key={materiel.id} value={materiel.id}>
                                    {materiel.numero_serie} {/* Assurez-vous que 'numero_serie' est la bonne propriété */}
                                </option>
                            ))}
                        </select>

                        <label className="block mb-2 mt-4" htmlFor={`quantite_preter_${index}`}>Quantité à Prêter</label>
                        <input
                            type="number"
                            id={`quantite_preter_${index}`}
                            value={ligne.quantite_preter}
                            onChange={(e) => handleLigneChange(index, 'quantite_preter', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddLigne} className="bg-green-600 text-white rounded-lg px-4 py-2 mb-4">
                    Ajouter une Ligne de Prêt
                </button>

                {/* Bouton pour Soumettre le Formulaire */}
                <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2">
                    Enregistrer le Prêt
                </button>
            </form>
        </div>
    );
}
