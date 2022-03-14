<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        for ($i=1;$i<100;$i++){
            Post::create([
                'user_id'=> random_int(1, 10),
                'public'=> (random_int(0,1) == 1),
                'title'=>'title' . $i,
                'body'=>'this is body ' . $i,
                'lat'=>35.697331931004356 + rand(-100,100) * 0.001,
                'lng'=>139.60394319708948 + rand(-100,100) * 0.001,
            ]);
        }        
    }
}
