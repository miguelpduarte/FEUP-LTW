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
                echo json_encode([
                    'success' => false,
                    'reason' => 'Database fetching failed'
                ]);
            } else {

                echo json_encode([
                    'success' => true,
                    'data' => $data
                ]);
            }

        } else {
            echo json_encode([
                'success' => false,
                'reason' => 'No User ID Specified'
            ]);
        }

        exit;
    }
    
    function handle_post() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);

        if(!isset($data['username']) || $data['username'] === '') {
            echo json_encode([
                'success' => false,
                'reason' => 'Username is missing'
                ]);
            exit;
        }

        if(!isset($data['password']) || $data['password'] === '') {
            echo json_encode([
                'success' => false,
                'reason' => 'The password is missing'
                ]);
            exit;
        }

        if(!isset($data['name']) || $data['name'] === '') {
            echo json_encode([
                'success' => false,
                'reason' => 'The name field is missing'
                ]);
            exit;
        }

        $error = "";
        insertUser($data['username'], $data['password'], $data['name'], $error);
            
        if($error) {
            echo json_encode([
                'success' => false,
                'reason' => $error
            ]);
            exit;
        } else {
            echo json_encode([
                'success' => true
            ]);
            exit;
        }

    }

    function handle_error() {
        echo "Invalid request method for this route";
        exit;
    }
?>