<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('GET Homepage');
?>
    <div id="content">
        <div id="trending">
            <div class="line-container">
                <div class="line-starter">
                    <i id="refresh_trending_stories" class="refresh-btn fas fa-redo"></i>
                </div>
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
                    <i id="refresh_top_stories" class="refresh-btn fas fa-redo"></i>
                </div>
                <div class="line"><hr/></div>
                <div class="line-middle">
                    Top
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="line"><hr/></div>
            </div>
            <div id="top_stories_container"></div>
        </div>
        <script type="module" src="/js/page_actions/stories_actions.js"></script>
    </div>
<?php
    draw_footer();
?>