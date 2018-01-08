var validInputs = iniValidInputs();
var secret = generate3DigitsNumber();
var defaultLives = 10;
var lives = defaultLives;
var livesVue = new Vue({
    el: '#lives',
    data: {
        message: ''
    },
    methods: {
        turnRed: function() {
            document.getElementById("lives").className += " red";
        },
        turnGeneric: function() {
            document.getElementById("lives").className = "";
        }
    }
})
var histoVue = new Vue({
    el: '#histoVue',
    data: {
        message: ''
    }
    
    document.addEventListener('keypress', (event) => {
    const keyName = event.key;

    if (keyName == "Enter") {
        getInfos();
    }
}
    
    
})
livesVue.message = "Vies: " + defaultLives.toString();

function iniValidInputs(){
    var list = [];
    for (var i = 0; i < 1000; i++){

        var digits = (""+i).split(""); // convert number to array (strings) for process

        if (i < 10 || (i < 100 && digits[0] != digits[1]) || (digits[0] != digits[1] & digits[0] != digits[2] && digits[1] != digits[2])){

            list.push(i); //tester les si le nombre est valide
        }

    }
    return list;
}

function generate3DigitsNumber() { //les nb doivent être différents les uns des autres
    number = '';
    alreadyPicked = [];
    while (number.length < 3) {
        rand = getRandomInt(0, 9);
        if (alreadyPicked.indexOf(rand) == -1) {
            number += rand.toString();
            alreadyPicked.push(rand);
        }
    }
    return parseInt(number);
}

function getInfos(userInput, secret) { // Get response tokens
    userInput = (""+userInput).split(""); // convert number to array (strings) for process
    secret = (""+secret).split("");
    var rate = 0; // raté -> pas ds nb secret
    var ok = 0; // ok -> ds secret mais pas à la bonne position
    var hit = 0;    // hit -> ds nb secret et à la bonne position
    for (var i = 0; i < 3; i++) {
        var positionInSecret = secret.indexOf(userInput[i]);
        if (positionInSecret == -1) {  // si pas ds nb secret
            rate++;
        } else if (positionInSecret == i) { // si la position est bonne
            hit++;
        } else {   // si présent mais pas à la bonne place
            ok++;
        }
    }
    var outputText = "";
    if (rate == 3) {
        outputText = "Aucun nombre n'est correct";
    } else if (hit == 3) {
        outputText = "Bravo, vous avez gagné !";
    } else {
        for (var i = 0; i < hit; i++) {
            outputText += "hit ";
        }
        for (var i = 0; i < ok; i++) {
            outputText += "ok ";
        }
    }
    return [[rate, ok, hit], outputText]
}

function send() {
    var userInput = document.getElementById("userInput").value;
    if (validInputs.indexOf(parseInt(userInput)) != -1){   //nb valide ds liste
        var results = getInfos(userInput, secret);
        histoVue.message += userInput + ": " + results[1] + "<br><br>";
        if (results[0][2] == 3) {
            alert("Bravo, vous avez gagné !");
            reset();
        } else {
            updateLives(-1);
            if (lives < 1) {
                alert("Vous avez perdu...");
                reset();
            }
        }
    }
}

function reset() {
    var histo = "Historique: \n";
    histoVue.message = "";
    secret = generate3DigitsNumber();
    lives = defaultLives;
    livesVue.message = "Vies: " + defaultLives.toString();
    livesVue.turnGeneric();
}

function updateLives(value) { //
    lives += value;
    livesVue.message = "Vies: " + lives.toString();
    if (lives < 4) {
        livesVue.turnRed(); //methode Vue
    }    
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

