<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_comments.php');

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
          handle_post();
          break;
        case 'GET':
          handle_get();
          break;
        default:
          handle_error();  
          break;
    }
    
    function handle_get() {
        header('Content-Type: application/json');
        $data = false;
        
        $n_comments = (isset($_GET['n_comments']) && $_GET['n_comments'] !== '' ? intval($_GET['n_comments']) : 0);
        $offset = (isset($_GET['off']) && $_GET['off'] !== '' ? intval($_GET['off']) : 0);
        $n_nested = (isset($_GET['n_nested']) && $_GET['n_nested'] !== ''? intval($_GET['n_nested']) : 0);
        $nested_off = (isset($_GET['n_off']) && $_GET['n_off'] !== '' ? intval($_GET['n_off']) : 0);

        if(isset($_GET['story_id']) && $_GET['story_id'] !== '') {
            $data = getNestedComments($_GET['story_id'], $n_comments, $offset, $n_nested, $nested_off);
        } elseif (isset($_GET['comment_id']) && $_GET['comment_id'] !== '') {
            $data = getSubComments($_GET['comment_id'], $n_comments, $offset);
        }

        //Detecting database fetching errors (TODO: use try catch? -> Guilherme ;)
        if($data === false) {
            http_response_code(400);       
            echo json_encode([
                'success' => false,
                'reason' => 'Database fetching failed',
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
                'reason' => "Anonymous User can't post a Comment"
            ]);
            exit;
        }


        if(!isset($data['content']) || $data['content'] === '') {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The content field is missing'
            ]);
            exit;
        }

        if((!isset($data['story_id']) || $data['story_id'] === '' || !is_int($data['story_id'])) &&
             (!isset($data['comment_id']) || $data['comment_id'] === '' || !is_int($data['comment_id']))) {
            
            http_response_code(400);            
            echo json_encode([
                'success' => false,
                'reason' => 'There is no story_id nor comment_id'
            ]);
            exit;
        }

        try {
            if(isset($data['story_id'])) {
                insertComment($currentUser['user_id'], $data['content'], $data['story_id']);
            } else if (isset($data['comment_id'])){
                insertNestedComment($currentUser['user_id'], $data['content'], $data['comment_id']);
            }
        } catch(Exception $e) {
            http_response_code(400);            
            echo json_encode([
                'success' => false,
                'reason' => 'Database exception thrown'
            ]);
            exit;
        }
        
        http_response_code(200);       
        echo json_encode([
            'success' => true
        ]);
        exit;
    }

    function handle_error() {
        http_response_code(405);
        echo "Invalid request method for this route";
        exit;
    }
?>
