<?php 

    function generate_random_token() {
        return bin2hex(openssl_random_pseudo_bytes(32));
    }

    function verifyCSRF($csrf) {
        return $csrf === $_SESSION['csrf'];
    }

    

    // session_set_cookie_params(0, '/', $_SERVER['SERVER_NAME'], false, false);
    session_start();

    function getLoggedUser() {
        if($_SESSION && $_SESSION['user_id']) {
            return [
                'username' => $_SESSION['username'],
                'csrf' => $_SESSION['csrf']
            ];
        } else {
            return null;
        }
    }
?>
