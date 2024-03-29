<?php

$BASE_DIR = "BASE_DIR_PLACEHOLDER";

/**
 * Draws the header for all pages
 */
function draw_header($page_title) { 
    global $BASE_DIR; ?>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="theme-color" content="#660000" />

            <link rel="apple-touch-icon" sizes="57x57" href="<?= $BASE_DIR ?>/assets/favicons/apple-icon-57x57.png">
            <link rel="apple-touch-icon" sizes="60x60" href="<?= $BASE_DIR ?>/assets/favicons/apple-icon-60x60.png">
            <link rel="apple-touch-icon" sizes="72x72" href="<?= $BASE_DIR ?>/assets/favicons/apple-icon-72x72.png">
            <link rel="apple-touch-icon" sizes="76x76" href="<?= $BASE_DIR ?>/assets/favicons/apple-icon-76x76.png">
            <link rel="apple-touch-icon" sizes="114x114" href="<?= $BASE_DIR ?>/assets/favicons/apple-icon-114x114.png">
            <link rel="apple-touch-icon" sizes="120x120" href="<?= $BASE_DIR ?>/assets/favicons/apple-icon-120x120.png">
            <link rel="apple-touch-icon" sizes="144x144" href="<?= $BASE_DIR ?>/assets/favicons/apple-icon-144x144.png">
            <link rel="apple-touch-icon" sizes="152x152" href="<?= $BASE_DIR ?>/assets/favicons/apple-icon-152x152.png">
            <link rel="apple-touch-icon" sizes="180x180" href="<?= $BASE_DIR ?>/assets/favicons/apple-icon-180x180.png">
            <link rel="icon" type="image/png" sizes="192x192"  href="<?= $BASE_DIR ?>/assets/favicons/android-icon-192x192.png">
            <link rel="icon" type="image/png" sizes="32x32" href="<?= $BASE_DIR ?>/assets/favicons/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="96x96" href="<?= $BASE_DIR ?>/assets/favicons/favicon-96x96.png">
            <link rel="icon" type="image/png" sizes="16x16" href="<?= $BASE_DIR ?>/assets/favicons/favicon-16x16.png">
            <link rel="manifest" href="<?= $BASE_DIR ?>/assets/favicons/manifest.json">
            <meta name="msapplication-TileColor" content="#ffffff">
            <!-- <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"> -->
            <meta name="theme-color" content="#ffffff">


            <title><?=$page_title?></title>
            <link rel="stylesheet" type="text/css" href="<?= $BASE_DIR ?>/css/style.css">
            <link rel="stylesheet" type="text/css" href="<?= $BASE_DIR ?>/css/hljs.css">
            <link rel="stylesheet" type="text/css" href="<?= $BASE_DIR ?>/css/fontawesome-all.min.css">
            <script src="<?= $BASE_DIR ?>/libs/remarkable.min.js"></script>
            <script src="<?= $BASE_DIR ?>/libs/moment.min.js"></script>
            <script src="<?= $BASE_DIR ?>/libs/highlight.min.js"></script>
        </head>
        <body>
            <nav id="navbar_container"></nav>
            <div id="create-story-btn">
                <div class="btn-icon">
                    <i class="fas fa-plus main"></i>
                    <i class="fas fa-pen secondary"></i>
                </div>
            </div>
            <?php } ?>
            
            <?php
/**
 * Draws the footer for all pages.
 */
function draw_footer() { 
    global $BASE_DIR; ?>
    <script type="module" src="<?= $BASE_DIR ?>/js/common.js"></script>
    <script type="module" src="<?= $BASE_DIR ?>/js/page_actions/navbar_actions.js"></script>
    </body>
</html>
<?php } ?>