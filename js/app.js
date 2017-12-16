// Constant variables
const deckCount = 16;
const starCount = 3;
const deckHtml = $('.deck');
const starListHtml = $('.stars');
const moveHtml = $('.moves');
const timerHtml = $('.timer');
const starStats = $('.star_stats');
const gamePlaying = $('.game_play');
const gameOver = $('.game_end');
const cardClass = "card ";
const starClass = "fa ";
const cardSymbolList = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
const starSymbolList = ["fa-star","fa-star-o"];

//Changeable variables
let time = 0;
let firstClick = false;
let interval_id = null; //Id for timer's set interval
let possibleMatches = deckCount/2; //number of matches left in game
let mistakes = 0;
let moveCount = 0;
let flippedCard = null; //Holds card object of the first flipped card for comparison
let deck = []; 
let starList = [];

//Card object constructor
let card = function(cardSymbol) {
	this.index = null;
	this.cardSymbol = cardSymbol;
	this.flipped = false;
	this.matched = false;
	this.wrong = false;
	this.status = "";
	this.cardHtml = $("<li class=\"card "+this.status+"\"><i class=\"fa "+this.cardSymbol+"\"></i></li>");
}
//Star object constructor
let star = function() {
	this.status = starSymbolList[0];
	this.starHtml = $("<li><i class=\"fa "+this.status+"\"></i></li>");
}

//Change card object html 
card.prototype.changeStatus = function() {
	if(this.flipped) {
		this.status = "open show";
		if(this.matched){
			this.status = "match";
		}else if(this.wrong){
			this.status = "wrong";

			//Wait 0.9s before flipping card back over
			setTimeout(flipBack,900,this);
		}
	}else {
		this.status = "";
	}

	deckHtml.children(".card").eq(this.index).attr('class',cardClass + this.status);
};

card.prototype.onClick = function() {
	if(!firstClick) {
	firstClick = true;

	// Begins timer interval
	interval_id = setInterval(updateTimer,1000);
	}

	if(!this.flipped) {
		this.flipped = true;
		this.changeStatus();
		compareCards(this);
	}
};

//Flips card to blank side
flipBack = function(card) {
	card.wrong = false;
	card.flipped = false;
	card.changeStatus();
}

//Change Star object's html
function changeStarStatus(index,number) {
	starListHtml.children("li").eq(index).find('i').attr('class',starClass + starSymbolList[number]);
}

//Increases move count by 1 and changes html
function incrementMoves() {
	moveCount++;
	moveHtml.text(moveCount+" Moves");
}
/*
 * Creates "00:00" time based on incremented variable time.
 * Run every seccond.
 */
function updateTimer() {
	time++;
	let minutes = Math.floor(time/60);
	let seconds = time%60;
	timerHtml.text(timeformat(minutes)+":"+timeformat(seconds));
}

// Returns string with "0" in front if char count <2 
function timeformat(numString) {
	return numString.toString().length == 1 ? "0"+numString : numString;
}

// Compares cards
function compareCards(newCard) {
	// If no card to compare to save newCard as flippedCard
	if(!flippedCard) {
		flippedCard = newCard;
		return;
	}

	incrementMoves();

	// Cards match
	if(flippedCard.cardSymbol == newCard.cardSymbol) {
		flippedCard.matched = true;
		newCard.matched = true;
		possibleMatches--;
		gameEnd();
	// Cards don't match
	}else {
		flippedCard.wrong = true;
		newCard.wrong = true;
		mistakes++;
		updateRating();
	}
	flippedCard.changeStatus();
	newCard.changeStatus();
	flippedCard = null;
}

// Changes stars status based on mistakes
function updateRating() {
	switch(mistakes){
		case 9:
			changeStarStatus(2,1);
			break;
		case 18:
			changeStarStatus(1,1);
			break;
		default:
			break;
	}
}

// Creates Card objects and pushes to deck list
function createDeck() {
	for (let i = 0; i < possibleMatches; i++ ) {
		deck.push(new card(cardSymbolList[i]));
		deck.push(new card(cardSymbolList[i]));
	}
}

// Creates Star objects and pushes to star list
function createStars() {
	for (let i = 0; i < starCount; i++) {
		starList.push(new star());
	}
}

// Appends card's html to deck html
function appendDeck() {
	deck = shuffle(deck);
	for(const [index, card] of deck.entries()) {
		deckHtml.append(card.cardHtml);
		card.cardHtml.click(function(){
			card.onClick();
		});
		card.index = index;
	}
}

// Appends star html to stars html
function appendStars() {
	for(const star of starList) {
		starListHtml.append(star.starHtml);
	}
}

// Appends star html to star_stats html
function appendStarStats() {
	for(const star of starList) {
		starStats.append(star.starHtml);
	}
}

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

// Starts game by creating objects and appending html
function gameStart() {
	// Makes game board visible
	gamePlaying.css('display','');
	// Makes game over visible
	gameOver.css('display','none');

	timerHtml.text("00:00");
	moveHtml.text("0 Moves");
	starStats.empty();
	createDeck();
	createStars();
	appendDeck();
	appendStars();
}

// Resets game by setting variables to default values
function gameReset() {
	// Clears list html
	deckHtml.empty();
	starListHtml.empty();
	// Resets variables 
	time = 0;
	possibleMatches = deckCount/2;
	firstClick = false;
	mistakes = 0;
	moveCount = 0;
	flippedCard = null;
	deck = [];
	starList = [];
	// Stops timer interval from id
	clearInterval(interval_id);

	// Begin game again
	gameStart();
}

// Displays GameOver Screen and stops time interval
function gameEnd() {
	if(possibleMatches != 0) {
		return;
	}

	appendStarStats();
	clearInterval(interval_id);
	gamePlaying.css('display','none');
	gameOver.css('display','');
}
