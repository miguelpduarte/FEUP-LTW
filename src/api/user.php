<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../utils/errors.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_user.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
            //register a new user
            handle_post();
            break;
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
            $data = getUser($_GET['username']);

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
    
    function handle_post() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);

        if(empty($data['username'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'Username is missing',
                'code' => Error("MISSING_PARAM")
                ]);
            exit;
        }

        if(empty($data['password'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The password is missing',
                'code' => Error("MISSING_PARAM")
                ]);
            exit;
        }
        
        if(empty($data['password_confirmation'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The password confirmation field is missing',
                'code' => Error("MISSING_PARAM")
                ]);
            exit;
        }

        if(empty($data['name'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The name field is missing',
                'code' => Error("MISSING_PARAM")
                ]);
            exit;
        }

        if(!preg_match("/^[a-zA-Z_0-9]+$/", $data['username'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The username should only contain letters and numbers',
                'code' => Error("FIELD_FORMAT")
                ]);
            exit; 
        }

        if($data['password'] !== $data['password_confirmation']) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The passwords do not match',
                'code' => Error("PASSWORD_NO_CONFIRMATION")
                ]);
            exit; 
        }

        $error = "";
        insertUser($data['username'], $data['password'], $data['name'], $error);
            
        if($error) {

            if($error === 23000) {
                $parsed_err_code = Error("DUPLICATED_USERNAME;")
            }

            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => $parsed_error,

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
