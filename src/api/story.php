<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/errors.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_story.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/inc.session.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
            // Create a story
            handle_post();
            break;
        case 'GET':
            // Get a preview of all the stories or a specific story, by id
            handle_get();
            break;
        case 'PATCH':
            // Edit the content of an existing story
            handle_patch();
            break;
        default:
            handle_error();  
            break;
    }
    
    function handle_get() {
        header('Content-Type: application/json');
        if(!empty($_GET['id'])) {
            $data = getFullStory($_GET['id']);
        } else {
            $n_stories = (isset($_GET['n_stories']) && $_GET['n_stories'] !== '' ? intval($_GET['n_stories']) : 0);
            $offset = (isset($_GET['off']) && $_GET['off'] !== '' ? intval($_GET['off']) : 0);
            
            $data = getStoriesNoContent($offset, $n_stories);
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
    
    function handle_post() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        
        $currentUser = getLoggedUser();

        if(!$currentUser) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "Anonymous user can't post a Story",
                'code' => Error("UNAUTHORIZED")
                ]);
            exit;
        }

        if(!isset($data['title']) || $data['title'] === '') {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The title field is missing',
                'code' => Error("MISSING_PARAM")
                ]);
                exit;
        }
            
        if(!isset($data['content']) || $data['content'] === '') {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'reason' => 'The content field is missing',
                    'code' => Error("MISSING_PARAM")
                ]);
            exit;
        }

        $channel = $data['channel'];
        if(!isset($data['channel']) || $data['channel'] === '') {
            $channel = 'default';
        }


        if(!preg_match("/^[a-z0-9]*$/", $data['channel'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The channel should only contain letters and numbers',
                'code' => Error("FIELD_FORMAT")
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

        $id = insertStory($currentUser['user_id'], $data['title'], $data['content'], $channel);

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'story_id' => $id
        ]);
        exit;
    }

    function handle_patch() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        
        $currentUser = getLoggedUser();

        if(!$currentUser) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "Anonymous user can't edit a Story's content",
                'code' => Error("UNAUTHORIZED")
                ]);
            exit;
        }

        if (empty($data['new_content'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The New Content field is missing or empty',
                'code' => Error('MISSING_PARAM')
            ]);
            exit;
        }

        if (empty($data['story_id'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The Story ID field is missing or empty',
                'code' => Error('MISSING_PARAM')
            ]);
            exit;
        }

        if (empty($data['csrf'])) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "CSRF was not provided.",
                'code' => Error("MISSING_CSRF")
                ]);
            exit;
        }

        if (!verifyCSRF($data['csrf'])) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "CSRF did not match. SHOW YOUR ID SIR!",
                'code' => Error("WRONG_CSRF")
                ]);
            exit;
        }

        try {
            if (!verifyStoryOwnership($data['story_id'], $currentUser['user_id'])) {
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
                'code' => Error('OTHER')
                ]);
            exit;
        }

        try {
            editStoryContent($data['story_id'], $data['new_content']);

            http_response_code(200);
            echo json_encode([
                'success' => true,
            ]);
            exit;
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'reason' => 'Unknown Error',
                'code' => Error('OTHER')
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