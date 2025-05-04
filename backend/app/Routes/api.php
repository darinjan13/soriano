<?php
require_once __DIR__ . '/../Controllers/StudentController.php';

Flight::route('GET /students', [StudentController::class, 'index']);
Flight::route('POST /students', [StudentController::class, 'store']);
Flight::route('GET /students/@id', [StudentController::class, 'show']);
Flight::route('PUT /students/@id', [StudentController::class, 'update']);
Flight::route('DELETE /students/@id', [StudentController::class, 'destroy']);
