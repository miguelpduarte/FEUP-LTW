<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');

    /**
     * Returns all channels.
     */
    function getChannels() {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT channel_id, name FROM channels');
        $stmt->execute();
        return $stmt->fetchAll(); 
    }

    /**
     * Insert channel. 
     */
    function insertChannel($name) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('INSERT INTO channels (name) values(?)');
        $stmt->execute(array($name));
        return $stmt->fetchAll(); 
    }
?>