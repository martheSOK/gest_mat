<?php

namespace App\Interfaces;

interface InventaireRepositoryInterface
{
    //

    public function statistiquesMaterielParType($idTypeMateriel, $dateDebut, $dateFin);
    public function materielTotalDebutAnnee($idTypeMateriel,$dateDebut, $dateFin);
    public function materielFonctionnelEnStock($idTypeMateriel,$dateDebut, $dateFin);
    public function materielFonctionnelEnLocation($idTypeMateriel,$dateDebut, $dateFin);
    public function materielFonctionnelEnUtilisation($idTypeMateriel,$dateDebut, $dateFin);
    public function materielAbscentEnReparation($idTypeMateriel,$dateDebut, $dateFin);
    public function materielStockEtHorsService($idTypeMateriel,$dateDebut, $dateFin);
    public function materielLocationEtHorsService($idTypeMateriel,$dateDebut, $dateFin);
    public function materielReparationEtHorsService($idTypeMateriel,$dateDebut, $dateFin);
    public function statistiquesTousMateriels($dateDebut, $dateFin,);
   // public function getUsagerMateriel($materielId, $dateDebut, $dateFin);
    public function getUsersByMaterielAndPeriod($materielId, $dateDebut, $dateFin);
}
