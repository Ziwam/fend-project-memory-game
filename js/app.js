/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const deckCount = 16;
const starCount = 3;
const deckHtml = $('.deck');
const starListHtml = $('.stars');
const moveHtml = $('.moves');
const timerHtml = $('.timer');
const cardClass = "card ";
const starClass = "fa ";
const cardSymbolList = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
const starSymbolList = ["fa-star","fa-star-half-o","fa-star-o"];
let time = 0;
let interval_id = null;
let possibleMatches = deckCount/2;
let mistakes = 0;
let moveCount = 0;
let flippedCard = null;
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
	this.status = starSymbolList[0];
	this.starHtml = $("<li><i class=\"fa "+this.status+"\"></i></li>");
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
	if(!this.flipped){
		incrementMoves();
		this.flipped = true;
		this.changeStatus();
		compareCards(this);
	}
};

function changeStarStatus(index,number) {
		starListHtml.children("li").eq(index).find('i').attr('class',starClass + starSymbolList[number]);
}

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
	if(!flippedCard){
		flippedCard = newCard;
		return;
	}

	if(flippedCard.cardSymbol == newCard.cardSymbol){
		flippedCard.matched = true;
		newCard.matched = true;
		// console.log("match!");
		possibleMatches--;
	}else{
		flippedCard.flipped = false;
		newCard.flipped = false;
		// console.log("no match!");
		mistakes++;
		console.log(mistakes);
		updateRating();
	}
	flippedCard.changeStatus();
	newCard.changeStatus();
	flippedCard = null;
}

function updateRating() {
	switch(mistakes){
		case 2:
			changeStarStatus(2,1);
			break;
		case 4:
			changeStarStatus(2,2);
			break;
		case 8:
			changeStarStatus(1,1);
			break;
		case 12:
			changeStarStatus(1,2);
			break;
		case 16:
			changeStarStatus(0,1);
			break;
		case 20:
			changeStarStatus(0,2);
			break;
		default:
			break;
	}
}

function createDeck() {
	for (let i = 0; i < possibleMatches; i++ ){
		deck.push(new card(cardSymbolList[i]));
		deck.push(new card(cardSymbolList[i]));
	}
	// console.log(deck);
}

function createStars() {
	for (let i = 0; i < starCount; i++){
		starList.push(new star());
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

function appendStars() {
	for(const star of starList){
		starListHtml.append(star.starHtml);
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
	timerHtml.text("00:00");
	moveHtml.text("0");
	createDeck();
	createStars();
	appendDeck();
	appendStars();
	interval_id = setInterval(updateTimer,1000);
}

function gameReset() {
	deckHtml.empty();
	starListHtml.empty();
	time = 0;
	possibleMatches = deckCount/2;
	mistakes = 0;
	moveCount = 0;
	flippedCard = null;
	deck = [];
	starList = [];
	clearInterval(interval_id);

	gameStart();
}

function gameEnd() {
	if(possibleMatches != 0) {
		return;
	}

	
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
