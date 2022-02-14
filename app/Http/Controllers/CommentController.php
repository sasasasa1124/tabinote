<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    //
    public function store(Request $request)
    {
        return Comment::create([
            'post_id' => $request->post_id,
            'user_id' => $request->user_id == 0 ? null : $request->user_id,
            'body' => $request->body,
        ]);
    }    
}
