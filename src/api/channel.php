<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/errors.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_channel.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_story.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/inc.session.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            // Get Channel info
            // or 
            // Get channel info
            handle_get();
            break;
        case 'PATCH':
            // Edit Channel of a Story
            handle_patch();
            break;
        default:
            handle_error();  
            break;
    }

    function handle_get() {
        header('Content-Type: application/json');
        if(isset($_GET['id'])) { //Get Channel's info
            
            
            try {
                $channel_info = getChannel($_GET['id']);
                
                if(!$channel_info) {
                    http_response_code(404);
                    echo json_encode([
                        'success' => false,
                        'reason' => 'Error Getting channel with id ' . $_GET['id'],
                        'code' => Error('NOT_FOUND')
                    ]);
                    exit;
                }

                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'data' => $channel_info
                ]);
                exit;
            } catch(Exception $e) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'reason' => "Error Getting channel with id $id",
                    'code' => Error('NOT_FOUND')
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

            $n_channels = (isset($_GET['n_channels']) && $_GET['n_channels'] !== '' ? intval($_GET['n_channels']) : 0);
            $offset = (isset($_GET['off']) && $_GET['off'] !== '' ? intval($_GET['off']) : 0);
            
            $channels = getAllChannels($offset, $n_channels);

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

        if(empty($data['story_id'])) {
            http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'reason' => "Must specify story_id",
                    'code' => Error("MISSING_PARAM")
                ]);
            exit;
        }

        $currentUser = getLoggedUser();
        if(!$currentUser) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "Must be logged in.",
                'code' => Error("UNAUTHORIZED")
                ]);
            exit;
        }

        if(empty($data['csrf'])) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "CSRF was not provided.",
                'code' => Error("MISSING_CSRF")
                ]);
            exit;
        }

        if(!verifyCSRF($data['csrf'])) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "CSRF did not match. SHOW YOUR ID SIR!",
                'code' => Error("WRONG_CSRF")
                ]);
            exit;
        }

        try {
            if(!verifyStoryOwnership($data['story_id'], $currentUser['user_id'])) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'reason' => "The story you are trying to change does not belong to you!",
                    'code' => Error("NOT_OWNER")
                    ]);
                exit;
            }
        } catch(Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => $e->getMessage(),
                'code' => Error("OTHER")
                ]);
            exit;
        }

        if(!empty($data['new_channel'])) {
            // Change channel
            try {
                $channel_id = changeChannel($data['story_id'], $data['new_channel']);
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'channel_id' => $channel_id,
                ]);
                exit;
                
            } catch(Exception $err) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'reason' => $err->getMessage(),
                    'code' => Error("OTHER")
                ]);
                exit;
            }
        } else {
            // Remove from channel (aka move to the default channel)
            try {
                $channel_id = removeFromChannel($data['story_id']);
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'channel_id' => $channel_id,
                ]);
                exit;
            } catch(Exception $err) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'reason' => $err->getMessage(),
                    'code' => Error("OTHER")
                ]);
                exit;
            }
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