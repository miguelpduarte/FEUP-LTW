<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Test Page');
?>
    <h1>Test</h1>
    <h2>More content</h2>
    <h3>Stories will be inserted below:</h3>
    <div id="stories_container"></div>
    <script type="module" src="/js/main.js"></script>
<?php
    draw_footer();
?>