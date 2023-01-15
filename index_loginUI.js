//test success 2023 Jan 11
//login object with username and password created.  login object is itself a value with key of username in localStorage object.  
const enterData = function fEnterData(event) {
    // Class assignment requires event.preventDefault().
    event.preventDefault();
    const login = {
        username: event.target.parentElement.querySelector("label #username").value,
        // Trailing comma is for best practices.
        password: event.target.parentElement.querySelector("label #password").value,
    };
    if (login.username === "(none)") {
        event.target.parentElement.querySelector("label #username").value = "Anonymous";
        alert("(none) is not an eligible username.")
    }
    if (!(localStorage.getItem(login.username))) {
        // setItem(String, JSON.stringify({username: String, password: String}))
        // If login is not stored, a login is created and stored.
        localStorage.setItem(login.username, JSON.stringify(login));
        document.querySelector("#currentUser").innerText = login.username;
    } 
    else {
        const storedLogin = JSON.parse(localStorage.getItem(login.username));
        if (login.username === storedLogin.username && login.password === storedLogin.password) {
            document.querySelector("#currentUser").innerText = login.username;
        // Triggers if login is stored from earlier, and if username and password do NOT both match
        } else {
            alert ("Password you entered not valid.");
        }
    }
}
//test success 2023 Jan 11
const wipeData = function fWipeData(){
    if (confirm("Delete all user data?\nThis cannot be undone.") === true) {
        if (localStorage.length === 0) {
            document.getElementById("wipeSuccess").innerText = "No data to wipe.";
        } else {
            localStorage.clear();
            document.getElementById("wipeSuccess").innerText = "All user data wiped successfully.";
        }
    } else {
        if (localStorage.length === 0) {
            document.getElementById("wipeSuccess").innerText = "Deletion cancelled, but no data to wipe.";
        } else {
            document.getElementById("wipeSuccess").innerText = "User data not wiped.";
        }
    }   
}