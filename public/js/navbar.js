document.getElementById("home").onclick = function () {
    window.location.href = "http://localhost:3000/";
}

document.getElementById("char").onclick = function () {
    let search = document.getElementById("search").value;
    window.location.href = "http://localhost:3000/characters?search=" + search;
}

document.getElementById("wep").onclick = function () {
    let search = document.getElementById("search").value;
    window.location.href = "http://localhost:3000/weapons?search=" + search;
}

document.getElementById("armor").onclick = function () {
    let search = document.getElementById("search").value;
    window.location.href = "http://localhost:3000/armor?search=" + search;
}

document.getElementById("spell").onclick = function () {
    let search = document.getElementById("search").value;
    window.location.href = "http://localhost:3000/spells?search=" + search;
}