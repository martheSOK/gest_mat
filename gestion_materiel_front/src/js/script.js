import Swal from "sweetalert2";



function afficheForm(){
    const formulaire=document.getElementById("form");
    formulaire.style="{{display: 'block'}}"
}



function existMaterial(id){

    let result=false;

    JSON.parse(localStorage.getItem("lignes")).forEach(ligne => {
 
        if(parseInt(ligne.materiel_id)==parseInt(id)){
  
            result=true;
        }
        
    });

    JSON.parse(localStorage.getItem("ligneAjouter")).forEach(ligne => {

        if(parseInt(ligne.materiel_id)==parseInt(id)){

            result=true;
        }
        
    });

    return result;

}

function ajoutLine(){
    let materiel_id=(document.getElementById('materiel_id')).value;
    let quantiter=(document.getElementById('quantite_preter')).value;
    let libelle=(document.getElementById("materiel_id")).options[(document.getElementById("materiel_id")).selectedIndex].innerText;
    console.log(materiel_id);
    console.log(quantiter);
    console.log(libelle);

    if(materiel_id=="" || quantiter==""){

        alert("les champs son obligatoires");

    }else{

        if(existMaterial(materiel_id)){

            alert("Cette ligne existe deja")
     
         }else{
     
             if(localStorage.getItem('ligneAjouter')==null){
     
                 localStorage.setItem("ligneAjouter", JSON.stringify([{"quantite_preter":quantiter, 'materiel_id':materiel_id, 'libelle':libelle}]))
     
             }else{
     
                 let ligneAjouter=JSON.parse(localStorage.getItem('ligneAjouter'))
                 ligneAjouter.push({"quantite_preter":quantiter, 'materiel_id':materiel_id, "libelle":libelle})
                 localStorage.setItem("ligneAjouter", JSON.stringify(ligneAjouter));
     
             }
         
             const formulaire=document.getElementById("form");
             formulaire.style.display="none";
         
             console.log(localStorage.getItem('ligneAjouter'));
         
             updatTbody(); 

         }
    }

    
    
}


function updatTbody() {

    let tbody=document.getElementById("tbody");

    let tbodyContent=``;

    JSON.parse(localStorage.getItem("lignes")).forEach(ligne => {
        let typeMateriel=`${ligne.materiel.type_materiel.libelle} (${ligne.materiel.numero_serie} )`
        tbodyContent+=genereLigne(ligne.materiel_id, typeMateriel,  ligne.quantite_preter);
    });

    JSON.parse(localStorage.getItem("ligneAjouter")).forEach(ligne => {
        let typeMateriel=`${ligne.libelle}`
        tbodyContent+=genereLigne(ligne.materiel_id, typeMateriel,  ligne.quantite_preter);
    });

    console.log(tbodyContent);
    
    tbody.innerHTML=tbodyContent;
    
}

function genereLigne(id, typeMateriel, quantiter){

    return`
        <tr >
            <td> ${typeMateriel}</td>
            <td>${quantiter}</td>
            <td>
                <button id="${id}" onClick={supperLigneAjouter} className="bg-red-600 text-white rounded-lg px-4 py-2 mr-5 ">
                    <input id="${id}" type="number" value="${id}" hidden/>
                    supprimer
                </button>
                <button className="bg-green-600 text-white rounded-lg px-4 py-2 ">
                    <input type="number" value={lign.materiel_id} hidden/>
                    modifier
                </button>
            </td>
        </tr>
    `
}


function supperLigneAjouter(event) {
    // localStorage.removeItem("ligneAjouter");

    let boutton=document.getElementById(event.target.id);

    let id=boutton.getElementsByTagName('input')[0].value;

    console.log(id);
    
    let lignAjout=JSON.parse(localStorage.getItem("ligneAjouter")).filter(ligne => ligne.materiel_id!=id);

    console.log(lignAjout);

    localStorage.setItem("ligneAjouter", JSON.stringify(lignAjout));

    updatTbody(); 

}

