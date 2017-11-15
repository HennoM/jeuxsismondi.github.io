var nombreMystere = Math.floor((Math.random() * 100) + 1);
alert(nombreMystere);
var msgVue = new Vue({
  el: '#textArea',
  data: {
    message: 'Entrez un nombre entre 0 et 100 compris'
  }
})

function guess() {
    var guessedNumber = document.getElementById("userInput").value;
    alert(guessedNumber);
    
    if (guessedNumber == nombreMystere) {
        msgVue.message = "Bien joué !";
    } else if (guessedNumber > nombreMystere) {
        msgVue.message = "C'est moins !";
    } else {
        msgVue.message = "C'est plus !";
    }
}

function restart (nombreMystere) {
    var nombreMystere = Math.floor((Math.random() * 100) + 1);
    alert(nombreMystere);
}
