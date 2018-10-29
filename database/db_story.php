<?php
    include_once('../utils/database.php');

    /**
     * Returns all the stories
     */
    function getStories() {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT story_id, author, content, channel FROM stories');
        $stmt->execute();
        return $stmt->fetchAll(); 
    }
?>