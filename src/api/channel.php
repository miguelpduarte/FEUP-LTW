<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_channel.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/inc.session.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            // Get All Channels
            // or 
            // Get Stories from Channel (if id is specified)
            handle_get();
            break;
        case 'PATCH':
            // Delete Channel
            handle_patch();
            break;
        default:
            handle_error();  
            break;
    }
    
    function handle_post() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        
        $currentUser = getLoggedUser();

        if(!$currentUser) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "Anonimous User can't create a channel"
                ]);
            exit;
        }

        if(empty($data['name'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The name field is missing'
                ]);
            exit;
        }

        $error = "";
        insertChannel($data['name']);
            
        if($error) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => $error
            ]);
            exit;
        } else {
            http_response_code(200);
            echo json_encode([
                'success' => true
            ]);
            exit;
        }
    }

    function handle_get() {
        header('Content-Type: application/json');
        if(isset($_GET['id'])) { //Get Channel's Stories
            $stories = getStoriesByChannel($_GET['id']);
            
            if(empty($stories)) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'reason' => "There's no channel with id (" . $_GET['id'] . ")"
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

        } else { // Get existent channels
            $channels = getAllChannels();

            http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'data' => $channels
                ]);
                exit;
        }
    }

    function handle_patch() {
        header('Content-Type: application/json');

        $story_id = $data['story_id'];

        if(empty($story_id)) {
            http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'reason' => "Must specify story_id"
                ]);
            exit;
        }

        if(!empty($data['channel_id'])) { // Change channel
            try {
                changeChannel($story_id, $newChannel);
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                ]);
                exit;
            } catch(Exception $err) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'reason' => $err->getMessage()
                ]);
                exit;
            }
        } else { //Remove from channel
            try {
                removeFromChannel($story_id);
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                ]);
                exit;
            } catch(Exception $err) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'reason' => $err->getMessage()
                ]);
                exit;
            }
        }

    }

    function handle_error() {
        echo "Invalid request method for this route";
        exit;
    }
?>