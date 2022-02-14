<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    //
    public function fetch()
    {
        return Auth::user();
    }

    public function index()
    {
        return User::all()->except(Auth::id());
    }

    public function show(User $user)
    {
        return ['user'=>$user, 'posts'=>$user->posts];
    }    
}
