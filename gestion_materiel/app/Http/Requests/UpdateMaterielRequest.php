<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UpdateMaterielRequest extends FormRequest
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
            'type_materiel_id' => 'required|integer|exists:type_materiels,id',
            'etat' => 'required|string|max:255',
            'localisation' => 'required|string|max:255',
            'date_entree' => 'required|date|before_or_equal:today',
            'numero_serie' => ['required','string','min:10','max:100',
                // Ignore the current record during uniqueness check
                Rule::unique('materiels', 'numero_serie')->ignore($this->route('materiel')),
            ],
            'date_sortie' => ['nullable','date',
                function ($attribute, $value, $fail) {
                    if ($value && $this->input('date_entree') > $value) {
                        $fail('La date de sortie doit être postérieure à la date d\'entrée.');
                    }
                },
            ],
        ];
    }

    /**
     * Custom error messages.
     */
    public function messages(): array
    {
        return [
            'type_materiel_id.required' => 'Le type de matériel est obligatoire.',
            'type_materiel_id.integer' => 'L\'ID du type de matériel doit être un entier valide.',
            'type_materiel_id.exists' => 'Le type de matériel sélectionné n\'existe pas.',
            'etat.required' => 'L\'état du matériel est obligatoire.',
            'localisation.required' => 'La localisation est obligatoire.',
            'localisation.max' => 'La localisation ne peut pas dépasser 255 caractères.',
            'date_entree.required' => 'La date d\'entrée est obligatoire.',
            'date_entree.date' => 'La date d\'entrée doit être une date valide.',
            'date_entree.before_or_equal' => 'La date d\'entrée ne peut pas être dans le futur.',
            'numero_serie.required' => 'Le numéro de série est obligatoire.',
            'numero_serie.max' => 'Le numéro de série ne peut pas dépasser 100 caractères.',
            'numero_serie.min' => 'Le numéro de série ne peut pas être inférieur à 10 caractères.',
            'numero_serie.unique' => 'Ce numéro de série existe déjà.',
            'date_sortie.date' => 'La date de sortie doit être une date valide.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param Validator $validator
     * @return void
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'data'      => $validator->errors()
        ], 422));
    }

}
