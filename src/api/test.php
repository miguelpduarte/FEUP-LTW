<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_story.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
          handle_post();
          break;
        case 'GET':
          handle_get();
          break;
        default:
          handle_error();  
          break;
    }
    
    function handle_get() {
        $stuff = [
            'success' => 'false',
            'data' => 'This is a test endpoint'
        ];
        header('Content-Type: application/json');
        echo json_encode($stuff);
        exit;
    }
    
    function handle_post() {
        //TODO: Add login validation - can only insert stories of own user, etc
        // $author, $title, $content, $channel
        if(!isset($_GET['author']) || $_GET['author'] === '' || !is_int($_GET['author'])) {
            
        }
    }

    function handle_error() {
        http_response_code(405);
        echo "Invalid request method for this route";
        exit;
    }
?>