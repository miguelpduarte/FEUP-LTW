<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('User Page');
?>
    <div id="content">
        <div id="user_info_container"></div>
        <div id="newest">
            <div class="line-container">
                <div class="line-starter">
                    <i id="refresh_newest_stories" class="refresh-btn fas fa-redo"></i>
                </div>
                <div class="line"><hr/></div>
                <div class="line-middle">
                    Newest
                    <i class="fas fa-clock"></i>
                </div>
                <div class="line"><hr/></div>
            </div>
            <div id="user_stories_container"></div>
        </div>
        <script type="module" src="../js/page_actions/user_actions.js"></script>
    </div>
<?php
    draw_footer();
?>