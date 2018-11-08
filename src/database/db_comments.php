<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/database.php');

    /**
     * Get comments.
     */
    function getComments($story_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT author, content, users.username as author_name, score FROM comments JOIN users ON comments.author=users.user_id WHERE story = ?');
        $stmt->execute(array($story_id));
        return $stmt->fetchAll(); 
    }

    /**
     * Returns nested comments.
     */
    function getNestedComments($story_id) {
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT comment_id, author, content, users.username as author_name, score FROM comments JOIN users ON comments.author=users.user_id WHERE story = ?');
        $stmt->execute(array($story_id));
        $comments = $stmt->fetchAll();
        foreach ($comments as $key => $comment) {
            $comment_id = $comment['comment_id'];
            $substmt = $db->prepare('SELECT comment_id, author, content, users.username as author_name, score FROM comments JOIN users ON comments.author=users.user_id WHERE parent_comment = ?');
            $substmt->execute(array($comment_id));
            $comments[$key]['nested_comments'] = $substmt->fetchAll();
        }
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