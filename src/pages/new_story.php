<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('New Story');
?>
    <div id="story-form-container"></div>
    <script type="module" src="/js/new_story_actions.js"></script>
<?php
    draw_footer();
?>