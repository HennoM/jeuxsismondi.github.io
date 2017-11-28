/**
 * Created by Maxime on 14/11/2017.
 */

var secret = generate3DigitsNumber();
var defaultLives = 10;
var lives = defaultLives;
var histoElement = document.getElementById("histo");
var livesElement = document.getElementById("livesCount");

livesElement.innerHTML = defaultLives.toString();

function generate3DigitsNumber() { // digits must be different from one another
    number = '';
    alreadyPicked = []; //stocker les nb deja sortis
    while (number.length < 3) {
        rand = getRandomInt(0, 9);
        if (alreadyPicked.indexOf(rand) == -1) { // si nb pas present dans alreadyPicked
            number += rand.toString(); //concatenation
            alreadyPicked.push(rand); //ajouter chiffre a la liste
        }
    }
    return parseInt(number);
}

function getInfos(userInput, secret) { // Get response tokens
    userInput = (""+userInput).split(""); // convert number to array (strings) for process
    secret = (""+secret).split("");
    var nul = 0; // nul -> not in secret
    var ok = 0; // ok -> in secret but not in right position
    var hit = 0;    // hit -> in secret and right position
    for (var i = 0; i < 3; i++) {
        var positionInSecret = secret.indexOf(userInput[i]); // stocker la position du chiffre donné par l'utilisateur dans le secret
        if (positionInSecret == -1) {  // if not in secret
            nul++;
        } else if (positionInSecret == i) { // if right position
            hit++;
        } else {   // if present but not right position
            ok++;
        }
    }
    var outputText = "";
    if (nul == 3) {
        outputText = "None is right";
    } else if (hit == 3) {
        outputText = "You win";
    } else {
        for (var i = 0; i < hit; i++) {
            outputText += "hit ";
        }
        for (var i = 0; i < ok; i++) {
            outputText += "ok ";
        }
    }
    return [[nul, ok, hit], outputText]
}

function send() {
    var userInput = document.getElementById("userInput").value; //recuperer contenu
    var results = getInfos(userInput, secret);
    histoElement.innerHTML += userInput + ": " + results[1] + "<br><br>";
    if (results[0][2] == 3) {
        alert("Et c'est gagné !");
        reset();
    } else {
        updateLives(-1);
        if (lives < 1) {
            alert("Vous avez perdu...");
            reset();
        }
    }
}

function reset() {
    var histo = "Historique: \n";
    histoElement.innerHTML = "";
    secret = generate3DigitsNumber();
    lives = defaultLives;
    livesElement.innerHTML = defaultLives.toString();
    return [histo, secret];
}

function updateLives(value) {
    lives += value;
    livesElement.innerHTML = lives.toString();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}