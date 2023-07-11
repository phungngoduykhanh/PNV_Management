<?php

namespace App\Mail;

use App\Models\ChatRoom;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ChatRoomInvitation extends Mailable
{
    use Queueable, SerializesModels;

    public $chatroom,$token;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(ChatRoom $chatroom,$token)
    {
        $this->chatroom = $chatroom;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Invitation to Chatroom')
                    ->view('emails.chatroom_invitation')
                    ->with(['chatroom' => $this->chatroom, 'token' => $this->token]);;
    }
}
