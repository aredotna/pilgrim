const { APP_URL } = process.env;
let snippet = `javascript:(function(){var url="${APP_URL}/"+encodeURIComponent(window.location.href);window.open(url,'_blank');})()`

export default snippet;
