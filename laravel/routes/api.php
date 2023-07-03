<?php

use App\Http\Controllers\API\ChatRoomController;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\UserController;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//API register
Route::post('register', [RegisterController::class, 'register']);

Route::get('check-user', [RegisterController::class, 'checkUser']);

//API user
Route::get('user', [UserController::class, 'index']);

Route::post('update-user/{id}', [UserController::class, 'updateUser']);

Route::get('/users/search/{term}/{id}', [UserController::class, 'search']);

//Login token
Route::post('login', [LoginController::class, 'login']);

Route::post('refresh-token', [LoginController::class, 'refreshToken']);

//API class
Route::get('chatroom', [ChatRoomController::class, 'index']);

Route::get('chatrooms', [ChatRoomController::class, 'getChatRoom']);

Route::post('create-chatroom', [ChatRoomController::class, 'createChatRoomAndInvite']);

Route::get('firebase-chatroom/{id}',function(Request $request){
    $id_chatroom = $request->id;
    
});