<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');

    /**
     * Returns stories without content.
     */
    function getUser($username) {
        $db = Database::instance()->db();
        $stmt = $db->prepare(
            'SELECT user_id, username, name, storyScore, commentScore
            FROM
                (
                    (SELECT users.user_id, users.username, users.name, SUM(stories.score) as storyScore
                    FROM users
                    JOIN stories ON stories.author = users.user_id
                    WHERE users.user_id = ?
                    GROUP BY users.user_id)
                JOIN 
                    (SELECT users.user_id as a, SUM(comments.score) as commentScore
                    FROM users
                    JOIN comments ON comments.author = users.user_id
                    WHERE users.user_id = ?
                    GROUP BY users.user_id)
                ON user_id = a
                )
            ');
        $stmt->execute(array($username, $username));
        return $stmt->fetch(); 
    }

    /**
     * Validates Username/Password and returns the matching user if it exists.
     */
    function verifyLoginCredentials($username, $password) {

        
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT user_id, password FROM users WHERE username = ?');
        $stmt->execute(array($username));
        
        $user = $stmt->fetch();
        $pwdMatch = password_verify($password, $user['password']);

        if($pwdMatch) {
            return $user;
        } else {
            return null;
        }
    }

   

    /**
     * Inserts a user into the database.
     */
    function insertUser($username, $password, $name, & $error) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('INSERT INTO users (username, password, name) VALUES(?, ?, ?)');
        try{
            $hashedPW = password_hash($password, PASSWORD_DEFAULT);
            $stmt->execute(array($username, $hashedPW, $name));
        } catch(Exception $err) {
            $error = $err->getCode();
        }
    }
?>
