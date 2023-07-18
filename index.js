const button = document.getElementById('start')
const user = document.getElementById('user').value;

let userName;

function setName() {
    var user = document.getElementById("user").value;
    localStorage.setItem("user", user);
}

button.addEventListener('click', setName)