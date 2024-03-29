<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');

    /**
     * Get comments.
     */
    function getComments($story_id, $n_comments, $offset) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT content, users.username as author, score 
                              FROM comments JOIN users ON comments.author=users.user_id 
                              WHERE story = ?
                              LIMIT ? OFFSET ?');
        $stmt->execute(array($story_id, $n_comments, $offset));
        return $stmt->fetchAll(); 
    }

    /**
     * Returns nested comments.
     */
    function getNestedComments($story_id, $n_comments, $offset, $n_nested, $nested_offset) {
        $n_comments = ($n_comments == 0 ? 999999999999999 : $n_comments);
        
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT comment_id, content, users.username as author, score, created_at
                              FROM comments JOIN users ON comments.author=users.user_id 
                              WHERE story = ?
                              ORDER BY score DESC
                              LIMIT ? OFFSET ?');
        $stmt->execute(array($story_id, $n_comments, $offset));
        $comments = $stmt->fetchAll();
        foreach ($comments as $key => $comment) {
            $comment_id = $comment['comment_id'];
            $substmt = $db->prepare('SELECT comment_id, content, users.username as author, score, created_at
                                     FROM comments JOIN users ON comments.author=users.user_id 
                                     WHERE parent_comment = ?
                                     ORDER BY created_at
                                     LIMIT ? OFFSET ?');
            $substmt->execute(array($comment_id, $n_nested, $nested_offset));
            $comments[$key]['nested_comments'] = $substmt->fetchAll();
        }
        return $comments; 
    }

    /**
     * Returns subcomments.
     */
    function getSubComments($comment_id, $n_comments, $offset) {
        $n_comments = ($n_comments == 0 ? 999999999999999 : $n_comments);
        
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT comment_id, content, users.username as author, score, created_at
                              FROM comments JOIN users ON comments.author=users.user_id 
                              WHERE parent_comment = ?
                              LIMIT ? OFFSET ?');
        $stmt->execute(array($comment_id, $n_comments, $offset));
        $comments = $stmt->fetchAll();
        return $comments; 
    }

    /**
     * Insert comment on story.
     */
    function insertComment($author, $content, $story_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare("INSERT INTO comments (author, content, story) VALUES(?, ?, ?)");
        $stmt->execute(array($author, $content, $story_id));

        $inserted_comment_id = $db->lastInsertId();

        $stmt = $db->prepare("SELECT username as author, content, comment_id, score, created_at 
        FROM comments 
        JOIN users
        ON comments.author = users.user_id
        WHERE comment_id = ?");
        $stmt->execute(array($inserted_comment_id));
        return $stmt->fetch();
        
    }
    
    /**
     * Insert comment on a comment.
     */
    function insertNestedComment($author, $content, $comment_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare("INSERT INTO comments (author, content, parent_comment) VALUES(?, ?, ?)");
        $stmt->execute(array($author, $content, $comment_id));
        
        $inserted_comment_id = $db->lastInsertId();
        
        $stmt = $db->prepare("SELECT username as author, content, comment_id, score, created_at 
        FROM comments 
        JOIN users
        ON comments.author = users.user_id
        WHERE comment_id = ?");
        $stmt->execute(array($inserted_comment_id));
        return $stmt->fetch();
    }


    /**
     * Vote on a comment
     */
    function voteComment($comment_id, $user_id, $vote) {

        removeCommentVote($comment_id, $user_id, $vote);
        $db = Database::instance()->db();

        try {
            $stmt = $db->prepare('REPLACE INTO commentVotes(comment_id, user_id, rating) VALUES(?, ?, ?)');

            $rating = $vote ? 1 : -1;

            if(!$stmt->execute(array($comment_id, $user_id, $rating))) {
                throw new Exception("Error while voting");
            }
        } catch(Exception $e) {
            throw new Exception("Error while voting");
        }

    }

    /**
     * Remove the vote from user_id to comment_id
     */
    function removeCommentVote($comment_id, $user_id) {
        $db = Database::instance()->db();
        
        $stmt = $db->prepare('SELECT comment_id FROM comments WHERE comment_id = ?');
        $stmt->execute(array($comment_id));

        if(!$stmt->fetch()) {
            throw new Exception("No story with id $comment_id");
        }

        $stmt = $db->prepare('SELECT user_id FROM users WHERE user_id = ?');
        $stmt->execute(array($user_id));

        if(!$stmt->fetch()) {
            throw new Exception("No user with id $user_id");
        }
        
        try {
            $stmt = $db->prepare('DELETE FROM commentVotes WHERE comment_id = ? AND user_id = ?');

            if(!$stmt->execute(array($comment_id, $user_id))) {
                throw new Exception("Error while removing vote");
            }
        } catch(Exception $e) {
            throw new Exception("Error while removing vote");
        }
    }

    function getCommentScore($comment_id) {
        $db = Database::instance()->db();
        
        $stmt = $db->prepare('SELECT score FROM comments WHERE comment_id = ?');
        $stmt->execute(array($comment_id));

        return $stmt->fetch();
    }
?>