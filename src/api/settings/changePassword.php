<?php
    require_once(realpath( dirname( __FILE__ ) ) . '../../utils/errors.php');
    require_once(realpath( dirname( __FILE__ ) ) . '../../database/db_user.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
            //change user's password
            handle_post();
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
                'reason' => "Anonymous User can't change his name",
                'code' => Error("UNAUTHORIZED")
            ]);
            exit;
        }

        if(empty($data['new_password'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'New Password is missing',
                'code' => Error("MISSING_PARAM")
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

        if(strlen($data['new_password']) < 8) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'reason' => "Password is too short, must be at least 8 characters long",
                'code' => Error("SHORT_PASSWORD")
                ]);
            exit;
        }

        try{
            changePassword($currentUser['user_id'], $data['new_password']);
            http_response_code(200);
            echo json_encode([
                'success' => true
            ]);
            exit;
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'reason' => $e->getMessage(),
                'code' => Error("CHANGE_PASSWORD"),
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
