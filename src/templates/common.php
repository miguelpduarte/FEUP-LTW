<?php
/**
 * Draws the header for all pages
 */
function draw_header($page_title) { ?>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title><?=$page_title?></title>
            <link rel="stylesheet" type="text/css" href="/css/style.css">
            <link rel="stylesheet" type="text/css" href="/css/fontawesome-all.min.css">
            <script src="/libs/remarkable.min.js"></script>
            <script src="/libs/moment.min.js"></script>
        </head>
        <body>
            <nav id="navbar"></nav>
<?php } ?>

<?php
/**
 * Draws the footer for all pages.
 */
function draw_footer() { ?>
    <script type="module" src="/js/navbar.js"></script>
    </body>
</html>
<?php } ?>