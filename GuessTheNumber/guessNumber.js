
var validInputs = iniValidInputs();
var secret = generate3DigitsNumber();
var defaultLives = 10;
var lives = defaultLives;
var livesVue = new Vue({
    el: '#lives',
    data: {
        message: 'Hello Vue!'
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
    
    
})
livesVue.message = "Lives: " + defaultLives.toString();

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

function generate3DigitsNumber() { // digits must be different from one another
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
    var miss = 0; // miss -> not in secret
    var hitish = 0; // hitish -> in secret but not in right position
    var hit = 0;    // hit -> in secret and right position
    for (var i = 0; i < 3; i++) {
        var positionInSecret = secret.indexOf(userInput[i]);
        if (positionInSecret == -1) {  // if not in secret
            miss++;
        } else if (positionInSecret == i) { // if right position
            hit++;
        } else {   // if present but not right position
            hitish++;
        }
    }
    var outputText = "";
    if (miss == 3) {
        outputText = "None is right";
    } else if (hit == 3) {
        outputText = "You win";
    } else {
        for (var i = 0; i < hit; i++) {
            outputText += "hit ";
        }
        for (var i = 0; i < hitish; i++) {
            outputText += "hitish ";
        }
    }
    return [[miss, hitish, hit], outputText]
}

function send() {
    var userInput = document.getElementById("userInput").value;
    if (validInputs.indexOf(parseInt(userInput)) != -1){ //nb valide ds liste
        var results = getInfos(userInput, secret);
        histoVue.message += userInput + ": " + results[1] + "<br><br>";
        if (results[0][2] == 3) {
            alert("You win !");
            reset();
        } else {
            updateLives(-1);
            if (lives < 1) {
                alert("You lose");
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
    livesVue.message = "Lives: " + defaultLives.toString();
    livesVue.turnGeneric();
}

function updateLives(value) { //
    lives += value;
    livesVue.message = "Lives: " + lives.toString();
    if (lives < 4) {
        livesVue.turnRed(); //methode Vue
    }    
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

