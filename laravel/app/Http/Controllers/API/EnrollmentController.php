<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\ChatRoomInvitation;
use App\Models\Channel;
use App\Models\ChannelMember;
use App\Models\ChatRoom;
use App\Models\Enrollment;
use App\Models\User;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Kreait\Laravel\Firebase\Facades\Firebase;

class EnrollmentController extends Controller
{
    public function confirm($token) {
        $enrollment = Enrollment::where('token', $token)->first();

        if ($enrollment) {

            $enrollment->status = 'confirmed';
            $enrollment->save();

            $database = Firebase::database();
            $enrollmentRef = $database->getReference('enrollments/'.$enrollment->id);
            $enrollmentRef->update([
                'status' => 'confirmed'
            ]);

            return response()->json([
                "message"=> "You have successfully joined the chatroom"
            ]);
        }
        return response()->json([
            "message"=> "Error"
        ]);
    }

    public function getmember($id) {
        $members = [];
        $channel_id = $id;
        
        $channel = Channel::where("id",$channel_id)->first();

        if($channel->mode === "public"){
            $chatroom_id = $channel->chatroom_id;

            $dataEnrollments = Enrollment::where('chatroom_id',$chatroom_id)
            ->where("status","confirmed")->get();

            foreach ($dataEnrollments as $key => $enrollment) {
                $user_id = $enrollment->user_id;
                $user = User::where("id",$user_id)->first();
                $members[]=$user;
            }
            
            $chatroom = ChatRoom::where("id",$chatroom_id)->first();
            $owner_id = $chatroom->owner_id;
            $dataowner = User::where("id",$owner_id)->first();
            $members[]=$dataowner;
            
            return response()->json(
                $members
            );
        }elseif($channel->mode === "private"){
            $datamembers = ChannelMember::where("channel_id",$channel_id)->get();
            foreach ($datamembers as $key => $member) {
                $members[] = User::where("id",$member->user_id)->first();
            }
            
            return response()->json(
                $members
            );
        }
    }

    public function addmember($channel_id,Request $request) {
        $channel = Channel::where('id',$channel_id)->first();
        $chatroom = ChatRoom::where('id',$channel->chatroom_id)->first();
        $emails = $request;
        if($channel->mode == "public"){
            foreach ($emails as $key => $email) {
                $user = User::where('email',$email)->first();

                $enrollment = new Enrollment;
                $enrollment->user_id = $user->id;
                $enrollment->chatroom_id =$chatroom->id;
                $enrollment->status = 'pending';
                $enrollment->token = Str::random(40);
                $enrollment->save();
                Mail::to($email)->send(new ChatRoomInvitation($chatroom,$enrollment->token));

                $database = Firebase::database();
                $database->getReference('enrollments/'. $enrollment->id)->set($enrollment);
            }
        }
        elseif($channel->mode == "private"){
            foreach ($emails as $key => $email) {
                $user = User::where('email',$email)->first();
                $checkEnrollment = Enrollment::where('user_id',$user->id)
                ->first();
                $checkChatroom = ChatRoom::where('owner_id',$user->id)->first();

                if(!$checkEnrollment && !$checkChatroom){
                    $enrollment = new Enrollment;
                    $enrollment->user_id = $user->id;
                    $enrollment->chatroom_id =$chatroom->id;
                    $enrollment->status = 'pending';
                    $enrollment->token = Str::random(40);
                    $enrollment->save();
                    Mail::to($email)->send(new ChatRoomInvitation($chatroom,$enrollment->token));
    
                    $database = Firebase::database();
                    $database->getReference('enrollments/'. $enrollment->id)->set($enrollment);
                }else{

                    $ChannelMemberCreate = ChannelMember::create(
                        [
                            'channel_id' => $channel->id,
                            'user_id' => $user->id,
                        ]
                    );
    
                    $database = Firebase::database();
                    $database->getReference('channelmembers/' . $ChannelMemberCreate->id)->set($ChannelMemberCreate);

                }
            }
        }
    }
}
