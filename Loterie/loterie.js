var nombreMystere = Math.floor((Math.random() * 100) + 1);
var defaultLives = 7;
var lives = defaultLives;
var userInputObj = document.getElementById("userInput");
var answerVue = new Vue({
    el: '#answer',
    data: {
        message: ''
    }
})
var livesVue = new Vue({
    el: '#lives',
    data: {
        message: 'DS'
    }
})
livesVue.message = "Lives: " + defaultLives.toString();

document.addEventListener('keypress', (event) => {
    const keyName = event.key;

    if (keyName == "Enter") {
        guess();
    }
});


function guess() {
    var guessedNumber = parseInt(document.getElementById("userInput").value);
    if (guessedNumber < 0 || guessedNumber > 100) {
        answerVue.message = "Veuillez entrer un nombre compris entre 0 et 100";
    } else if (guessedNumber == nombreMystere) {
        answerVue.message = "Bien joué !";
        restart();
    } else if (guessedNumber > nombreMystere) {
        answerVue.message = "C'est moins !";
        lives -= 1;
        livesVue.message = "Lives: " + lives.toString();
    } else if (guessedNumber < nombreMystere) {
        answerVue.message = "C'est plus !";
        lives -= 1;
        livesVue.message = "Lives: " + lives.toString();
    }
    if (lives < 1) {
        answerVue.message = "Vous avez perdu, le nombre mystère était " + nombreMystere.toString();
        restart();
    }
}

function restart () {
    nombreMystere = Math.floor((Math.random() * 100) + 1);
    lives = defaultLives;
    livesVue.message = "Lives: " + lives.toString();
    userInputObj.value = 0;
}

//changer bouton "Entrer" pour la touche enter
