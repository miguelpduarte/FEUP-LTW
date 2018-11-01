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
            <link rel="stylesheet" type="text/css" href="css/style.css">
        </head>
        <body>
<?php } ?>

<?php
/**
 * Draws the footer for all pages.
 */
function draw_footer() { ?>
  </body>
</html>
<?php } ?>