<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Test Page');
?>
    <button id="refresh_story">Refresh here!</button>
    <div id="story_container"></div>
    <h2>And comments will be under here eventually</h3>
    <div id="comments_container"></div>
    <script type="module" src="/js/story_actions.js"></script>
<?php
    draw_footer();
?>