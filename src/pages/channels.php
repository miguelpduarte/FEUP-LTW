<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('GET Channels');
?>
    <div id="content">
        <div id="channels_container"></div>
        <script type="module" src="../js/page_actions/channels_actions.js"></script>
    </div>
<?php
    draw_footer();
?>