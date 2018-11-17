<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');

    /**
     * Get comments.
     */
    function getComments($story_id, $n_comments, $offset) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT author, content, users.username as author_name, score 
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
        $stmt = $db->prepare('SELECT comment_id, author, content, users.username as author_name, score 
                              FROM comments JOIN users ON comments.author=users.user_id 
                              WHERE story = ?
                              LIMIT ? OFFSET ?');
        $stmt->execute(array($story_id, $n_comments, $offset));
        $comments = $stmt->fetchAll();
        foreach ($comments as $key => $comment) {
            $comment_id = $comment['comment_id'];
            $substmt = $db->prepare('SELECT comment_id, author, content, users.username as author_name, score 
                                     FROM comments JOIN users ON comments.author=users.user_id 
                                     WHERE parent_comment = ?
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
        $stmt = $db->prepare('SELECT comment_id, author, content, users.username as author_name, score 
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
    }

    /**
     * Insert comment on a comment.
     */
    function insertNestedComment($author, $content, $comment_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare("INSERT INTO comments (author, content, parent_comment) VALUES(?, ?, ?)");
        $stmt->execute(array($author, $content, $comment_id));
    }

?>