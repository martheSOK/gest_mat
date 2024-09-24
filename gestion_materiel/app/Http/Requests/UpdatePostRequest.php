<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePostRequest extends FormRequest
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
            'salle_id' => 'required|integer|exists:salles,id',
            'nom' => 'required|string|max:255|unique:posts,nom',
            'etat' => 'required|string|max:255|'
        ];
    }



    public function messages(): array
    {
        return [
            'salle_id.required' => 'Le champ salle est obligatoire.',
            'salle_id.integer' => 'L\'ID de la salle doit être un entier.',
            'salle_id.exists' => 'La salle sélectionnée n\'existe pas.',
            'nom.required' => 'Le nom est obligatoire.',
            'nom.string' => 'Le nom doit être une chaîne de caractères.',
            'nom.max' => 'Le nom ne peut pas dépasser 255 caractères.',
            'nom.unique' => 'Le nom doit être unique.',
            'etat.required' => 'Le nom est obligatoire.',
            'etat.string' => 'Le nom doit être une chaîne de caractères.',
            'etat.max' => 'Le nom ne peut pas dépasser 255 caractères.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'data'      => $validator->errors(),
        ], 422));
    }

}

