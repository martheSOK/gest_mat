<?php

namespace App\Http\Requests;

use App\Models\Materiel;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StorePretRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'date_pret' => 'required|date|before_or_equal:today',
            'date_retour' => 'nullable|date|after:date_pret',
            'type_pret' => 'required|string|max:255',
            'etat' => 'required|string|max:255',

            // Validation des lignes de prêt
            //'lignes' => 'required|array|min:1',
            'lignes.*.materiel_id' => [
            'required',
            'exists:materiels,id',
            // function ($attribute, $value, $fail) {
            //     $materiel = Materiel::find($value);
            //     if ($materiel->etat !== "Présent fonctionnel" && $materiel->localisation !== "en magasin") {
            //         $fail("Le matériel ID $value n'est pas prêtable.");
            //     }
            // },
        ],
        'lignes.*.quantite_preter' => 'required|integer|min:1',
    ];

    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'L\'ID de l\'utilisateur est obligatoire.',
            'user_id.exists' => 'L\'utilisateur sélectionné n\'existe pas.',
            'date_pret.required' => 'La date de prêt est obligatoire.',
            'date_pret.date' => 'La date de prêt doit être une date valide.',
            'date_pret.before_or_equal' => 'La date de prêt ne peut pas être dans le futur.',
            'date_retour.date' => 'La date de retour prévue doit être une date valide.',
            'date_retour.after' => 'La date de retour prévue doit être après la date de prêt.',
            'type_pret.required' => 'Le type de prêt est obligatoire.',
            'etat.required' => 'L\'état est obligatoire.',

            // Messages d'erreur pour les lignes de prêt
            'lignes.required' => 'Au moins une ligne de prêt est requise.',
            'lignes.*.materiel_id.required' => 'Le matériel est requis pour chaque ligne de prêt.',
            'lignes.*.materiel_id.exists' => 'Le matériel sélectionné n\'existe pas.',
            'lignes.*.quantite_preter.required' => 'La quantité prêtée est requise pour chaque matériel.',
            'lignes.*.quantite_preter.integer' => 'La quantité prêtée doit être un nombre entier.',
            'lignes.*.quantite_preter.min' => 'La quantité prêtée doit être au moins 1.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     */
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors(),
        ], 422));
    }
}
