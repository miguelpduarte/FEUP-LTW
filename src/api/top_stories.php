<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/errors.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_story.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/inc.session.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
          handle_get();
          break;
        default:
          handle_error();  
          break;
    }
    
    function handle_get() {
        header('Content-Type: application/json');

        $data = getTopStoriesNoContent();

        //Ensuring that no NULLs are left behind (when a story does not have any rating)
        foreach ($data as $key => $value) {
            if($value['score'] === NULL) {
                $data[$key]['score'] = '0';
            }
        }


        if($data === false) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'reason' => 'Database fetching failed',
                'code' => Error("OTHER")
            ]);
            exit;
        }

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $data
            ]);
        exit;
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