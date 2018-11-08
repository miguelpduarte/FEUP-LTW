export const fetchStories = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/story.php")
            .then(res => res.json())
            .then(data => {
                //Checking for data errors
                if(data.success) {
                    return resolve(data.data);
                } else {
                    return reject(new Exception("Fetching not successful, reason: " + data.reason));
                }
            })
            .catch(err => console.error('Fetch error:', err));
    });


}

export const fetchStory = id => {
    let real_id = Number.parseInt(id);

    return new Promise((resolve, reject) => {
        fetch(`/api/story.php?id=${real_id}`)
            .then(res => res.json())
            .then(data => {
                
            //Check for data errors
            if(data.success) {
                return resolve(data.data);
            } else {
                return reject(new Exception("Fetching not successful, reason: " + data.reason));
            }
        })
        .catch(err => console.error('Fetch error:', err));;
    });
};

export const fetchComments = id => {
    let real_id = Number.parseInt(id);

    return new Promise((resolve, reject) => {
        fetch(`/api/comment.php?id=${real_id}`)
            .then(res => res.json())
            .then(data => {
                
            //Check for data errors
            if(data.success) {
                return resolve(data.data);
            } else {
                return reject(new Exception("Fetching not successful, reason: " + data.reason));
            }
        })
        .catch(err => console.error('Fetch error:', err));;
    });
};