// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// timer code
var timer = new easytimer.Timer();
var timerElement = document.getElementById("timer");

timer.addEventListener('secondsUpdated', function (e) {
    $('#timer').html(timer.getTimeValues().toString());
});
                

let Carte8= ["fa fa-diamond", "fa fa-anchor",
 "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle",
"fa fa-bomb", "fa fa-paper-plane-o"];
let Carte16 = Carte8.concat(Carte8);
let restartButton = document.querySelector('.restart');
let contatore = [];
let cont0Str = '';
let cont1Str = '';
let gameStarted = false;
let match = 0;
let moves = 1;
let stars = 3;
let starsContainer = document.querySelector('.stars');
let movescounter = document.getElementById("moves");

function createDeck() {
    const deck = document.querySelector('.deck');
    var shuffledCards = shuffle(Carte16);
    for (let carte of shuffledCards) {
        const listElement = document.createElement("li");
        const cardElement = document.createElement("i");
        deck.appendChild(listElement);
        listElement.appendChild(cardElement);
        listElement.className = "card";
        cardElement.className = carte;
    }
}

createDeck();

restartButton.addEventListener("click", function() {
    location.reload();
})

let allCards = document.querySelectorAll(".card");


function increaseMoves() {
    movescounter.textContent = moves;
    moves++;
}

function rating() {
    if (moves === 10) {
        stars--;
        starsContainer.removeChild(starsContainer.lastElementChild);
    }
    if (moves === 20) {
        stars--;
        starsContainer.removeChild(starsContainer.lastElementChild);
    }
}


allCards.forEach(function (carta) {
    carta.addEventListener('click', function () {
            carta.classList.add('open', 'show', 'disabled');
            if (!gameStarted) {
                timer.start();
                gameStarted = true;
            }
            contatore.push(carta);
            if (contatore.length === 2) {
                console.log(contatore[0].firstElementChild.className, contatore[1].firstElementChild.className)
                if (contatore[0].firstElementChild.className === contatore[1].firstElementChild.className) {
                    console.log('Matched!');
                    contatore[0].classList.add('match');
                    contatore[1].classList.add('match');
                    contatore.splice(0, 2);
                    match++;
                    console.log(match);
                    increaseMoves();
                    console.log(moves);
                    rating();
                    if (match === 8) {
                        timer.stop();
                        swal({
                            text: `You won with ${moves} moves and ${stars} stars and you took ${timerElement.innerHTML}`,
                            icon: "success",
                            button: {
                                text: "Play Again?"
                            }
                          }).then(
                              function() {
                                  location.reload();
                              }
                          );
                    }

                } 

                else {
                    setTimeout(function () {
                        contatore[0].classList.remove('open', 'show', 'disabled');
                        contatore[1].classList.remove('open', 'show', 'disabled');
                        contatore = []
                    }, 300)
                   
                }
                increaseMoves();
                rating();
            }
        });
    });

