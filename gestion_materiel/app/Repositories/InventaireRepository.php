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



    public function getUsersByMaterielAndPeriod($materielId, $dateDebut, $dateFin)
    {
        // Récupérer le matériel avec ses lignes de prêt et les utilisateurs associés au poste
        $materiel = Materiel::with(['ligne_prets.pret.user', 'post.users'])
            ->where('id', $materielId)
            ->first();

        if (!$materiel) {
            return response()->json(['message' => 'Le matériel spécifié n\'existe pas.'], 404);
        }

        // Collecter les utilisateurs ayant prêté le matériel
        $userPret = $materiel->ligne_prets;
        // La méthode filter() parcourt chaque élément (chaque lignePret dans ce cas) de la collection
        // ligne_prets et applique une fonction de filtrage. La fonction anonyme qui prend chaque lignePret comme paramètre.
        $usersFromPrets = $userPret->filter(function ($lignePret) use ($dateDebut, $dateFin) {
            return $lignePret->created_at >= $dateDebut && $lignePret->created_at <= $dateFin;
        })->map(function ($lignePret) {
            return $lignePret->pret->user; // Accéder à l'utilisateur ici
        });

        // Collecter les utilisateurs associés au poste
        $usersPost = $materiel->post ? $materiel->post->users : collect();
        //
        $usersFromPosts = $usersPost->filter(function ($userPost) use ($dateDebut, $dateFin) {
            return $userPost->pivot->created_at >= $dateDebut && $userPost->pivot->created_at <= $dateFin;
        });

        // Préparer un message d'information
        $message = [];
        if ($usersFromPrets->isEmpty() && $usersFromPosts->isEmpty()) {
            $message[] = 'Ce matériel n\'a été ni prêté ni utilisé dans la période donnée.';
        } else {
            if ($usersFromPrets->isNotEmpty()) {
                $message[] = 'Ce matériel a été prêté par certains utilisateurs.';
            }
            if ($usersFromPosts->isNotEmpty()) {
                $message[] = 'Ce matériel a été utilisé par certains utilisateurs.';
            }
        }

        // Retourner les utilisateurs des prêts et des postes avec le message
        return response()->json([
            'message' => implode(' ', $message),
            'users_from_prets' => $usersFromPrets->filter(function ($user) {
                return $user !== null; // Filtrer les utilisateurs null
            }),
            'users_from_posts' => $usersFromPosts
        ]);
    }

}
