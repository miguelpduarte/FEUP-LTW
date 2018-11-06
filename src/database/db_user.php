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
     * Returns a story.
     */
    function getFullStory($story_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare(
            'SELECT story_id, author as author_id, title, content, channel, created_at, updated_at, username as author_name
            FROM stories JOIN users ON stories.author = users.user_id
            WHERE story_id = ?');
        $stmt->execute(array($story_id));
        return $stmt->fetch(); 
    }

    /**
     * Return all stories from a given channel.
     */
    function getStoriesInChannel($channel) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT story_id, author, title, content FROM stories WHERE channel = ?');
        $stmt->execute(array($channel));
        return $stmt->fetchAll(); 
    }

    /**
     * Inserts a story into the database.
     */
    function insertStory($author, $title, $content, $channel) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('INSERT INTO stories (author, title, content, channel) VALUES(?, ?, ?, ?)');
        $stmt->execute(array($author, $title, $content, $channel));
    }
?>