function supperLigneExist(event){

    let boutton=document.getElementById(event.target.id);

    let id=parseInt(boutton.getElementsByTagName('input')[0].value);

    console.log(boutton.getElementsByTagName('input')[0]);
    

    console.log("amina");

    console.log(id);
    
    let lignExist=JSON.parse(localStorage.getItem("lignes")).filter(ligne => ligne.materiel_id!=id);

    console.log(lignExist);

    localStorage.setItem("lignes", JSON.stringify(lignExist));

    updatTbody(); 

}

function updateLigneExt(){

}
function updateLigneAjouter(index, updatedData = null) {
    console.log("aaaaaaaaaa");
    
    try {
        // Récupérer les lignes ajoutées depuis localStorage
        const lignesAjoutees = JSON.parse(localStorage.getItem("ligneAjouter")) || [];
        console.log(lignesAjoutees);
        
        // Vérifier si l'index est valide
        if (lignesAjoutees[index]) {
            const ligneActuelle = lignesAjoutees[index]; // Informations actuelles

            // Si aucune mise à jour n'est fournie, renvoyer la ligne actuelle
            if (!updatedData) {
                console.log('Ligne récupérée pour modification :', ligneActuelle);
                return ligneActuelle;
            }

            // Mettre à jour la ligne correspondante avec les nouvelles données
            lignesAjoutees[index] = { ...ligneActuelle, ...updatedData };

            // Sauvegarder les modifications dans localStorage
            localStorage.setItem('lignesAjoutees', JSON.stringify(lignesAjoutees));

            // Afficher une alerte de succès
            Swal.fire({
                icon: 'success',
                title: 'Ligne mise à jour avec succès !',
                text: `Matériel : ${lignesAjoutees[index].materiel} - Quantité : ${lignesAjoutees[index].quantite}`,
            });

            // Recharger les lignes affichées dans le tableau
            updatTbody(); 

            return lignesAjoutees[index]; // Retourner la ligne mise à jour
        } else {
            throw new Error('Index invalide');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la ligne ajoutée :', error);
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible de récupérer ou de modifier cette ligne ajoutée.',
        });

        return null; // En cas d'erreur, retourner null
    }
}
    function handleModifierLigne(index) {
        // Récupérer la ligne actuelle
        const ligneActuelle = updateLigneAjouter(index);
    
        if (ligneActuelle) {
            // Afficher une boîte de dialogue ou un formulaire pour modifier les données
            Swal.fire({
                title: 'Modifier la ligne',
                html: `
                    <label>Libellé</label>
                    <input id="libelle" type="text" class="swal2-input" value="${ligneActuelle.libelle}" />
                    <label>Quantité prêtée</label>
                    <input id="quantite_preter" type="number" class="swal2-input" value="${ligneActuelle.quantite_preter}" />
                `,
                showCancelButton: true,
                confirmButtonText: 'Enregistrer',
                preConfirm: () => {
                    const libelle = document.getElementById('libelle').value;
                    const quantite_preter = parseInt(document.getElementById('quantite_preter').value, 10);
    
                    // Valider la quantité prêtée
                    if (isNaN(quantite_preter)) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erreur',
                            text: 'La quantité prêtée doit être un nombre valide.',
                        });
                        return false; // Ne pas valider si la quantité est invalide
                    }
    
                    return { libelle, quantite_preter };
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    // Mettre à jour la ligne avec les nouvelles données
                    updateLigneAjouter(index, {
                        libelle: result.value.libelle,
                        quantite_preter: result.value.quantite_preter,
                    });
    
                    // Recharger ou rafraîchir les lignes
                    updatTbody();
                }
            });
        }
    }





export {afficheForm, ajoutLine,updatTbody, genereLigne, existMaterial,supperLigneExist,supperLigneAjouter,handleModifierLigne,updateLigneExt} ;