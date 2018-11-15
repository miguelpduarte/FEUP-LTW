<?php 
    session_start();

    function getLoggedUser() {
        if($_SESSION && $_SESSION['user_id']) {
            return [
                'user_id' => $_SESSION['user_id'],
                'username' => $_SESSION['username']
            ];
        } else {
            return null;
        }
    }
?>