<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        for ($i=1; $i<=500; $i++){
            Comment::create([
                'user_id'=>1,
                'post_id'=>rand(1,100),
                'body'=>'this is a random comment '. $i
            ]);
        };        
    }
}
