<?php

namespace App\Http\Controllers;

use App\Interfaces\InventaireRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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



    public function getUsersUsingMateriel(Request $request, int $materielid)
        {
            $validator = Validator::make($request->all(), [
                'date_debut' => 'required|date',
                'date_fin' => 'required|date|after_or_equal:date_debut',
            ]);

            // Vérifier si la validation échoue
            if ($validator->fails()) {
                // Retourner une réponse JSON personnalisée avec les erreurs
                return response()->json([
                    'status' => 'erreur',
                    'message' => 'La validation a échoué.',
                    'erreurs' => $validator->errors(),
                ], 422); // Code 422 pour "Unprocessable Entity"
            }

            $users = $this->inventaireInerface->getUsersByMaterielAndPeriod(
                $materielid,
                $request->input('date_debut'),
                $request->input('date_fin')
            );

            if ($users->isEmpty()) {
                return response()->json(['message' => 'Aucun utilisateur n\'a utilisé ou prêté ce matériel dans cette période.'], 404);
            }

            return response()->json($users);
        }

}
