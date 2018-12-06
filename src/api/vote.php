<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/errors.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_story.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/inc.session.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'PUT':
            //Upvote/Downvote
            handle_put();
            break;
        case 'DELETE':
            //Remove Vote
            handle_delete();
            break;
        default:
            handle_error();  
            break;
    }


    function handle_put() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        
        $currentUser = getLoggedUser();

        if(!$currentUser) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "Anonymous user can't vote a Story",
                'code' => Error("UNAUTHORIZED")
                ]);
            exit;
        }

        if(empty($data['csrf'])) {
            http_response_code(400);
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

        if(!isset($data['upvote'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => "You didn't specify wtf u wanna do",
                'code' => Error("MISSING_PARAM")
                ]);
            exit;
        }

        if(empty($data['story_id'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => "Missing story_id",
                'code' => Error("MISSING_PARAM")
                ]);
            exit;
        }


        try{
            voteStory($data['story_id'], $currentUser['user_id'], $data['upvote']);
            http_response_code(200);
            echo json_encode([
                'success' => true,
                ]);
            exit;
        } catch(Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => $e->getMessage(),
                'code' => Error("VOTE_ERROR")
                ]);
            exit;
        }     


    }

    function handle_delete() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        
        $currentUser = getLoggedUser();

        if(!$currentUser) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "Anonymous user can't remove vote from a Story",
                'code' => Error("UNAUTHORIZED")
                ]);
            exit;
        }

        if(empty($data['csrf'])) {
            http_response_code(400);
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

        if(empty($data['story_id'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => "Missing story_id",
                'code' => Error("MISSING_PARAM")
                ]);
            exit;
        }


        try{
            removeVote($data['story_id'], $currentUser['user_id']);
            http_response_code(200);
            echo json_encode([
                'success' => true,
                ]);
            exit;
        } catch(Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => $e->getMessage(),
                'code' => Error("VOTE_ERROR")
                ]);
            exit;
        }   
    }

    function handle_error() {
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'reason' => 'Invalid request method for this route'
        ]);
        exit;
    }

?>