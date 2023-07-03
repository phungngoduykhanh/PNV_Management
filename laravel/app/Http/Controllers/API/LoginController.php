<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SessionUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;

use Kreait\Laravel\Firebase\Facades\Firebase;

class LoginController extends Controller
{
    public function login(Request $request) {
        $dataCheckLogin = [
            'email'=> $request->email,
            'password'=> $request->password
        ];
        if (auth()->attempt($dataCheckLogin)) {
            $userId = auth()->id();
            $checkTokenExit = SessionUser::where('user_id',$userId)->first();
            if(empty($checkTokenExit)){

            $token = Str::random(40);
            $refreshToken = Str::random(40);
            $tokenExpried = date("Y-m-d H:i:s", strtotime("+30 day"));
            $refreshTokenExpried = date("Y-m-d H:i:s", strtotime("+360 day"));

            $userSession = SessionUser::create([
                'token' => $token,
                'refresh_token' => $refreshToken,
                'token_expried' => $tokenExpried,
                'refresh_token_expried' => $refreshTokenExpried,
                'user_id' => auth()->id()
            ]);
            
            $user = User::find($userId);

            $database =Firebase::database();
            $database->getReference('users/' .$userId)->set($user);

            }else{
                $userSession = $checkTokenExit;
            }
            return response()->json([
                'code'=>200,
                'data'=>$userSession
            ],200);
        }else{
            return response()->json([
                'code'=> 401,
                'message'=> "email or password incorrect"
            ],401);
        }
}
    public function refreshToken(Request $request) {
        $token = $request->header('token');
        $checkTokenIsValid=SessionUser::where('token',$token)->first();
        if(!empty($checkTokenIsValid)){

              if($checkTokenIsValid->token_expried < Carbon::now()){
                $checkTokenIsValid->update([
                    'token'=> Str::random(40),
                    'refresh_token'=> Str::random(40),
                    'token_expried'=>date("Y-m-d H:i:s", strtotime("+30 day")),
                    'refresh_token_expried'=>date("Y-m-d H:i:s", strtotime("+360 day"))
                ]);
              }
        }

        $dataSession = SessionUser::find($checkTokenIsValid->id);
        return response()->json([
            'code'=> 200,
            'data'=>  $dataSession,
            'message'=> "refresh token success"
        ],200);
    }
}