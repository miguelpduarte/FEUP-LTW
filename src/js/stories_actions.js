import { Story } from "./story.js";
import { fetchStories } from "./fetch_actions.js";

let trending_stories = [];
let stories = [];

const loadTrending = async () => {
    console.log('TODO: Actually load trending stories');
    const trending_stories_data = [{
        score: 0,
        story_id: -1,
        author_id: -1,
        title: "Oh boy! A trending story!",
        content: "<p>This is some content here! Lorem Lorem!!</p>",
        channel: -1,
        created_at: "2018-11-05 19:20:33",
        updated_at: null,
        author_name: "influencer"
    }];
    populateTrendingStories(trending_stories_data);
}

const populateTrendingStories = (trending_stories_data) => {
    const trending_stories_container = document.getElementById("trending_stories_container");
    
    for(const trending_story_data of trending_stories_data) {
        const story = new Story(trending_story_data);
        trending_stories.push(story);
        let story_card = story.renderCard();
        story.setDomElement(story_card);
        trending_stories_container.appendChild(story_card);
    }
}

const loadStories = async () => {
    const stories_data = await fetchStories();
    populateStories(stories_data);
}

const populateStories = (stories_data) => {
    const stories_container = document.getElementById("stories_container");
    
    for(const story_data of stories_data) {
        const story = new Story(story_data);
        stories.push(story);
        let story_card = story.renderCard();
        story.setDomElement(story_card);
        stories_container.appendChild(story_card);
    }
}

const clearStories = () => {
    const stories_container = document.getElementById("stories_container");

    while (stories_container.firstChild) {
        stories_container.removeChild(stories_container.firstChild);
    }

    stories = [];
};

const refreshStories = () => {
    clearStories();
    loadStories();
};

// This runs as the file is loaded from here down

document.getElementById('refresh_stories').addEventListener('click', refreshStories);

loadTrending();
loadStories();