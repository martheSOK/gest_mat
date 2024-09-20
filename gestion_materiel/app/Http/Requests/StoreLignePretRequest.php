<?php

namespace App\Http\Requests;

use App\Models\Materiel;
use App\Models\Pret;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreLignePretRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pret_id' => [
                'required',
                'exists:prets,id',  // Vérifie que l'ID de prêt existe
                // function ($attribute, $value, $fail) {
                //     if (!$this->isPretEnCours($value)) {
                //         $fail('Le prêt spécifié n\'est pas en cours.');
                //     }
                // }
            ],
            'materiel_id' => [
                'required',
                'exists:materiels,id', // Vérifie que l'ID du matériel existe
                // function ($attribute, $value, $fail) {
                //     if (!$this->isMaterielAvailable($value)) {
                //         $fail('Le matériel spécifié n\'est pas disponible ou .');
                //     }
                // }
            ],
            'quantite_preter' => 'required|integer|min:1|max:'. $this->getMaxAvailableQuantity(),
        ];
    }

    /**
     * Messages personnalisés pour chaque erreur.
     */
    public function messages(): array
    {
        return [
            'pret_id.required' => 'Le prêt est obligatoire.',
            'pret_id.exists' => 'Le prêt sélectionné n\'existe pas.',
            'materiel_id.required' => 'Le matériel est obligatoire.',
            'materiel_id.exists' => 'Le matériel sélectionné n\'existe pas.',
            'quantite_preter.required' => 'La quantité prêtée est obligatoire. pour dire ',
            'quantite_preter.integer' => 'La quantité prêtée doit être un nombre entier.',
            'quantite_preter.min' => 'La quantité prêtée doit être au moins de 1.',
            'quantite_preter.max' => 'La quantité prêtée dépasse la quantité disponible.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     */
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'data'      => $validator->errors()
        ], 422));
    }

    /**
     * Vérifie si le prêt est en cours.
     */
    // protected function isPretEnCours($pretId)
    // {
    //     // Logique pour vérifier si le prêt est disponibel et que sont etat est en cours
    //     $pret = Pret::find($pretId);
    //     return $pret && $pret->etat == 'en cours';  // Vérifie que l'état est "en cours"
    // }

    /**
     * Vérifie si le matériel est disponible pour être prêté.
     */
    // protected function isMaterielAvailable($materielId)
    // {
    //     // Logique pour vérifier si le matériel est disponible
    //     $materiel = Materiel::find($materielId);
    //     return $materiel && $materiel->localisation == 'en magasin';
    // }

    /**
     * Retourne la quantité maximale disponible pour le matériel spécifié.
     */
    protected function getMaxAvailableQuantity()
    {
        // Logique pour obtenir la quantité maximale de matériel disponible
        $materiel = Materiel::find($this->input('materiel_id'));
        return $materiel ? $materiel->available_quantity : 0;
    }
}
