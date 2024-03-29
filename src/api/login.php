<?php 
require_once(realpath( dirname( __FILE__ ) ) . '/../utils/errors.php');
require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_user.php');
require_once(realpath( dirname( __FILE__ ) ) . '/inc.session.php');


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // get logged in user info
        handle_get();
        break;
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

function handle_get() {
    header('Content-Type: application/json');

    if(empty($_GET['csrf'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'reason' => "CSRF was not provided.",
            'code' => Error("MISSING_CSRF")
            ]);
        exit;
    }

    if(!verifyCSRF($_GET['csrf'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'reason' => "CSRF did not match. SHOW YOUR ID SIR!",
            'code' => Error("WRONG_CSRF")
            ]);
        exit;
    }

    $currentUser = getLoggedUser();

    if (!$currentUser) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'reason' => 'User not logged in',
            'code' => Error("UNAUTHORIZED")
        ]);
        exit;
    }

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => [
            'username' => $currentUser['username']
        ],
    ]);
    exit;
}

function handle_post() {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);

    $currentUser = getLoggedUser();
    if($currentUser) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'reason' => 'Already logged in.',
            'code' => Error("ALREADY_LOGGED")
            ]);
        exit;
    }

    $username = $data['username'];
    $password = $data['password'];

    if(empty($username)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'reason' => 'The username field is missing',
            'code' => Error("MISSING_PARAM")
            ]);
        exit;
    }
    if(empty($password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'reason' => 'The password field is missing',
            'code' => Error("MISSING_PARAM")
            ]);
        exit;
    }

    $user = verifyLoginCredentials($username, $password);
    if($user) {
        http_response_code(200);

        $_SESSION['csrf'] = generate_random_token();
        $_SESSION['user_identifier_GET'] = $user['user_id'];
        $_SESSION['username'] = $username;
        echo json_encode([
            'success' => true,
            'data' => [
                'csrf' => $_SESSION['csrf']
            ]
        ]);
        exit;
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'reason' => 'Invalid Username/Password Combination',
            'code' => Error("UNAUTHORIZED")
            ]);
        exit;
    }
}

function handle_delete() {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);

    $currentUser = getLoggedUser();

    if($currentUser) {

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
        
        session_unset();
        session_destroy();
        http_response_code(200);
        echo json_encode([
            'success' => true
        ]);
        exit;
    } else {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'reason' => 'Currently not logged in.',
            'code' => Error("UNAUTHORIZED")
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