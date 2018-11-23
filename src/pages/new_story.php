<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('New Story');
?>
    <button id="clear_button">Clear!</button>
    <div id="story_form_container"></div>
    <script type="module" src="/js/new_story_actions.js"></script>
<?php
    draw_footer();
?>