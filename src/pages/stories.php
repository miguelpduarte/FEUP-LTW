<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Test Page');
?>
    <button id="refresh_stories">Refresh here!</button>
    <h3>Stories will be inserted below:</h3>
    <div id="stories_container"></div>
    <script type="module" src="/js/stories_actions.js"></script>
<?php
    draw_footer();
?>