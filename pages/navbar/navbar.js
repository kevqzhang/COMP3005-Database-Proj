document.getElementById("char").onclick = function () {
    let search = document.getElementById("search").value;
    window.location.href = "http://localhost:3000/characters?search=" + search;
}