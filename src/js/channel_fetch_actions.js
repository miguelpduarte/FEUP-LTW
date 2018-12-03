"use strict"

export const fetchChannel = prefix => {
    return new Promise((resolve, reject) => {
        fetch(`/api/channel.php?prefix=${prefix}`)
            .then(res => res.json())
            .then(data => {
                // Check for data errors
                if (data.success) {
                    return resolve(data.data);
                } else {
                    return reject('Fetching not successful, reason: ' + data.reason);
                }
            })
            .catch(err => console.error('Fetch error:', err));
    });
};
