export const getParams = () => {
    let queryDict = {};
    location.search.substr(1).split("&").forEach(item => {
        queryDict[item.split("=")[0]] = item.split("=")[1];
    });
    return queryDict;
}

var mdParser = new Remarkable({
    linkify: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {}
        }
    
        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {}
    
        return ''; // use external default escaping
      }
});

export const mdToHTML = (md) => {
    return mdParser.render(md);
}