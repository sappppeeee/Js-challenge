//Challenge 1: Your Age in Days
function ageInDays (){
    var birthYear = prompt('What year were you bron?');
    var ageInDayss = (2020 - birthYear) * 360;
    var h1 = document.createElement('h1');
    var textAnswere = document.createTextNode('You are ' + ageInDayss + ' days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswere);
    document.getElementById(`flex-box-result`).appendChild(h1);
}
function reset() {
    document.getElementById('ageInDays').remove();
}
//Challenge 2: Cat Generator
function genetrateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen')
    image.src= "https://media.tenor.com/images/1a5a73dbaaaf7ec3f0da44fb75e58c76/tenor.gif";
    div.appendChild(image);
}
//Challenge 3: Rock Paper Scissors
function rpsGame (yourChoise) {
    console.log(yourChoise);
    var humanChoice, botChoice;
    humanChoice= yourChoise.id;

    botChoice = numberToChoice(randToRpsInt());
    console.log('computer choice', botChoice);

    results = decidewinner (humanChoice,botChoice);
    message = finalMessage(results);
    console.log(message);
    
    rpsFrontEnd(yourChoise.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(Number) {
    return ['rock', 'paper', 'scissors'][Number];
}

function decidewinner(yourChoise, computerChice) {
    var rpsDatabase = {
        'rock': {'scissors':1, 'rock':0.5, 'paper':0},
        'scissors': {'scissors':0.5, 'rock':0, 'paper':1},
        'paper': {'scissors':0, 'rock':1, 'paper':0.5},
    };
    var youScore = rpsDatabase[yourChoise][computerChice];
    var computerScore = rpsDatabase[computerChice][yourChoise];
    return [youScore, computerScore];
}
function finalMessage([youScore, computerScore]) {
    if (youScore === 0) {
        return {'message':'You lost', 'color':'red'};
    }
    else if (youScore ===0.5) {
        return{'message':'you tied','color':'yellow'};
    }
    else {
        return{'message':'you won','color':'green'};
    }
}

function rpsFrontEnd (humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    
    humanDiv.innerHTML= "<img src='" + imagesDatabase[humanImageChoice] + "'hight=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1); border-radius: 10%';>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML= "<img src='" + imagesDatabase[botImageChoice] + "'hight=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1); border-radius: 10%';>"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}
//Challenge 3: Change Button Colors

var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

var copyAllButtons = [];
for(    let i=0;  i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green'){
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    }else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for(let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttonsGreen() {
    for(let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
function buttonColorReset() {
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i=0; i < all_buttons.length; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}


//Challenge 5: Blackjack
let blackjackGame = {
    'you': {'scorespan':'#your-blackjack-result', 'div': '#your-box', 'score':0},
    'dealer': {'scorespan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score':0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1,11]},
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame["dealer"]
const hitSound = new Audio('static/sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit(){
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    console.log(YOU['score']);
    showScore(YOU);
    
}
function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}
function showCard(card, activePlayer) {
    if (activePlayer['score']){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}
function blackjackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i=0; i<yourImages.length; i++){
        yourImages[i].remove();
    }
    for (i=0; i<dealerImages.length; i++){
        dealerImages[i].remove();
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1]<= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }



    activePlayer['score'] += blackjackGame['cardsMap'][card];
}

function showScore(activePlayer) {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}