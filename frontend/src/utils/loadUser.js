function loadUser () {
    return JSON.parse(window.localStorage.getItem("user"));
}

function getToken() {
    return loadUser().token;
}

export default {loadUser, getToken};