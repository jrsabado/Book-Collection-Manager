<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    public function index()
    {
        return Book::all();
    }

    public function store(Request $request)
    {
        $book = Book::updateOrCreate(
            ['google_books_id' => $request->google_books_id],
            $request->all()
        );
        return response()->json($book, 201);
    }

    public function show($google_books_id)
    {
        $book = Book::where('google_books_id', $google_books_id)->firstOrFail();
        return response()->json($book);
    }

    public function update(Request $request, $google_books_id)
    {
        $book = Book::where('google_books_id', $google_books_id)->firstOrFail();
        $book->update($request->all());
        return response()->json($book);
    }

    public function destroy($google_books_id)
    {
        $book = Book::where('google_books_id', $google_books_id)->firstOrFail();
        $book->delete();
        return response()->json(null, 204);
    }
}
