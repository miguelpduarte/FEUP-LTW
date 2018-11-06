<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Test Page');
?>
    <div id="content">
        <div id="trending">
            <div class="line-container">
                <div class="line"><hr/></div>
                <div class="line-middle">Trending FireEmoji</div>
                <div class="line"><hr/></div>
            </div>
            <div id="trending_stories_container"></div>
        </div>
        <div id="top">
            <div class="line-container">
                <div class="line"><hr/></div>
                <div class="line-middle">Top HatEmoji</div>
                <div class="line"><hr/></div>
            </div>
            <button id="refresh_stories">Refresh here!</button>
            <div id="stories_container"></div>
        </div>
        <script type="module" src="/js/stories_actions.js"></script>
    </div>
<?php
    draw_footer();
?>