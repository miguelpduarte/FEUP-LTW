<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');

    /**
     * Returns all channels.
     */
    function getAllChannels() {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT channel_id, name FROM channels');
        $stmt->execute();
        return $stmt->fetchAll(); 
    }


    /**
     * Returns all stories from given channel.
     */
    function getStoriesByChannel($id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT story_id, title FROM stories WHERE channel = ?');
        $stmt->execute(array($id));
        return $stmt->fetchAll(); 
    }

    /**
     * Insert channel. 
     */
    function insertChannel($name, &$error) {
        $db = Database::instance()->db();
    
        $fetch_stmt = $db->prepare('SELECT channel_id FROM channels WHERE name = ?');
        
        $fetch_stmt->execute(array($name));
        $id = $fetch_stmt->fetch();
        
        if(!$id) { //channel doesn't exist yet -> must be created
            $insert_stmt = $db->prepare('INSERT INTO channels (name) values(?)');
    
            try{
                $insert_stmt->execute(array($name));
                $id = $db->lastInsertId();
            } catch(Exception $err) {
                $error = $err->getCode();
            }
        } else {
            $id = $id['channel_id'];
        }

        return $id;
    
    }

    function changeChannel($story_id, $newChannel) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('UPDATE stories SET channel_id = ? WHERE story_id = ?' );

        try {
            $stmt->execute(array($newChannel, $story_id));

        } catch(Exception $err) {
            throw new Exception("Error changing Channel");
        }
    }

    function removeFromChannel($story_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('UPDATE stories SET channel_id = NULL WHERE story_id = ?' );

        try {
            $stmt->execute(array($story_id));

        } catch(Exception $err) {
            throw new Exception("Error removing Channel");
        }
    }
        
        


        

    
?>