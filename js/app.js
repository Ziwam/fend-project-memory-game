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
let remainingMatches = size/2;
let moveCount = 0;
let flippedCard1 = null;
const cardSymbolList= ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
let deck = [];
let card = function(cardSymbol){
	this.cardSymbol = cardSymbol;
	this.flipped = false;
	this.matched = false;
	this.status = "";
	this.htmlString = "<li class=\"card \""+this.status+"><i class=\"fa "+this.cardSymbol+"\"></i></li>";
	this.cardHtml = $(this.htmlString);
}
let starList = new Array(3);
let star = function(){
	this.filled = true;
	this.status = "";
	this.starHtml = $("<li><i class=\"fa "+status+"\"></i></li>");
}

card.prototype.onClick = function() {
	console.log("clicked");
};

function createDeck(){
	for (let i = 0; i < (size/2); i++ ){
		deck.push(new card(cardSymbolList[i]));
		deck.push(new card(cardSymbolList[i]));
	}
	// console.log(deck);
}

function appendDeck(){
	let htmlList = $('.deck');
	for(let card of deck){
		card.cardHtml.on('clicked',card.onClick());
		console.log(card.htmlString);
		htmlList.append(card.htmlString);
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
