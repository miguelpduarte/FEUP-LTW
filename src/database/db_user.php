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
                    WHERE users.username = ?
                    GROUP BY users.user_id)
                JOIN 
                    (SELECT users.user_id as a, SUM(comments.score) as commentScore
                    FROM users
                    JOIN comments ON comments.author = users.user_id
                    WHERE users.username = ?
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

    /**
     * Change a user's name.
     */
    function changeName($user_id, $new_name) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('UPDATE users SET name = ? WHERE user_id = ?');
        
        $stmt->execute(array($new_name, $user_id));
        
    }
    /**
     * Change a user's password.
     */
    function changePassword($user_id, $old_password, $new_password) {
        try {
            $db = Database::instance()->db();

            $stmt = $db->prepare('SELECT user_id, password FROM users WHERE user_id = ?');
            $stmt->execute(array($user_id));
            $fetched_user = $stmt->fetch();
        } catch (Exception $e) {
            throw new Exception("Error Changing password");
        }

        $correct_password = password_verify($old_password, $fetched_user['password']);

        if($correct_password) {
            //change
            $stmt2 = $db->prepare('UPDATE users SET password = ? WHERE user_id = ?');
            try{
                $hashedPW = password_hash($new_password, PASSWORD_DEFAULT);
                $stmt2->execute(array($hashedPW, $user_id));
            } catch(Exception $err) {
                throw new Exception("Error Changing password");
            }
        } else {
            throw new Exception("Wrong password");
        }

        
    }


?>
