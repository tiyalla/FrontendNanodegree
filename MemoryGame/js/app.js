/*
 * Create a list that holds all of your cards
 */
var container = document.querySelector(".deck");
var icons = container.querySelectorAll("li.card > i");
var cards = container.querySelectorAll("li.card");
var gameOver = document.querySelector(".gameEnd");

var cardClassNames = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt',
    'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond',
    'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o',
    'fa fa-cube'
];

//helpers
var openCards = [];
var countMoves = 0, timer = 0, countCards = 0, firstClick = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*console.log("after");
for (var i = 0; i < cards.length; i++){
    console.log(cards[i].className);
}*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards
  *     (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position
  *    (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol
 *    (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page
 *    (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score
  *    (put this functionality in another function that you call from this one)
 */


function arrangeDeck(){ //shuffle cards and rearrange icons on cards
    shuffle(cardClassNames);
    for (var i = 0; i < icons.length; i++){
        icons[i].className = cardClassNames[i];
    }
}


for(var i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", displayCard);
}

function displayCard(){
    firstClick+=1;
    if(firstClick === 1){
        startTime = Date.now();
        gameTimer(startTime);
    }

    this.classList.add("open", "show");
    checkCardsMatch(this.children[0]);
}

function checkCardsMatch(cardElement){
    var card1 = openCards[0];
    var card2 = cardElement;
    if(openCards.length === 1) {
        movesCounter();
        if (card1.className === card2.className) {
            cardsMatch(card1, card2);
        } else {
            cardsNoMatch(card1, card2);
        }
    } else{
        openCards.push(cardElement);
    }
}

function cardsMatch(card1, card2){
    console.log("We're matching");
    openCards.length = 0;
    countCards+=1;
    setTimeout(function () {
        card1.offsetParent.classList.add("match");
        card2.offsetParent.classList.add("match");
        card1.offsetParent.classList.remove("open", "show");
        card2.offsetParent.classList.remove("open", "show");
    }, 1000);
    console.log(countCards);
    if(countCards === 8){

        gameComplete();
    }
}

function cardsNoMatch(card1, card2){
    openCards.length = 0;

    setTimeout(function () {
        card1.offsetParent.classList.remove("open", "show");
        card2.offsetParent.classList.remove("open", "show");
    }, 800);

}

function movesCounter(){
    countMoves+=1;
    document.querySelector(".moves").textContent = countMoves;
}

function gameTimer(startTime){
    timer = setInterval(function() {
        now = Date.now();
        timeElapsed = Math.floor((now - startTime) / 1000);
        document.querySelector(".timerClock").textContent = timeElapsed;
    }, 1000);

}
function gameComplete(){
    gameOver.style.display = "block";
    document.querySelector(".resultTime").textContent = timeElapsed+" seconds";
    document.querySelector(".resultMoves").textContent = countMoves;
}

function gameReset(){
    countCards = 0;
    countMoves = 0;
    openCards.length = 0;
    firstClick = 0;
    for(var i = 0; i < cards.length; i++){
        cards[i].classList.remove("open", "show", "match");
    }
    document.querySelector(".timerClock").textContent = 0;
    document.querySelector(".moves").textContent = 0;
    clearInterval(timer);
arrangeDeck();
}

arrangeDeck();

document.querySelector(".btn-close").addEventListener("click", function() {
    gameOver.style.display = "none";
    gameReset();
});

document.querySelector(".restart").addEventListener("click", function() {
    gameReset();
});