<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\ChannelMember;
use App\Models\ChatRoom;
use App\Models\Enrollment;
use App\Models\SessionUser;
use App\Models\User;
use Illuminate\Http\Request;
use Kreait\Laravel\Firebase\Facades\Firebase;

class ChannelController extends Controller
{
    public function addChannel(Request $request,$token)
    {
        $channelname = $request->channelname;
        $chatroom_id = $request->chatroom_id;
        $mode = $request->mode;
        $emails = $request->email;
        if ($mode == "private" && (empty($channelname) || empty($mode) || empty($emails))) {
            return response()->json(["message" => "channel creation failed"]);
        } elseif ($mode == "public" && (empty($channelname) || empty($mode))) {
            return response()->json(["message" => "channel creation failed"]);
        }

        $checkChannelName = Channel::where("channelname", $channelname)
            ->where('chatroom_id', $chatroom_id)
            ->first();
        if ($checkChannelName) {
            return response()->json([
                "message" => "Channelname already exists"
            ]);
        }
        if ($mode == "public") {

            $channelCreate = Channel::create(
                [
                    'channelname' => $channelname,
                    'chatroom_id' => intval($chatroom_id),
                    'mode' => $mode,
                ]
            );

            $database = Firebase::database();
            $database->getReference('channels/' . $channelCreate->id)->set($channelCreate);

            return response()->json([
                "message" => "Create channel success",
                "data" => $channelCreate
            ]);
        } else if($mode == "private") {

            $sessionUser = SessionUser::where('token', $token)->first();
            $user =User::find($sessionUser->user_id);
            $emaill = $user->email;
            $emails[]=$emaill;
            
            foreach ($emails as $index => $email) {
                $user = User::where("email", $email)->first();
                if ($user) {
                    $user_id = $user->id;
                    
                    $existingChatroom = ChatRoom::where("owner_id", $user_id)->first();
                    $existingEnrollment = Enrollment::where('user_id', $user_id)
                        ->where('status', 'confirmed')
                        ->first();
                    echo ($existingChatroom.$existingEnrollment);
                    if (!$existingChatroom && !$existingEnrollment) {
                        return response()->json([
                            "message" => "email not exist in chatroom"
                        ]);
                    }
                } else {
                    return response()->json([
                        "message" => "email not found"
                    ]);
                }
            }

            $channelCreate = Channel::create(
                [
                    'channelname' => $channelname,
                    'chatroom_id' => intval($chatroom_id),
                    'mode' => $mode,
                ]
            );
            $database = Firebase::database();
            $database->getReference('channels/' . $channelCreate->id)->set($channelCreate);

            foreach ($emails as $index => $email) {
                $user = User::where("email", $email)->first();
                $user_id = $user_id;
                $ChannelMemberCreate = ChannelMember::create(
                    [
                        'channel_id' => $channelCreate->id,
                        'user_id' => $user_id,
                    ]
                );

                $database = Firebase::database();
                $database->getReference('channelmembers/' . $ChannelMemberCreate->id)->set($ChannelMemberCreate);
            }
            return response()->json([
                "message" => "create channel success"
            ]);
        }
    }
}
