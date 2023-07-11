<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{
    use HasFactory;
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'chatroom_id');
    }
    
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function channels()
    {
        return $this->hasMany(Channel::class, 'chatroom_id');
    }

    public function createDefaultChannel() {
        $channel = new Channel();
        $channel->channelname = 'general';
        $channel->mode = 'public';
        $this->channels()->save($channel);
        return $channel;
    }
}
