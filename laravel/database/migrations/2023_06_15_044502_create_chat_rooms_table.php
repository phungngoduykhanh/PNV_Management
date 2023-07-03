<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('chatroomname')->unique();
            $table->unsignedBigInteger('owner_id');
            
            $table->foreign('owner_id')
            ->references('id')
            ->on('users')
            ->onDelete('cascade');
            $table->string('background_img')->nullable();
            $table->string('description')->nullable();
            $table->string('img')->default('https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chatrooms');
    }
};
