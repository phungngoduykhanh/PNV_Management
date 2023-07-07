<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory;
    protected $fillable = [
        'channelname',
        'mode'
    ];
    public function chatRoom()
    {
        return $this->belongsTo(ChatRoom::class);
    }
}
