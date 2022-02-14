<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Storage;

class PostController extends Controller
{
    //
    public function index(Request $request)
    {
        return Post::where('public',true)->orWhere('user_id',$request->id)->get();
    }

    public function fetch(Post $post)
    {
        return ['post' => $post, 'author' => $post->user, 'comments' => $post->comments];
    }

    public function store(Post $post, Request $request)
    {
        # just avoiding errors, but there should be a better way
        $image = $request->file('image');
        $path = Storage::disk('s3')->putFile('tabinote', $image, 'public');
        $post->image_path = Storage::disk('s3')->url($path);
        $post->fill($request)->save();
    }    
}