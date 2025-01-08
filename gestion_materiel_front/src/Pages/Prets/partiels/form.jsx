import { useEffect } from "react";
import { useState } from "react"
import { useForm } from "react-hook-form"
import UserService from "../../../services/userService";
import FormLignePret from "./formLignePret";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function FormPret() {
    const navigate = useNavigate();
    const [users , setUsers]=useState([]);
    const [formData, setFormData]=useState({});
    const [lignesPret ,setLignesPret]=useState([]);
    const [currentForm ,setCurrenteForm]=useState(0);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
    const onSubmit = (data) =>{
        console.log(data);
        setFormData(data)
        setCurrenteForm(1)
    }

   const postForm= async ()=>{
    formData["ligne_prets"]=lignesPret;
    console.log(formData);
    setFormData(formData)


    try {
        const response = await fetch("/api/prets", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        //console.log(result);
        
        
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
            // Vérifier si des erreurs de validation sont présentes
            let errorMessage = result.details || result.message || "Une erreur est survenue.";

            // Si `result.errors` contient des erreurs de validation, les extraire
            if (result.errors) {
                errorMessage = Object.values(result.errors)
                // Au cas où il y a plusieurs messages dans un tableau
                    .flat()
                    // Combine tous les messages en une seule chaîne 
                    .join(", "); 
            }
            Swal.fire({
                title: "Erreur!",
                text: errorMessage,
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


   }
    
    useEffect( ()=>{
        const fetchData= async ()=>{
            const _users= await UserService.getUsers();
            setUsers(_users);
        }
        fetchData();
        console.log(users);
        
        
        
    },[])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} hidden={currentForm==0 ? false : true}>
                {/* Champ Utilisateur */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="user_id">
                    Utilisateur
                    </label>
                    <select
                    id="user_id"
                    {...register("user_id" ,{ required: true })}
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
                    {...register("date_pret" ,{ required: true })}
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
                    {...register("date_retour" ,{ required: true })}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                    <div className="text-red-500">
                        {errors.date_retour && <span>This field is required</span>}
                    </div>
                </div> 

                {/* Champ Type de Prêt */}
                { <div className="mb-4">
                    <label className="block mb-2" htmlFor="type_pret">
                    Type de Prêt
                    </label>
                    <select
                    id="type_pret"
                    {...register("type_pret" ,{ required: true })}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    
                    >
                    
                    <option value="réparation">Réparation</option>
                    <option value="emprunt">Emprunt</option>
                    </select>
                    <div className="text-red-500">
                        {errors.type_pret && <span>This field is required</span>}
                    </div>
                </div> }
                <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2">
                        Suivant
                </button>
            </form>

   
          <FormLignePret currentForm={currentForm} lignesPret={lignesPret} setLignesPret={setLignesPret} postForm={postForm}/>
        </>
    );
}
