<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreComposantRequest extends FormRequest
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
            'materiel_id' => 'required|integer|exists:materiels,id',
            'designation' => 'required|string|max:255|unique:composants',
        ];
    }

    /**
     * Get custom messages for validation errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'materiel_id.required' => 'Le matériel est requis.',
            'materiel_id.integer' => 'L\'ID du matériel doit être un entier.',
            'materiel_id.exists' => 'Le matériel sélectionné n\'existe pas.',
            'designation.required' => 'La désignation est requise.',
            'designation.string' => 'La désignation doit être une chaîne de caractères.',
            'designation.max' => 'La désignation ne doit pas dépasser 255 caractères.',
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
            'message'   => 'Erreurs de validation',
            'errors'    => $validator->errors(),
        ], 422));
    }

}
