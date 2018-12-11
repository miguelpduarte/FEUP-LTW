<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/db_channel.php');

    /**
     * Returns stories without content.
     */
    function getStoriesNoContent($offset, $n_stories) {
        $n_stories = ($n_stories == 0 ? 999999999999999 : $n_stories);
        $db = Database::instance()->db();
        $stmt = $db->prepare(
            'SELECT stories.story_id, author as author_id, title, channel, created_at, username as author_name, score
            FROM stories 
            JOIN users ON stories.author = users.user_id
            ORDER BY  created_at DESC
            LIMIT ? OFFSET ?
            ');
        $stmt->execute(array($n_stories, $offset));
        return $stmt->fetchAll(); 
    }

        /**
     * Returns stories without content.
     */
    function getTopStoriesNoContent() {
        $db = Database::instance()->db();
        $stmt = $db->prepare(
            'SELECT stories.story_id, author as author_id, title, channel, created_at, username as author_name, score
            FROM stories 
            JOIN users ON stories.author = users.user_id
            ORDER BY score DESC
            LIMIT 3');
        $stmt->execute();
        return $stmt->fetchAll(); 
    }

     /**
     * Returns a story.
     */
    function getFullStory($story_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare(
            'SELECT story_id, author as author_id, title, content, channel, created_at, updated_at, username as author_name, score
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
     * Returns stories without content.
     */
    function getUserStories($username) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT stories.story_id, author as author_id, title, channel, created_at, username as author_name, score
                                FROM stories 
                                JOIN users ON stories.author = users.user_id
                                WHERE users.username = ?
                                ORDER BY created_at DESC');
        $stmt->execute(array($username));
        return $stmt->fetchAll(); 
    }

    
    /**
     * Inserts a story into the database.
     */
    function insertStory($author, $title, $content, $channel) {
        $db = Database::instance()->db();
    
        $insertChannelError = '';
        $channel_id = insertChannel($channel, $insertChannelError);
        
        if($insertChannelError) {
            throw new Exception("Error Assigning Channel");
        } else {
            $stmt = $db->prepare('INSERT INTO stories (author, title, content, channel) VALUES(?, ?, ?, ?)');
            $stmt->execute(array($author, $title, $content, $channel_id));
            return $db->lastInsertId();
        }
        
    }

    /**
     * Returns true if story with <story_id> has author with <$user_id>
     */
    function verifyStoryOwnership($story_id, $user_id) {
        $db = Database::instance()->db();
        
        $stmt = $db->prepare('SELECT story_id, author FROM stories WHERE story_id = ?');
        $stmt->execute(array($story_id));

        $story = $stmt->fetch();

        if(!$story) {
            throw new Exception("There is no story with given id: $story_id");
        } else {
            return $story['author'] === $user_id;
        }
    }


    /**
     * Vote on a story
     */
    function voteStory($story_id, $user_id, $vote) {

        removeStoryVote($story_id, $user_id);

        $db = Database::instance()->db();
        try {
            $stmt = $db->prepare('INSERT INTO storyVotes (story_id, user_id, rating) VALUES (?,?,?)');

            $rating = $vote ? 1 : -1;
            if(!$stmt->execute(array($story_id, $user_id, $rating))) {
                throw new Exception("Error while voting");
            }
        } catch(Exception $e) {
            throw new Exception("Error while voting");
        }

    }

    /**
     * Remove the vote from user_id to story_id
     */
    function removeStoryVote($story_id, $user_id) {
        $db = Database::instance()->db();
        
        $stmt = $db->prepare('SELECT story_id FROM stories WHERE story_id = ?');
        $stmt->execute(array($story_id));

        if(!$stmt->fetch()) {
            throw new Exception("No story with id $story_id");
        }

        $stmt = $db->prepare('SELECT user_id FROM users WHERE user_id = ?');
        $stmt->execute(array($user_id));

        if(!$stmt->fetch()) {
            throw new Exception("No user with id $user_id");
        }


        // $stmt = $db->prepare('SELECT * FROM storyVotes WHERE story_id = ?  AND user_id = ?');
        // $stmt->execute(array($story_id, $user_id));

        // if(!$stmt->fetch()) {
        //     return;
        // }
        
        try {
            $stmt = $db->prepare('DELETE FROM storyVotes WHERE story_id = ? AND user_id = ?');

            if(!$stmt->execute(array($story_id, $user_id))) {
                throw new Exception("Error while removing vote");
            }
        } catch(Exception $e) {
            throw new Exception("Error while removing vote");
        }
    }

    function getStoryScore($story_id) {
        $db = Database::instance()->db();
        
        $stmt = $db->prepare('SELECT score FROM stories WHERE story_id = ?');
        $stmt->execute(array($story_id));

        return $stmt->fetch();
    }
    
?>