<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_story.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/inc.session.php');

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
            $data = getFullStory($_GET['id']);
        } else {
            $data = getStoriesNoContent();

            //Ensuring that no NULLs are left behind (when a story does not have any rating)
            foreach ($data as $key => $value) {
                if($value['score'] === NULL) {
                    $data[$key]['score'] = '0';
                }
            }
        }

        //Detecting database fetching errors (TODO: use try catch? -> Guilherme ;)
        if($data === false) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'reason' => 'Database fetching failed'
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
                'reason' => "Anonimous User can't post a Story"
                ]);
            exit;
        }

        if(!isset($data['title']) || $data['title'] === '') {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'reason' => 'The title field is missing'
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

        if(empty($data['channel']))
            $id = insertStoryDC($currentUser['user_id'], $data['title'], $data['content']);
        else
            $id = insertStory($currentUser['user_id'], $data['title'], $data['content'], $data['channel']);

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'story_id' => $id
        ]);
        exit;
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