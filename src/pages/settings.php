<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Settings');
?>
    <div id="content">
        <div id="settings_form_container"></div>
        <script type="module" src="/js/page_actions/settings_actions.js"></script>
    </div>
<?php
    draw_footer();
?>