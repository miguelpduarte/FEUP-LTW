"use strict";

export const isLoggedIn = () => {
    return false;
};

export const createUser = (name, username, password, password_confirmation) => {
    const body = JSON.stringify({
        name,
        username,
        password,
        password_confirmation,
    });

    console.log("kek", body);

    return new Promise((resolve, reject) => {
        fetch("/api/user.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body,
        })
        .then(res => res.json())
        .then(data => {
            console.log("wow", data);
            if (data.success) {
                return resolve();
            } else {
                return reject(data.reason);
            }
        })
        .catch(err => reject(err));
    });
};