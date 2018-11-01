<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');

    /**
     * Returns all the stories
     */
    function getStories() {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT story_id, author, title, content, channel FROM stories');
        $stmt->execute();
        return $stmt->fetchAll(); 
    }

    /**
     * Returns stories without content.
     */
    function getStoriesNoContent() {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT story_id, author, title, channel FROM stories');
        $stmt->execute();
        return $stmt->fetchAll(); 
    }

     /**
     * Returns a story.
     */
    function getFullStory($story_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT author, title, content, channel FROM stories WHERE story_id = ?');
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