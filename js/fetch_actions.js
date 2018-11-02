export const fetchStories = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/story.php")
        .then(res => res.json())
        .then(data => {
            //Check for data errors here
            //TODO:
            // if(data.success) {
            //     resolve(data);
            // } else {
            //     reject("Fetching not successful");
            // }

            resolve(data);
        });
    });
}

export const fetchStory = id => {
    let real_id = Number.parseInt(id);

    return new Promise((resolve, reject) => {
        fetch(`/api/story.php?id=${real_id}`)
            .then(res => res.json())
            .then(data => {
                
            //Check for data errors here
            //TODO:
            // if(data.success) {
            //     resolve(data);
            // } else {
            //     reject("Fetching not successful");
            // }
                        
            console.log('Fix story data [0] spaghet maybe in "backend"');
            let story_data = data[0];
            resolve(story_data);
        });
    });
};