import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormUpdateLigne from "./formUpdateLigne";
import { useParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

export default function FormUpdatePret() {
   // const navigate = useNavigate();
   const { pret_id } = useParams();
   const [userId, setUserId] = useState('');
    const [datePret, setDatePret] = useState('');
    const [dateRetour, setDateRetour] = useState('');
    const [typePret, setTypePret] = useState(''); 
    const [etat, setEtat] = useState('en cours'); 
    const [formData, setFormData] = useState({});
    const [users, setUsers] = useState([]); 
    const [lignesPret, setLignesPret] = useState([]);
    const [currentForm, setCurrentForm] = useState(0);

    const {
        register,
        handleSubmit,
        setValue, // pour remplir le formulaire avec les données existantes
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setFormData(data);
        setCurrentForm(1);
    };

    const pustForm = async () => {
        formData["ligne_prets"] = lignesPret;
        console.log(formData);
        setFormData(formData);
    };

    // Charger les utilisateurs (liste) au début
    useEffect(() => {
        // Fonction pour récupérer le prêt existant
        const fetchPret = async () => {
            try {
                const response = await fetch(`/api/prets/${pret_id}`);
                console.log("Response status:", response.status); 
                const data = await response.json();
                console.log("Data from pret API:", data); 
        
                if (response.ok) {
                    const { user_id, date_pret, date_retour, type_pret, etat, ligne_prets } = data.data;
                    const formatDate = (date) => date.split('T')[0];

                    setUserId(user_id);
                    setDatePret(formatDate(date_pret));
                    setDateRetour(formatDate(date_retour));
                    setTypePret(type_pret);
                    setEtat(etat);
                    setLignesPret(ligne_prets);
                } else {
                    console.error("Erreur lors de la récupération du prêt");
                }
            } catch (error) {
                console.error("Erreur:", error);
            }
        };
        
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

        fetchPret();
        fetchUsers();
    }, []);

    // Simuler la récupération des données existantes (exemple)
    

    // Mettre à jour le formulaire avec les données lorsqu'elles sont disponibles
    useEffect(() => {
        if (formData?.user_id) {
            setValue("user_id", formData.user_id);
            setValue("date_pret", formData.date_pret);
            setValue("date_retour", formData.date_retour);
            setValue("type_pret", formData.type_pret);
        }
    }, [formData, setValue]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} hidden={currentForm === 0 ? false : true}>
                {/* Champ Utilisateur */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="user_id">
                        Utilisateur
                    </label>
                    <select
                        id="user_id"
                        {...register("user_id", { required: true })}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    >
                        <option value="">Sélectionnez un utilisateur</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                    <div className="text-red-500">
                        {errors.user_id && <span>This field is required</span>}
                    </div>
                </div>

                {/* Champ Date de Prêt */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="date_pret">
                        Date de Prêt
                    </label>
                    <input
                        type="date"
                        id="date_pret"
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        {...register("date_pret", { required: true })}
                    />
                    <div className="text-red-500">
                        {errors.date_pret && <span>This field is required</span>}
                    </div>
                </div>

                {/* Champ Date de Retour Prévue */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="date_retour">
                        Date de Retour Prévue
                    </label>
                    <input
                        type="date"
                        id="date_retour"
                        {...register("date_retour", { required: true })}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                    <div className="text-red-500">
                        {errors.date_retour && <span>This field is required</span>}
                    </div>
                </div>

                {/* Champ Type de Prêt */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="type_pret">
                        Type de Prêt
                    </label>
                    <select
                        id="type_pret"
                        {...register("type_pret", { required: true })}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    >
                        <option value="réparation">Réparation</option>
                        <option value="emprunt">Emprunt</option>
                    </select>
                    <div className="text-red-500">
                        {errors.type_pret && <span>This field is required</span>}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="etat">État</label>
                    <select
                        id="etat"
                        {...register("etat")}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    >
                        <option value="en cours">En cours</option>
                        <option value="restitué">Restitué</option>
                    </select>

                    <div className="text-red-500">
                        {errors.etat && <span>This field is required</span>}
                    </div>
                </div>

                <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2">
                    Suivant
                </button>
            </form>

            <FormUpdateLigne currentForm={currentForm} lignesPret={lignesPret} setLignesPret={setLignesPret} pustForm={pustForm} />
        </>
    );
}
