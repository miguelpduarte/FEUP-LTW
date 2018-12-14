<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Search');
?>
    <div id="content" class="search-page">
        <form class="query-area">
                <input type="text" id="query" class="query-input" name="query" placeholder="Insert your query here">
        </form>
        <ul class="search-options">
            <li><a href="#channels">Channels</a></li>
            <li><a href="#users">Users</a></li>
            <li><a href="#stories">Stories</a></li>
        </ul>
        <div id="channels">
            <div class="line-container">
                <div class="line"><hr/></div>
                <div class="line-middle">
                    Channels
                    <i class="fas fa-hashtag"></i>
                </div>
                <div class="line"><hr/></div>
            </div>
            <div id="channels_container"></div>
        </div>
        <div id="users">
            <div class="line-container">
                <div class="line"><hr/></div>
                <div class="line-middle">
                    Users
                    <i class="fas fa-user"></i>
                </div>
                <div class="line"><hr/></div>
            </div>
            <div id="users_container"></div>
        </div>
        <div id="stories">
            <div class="line-container">
                <div class="line"><hr/></div>
                <div class="line-middle">
                    Stories
                    <i class="fas fa-book-open"></i>
                </div>
                <div class="line"><hr/></div>
            </div>
            <div id="stories_container"></div>
        </div>
    </div>

    <script type="module" src="../js/page_actions/search_actions.js"></script>
<?php
    draw_footer();
?>