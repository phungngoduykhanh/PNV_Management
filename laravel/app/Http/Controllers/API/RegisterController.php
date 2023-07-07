<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;


class RegisterController extends Controller
{
    public function register(Request $request) {
        $userCreate = User::create([
            'username' =>$request->username,
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
            'name'=>$request->username
        ]);

        return response()->json([
            'code'=>201,
            'data'=>$userCreate
        ],201);
    }

    public function checkUser(Request $request){
        $email = $request->query('email');
        $username = $request->query('username');
        $user = User::where('email', $email)
        ->orWhere('username', $username)
        ->first();
        $exists = [];
        if ($user) {
            if ($user->username === $username) {
                $exists['username'] = 'Username đã tồn tại';
            }
    
            if ($user->email === $email) {
                $exists['email'] = 'Email đã tồn tại';
            }
        }
        return response()->json(['exists' => $exists]);
    }
}
