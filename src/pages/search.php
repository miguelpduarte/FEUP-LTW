<?php
    require_once(realpath( dirname( __FILE__ ) ) . '/../templates/common.php');
    draw_header('Search');
?>
    <div id="content" class="search-page">
        <h1 class="search-title"> Search </h1>
        <form class="query-area">
                <input type="text" id="query" class="query-input" name="query" placeholder="Insert your query here" autocomplete="off">
        </form>
        <ul class="search-options">
            <li><a class="search-link" data-target="#channels" href="#channels">Channels</a></li>
            <li><a class="search-link" data-target="#users" href="#users">Users</a></li>
            <li><a class="search-link" data-target="#stories" href="#stories">Stories</a></li>
        </ul>
        <div id="channels" class="result-container">
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
        <div id="users" class="result-container">
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
        <div id="stories" class="result-container">
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