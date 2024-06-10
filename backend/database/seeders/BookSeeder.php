<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::create([
            'google_books_id' => 'test_google_books_id_1',
            'title' => 'Sample Book 1',
            'author' => 'Author 1',
            'description' => 'Description for Sample Book 1',
            'cover_image' => 'http://example.com/cover1.jpg',
            'published_year' => 2021,
            'status' => 'Want to Read',
        ]);

        Book::create([
            'google_books_id' => 'test_google_books_id_2',
            'title' => 'Sample Book 2',
            'description' => 'Description for Sample Book 2',
            'cover_image' => 'http://example.com/cover2.jpg',
            'published_year' => 2020,
            'status' => 'Reading',
        ]);

        Book::create([
            'google_books_id' => 'test_google_books_id_3',
            'title' => 'Sample Book 3',
            'author' => 'Author 3',
            'description' => 'Description for Sample Book 3',
            'cover_image' => 'http://example.com/cover3.jpg',
            'published_year' => 2019,
            'status' => 'Read',
        ]);
    }
}
           
