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
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title><?=$page_title?></title>
            <link rel="stylesheet" type="text/css" href="/css/style.css">
            <link rel="stylesheet" type="text/css" href="/css/hljs.css">
            <link rel="stylesheet" type="text/css" href="/css/fontawesome-all.min.css">
            <script src="/libs/remarkable.min.js"></script>
            <script src="/libs/moment.min.js"></script>
            <script src="/libs/highlight.min.js"></script>
        </head>
        <body>
            <nav id="navbar_container"></nav>
            <?php if(isset($_GET['logged_in'])) { ?>
                <div id="already_logged_in">
                    You are already logged in!
                </div>
            <?php } ?>
<?php } ?>

<?php
/**
 * Draws the footer for all pages.
 */
function draw_footer() { ?>
    <script type="module" src="/js/page_actions/navbar_actions.js"></script>
    </body>
</html>
<?php } ?>