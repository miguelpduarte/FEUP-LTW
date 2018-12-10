<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Register');
?>
    <div id="content">
        <div id="register_form_container"></div>
    </div>
    <script type="module" src="/js/page_actions/register_actions.js"></script>
<?php
    draw_footer();
?>