var NewTurn = false;
var PlayerName = 'Unknown';
var playerhand = document.querySelectorAll('.handlook');
var playerput = document.querySelector('.player .putplace');
var computerput = document.querySelector('.computer .putplace');
var playerscore = document.querySelector('#TheScore #playerscore');
var gamestatus = document.querySelector('#status');
    

playerhand.forEach(x => {
    x.addEventListener('click', function(){
        if (!NewTurn)
        {
            playerput?.appendChild(x);
            NewTurn = true;

            SmartAI();
        }
    });
});

function SmartAI()
{
    var rand = Math.floor(Math.random() * 10);
    var comphand = handlook.rock;
    
    if (rand < 10 && rand > 7)
    {
        comphand = handlook.rock;
    }
    else if (rand < 7 && rand > 4)
    {
        comphand = handlook.scissors;
    }
    else if (rand < 4)
    {
        comphand = handlook.paper;
    }

    var ahand = new Hand(comphand);
    computerput?.appendChild(ahand.CreatedImage);

    var playerhand = (playerput?.children[0] as HTMLImageElement).src;
    var computerhand = (computerput?.children[0] as HTMLImageElement).src;

    if (playerhand === computerhand)
    {
        gamestatus!.innerHTML = 'Draw!';
    }
    else if (playerhand.includes(handlook.rock) && computerhand.includes(handlook.scissors))
    {
        AddPlayerScore();
    }
    else if (playerhand.includes(handlook.rock) && computerhand.includes(handlook.paper))
    {
        RemovePlayerScore();
    }
    else if (playerhand.includes(handlook.scissors) && computerhand.includes(handlook.rock))
    {
        RemovePlayerScore();
    }
    else if (playerhand.includes(handlook.scissors) && computerhand.includes(handlook.paper))
    {
        AddPlayerScore();
    }
    else if (playerhand.includes(handlook.paper) && computerhand.includes(handlook.scissors))
    {
        RemovePlayerScore();
    }
    else if (playerhand.includes(handlook.paper) && computerhand.includes(handlook.rock))
    {
        AddPlayerScore();
    }
    

    function AddPlayerScore()
    {
        gamestatus!.innerHTML = 'You Win!';
        playerscore!.innerHTML = (+playerscore!.innerHTML + 10).toString();
        (playerput as HTMLElement).style.backgroundColor = 'red';
    }
    
    function RemovePlayerScore()
    {
        gamestatus!.innerHTML = 'You Lose!';
        playerscore!.innerHTML = (+playerscore!.innerHTML - 10).toString();
        (computerput as HTMLElement).style.backgroundColor = 'red';
    }

    document.getElementById('playagain')?.removeAttribute('hidden');

    window.localStorage.setItem(PlayerName, playerscore!.innerHTML);
}

function PlayAgain()
{
    computerput!.innerHTML = '';
    document.querySelector('.hand')?.appendChild(playerput?.firstChild as HTMLElement);
    NewTurn = false;
    document.getElementById('playagain')?.setAttribute('hidden', '');

    (playerput as HTMLElement).style.backgroundColor = '#176B87';
    (computerput as HTMLElement).style.backgroundColor = '#176B87';
}

enum handlook
{
    rock = 'images/icon-rock.svg',
    paper = 'images/icon-paper.svg',
    scissors = 'images/icon-scissors.svg'
}

class Hand
{
    CreatedImage: HTMLImageElement = document.createElement('img');
    handtype: handlook = handlook.rock;

    constructor(type: handlook)
    {
        this.handtype = type;

        this.CreatedImage.src = type;

        this.CreatedImage.style.transform = 'rotate(180deg)';
    }

}

function PlayNow(input: HTMLInputElement)
{
    if (input.value.length > 0)
    {
        PlayerName = input.value;
        playerscore!.innerHTML = window.localStorage.getItem(PlayerName)!;
    }

    document.querySelector('#playernamepanel #playername')!.innerHTML = PlayerName;

    (document.querySelector('.firstpopup') as HTMLDivElement).style.display = 'none';

    (document.getElementById('classname') as HTMLAudioElement).play();
}