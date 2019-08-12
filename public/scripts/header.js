function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}
var page = location.pathname.substring(1);
var title = document.querySelector("title")
if (page) {
    title.innerHTML += jsUcfirst(page);
} else {
    title.innerHTML += " Homepage"
}   