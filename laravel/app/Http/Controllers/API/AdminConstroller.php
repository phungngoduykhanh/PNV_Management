<?php


namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SessionUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AdminConstroller extends Controller
{
    public function index(Request $request)
    {
        if (!$request->bearerToken()) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        $users = User::all();

        return response()->json($users);
    }
    
    public function AdminUser()
    {
        $users = User::all();

        return response()->json($users);
    }
    public function deleteUser($id)
    {
        $User = User::find($id);

        if (!$User) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $User->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

}
