<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUserRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'contact' => 'required|string|max:15|unique:users,contact',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',  // Validation du mot de passe

            //'post_id' => 'nullable|exists:posts,id',  // Si `post_id` est optionnel
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Le nom est obligatoire.',
            'name.string' => 'Le nom doit être une chaîne de caractères.',
            'name.max' => 'Le nom ne peut pas dépasser 255 caractères.',

            'prenom.required' => 'Le prénom est obligatoire.',
            'prenom.string' => 'Le prénom doit être une chaîne de caractères.',
            'prenom.max' => 'Le prénom ne peut pas dépasser 255 caractères.',

            'contact.required' => 'Le contact est obligatoire.',
            'contact.string' => 'Le contact doit être une chaîne de caractères.',
            'contact.max' => 'Le contact ne peut pas dépasser 15 caractères.',
            'contact.unique' => 'Ce contact est déjà utilisé par un autre utilisateur.',

            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être une adresse email valide.',
            'email.max' => 'L\'email ne peut pas dépasser 255 caractères.',
            'email.unique' => 'Cet email est déjà utilisé par un autre utilisateur.',

            //'post_id.exists' => 'Le poste sélectionné n\'existe pas.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.string' => 'Le mot de passe doit être une chaîne de caractères.',
            'password.min' => 'Le mot de passe doit comporter au moins 8 caractères.',
            //'password.confirmed' => 'La confirmation du mot de passe ne correspond pas'
        ];
    }

    /**
     * Gestion des échecs de validation.
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation échouée',
            'errors' => $validator->errors(),
        ], 422));
    }
}
