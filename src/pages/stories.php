<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Test Page');
?>
    <div id="content">
        <div id="trending">
            <div class="line-container">
                <div class="line"><hr/></div>
                <div class="line-middle">
                    Trending
                    <i class="fas fa-fire"></i>
                </div>
                <div class="line"><hr/></div>
            </div>
            <div id="trending_stories_container"></div>
        </div>
        <div id="top">
            <div class="line-container">
                <div class="line-starter">
                    <i id="refresh_stories" class="fas fa-redo"></i>
                </div>
                <div class="line"><hr/></div>
                <div class="line-middle">
                    Top
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="line"><hr/></div>
            </div>
            <div id="stories_container"></div>
        </div>
        <script type="module" src="/js/stories_actions.js"></script>
    </div>
<?php
    draw_footer();
?>