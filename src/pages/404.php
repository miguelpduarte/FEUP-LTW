<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('404')
?>
    <section class="error-message">
        <h1>404</h1>
        <p>Page not found</p>
        <video src="/assets/404.gif" autoplay loop></video>
    </section>
<?php
    draw_footer();
?>