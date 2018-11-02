<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');

    /**
     * Returns stories without content.
     */
    function getStoriesNoContent() {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT story_id, author as author_id, title, channel, username as author_name FROM stories JOIN users ON stories.author = users.user_id');
        $stmt->execute();
        return $stmt->fetchAll(); 
    }

     /**
     * Returns a story.
     */
    function getFullStory($story_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT author as author_id, title, content, channel, username as author_name FROM stories JOIN users ON stories.author = users.user_id WHERE story_id = ?');
        $stmt->execute(array($story_id));
        return $stmt->fetchAll(); 
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