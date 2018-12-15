<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');

    /**
     * Returns all channels.
     */
    
    function getAllChannels($offset, $n_channels) {
        $n_channels = ($n_channels == 0 ? 999999999999999 : $n_channels);

        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT channel_id, name, color FROM channels LIMIT ? OFFSET ?');
        $stmt->execute(array($n_channels, $offset));
        return $stmt->fetchAll(); 
    }

    /**
     * Returns channel's info.
     */
    
    function getChannel($id) {

        $db = Database::instance()->db();
        
        $stmt = $db->prepare('SELECT channel_id, name, color FROM channels WHERE channel_id = ?');
        $stmt->execute(array($id));
        
        return $stmt->fetch(); 
    }

    /**
     * Returns all channels with a given query
     */
    function getChannelsLike($query) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT channel_id, name, color FROM channels WHERE name LIKE ?');
        $stmt->execute(array("%$query%"));
        return $stmt->fetchAll(); 
    }


     /**
     * Returns stories from given channel
     */
    function getStoriesByChannel($id, $offset, $n_stories) {
        $n_stories = ($n_stories == 0 ? 999999999999999 : $n_stories);
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT story_id, author as author_id, title, channel, created_at, username as author_name, score, n_comments
                                FROM stories 
                                JOIN users ON stories.author = users.user_id
                                WHERE channel = ?
                                ORDER BY score, created_at DESC
                                LIMIT ? OFFSET ?');
        $stmt->execute(array($id, $n_stories, $offset));

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
            $insert_stmt = $db->prepare('INSERT INTO channels (name, color) values(?, ?)');
    
            $color = rand_color();

            try{
                $insert_stmt->execute(array($name, $color));
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
        $stmt = $db->prepare('UPDATE stories SET channel = ? WHERE story_id = ?' );

        try {
            $stmt->execute(array($newChannel, $story_id));

        } catch(Exception $err) {
            throw new Exception("Error changing Channel");
        }
    }

    function removeFromChannel($story_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('UPDATE stories SET channel = 0 WHERE story_id = ?' );

        try {
            $stmt->execute(array($story_id));

        } catch(Exception $err) {
            throw new Exception("Error removing Channel");
        }
    }
        
        

    /**
     * Generates a random color in HEX format
     */
    function rand_color() {
        return '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
    }
        

    
?>