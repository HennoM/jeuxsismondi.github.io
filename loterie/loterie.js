var nombreMystere = Math.floor((Math.random() * 100) + 1);

function guess() {
    var guessedNumber = document.getElementById("userInput").value;

    if (guessedNumber == nombreMystere) {
      document.getElementById("textArea").innerHTML = "Bien joué !";
    } else if (guessedNumber > nombreMystere) {
        document.getElementById("textArea").innerHTML = "C'est moins !";
    } else if (guessedNumber < nombreMystere) {
        document.getElementById("textArea").innerHTML = "C'est plus !";
    } else if (guessedNumber > 100) { //ne fonctionne pas
      document.getElementById("textArea").innerHTML = "Veuillez entrer un nombre inférieur ou égal à 100";
    } else if (guessedNumber < 0) { //ne fonctionne pas
      document.getElementById("textArea").innerHTML = "Veuillez entrer un nombre supérieur ou égal à 0";
    }
}

function restart () {
    nombreMystere = Math.floor((Math.random() * 100) + 1);
    guess();
}

//Ajouter nb d'essais (1) et nombres déjà entrés (2) + changer bouton "Entrer" pour la touche enter (3)
//Arrêter le jeu qd nombre mystère trouvé + gérer entrées utilisateur (interdire lettres)
//Remettre à zéro input qd "recommencer"
