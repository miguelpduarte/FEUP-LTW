// State store
const store = {
    user: undefined,
    user_loading_promise: undefined,
};

// export default store;

// State actions

import { getUserLoginInfo } from "./user_fetch_actions.js";

export const isUserLoggedIn = async () => {
    return !!await getUserInfo();
};

export const getUserInfo = () => {
    if (store.user !== undefined) {
        // User info already loaded, getting from "cache"
        return store.user;
    } else if (store.user_loading_promise) {
        return store.user_loading_promise;
    }

    store.user_loading_promise = new Promise(async (resolve) => {
        try {
            // User logged in
            const user_info = await getUserLoginInfo();
            store.user = user_info;
            store.user_loading_promise = undefined;
            return resolve(user_info);
        } catch {
            // User not logged in
            store.user = null;
            store.user_loading_promise = undefined;
            return resolve(null);
        }
    });

    return store.user_loading_promise;
};