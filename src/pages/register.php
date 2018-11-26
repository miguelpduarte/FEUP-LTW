<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Register');
?>
    <div id="content">
        <div id="register_form_container"></div>
        <script type="module" src="/js/register_actions.js"></script>
    </div>
<?php
    draw_footer();
?>