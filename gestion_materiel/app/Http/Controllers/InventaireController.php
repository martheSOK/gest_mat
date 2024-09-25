<?php

namespace App\Http\Controllers;

use App\Interfaces\InventaireRepositoryInterface;
use Illuminate\Http\Request;

class InventaireController extends Controller
{
    private InventaireRepositoryInterface $inventaireInerface;

    public function __construct(InventaireRepositoryInterface $inventaireRepositoryInterface)
    {
        $this->inventaireInerface = $inventaireRepositoryInterface;
    }

    public function afficherStatistiquesMateriel($dateDebut, $dateFin)
        {
            $statistiques = $this->inventaireInerface->statistiquesTousMateriels($dateDebut, $dateFin);

            return response()->json($statistiques);
        }


        public function getUsagerMateriel(Request $request, $materielId)
            {
                $dateDebut = $request->input('date_debut');
                $dateFin = $request->input('date_fin');


                $usagers = $this->inventaireInerface->getUsagerMateriel($materielId, $dateDebut, $dateFin);


                if ($usagers->isEmpty()) {
                    return response()->json(['message' => 'Aucun utilisateur n\'a utilisé ou prêté ce matériel dans cette période.'], 404);
                }

                return response()->json($usagers);
            }


}
