<?php
require_once __DIR__ . '/../Models/StudentModel.php';

class StudentController
{
    public static function index()
    {
        $users = StudentModel::getAll();
        Flight::json($users);
    }

    public static function store()
    {
        $data = Flight::request()->data->getData();
        $errors = self::validate($data);

        if (!empty($errors)) {
            Flight::json(['errors' => $errors], 422);
            return;
        }

        $student = StudentModel::create($data);
        Flight::json($student);
    }

    public static function show($id)
    {
        $user = StudentModel::find($id);
        Flight::json($user);
    }

    public static function update($id)
    {
        $data = Flight::request()->data->getData();
        $errors = self::validate($data, $id);

        if (!empty($errors)) {
            Flight::json(['errors' => $errors], 422);
            return;
        }

        $result = StudentModel::update($id, $data);
        Flight::json(['message' => 'Student updated', 'data' => $result]);
    }

    public static function destroy($id)
    {
        StudentModel::delete($id);
        Flight::json(['message' => 'Student deleted']);
    }

    protected static function validate($data, $excludeId = null)
    {
        $errors = [];

        if (empty(trim($data['first_name'] ?? ''))) {
            $errors['first_name'] = 'First name is required.';
        } elseif (strlen($data['first_name']) < 2) {
            $errors['first_name'] = 'First name must be at least 2 characters.';
        } elseif (preg_match('/[0-9!@#$%^&*(),.?":{}|<>]/', $data['first_name'])) {
            $errors['first_name'] = 'First name should not contain numbers or special characters.';
        }

        if (empty(trim($data['last_name'] ?? ''))) {
            $errors['last_name'] = 'Last name is required.';
        } elseif (strlen($data['last_name']) < 2) {
            $errors['last_name'] = 'Last name must be at least 2 characters.';
        } elseif (preg_match('/[0-9!@#$%^&*(),.?":{}|<>]/', $data['last_name'])) {
            $errors['last_name'] = 'Last name should not contain numbers or special characters.';
        }

        if (empty(trim($data['email'] ?? ''))) {
            $errors['email'] = 'Email is required.';
        } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Invalid email address.';
        } elseif (StudentModel::emailExists($data['email'], $excludeId)) {
            $errors['email'] = 'Email is already taken.';
        }

        if (empty(trim($data['course'] ?? ''))) {
            $errors['course'] = 'Course is required.';
        } elseif (strlen($data['course']) < 2) {
            $errors['course'] = 'Course name must be at least 2 characters.';
        } elseif (preg_match('/[0-9!@#$%^&*(),.?":{}|<>]/', $data['course'])) {
            $errors['course'] = 'Course name should not contain numbers or special characters.';
        }

        return $errors;
    }


}
