<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');

    /**
     * Returns stories without content.
     */
    function getUser($user_id) {
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
                    (SELECT users.user_id as a, users.username as b, users.name as c, story as d, SUM(comments.score) as commentScore
                    FROM users
                    JOIN comments ON comments.author = users.user_id
                    WHERE users.user_id = ?
                    GROUP BY users.user_id)
                ON user_id = a
                )
            ');
        $stmt->execute(array($user_id, $user_id));
        return $stmt->fetch(); 
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