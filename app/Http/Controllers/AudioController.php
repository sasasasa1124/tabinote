<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Audio;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class AudioController extends Controller
{
    //
    public function store(Request $request)
    {
        if ($request->file()) {
            $image = new Image();
            $imageFile = $request->file('audio');
            $path = $request->file('audio')->store('tabinote', ['disk' => 's3', 'ACL' => 'public-read']);
            $image->path = Storage::disk('s3')->url($path);
            $image->post_id = Post::latest()->first()->id;
            $image->save();
        }
    }

    public function fetch(Post $post)
    {
      return $post->audios()->get();
    }
}
