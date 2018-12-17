<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    require_once(realpath( dirname( __FILE__ ) ) . '/../api/inc.session.php');

    $currentUser = getLoggedUser();
    if(!$currentUser) { 
        die(header('Location: ./login.php'));
    }
    draw_header('New Story');
?>
    <div id="story_form_container"></div>
    <script type="module" src="../js/page_actions/new_story_actions.js"></script>
<?php
    draw_footer();
?>