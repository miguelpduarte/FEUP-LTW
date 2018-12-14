<?php

$BASE_DIR = "";

/**
 * Draws the header for all pages
 */
function draw_header($page_title) { 
    global $BASE_DIR; ?>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
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
<?php } ?>

<?php
/**
 * Draws the footer for all pages.
 */
function draw_footer() { 
    global $BASE_DIR; ?>
    <script type="module" src="<?= $BASE_DIR ?>/js/page_actions/navbar_actions.js"></script>
    </body>
</html>
<?php } ?>