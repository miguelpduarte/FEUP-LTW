<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../../utils/errors.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../../database/db_user.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../inc.session.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            // get logged in user bio
            handle_get();
            break;
        case 'POST':
            //change the user's bio
            handle_post();
            break;
        default:
            handle_error();  
            break;
    }

    function handle_get() {
        header('Content-Type: application/json');
    
        $currentUser = getLoggedUser();
        if (!$currentUser) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => 'User not logged in',
                'code' => Error('UNAUTHORIZED')
            ]);
            exit;
        }

        try {
            $bio = getUserBio($currentUser['user_id']);
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $bio
            ]);
            exit;
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'reason' => 'Error getting current user\'s bio',
                'code' => Error('GET_BIO'),
            ]);
            exit;
        }
    }
    
    function handle_post() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);

        $currentUser = getLoggedUser();

        if(!$currentUser) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => 'Anonymous User can\'t change his bio',
                'code' => Error('UNAUTHORIZED')
            ]);
            exit;
        }

        if(empty($data['new_bio'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'New Bio is missing',
                'code' => Error('MISSING_PARAM')
                ]);
            exit;
        }
            
        if(empty($data['csrf'])) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => 'CSRF was not provided.',
                'code' => Error('MISSING_CSRF')
                ]);
            exit;
        }

        if(!verifyCSRF($data['csrf'])) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => 'CSRF did not match. SHOW YOUR ID SIR!',
                'code' => Error('WRONG_CSRF')
                ]);
            exit;
        }

        try {
            changeBio($currentUser['user_id'], $data['new_bio']);
            http_response_code(200);
            echo json_encode([
                'success' => true
            ]);
            exit;
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'reason' => 'Error changing current user\'s bio',
                'code' => Error('CHANGE_BIO'),
            ]);
            exit;
        }

    }

    function handle_error() {
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'reason' => 'Invalid request method for this route',
            'code' => Error('INVALID_ROUTE')
        ]);
        exit;
    }
?>
