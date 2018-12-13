<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('403')
?>
    <section class="error-message">
        <h1>403</h1>
        <p>Forbidden</p>
        <video src="<?= $BASE_DIR ?>/assets/403.mp4" autoplay loop></video>
    </section>
<?php
    draw_footer();
?>
