import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export default function Index() {
    const [type_materiels, setType_materiel] = useState([]);

    async function getType_materiel() {
        const res = await fetch("/api/type_materiels");
        const data = await res.json();
        //console.log(data);
    
        if (res.ok) {
            setType_materiel(data.type_materiels || data);
        }
      }
    
      useEffect(() => {
        getType_materiel();
      }, []);
    

      return (
        <>
          <h1 className="title">Liste des types de matériels</h1>
          {type_materiels.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-slate-400">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2">ID</th>
                  <th className="border border-slate-300 p-2">Libellé</th>
                  {/* <th className="border border-slate-300 p-2">Créé par</th> */}
                  <th className="border border-slate-300 p-2">Date de création</th>
                  <th className="border border-slate-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {type_materiels.map((type_materiel) => (
                  <tr key={type_materiel.id} className="border border-slate-300">
                    <td className="border border-slate-300 p-2">{type_materiel.id}</td>
                    <td className="border border-slate-300 p-2">{type_materiel.libelle}</td>
                    {/* <td className="border border-slate-300 p-2">{type_materiel.user.name}</td> */}
                    <td className="border border-slate-300 p-2">
                      {new Date(type_materiel.created_at).toLocaleDateString()}{" "}
                      {new Date(type_materiel.created_at).toLocaleTimeString()}
                    </td>
                    <td className="border border-slate-300 p-2">
                      <Link
                        to={`/type_materiel/show/${type_materiel.id}`}
                        className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
                      >
                        Voir détails
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun type de matériel disponible</p>
          )}
        </>
      );
      
    
}