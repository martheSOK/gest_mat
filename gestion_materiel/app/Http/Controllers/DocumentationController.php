<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocumentationController extends Controller
{
    //

    public function ListController(){
        return view('documentation.Controller');
    }


    public function AuthMethodes(){
        return view('documentation.Authmethode');
    }
}
