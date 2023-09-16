"use strict";
var NewTurn = false;
var PlayerName = 'Unknown';
var playerhand = document.querySelectorAll('.handlook');
var playerput = document.querySelector('.player .putplace');
var computerput = document.querySelector('.computer .putplace');
var playerscore = document.querySelector('#TheScore #playerscore');
var gamestatus = document.querySelector('#status');
playerhand.forEach(x => {
    x.addEventListener('click', function () {
        if (!NewTurn) {
            playerput?.appendChild(x);
            NewTurn = true;
            SmartAI();
        }
    });
});
function SmartAI() {
    var rand = Math.floor(Math.random() * 10);
    var comphand = handlook.rock;
    if (rand < 10 && rand > 7) {
        comphand = handlook.rock;
    }
    else if (rand < 7 && rand > 4) {
        comphand = handlook.scissors;
    }
    else if (rand < 4) {
        comphand = handlook.paper;
    }
    var ahand = new Hand(comphand);
    computerput?.appendChild(ahand.CreatedImage);
    var playerhand = (playerput?.children[0]).src;
    var computerhand = (computerput?.children[0]).src;
    if (playerhand === computerhand) {
        gamestatus.innerHTML = 'Draw!';
    }
    else if (playerhand.includes(handlook.rock) && computerhand.includes(handlook.scissors)) {
        AddPlayerScore();
    }
    else if (playerhand.includes(handlook.rock) && computerhand.includes(handlook.paper)) {
        RemovePlayerScore();
    }
    else if (playerhand.includes(handlook.scissors) && computerhand.includes(handlook.rock)) {
        RemovePlayerScore();
    }
    else if (playerhand.includes(handlook.scissors) && computerhand.includes(handlook.paper)) {
        AddPlayerScore();
    }
    else if (playerhand.includes(handlook.paper) && computerhand.includes(handlook.scissors)) {
        RemovePlayerScore();
    }
    else if (playerhand.includes(handlook.paper) && computerhand.includes(handlook.rock)) {
        AddPlayerScore();
    }
    function AddPlayerScore() {
        gamestatus.innerHTML = 'You Win!';
        playerscore.innerHTML = (+playerscore.innerHTML + 10).toString();
        playerput.style.backgroundColor = 'red';
    }
    function RemovePlayerScore() {
        gamestatus.innerHTML = 'You Lose!';
        playerscore.innerHTML = (+playerscore.innerHTML - 10).toString();
        computerput.style.backgroundColor = 'red';
    }
    document.getElementById('playagain')?.removeAttribute('hidden');
    window.localStorage.setItem(PlayerName, playerscore.innerHTML);
}
function PlayAgain() {
    computerput.innerHTML = '';
    document.querySelector('.hand')?.appendChild(playerput?.firstChild);
    NewTurn = false;
    document.getElementById('playagain')?.setAttribute('hidden', '');
    playerput.style.backgroundColor = '#176B87';
    computerput.style.backgroundColor = '#176B87';
}
var handlook;
(function (handlook) {
    handlook["rock"] = "images/icon-rock.svg";
    handlook["paper"] = "images/icon-paper.svg";
    handlook["scissors"] = "images/icon-scissors.svg";
})(handlook || (handlook = {}));
class Hand {
    constructor(type) {
        this.CreatedImage = document.createElement('img');
        this.handtype = handlook.rock;
        this.handtype = type;
        this.CreatedImage.src = type;
        this.CreatedImage.style.transform = 'rotate(180deg)';
    }
}
function PlayNow(input) {
    if (input.value.length > 0) {
        PlayerName = input.value;
        playerscore.innerHTML = window.localStorage.getItem(PlayerName);
    }
    document.querySelector('#playernamepanel #playername').innerHTML = PlayerName;
    document.querySelector('.firstpopup').style.display = 'none';
    document.getElementById('classname').play();
}
