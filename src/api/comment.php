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
        if(isset($_GET['id']) && $_GET['id'] !== '') {
            $data = getNestedComments($_GET['id']);
        }

        //Detecting database fetching errors (TODO: use try catch? -> Guilherme ;)
        if($data === false) {
            echo json_encode([
                'success' => false,
                'reason' => 'Database fetching failed',
                'html_response_code' => 400
            ]);
            exit;
        }

        echo json_encode([
            'success' => true,
            'data' => $data
            ]);
        exit;
    }
    
    function handle_post() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        //TODO: Add login validation - can only insert comments of own user, etc
        // $author, $content, $story_id or $comment_id

        if(!isset($data['author']) || $data['author'] === '' || !is_int($data['author'])) {
            echo json_encode([
                'success' => false,
                'reason' => 'The author field is missing',
                'html_response_code' => 400
                ]);
            exit;
        }

        if(!isset($data['content']) || $data['content'] === '') {
            echo json_encode([
                'success' => false,
                'reason' => 'The content field is missing',
                'html_response_code' => 400
                ]);
            exit;
        }

        if((!isset($data['story_id']) || $data['story_id'] === '' || !is_int($data['story_id'])) &&
             (!isset($data['comment_id']) || $data['comment_id'] === '' || !is_int($data['comment_id']))) {
            echo json_encode([
                'success' => false,
                'reason' => 'There is no story_id nor comment_id',
                'html_response_code' => 400
                ]);
            exit;
        }

        try {
            if(isset($data['story_id'])) {
                insertComment($data['author'], $data['content'], $data['story_id']);
            } else if (isset($data['comment_id'])){
                insertNestedComment($data['author'], $data['content'], $data['comment_id']);
            }
        } catch(Exception $e) {
            echo json_encode([
                'success' => false,
                'reason' => 'Database exception thrown',
                'html_response_code' => 400
                
            ]);
            exit;
        }
        echo json_encode([
            'success' => true,
            'html_response_code' => 200
            
        ]);
        exit;
    }

    function handle_error() {
        echo "Invalid request method for this route";
        exit;
    }
?>