<?php
    include_once('../includes/database.php');

    /**
     * Returns all the stories
     */
    function getStories() {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT story_id, author, content, channel FROM story');
        $stmt->execute();
        return $stmt->fetchAll(); 
    }
?>