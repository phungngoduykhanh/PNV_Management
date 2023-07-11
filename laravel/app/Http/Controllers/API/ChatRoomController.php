<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\ChatRoomInvitation;
use App\Models\ChatRoom;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\SessionUser;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Kreait\Laravel\Firebase\Facades\Firebase;

class ChatRoomController extends Controller
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
        
        $user = User::findOrFail($sessionUser->user_id);

        $user_id = $user->id;

        $teacher_classes = ChatRoom::where('owner_id', $user_id)->get();

        $student_classes = ChatRoom::whereHas('enrollments', function ($query) use ($user_id) {
            $query->where('user_id', $user_id)
                ->where('status', 'confirmed');
        })->get();

        $all_chatroom = $teacher_classes->concat($student_classes);
        
        return response()->json($all_chatroom);
    }

    public function createChatRoomAndInvite(Request $request)
    {
        $chatroom = new ChatRoom;
        $chatroom->chatroomname = $request->chatroomname;
        $chatroom->owner_id = $request->owner_id;
        $chatroom->save();
        $chatroom = ChatRoom::where('chatroomname', $request->chatroomname)->first();
        
        if (!$chatroom) {
            return response()->json([
                "code" => 404,
                'message' => 'chatroom does not exist'
            ], 404);
        }
        $defaultChannel = $chatroom->createDefaultChannel();
        
        $database = Firebase::database();
        $database->getReference('chatrooms/'. $chatroom->id)->set($chatroom);
        $database->getReference('channels/' . $defaultChannel->id)->set($defaultChannel);
        $emails = $request->emails;
        foreach ($emails as $role =>$roleEmails) {
            foreach($roleEmails as $email){
                $user = User::where('email', $email)->first();
                if (!$user) {
                    continue;
                }

                $enrollment = new Enrollment;
                $enrollment->user_id = $user->id;
                $enrollment->chatroom_id =$chatroom->id;
                $enrollment->status = 'pending';
                $enrollment->token = Str::random(40);
                $enrollment->save();
                Mail::to($email)->send(new ChatRoomInvitation($chatroom,$enrollment->token));

                $database->getReference('enrollments/'. $enrollment->id)->set($enrollment);
            }
        }
        return response()->json([
            'message' => 'successfully invite user to chatroom and created chatroom'
        ], 201);
    }

    public function getChatRoom()
    {
        $ChatRoom = ChatRoom::all();

        return response()->json($ChatRoom);
    }

    public function getemailUserChatRoom($chatroom_id,Request $request)
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
        
        $user = User::findOrFail($sessionUser->user_id);
        $user_id =$user->id;
        $confirmedEnrollments = Enrollment::where('chatroom_id', $chatroom_id)
        ->where('status', 'confirmed')
        ->where('user_id', '!=', $user_id) 
        ->get();

        $emails = [];

        foreach ($confirmedEnrollments as $key => $enrollment) {
            $userId = $enrollment->user_id;
            $user = User::find($userId);
            
            if ($user) {
                $email = $user->email;
                $emails[] = $email;
            }
        }

        $checkOwner = ChatRoom::where('owner_id','!=',$user_id)
        ->where('id', $chatroom_id)
        ->first();
        
        if ($checkOwner) {
            $email = User::find($checkOwner->owner_id);
            $emails[] = $email->email;
        }

        return response()->json(
            $emails
        );
    }
}
