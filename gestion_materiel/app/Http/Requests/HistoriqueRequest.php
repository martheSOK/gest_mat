
<?php

namespace App\Http\Requests;

use App\Models\Materiel;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class HistoriqueRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }
}
