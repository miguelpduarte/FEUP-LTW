<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../../utils/errors.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../../database/db_channel.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../inc.session.php');

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
        
        if(!empty($_GET['query'])) {
            $channels = getChannelsLike($_GET['query']); 
            $distances = []; 

            foreach ($channels as $key => $value) {
                $distances[$key] = levenshtein($value['name'], $_GET['query']);
            }

            $best_matches = [];
            asort($distances);
            $count  = 0;
            foreach ($distances as $key => $value) {
                if ($count >= 10) {
                    break;
                }
                
                array_push($best_matches, $channels[$key]);
            }
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $best_matches
            ]);
            exit;

        } else {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'No Query Specified',
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