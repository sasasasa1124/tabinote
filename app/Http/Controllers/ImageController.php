<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    //
    public function store(Request $request)
    {
        if ($request->file()) {
            $image = new Image();
            $imageFile = $request->file('image');
            $path = $request->file('image')->store('tabinote', ['disk' => 's3', 'ACL' => 'public-read']);
            $image->path = Storage::disk('s3')->url($path);
            $image->post_id = Post::latest()->first()->id;
            $image->save();
        }
    }
}
