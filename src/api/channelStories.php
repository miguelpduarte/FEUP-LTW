<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/errors.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_channel.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/inc.session.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            // Get Stories from Channel (if id is specified)
            handle_get();
            break;
        default:
            handle_error();  
            break;
    }

    function handle_get() {
        header('Content-Type: application/json');
        if(!empty($_GET['id'])) { //Get Channel's Stories
            $n_stories = (!empty($_GET['n_stories']) ? intval($_GET['n_stories']) : 0);
            $offset = (!empty($_GET['off']) ? intval($_GET['off']) : 0);

            $stories = getStoriesByChannel($_GET['id'], $offset, $n_stories);
            
            if(empty($stories)) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'reason' => "No stories or channel found",
                    'code' => Error("NOT_FOUND")
                ]);
                exit;
            } else {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'data' => $stories
                ]);
                exit;
            }
        } else {
            http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'reason' => 'Missing field id',
                    'code' => Error("MISSING_PARAM")
                ]);
                exit;
        }
    }
?>



