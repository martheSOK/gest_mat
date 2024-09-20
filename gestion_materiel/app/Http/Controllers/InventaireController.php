<?php

namespace App\Http\Controllers;

use App\Interfaces\InventaireRepositoryInterface;


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
}
