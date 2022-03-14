<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name'=>'test_user' . $i,
                'email'=> 'test' . $i . '@mail.com',
                'password'=> Hash::make('password' . $i),
            ]);
        }
    }
}
