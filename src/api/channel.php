<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_channel.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_story.php');
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
            // Edit Channel
            handle_patch();
            break;
        default:
            handle_error();  
            break;
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

        } else if (isset($_GET['query'])) {

            $channels = getChannelsLike($_GET['query']); 

            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $channels
            ]);
            exit;

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
        $data = json_decode(file_get_contents('php://input'), true);

        $story_id = $data['story_id'];
        $csrf = $data['csrf'];

        if(empty($story_id)) {
            http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'reason' => "Must specify story_id"
                ]);
            exit;
        }

        $currentUser = getLoggedUser();
        if($currentUser) {
            if(empty($data['csrf'])) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'reason' => "CSRF was not provided."
                    ]);
                exit;
            }
    
            if(!verifyCSRF($data['csrf'])) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'reason' => "CSRF did not match. SHOW YOUR ID SIR!"
                    ]);
                exit;
            }
        } else {
            http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'reason' => "Must be logged in."
                    ]);
                exit;
        }

        try {
            if(!verifyStoryOwnership($story_id, $currentUser['user_id'])) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'reason' => "The story you are trying to change does not belong to you!",
                    ]);
                exit;
            }
        } catch(Exception $e) {
            http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'reason' => $e->getMessage(),
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
        } else { // Remove from channel
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