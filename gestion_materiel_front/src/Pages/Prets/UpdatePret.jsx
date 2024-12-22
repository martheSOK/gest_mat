import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {afficheForm, ajoutLine, supperLigneExist,supperLigneAjouter,ModifierLigne,updateLigneExt} from "../../js/script";

export default function UpdatePret() {
   
    const { pret_id } = useParams(); 
    const [userId, setUserId] = useState('');
    const [datePret, setDatePret] = useState('');
    const [dateRetour, setDateRetour] = useState('');
    const [typePret, setTypePret] = useState(''); 
    const [etat, setEtat] = useState('en cours'); 
    const [users, setUsers] = useState([]); 
    const [materiaux, setMateriaux] = useState([]); 
    const [lignesPret, setLignesPret] = useState([]); 
    const navigate = useNavigate();
   // const boutton=document.getElementById("button");
   

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
        const fetchLigne = async()=>{
            try {
                const response= await fetch(`/api/lignePrets/${pret_id}`);
                const data = await response.json();

                //console.log("aaaaaaaaaaaaa");
                //console.log(data.data);
                localStorage.setItem("lignes" , JSON.stringify(data.data));
                //console.log(localStorage.getItem("lignes"));
               // console.log(JSON.parse(localStorage.getItem("lignes")));
                
            //    console.log( JSON.parse(localStorage.getItem("lignes")));
               
                
                if (response.ok) {
                    setLignesPret(data.data);
                    console.log(lignesPret);
                    
                } else {
                    console.error("Erreur lors de la récupération des lignePrêts");
                }
            } catch (error) {
                console.error("Erreur:", error);
            }
        }
        
        fetchPret();
        fetchUsers();
        fetchMateriaux();
        fetchLigne();
    }, [pret_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mettre à jour le prêt avec les nouvelles valeurs
        const formData = {
            user_id: userId,
            date_pret: datePret,
            date_retour: dateRetour,
            type_pret: typePret,
            etat: etat,
            ligne_prets: lignesPret,
        };

        try {
            const response = await fetch(`/api/prets/${pret_id}`, { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: "Succès!",
                    text: "Le prêt a été mis à jour avec succès.",
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

    return (
        <div className="p-4">
            <h2 className="title">Mettre à jour le Prêt</h2>
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
                </div><br /><br />


                <div id="form" style={{display:"none"}}>

                    {/* Section pour Ajouter des Lignes de Prêt */}
                    <h3 className="title">Lignes de Prêt</h3>
                    {
                        <div  className="mb-4">
                            <label className="block mb-2">Matériel</label>
                            <select  name="materiel_id" id="materiel_id"
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                required
                            >
                                <option value="">Sélectionnez un matériel</option>
                                {materiaux.map(materiel => (
                                    <option key={materiel.id} value={materiel.id}>
                                        {materiel.type_materiel.libelle} ({materiel.numero_serie} )
                                    </option>
                                ))}
                            </select>

                            <label className="block mb-2 mt-4" >Quantité à Prêter</label>
                            <input name="quantite_preter"
                                id="quantite_preter"
                                type="number"
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                required
                            />
                            <br />
                            <br />
                            <button id="ajouter" onClick={ajoutLine} type="button"  className="bg-green-600 text-white rounded-lg px-4 py-2 ">
                                Ajouter
                            </button>
                        </div>
                        
                    }
                </div>
                    

                <table border={1}>

                    <thead>
                        <th>Type Matériel</th>
                        <th>Quantité</th>
                        <th>action</th>
                    </thead> 

                    <tbody id="tbody">
                    
                        {(JSON.parse(localStorage.getItem("lignes"))).map((ligne, index)=>(
                            <tr key={index}>
                                <td>{`${ligne.materiel.type_materiel.libelle} (${ligne.materiel.numero_serie} )` }</td>

                                <td>{`${ligne.quantite_preter}` }</td>
                                
                                <td>
                                    <button id={`${ligne.materiel_id}`} onClick={supperLigneExist} className="bg-red-600 text-white rounded-lg px-4 py-2 mr-5 ">
                                        <input id={`${ligne.materiel_id}`} type="number" value={ligne.materiel_id} hidden/>
                                        supprimer
                                    </button>
                                    <button  id={`${ligne.materiel_id}`}  onClick={updateLigneExt} className="bg-green-600 text-white rounded-lg px-4 py-2 ">
                                        <input type="number" value={ligne.materiel_id} hidden/>
                                        modifier
                                    </button>
                                    
                                </td>
                            </tr>
                        )) }
                        {/* { localStorage.clear()} */}
                        { 
                            localStorage.getItem("ligneAjouter") ? console.log(' contient ') : localStorage.setItem('ligneAjouter', JSON.stringify([{}]))
                        }
                        {
                            console.log(JSON.parse(localStorage.getItem("ligneAjouter")))
                        }
                        
                        {(JSON.parse(localStorage.getItem("ligneAjouter"))).map((lign, index)=>(
                            <tr key={index}>
                                <td>{`${lign.libelle}`}</td>
                                <td>{`${lign.quantite_preter}`}</td>
                                <td>
                                    <button id={`${lign.materiel_id}`}  onClick={supperLigneAjouter} className="bg-red-600 text-white rounded-lg px-4 py-2 mr-5 ">
                                        <input id={`${lign.materiel_id}`} type="number" value={lign.materiel_id} hidden/>
                                        supprimer
                                    </button>
                                    <button id={`${lign.materiel_id}`}   onClick={() => ModifierLigne(index)} className="bg-green-600 text-white rounded-lg px-4 py-2 ">
                                        <input type="number" value={lign.materiel_id} hidden/>
                                        modifier
                                    </button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
            </table>
            
                <button id="afficheFormulaire" type="button" onClick={afficheForm} className="bg-green-600 text-white rounded-lg px-4 py-2 mr-5">
                    Ajouter une Ligne de Prêt
                </button>

                {/* Bouton pour Soumettre le Formulaire */}
                <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2">
                    Mettre à jour le Prêt
                </button>
            </form>
        </div>
    );
}
