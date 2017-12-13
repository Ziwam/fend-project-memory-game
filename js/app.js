/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const size = 16;
const deckHtml = $('.deck');
const starHtml = $('.stars');
const moveHtml = $('.moves');
const timerHtml = $('.timer');
const cardClass = "card ";
const starClass = "fa ";
const cardSymbolList = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
const starSymbolList = ["fa-star","fa-star-half-o","fa-star-o"];
let time = 0;
let remainingMatches = size/2;
let moveCount = 0;
let flippedCard1 = null;
let deck = [];
let starList = [];



let card = function(cardSymbol) {
	this.index = null;
	this.cardSymbol = cardSymbol;
	this.flipped = false;
	this.matched = false;
	this.status = "";
	this.cardHtml = $("<li class=\"card "+this.status+"\"><i class=\"fa "+this.cardSymbol+"\"></i></li>");
}
let star = function() {
	this.filled = true;
	this.status = "";
	this.starHtml = $("<li><i class=\"fa "+status+"\"></i></li>");
}

card.prototype.changeStatus = function() {
	if(this.flipped){
		this.status = "open show";
		if(this.matched){
			this.status = "match";
		}
	}else{
		this.status = "";
	}

	deckHtml.children(".card").eq(this.index).attr('class',cardClass + this.status);
};

card.prototype.onClick = function() {
	// console.log(this);
	if(!this.flipped){
		incrementMoves();
		this.flipped = true;
		this.changeStatus();
		compareCards(this);
	}
};

function incrementMoves() {
	moveCount++;
	moveHtml.text(moveCount+"");
}

function updateTimer() {
	time++;
	let minutes = Math.floor(time/60);
	let seconds = time%60;
	timerHtml.text(timeformat(minutes)+":"+timeformat(seconds));
}

function timeformat(numString) {
	return numString.toString().length == 1 ? "0"+numString : numString;
}


function compareCards(newCard) {
	if(!flippedCard1){
		flippedCard1 = newCard;
		return;
	}

	if(flippedCard1.cardSymbol == newCard.cardSymbol){
		flippedCard1.matched = true;
		newCard.matched = true;
		console.log("match!");
	}else{
		flippedCard1.flipped = false;
		newCard.flipped = false;
		console.log("no match!");
	}
	flippedCard1.changeStatus();
	newCard.changeStatus();
	flippedCard1 = null;
}

function createDeck() {
	for (let i = 0; i < (size/2); i++ ){
		deck.push(new card(cardSymbolList[i]));
		deck.push(new card(cardSymbolList[i]));
	}
	// console.log(deck);
}

function appendDeck() {
	// deck = shuffle(deck);
	for(const [index, card] of deck.entries()){
		deckHtml.append(card.cardHtml);
		card.cardHtml.click(function(){
			card.onClick();
			// console.log("hello");
		});
		card.index = index;
	}
}

// function

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

function gameStart() {
	createDeck();
	appendDeck();
	setInterval(updateTimer,1000);
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
