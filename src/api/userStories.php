<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/errors.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_story.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/inc.session.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            //get user info
            handle_get();
            break;
        default:
            handle_error();  
            break;
    }
    
    function handle_get() {
        header('Content-Type: application/json');
        if(!empty($_GET['username'])) {
            $data = getUserStories($_GET['username']);

            if($data === false) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'reason' => 'Database fetching failed',
                    'code' => Error("OTHER")

                ]);
                exit;
            } else {

                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'data' => $data
                ]);
                exit;
            }

        } else {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'No Username Specified',
                'code' => Error("MISSING_PARAM")
            ]);
            exit;
        }
    }

    function handle_error() {
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'reason' => 'Invalid request method for this route',
            'code' => Error("INVALID_ROUTE")
        ]);
        exit;
    }
?>
