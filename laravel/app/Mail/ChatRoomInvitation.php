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

    public $chatroom;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(ChatRoom $chatroom)
    {
        $this->chatroom = $chatroom;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Invitation to Chatroom')
                    ->view('emails.chatroom_invitation');
    }
}
