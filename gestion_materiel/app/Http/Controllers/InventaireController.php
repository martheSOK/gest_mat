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


        
    public function getUsersUsingMateriel(Request $request, $materielId)
        {
            $request->validate([
                'date_debut' => 'required|date',
                'date_fin' => 'required|date|after_or_equal:date_debut',
            ]);

            $users = $this->inventaireInerface->getUsersByMaterielAndPeriod(
                $materielId,
                $request->input('date_debut'),
                $request->input('date_fin')
            );

            if ($users->isEmpty()) {
                return response()->json(['message' => 'Aucun utilisateur n\'a utilisé ou prêté ce matériel dans cette période.'], 404);
            }

            return response()->json($users);
        }

}
