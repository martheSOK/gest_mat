<?php

namespace App\Classes;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
class ApiResponseClass
{
    // public static function rollback($e, $message ="Something went wrong! Process not completed"){
    //     DB::rollBack();
    //     self::throw($e, $message);
    // }

    public static function rollback($errorMessage)
    {
        // Retourne le message d'erreur spécifique avec un code HTTP 500 en cas d'erreur serveur
        return response()->json([
            'status' => 'error',
            'message' => 'Une erreur s\'est produite lors du traitement !',
            'details' => $errorMessage // Détails de l'erreur réelle
        ], 500);
    }


    public static function sendError($error, $code = 400, $errorMessages = [])
    {
        return response()->json([
            'success' => false,
            'message' => $error,
            'errors'  => $errorMessages,
        ], $code);
    }





    public static function throw($e, $message ="Something went wrong! Process not completed"){
        Log::info($e);
        throw new HttpResponseException(response()->json(["message"=> $message], 500));
    }

    public static function sendResponse($result , $message ,$code=200){
        $response=[
            'success' => true,
            'data'    => $result
        ];
        if(!empty($message)){
            $response['message'] =$message;
        }
        return response()->json($response, $code);
    }
}
