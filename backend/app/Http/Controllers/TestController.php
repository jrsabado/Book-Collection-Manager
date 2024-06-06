<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function testDatabaseConnection()
    {
        try {
            DB::connection()->getPdo();
            return "Connected successfully to the database.";
        } catch (\Exception $e) {
            return "Could not connect to the database. Please check your configuration. Error: " . $e->getMessage();
        }
    }
}
