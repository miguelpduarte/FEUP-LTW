<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../database/db_story.php');

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
        echo json_encode($data);
        exit;
    }
    
    function handle_post() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        //TODO: Add login validation - can only insert stories of own user, etc
        // $author, $title, $content, $channel

        if(!isset($data['author']) || $data['author'] === '' || !is_int($data['author'])) {
            echo json_encode([
                'success' => false,
                'reason' => 'The author field is missing'
                ]);
            exit;
        }

        if(!isset($data['title']) || $data['title'] === '') {
            echo json_encode([
                'success' => false,
                'reason' => 'The title field is missing'
                ]);
            exit;
        }

        if(!isset($data['content']) || $data['content'] === '') {
            echo json_encode([
                'success' => false,
                'reason' => 'The content field is missing'
                ]);
            exit;
        }

        if(!isset($data['channel']) || $data['channel'] === '' || !is_int($data['channel'])) {
            echo json_encode([
                'success' => false,
                'reason' => 'The channel field is missing'
                ]);
            exit;
        }

        insertStory($data['author'], $data['title'], $data['content'], $data['channel']);

        echo json_encode([
            'success' => true
        ]);
        exit;
    }

    function handle_error() {
        echo "Invalid request method for this route";
    }
?>