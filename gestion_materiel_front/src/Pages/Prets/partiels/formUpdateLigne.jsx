import { useState,useEffect } from "react";
import MaterielService from "../../../services/materielService";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
// eslint-disable-next-line react/prop-types
export default function FormUpdateLigne({currentForm,lignesPret,setLignesPret,postForm}){
    const [currentEditLigne , setCurrentEditLigne]=useState(-1);
   
    const [materiels , setMateriels]=useState([]);

    useEffect( ()=>{
        const fetchData= async ()=>{
            
            const _materiel= await MaterielService.getMateriels();
            setMateriels(_materiel);
        }
        fetchData();
        console.log(materiels);
        
        
    },[])

     const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm()

      const addLignePret = (data) => {
        console.log(data);
    
        const { materiel_id, quantite_preter } = data;
    
        // Vérifier si le matériel existe déjà dans les lignes de prêt
        // eslint-disable-next-line react/prop-types
        const exists = lignesPret.some((ligne) => ligne.materiel_id === materiel_id);
    
        if (exists) {
            // Afficher un message d'avertissement si le matériel est déjà présent
            Swal.fire({
                title: "Attention!",
                text: "Ce matériel est déjà ajouté à une ligne de prêt.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }
    
        const materiel = materiels.filter((materiel) => {
            return materiel.id == materiel_id;
        })[0];
        console.log(materiel);
    
        if (currentEditLigne === -1) {
            setLignesPret([
                ...lignesPret,
                {
                    materiel_id: materiel_id,
                    materiel_libelle: `${materiel.type_materiel.libelle}-${materiel.numero_serie}`,
                    quantite_preter: quantite_preter,
                },
            ]);
        } else {
            // eslint-disable-next-line react/prop-types
            const ligne = lignesPret.filter((ligne) => {
                return ligne.materiel_id == materiel_id;
            })[0];
    
            ligne.quantite_preter = quantite_preter;
            setCurrentEditLigne(-1);
        }
    
        reset({
            materiel_id: "",
            quantite_preter: 0,
        });
    };
    
    const removeLignePret = (materiel_id)=>{
        const _materiel=materiels.filter((materiel)=>{
            return materiel.id==materiel_id;
        })[0]
        const newLignePret=[];
        for (const ligne of lignesPret) {
            if(ligne.materiel_id!=_materiel.id){
                newLignePret.push(ligne)
            }
        }
        setLignesPret(newLignePret);
    }

    const editLignePret= (materiel_id)=>{
        // eslint-disable-next-line react/prop-types
        const ligne=lignesPret.filter((ligne)=>{
            return ligne.materiel_id==materiel_id
        })[0]
        
        reset({
            materiel_id: ligne.materiel_id,
            quantite_preter: ligne.quantite_preter
        })
        setCurrentEditLigne(materiel_id);
        console.log(ligne);



    }

    return(
        <>
            <div hidden={currentForm==1 ? false : true}>
                <form onSubmit={handleSubmit(addLignePret)} >
                    <div className="mb-4 flex justify-center items-center space-x-3">

                        <div>
                            <label className="block " htmlFor={`materiel_id`}>Matériel</label>
                            <select
                                id={`materiel_id`}
                                {...register("materiel_id" ,{ required: true })}
                                onChange={() => {}}
                                className="border border-gray-300 rounded-lg p-2 w-full">
                                <option value="">Sélectionnez un matériel</option>
                                {materiels.map(materiel => (
                                    <option key={materiel.id} value={materiel.id}>
                                        {materiel.numero_serie} 
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-red-500">
                            {errors.quantite_preter && <span>This field is required</span>}
                        </div>
                        


                        <div>
                            <label className="block " htmlFor={`quantite_preter`}>Quantité à Prêter</label>
                            <input
                                type="number"
                                id={`quantite_preter`}
                                {...register("quantite_preter" ,{ required: true })}
                                onChange={() => {}}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                
                            />
                        </div>
                        <div className="text-red-500">
                            {errors.quantite_preter && <span>This field is required</span>}
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-5">
                                +
                            </button>
                        </div>
                    </div>
                    <div className="mb-4 flex justify-center items-center space-x-3">

                    <table>
                            <thead>
                                <th>Matériel</th>
                                <th>Quantite</th>
                                <th>Actions</th>
                            </thead>

                            <tbody>
                                {lignesPret.map((ligne, index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{ligne.materiel_libelle}</td>
                                            <td>{ligne.quantite_preter}</td>
                                            <td className="space-x-3">
                                                <button onClick={()=> editLignePret(ligne.materiel_id)} type="button" className="bg-blue-600 text-white rounded-lg px-4 py-2">
                                                        Editer
                                                </button>

                                                <button onClick={()=> removeLignePret(ligne.materiel_id)} type="button" className="bg-red-600 text-white rounded-lg px-4 py-2">
                                                        Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                    </table>
                    </div>
                
                </form>
                <button type="button" onClick={()=>postForm()} className="bg-blue-600 text-white rounded-lg px-4 py-2">
                            Enregistrer
                </button>
            </div>

        </>
    )
}

