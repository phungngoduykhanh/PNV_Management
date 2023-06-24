<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Classes;

class ClassInvitation extends Mailable
{
    use Queueable, SerializesModels;

    public $class;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Classes $class)
    {
        $this->class = $class;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Mời tham gia lớp học')
                    ->view('emails.class_invitation');
    }
}
