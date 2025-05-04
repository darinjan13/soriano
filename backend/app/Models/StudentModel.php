<?php

class StudentModel
{
    protected static function db()
    {
        static $pdo = null;
        if ($pdo === null) {
            $pdo = new \PDO('mysql:host=localhost;dbname=studentdb', 'root', '');
            $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        }
        return $pdo;
    }

    public static function getAll()
    {
        $stmt = self::db()->query("SELECT * FROM students ORDER BY created_at DESC");
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public static function find($id)
    {
        $stmt = self::db()->prepare("SELECT * FROM students WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public static function create($data)
    {
        $stmt = self::db()->prepare("INSERT INTO students (first_name, last_name, email, course) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data['first_name'],
            $data['last_name'],
            $data['email'],
            $data['course']
        ]);
        return ['id' => self::db()->lastInsertId()] + $data;
    }

    public static function update($id, $data)
    {
        $stmt = self::db()->prepare("UPDATE students SET first_name = ?, last_name = ?, email = ?, course = ? WHERE id = ?");
        $stmt->execute([
            $data['first_name'],
            $data['last_name'],
            $data['email'],
            $data['course'],
            $id
        ]);
        return $data;
    }

    public static function delete($id)
    {
        $stmt = self::db()->prepare("DELETE FROM students WHERE id = ?");
        $stmt->execute([$id]);
    }

    public static function emailExists($email, $excludeId = null)
    {
        $sql = "SELECT COUNT(*) FROM students WHERE email = ?";
        $params = [$email];

        if ($excludeId !== null) {
            $sql .= " AND id != ?";
            $params[] = $excludeId;
        }

        $stmt = self::db()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchColumn() > 0;
    }

}
