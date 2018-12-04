<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Login');
?>
    <div id="content">
        <div id="login_form_container"></div>
        <script type="module" src="/js/page_actions/login_actions.js"></script>
    </div>
<?php
    draw_footer();
?>