var nombreMystere = Math.floor((Math.random() * 100) + 1);
alert(nombreMystere);
var msgVue = new Vue({
  el: '#textArea',
  data: {
    message: 'Hello Vue.js!'
  }
})
function guess() {
    var guessedNumber = document.getElementById("userInput").value;
    alert(guessedNumber);
    
    if (guessedNumber == nombreMystere) {
        msgVue.message = 'WP';
    } else if (guessedNumber > nombreMystere) {
        msgVue.message = 'Your number is superior';
    } else {
        msgVue.message = 'Your number is inferior';
    }
}

function restart (nombreMystere) {
    var nombreMystere = Math.floor((Math.random() * 100) + 1);
    alert(nombreMystere);
}

