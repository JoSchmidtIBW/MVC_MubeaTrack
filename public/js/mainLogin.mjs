
console.log("MainLogin.js halllllllllllllllllllllllllllllllllllllllllllllllllllllllll");

function myFunctionClicky(){
    console.log("halllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
}

//let lbAusgabeSpitzname1 = document.getElementById('lbAusgabeSpitzname1');
//lbAusgabeSpitzname1.style.color = "blue";
//document.getElementById('2').style.backgroundColor="red";
//lbAusgabeSpitzname1.style.backgroundColor="red";

// erst wenn existiert, kann man farbe machen
document.addEventListener("DOMContentLoaded", function () {
    //  document.getElementById("lbAusgabeSpitzname1").style.fontSize = "24px";
    //  document.getElementById('lbAusgabeSpitzname1').style.backgroundColor="red";
});

function btnMaNummerLOK(){
    let eingabeMaNummerL = document.getElementById("inputMaNummerL").value;
    console.log("eingabeMaNummerL: "+eingabeMaNummerL);
    lbAusgabeMaNummerLClient.innerText = eingabeMaNummerL;
    lbAusgabeMaNummerLClient.style.color = "red";
}

function btnPasswortLOK(){
    let eingabePasswortL = document.getElementById("inputPasswortL").value;
    console.log("eingabePasswortL: "+eingabePasswortL);
    let lbAusgabePasswortLClient = document.getElementById('lbAusgabePasswortLClient');
    lbAusgabePasswortLClient.innerText = eingabePasswortL;
    lbAusgabePasswortLClient.style.color = "red";
}



async function loadJoke() {
    try { //hier wäre fehler status 400
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log(data.value);
            document.getElementById('j').innerText = data.value;
        } else {
            console.error(await response.text);
            document.getElementById('j').innerText = "Kein Internet!!!";
        }
    } catch (e) {
        console.error(e);
        document.getElementById('j').innerText = "Kein Internet!!!";
    }
}