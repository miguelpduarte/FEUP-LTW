<?php
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
        if(isset($_GET['id']) && $_GET['id'] !== '') {
            $data = getUser($_GET['id']);

            //Detecting database fetching errors (TODO: use try catch? -> Guilherme ;)
            if($data === false) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'reason' => 'Database fetching failed'
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
                'reason' => 'No User ID Specified'
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
                'reason' => 'Username is missing'
                ]);
            exit;
        }

        if(empty($data['password'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The password is missing'
                ]);
            exit;
        }
        
        if(empty($data['password_confirmation'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The password confirmation field is missing'
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

        if(!preg_match("/^[a-zA-Z_0-9]+$/", $data['username'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The username should only contain letters and numbers'
                ]);
            exit; 
        }

        if($data['password'] !== $data['password_confirmation']) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The passwords do not match'
                ]);
            exit; 
        }

        $error = "";
        insertUser($data['username'], $data['password'], $data['name'], $error);
            
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

    function handle_error() {
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'reason' => 'Invalid request method for this route'
        ]);
        exit;
    }
?>
