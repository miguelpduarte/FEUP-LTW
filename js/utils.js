export const getParams = () => {
    let queryDict = {};
    location.search.substr(1).split("&").forEach(item => {
        queryDict[item.split("=")[0]] = item.split("=")[1];
    });
    return queryDict;
}