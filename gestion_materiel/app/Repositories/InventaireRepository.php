<?php

namespace App\Repositories;

use App\Interfaces\InventaireRepositoryInterface;
use App\Models\Materiel;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class InventaireRepository implements InventaireRepositoryInterface
{
    //Cette fonction renvoie les statistiques d'un type de materiel
    public function statistiquesMaterielParType($idTypeMateriel, $dateDebut, $dateFin)
    {
        return [
            'total_debut_annee' => $this->materielTotalDebutAnnee($idTypeMateriel),
            'pf_en_utilisation' => $this->materielFonctionnelEnUtilisation($idTypeMateriel),
            'pf_en_stock' => $this->materielFonctionnelEnStock($idTypeMateriel),
            'pf_en_location' => $this->materielFonctionnelEnLocation($idTypeMateriel),

            'ab_en_reparation' => $this->materielAbscentEnReparation($idTypeMateriel),
            'stock_et_hors_service' => $this->materielStockEtHorsService($idTypeMateriel),
            'location_et_hors_service'=>$this->materielLocationEtHorsService($idTypeMateriel),
            'reparation_et_hors_service' => $this->materielReparationEtHorsService($idTypeMateriel),

            //'usagers_sur_periode' => $this->materielUsagersSurPeriode($idTypeMateriel, $dateDebut, $dateFin),
        ];
    }


    public function statistiquesTousMateriels($dateDebut, $dateFin)
    { //distinct() permet de récupérer  uniquement des valeurs uniques dans la colonne type_materiel_id
        $typesMateriel = Materiel::distinct()->pluck('type_materiel_id');
        $statistiques = [];

        foreach ($typesMateriel as $idTypeMateriel) {
            $statistiques[$idTypeMateriel] = $this->statistiquesMaterielParType($idTypeMateriel, $dateDebut, $dateFin);
        }

        return $statistiques;
    }



    public function materielTotalDebutAnnee($idTypeMateriel)
    {
        return Materiel::where('type_materiel_id', $idTypeMateriel)
            ->whereYear('date_entree', Carbon::now()->year)
            ->count();
    }

    public function materielFonctionnelEnUtilisation($idTypeMateriel)
    {
        return Materiel::where('type_materiel_id', $idTypeMateriel)
        ->where('etat','Présent fonctionnel')->where('localisation', 'en utilisation')
            ->count();
    }

    public function materielFonctionnelEnStock($idTypeMateriel)
    {
        return
             Materiel::where('type_materiel_id', $idTypeMateriel)
             ->where('etat','Présent fonctionnel')->where('localisation', 'en magasin')
                ->count();
    }
    public function materielFonctionnelEnLocation($idTypeMateriel)
    {
        return
             Materiel::where('type_materiel_id', $idTypeMateriel)
             ->where('etat','Présent fonctionnel')->where('localisation', 'en localisation')
                ->count();
    }


    public function materielAbscentEnReparation($idTypeMateriel)
    {
        return
             Materiel::where('type_materiel_id', $idTypeMateriel)
                ->where('etat','Absent')->where('localisation', 'en reparation')
                ->count();
    }

    public function materielStockEtHorsService($idTypeMateriel)
    {
        return
             Materiel::where('type_materiel_id', $idTypeMateriel)
                ->where('etat', 'Présent hors service')->where('localisation','en magasin')
                ->count();

    }

    public function materielLocationEtHorsService($idTypeMateriel)
    {

        return Materiel::where('type_materiel_id', $idTypeMateriel)
                ->where('etat', 'Présent hors service')->where('localisation','en location')
                ->count();

    }
    public function materielReparationEtHorsService($idTypeMateriel)
    {
        return Materiel::where('type_materiel_id', $idTypeMateriel)
                ->where('etat', 'Présent hors service')->where('localisation','en reparation')
                ->count();

    }

    // public function materielUsagersSurPeriode($idTypeMateriel, $dateDebut, $dateFin)
    // {
    //     return Materiel::where('type_materiel_id', $idTypeMateriel)
    //         ->whereHas('ligne_prets', function ($query) use ($dateDebut, $dateFin) {
    //             $query->whereBetween('created_at', [$dateDebut, $dateFin]);
    //         })
    //         ->with(['ligne_prets' => function ($query) use ($dateDebut, $dateFin) {
    //             $query->whereBetween('created_at', [$dateDebut, $dateFin])
    //                   ->with('user');
    //         }])
    //         ->get()
    //         ->map(function ($materiel) {
    //             return $materiel->ligne_prets->map(function ($lignePret) {
    //                 return $lignePret->user;
    //             });
    //         })
    //         ->flatten()
    //         ->unique('id');
    // }

    public function getUsagerMateriel($materielId, $dateDebut, $dateFin)
{
    return DB::table('prets')
        ->join('ligne_prets', 'prets.id', '=', 'ligne_prets.pret_id') // Jointure avec ligne_prets
        ->join('users', 'prets.user_id', '=', 'users.id') // Jointure avec users
        ->join('materiels', 'ligne_prets.materiel_id', '=', 'materiels.id') // Jointure avec materiels
        ->join('posts', 'materiels.post_id', '=', 'posts.id') // Jointure avec posts
        ->where('ligne_prets.materiel_id', $materielId) // Filtrer sur materiel_id dans ligne_prets
        ->where('prets.date_pret', '<=', $dateFin)
        ->where('prets.date_retour', '>=', $dateDebut)
        ->select('users.name AS user_name',
                 'materiels.numero_serie AS materiel_numero_serie',
                 'prets.date_pret',
                 'prets.date_retour',
                 'posts.nom AS post_nom')
        ->get();
}


}
