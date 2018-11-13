<?php 
require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_user.php');
require_once(realpath( dirname( __FILE__ ) ) . '/inc.session.php');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        //login
        handle_post();
        break;
    case 'DELETE':
        //logout
        handle_delete();
        break;
    default:
        handle_error();  
        break;
}

function handle_post() {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);

    if($_SESSION && $_SESSION['user_id']) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'reason' => 'Already logged in.'
            ]);
        exit;
    }

    $username = $data['username'];
    $password = $data['password'];

    if(empty($username)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'reason' => 'The username field is missing'
            ]);
        exit;
    }
    if(empty($password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'reason' => 'The password field is missing'
            ]);
        exit;
    }

    $user = verifyLoginCredentials($username, $password);
    if($user) {
        http_response_code(200);
        session_start();

        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['username'] = $username;
        echo json_encode([
            'success' => true
        ]);
        exit;
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'reason' => 'Invalid Username/Password Combination'
            ]);
        exit;
    }
}

function handle_delete() {
    header('Content-Type: application/json');

    if($_SESSION && $_SESSION['user_id']) {
        session_unset();
        session_destroy();
        http_response_code(200);
        echo json_encode([
            'success' => true
            ]);
        exit;
    } else {
        http_response_code(200);
        echo json_encode([
            'success' => false,
            'reason' => 'Currently not logged in.'
            ]);
        exit;
    }
}

function handle_error() {
    http_response_code(400);
    echo "Invalid request method for this route";
    exit;
}

?>