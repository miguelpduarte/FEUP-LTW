<?php
    include_once('../database/db_story.php');

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
        $stories = getStories();
        header('Content-Type: application/json');
        echo json_encode($stories);
    }
    
    function handle_post() {
        echo "<br>POST args<br>";
        print_r($_POST);
    }

    function handle_error() {
        echo "Invalid request method for this route";
    }
?>