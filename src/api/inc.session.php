<?php 
    // session_set_cookie_params(0, '/', $_SERVER['SERVER_NAME'], true, true);
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
