<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SessionUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->bearerToken()) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        $sessionUser = SessionUser::where('token', $request->bearerToken())->first();
        if (!$sessionUser) {
            return response()->json([
                'error' => 'Session user not found',
            ], 404);
        }
        $user = User::find($sessionUser->user_id);

        return response()->json($user);
    }

    public function updateUser(Request $request)
    {
        $id = $request->id;

        $userData = $request->all();
        $user = User::find($id);

        if ($user) {
            $user->fill($userData);
            $user->save();
            return response()->json($user, 200);
        } else {
            return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
        }
    }

    public function search($term, $id)
    {

        $currentUserId = $id;

        $users = User::where('email', 'LIKE', "%" . $term . "%")
            ->whereNotIn('id', [$currentUserId])
            ->get();

        return response()->json($users);
    }

    public function searchEmail(Request $request)
    {
        $term = $request->term;
        $members = $request->members;
        if($term == ""){
            return response()->json(
                []
            );
        }
        $emails = [];
        foreach ($members as $key => $member) {
            $email = $member['email'];
            $emails[] = $email;
        }
        
        $emails = User::whereNotIn('email', $emails)
        ->where('email', 'LIKE', "%" . $term . "%")
        ->pluck('email')
        ->toArray();

        return response()->json(
            $emails
        );

    }
}
