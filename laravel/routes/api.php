<?php

use App\Http\Controllers\API\ClassController;
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

Route::get('user', [UserController::class, 'index']);

Route::post('update-user/{id}', [UserController::class, 'updateUser']);

Route::get('/users/search/{term}', [UserController::class,'search']);

//Login token
Route::post('login', [LoginController::class, 'login']);

Route::post('refresh-token', [LoginController::class, 'refreshToken']);

Route::get('class', [ClassController::class, 'index']);

Route::get('classes', [ClassController::class, 'getClass']);


