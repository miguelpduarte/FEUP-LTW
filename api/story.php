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
        if(isset($_GET['id'])) {
            $data = getFullStory($_GET['id']);
        } else {
            $data = getStoriesNoContent();
        }
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
    
    function handle_post() {
        echo "<br>POST args<br>";
        print_r($_POST);
    }

    function handle_error() {
        echo "Invalid request method for this route";
    }
?>