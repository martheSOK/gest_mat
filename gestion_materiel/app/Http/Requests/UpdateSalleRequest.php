<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateSalleRequest extends FormRequest
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
            'nomination' => 'required|string|max:100|unique:salles,nomination',
            'nombre_post' => 'required|integer|min:1',
        ];
    }

    /**
     * Custom error messages
     */
    public function messages(): array
    {
        return [
            'nomination.required' => 'Le nom de la salle est obligatoire.',
            'nomination.string' => 'Le nom de la salle doit être une chaîne de caractères.',
            'nomination.max' => 'Le nom de la salle ne peut pas dépasser 100 caractères.',
            'nomination.unique' => 'Ce nom de salle existe déjà.',
            'nombre_post.required' => 'Le nombre de postes est obligatoire.',
            'nombre_post.integer' => 'Le nombre de postes doit être un entier.',
            'nombre_post.min' => 'Le nombre de postes doit être au moins 1.',
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
}
