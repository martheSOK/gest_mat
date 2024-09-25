<?php

namespace App\Interfaces;

interface InventaireRepositoryInterface
{
    //

    public function statistiquesMaterielParType($idTypeMateriel, $dateDebut, $dateFin);
    public function materielTotalDebutAnnee($idTypeMateriel);
    public function materielFonctionnelEnStock($idTypeMateriel);
    public function materielFonctionnelEnLocation($idTypeMateriel);
    public function materielFonctionnelEnUtilisation($idTypeMateriel);
    public function materielAbscentEnReparation($idTypeMateriel);
    public function materielStockEtHorsService($idTypeMateriel);
    public function materielLocationEtHorsService($idTypeMateriel);
    public function materielReparationEtHorsService($idTypeMateriel);
    public function statistiquesTousMateriels($dateDebut, $dateFin);
    public function getUsagerMateriel($materielId, $dateDebut, $dateFin);
}
