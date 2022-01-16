const GAME = document.getElementById('icons');
const RESET = document.getElementById('reset');
let CLONE = undefined;
let currentWins = 0;
let playerPicked = undefined;
let hosePicked = undefined;
const ICONS = {
    rock : document.getElementById('rock'),
    paper : document.getElementById('paper'),
    scissors : document.getElementById('scissors')
}

GAME.addEventListener('click', (e) => {
    if(e.target.tagName == "SPAN"){
        startGame(e);
    }
});

RESET.onclick = () => {
    for (const [key, value] of Object.entries(ICONS)) {
        value.style.display = 'inline-block';
        value.style.order = 0;
    }
    if(CLONE != undefined){
        CLONE.remove();
        CLONE = undefined;
    }
    RESET.style.display = 'none';
    housePicked.remove();
    playerPicked.remove();
    console.log('reset');
}

function startGame(e){
    const picks = [];
    picks.push(e.target.id);
    picks.push(housePick());
    showPicks(picks);
    RESET.style.display = 'inherit';
    console.log(`player picked: ${picks[0]}\nhouse picked: ${picks[1]}\n${gameResult(picks)}`);
    updateScore();
}

function showPicks(picks){
    for (const [key, value] of Object.entries(ICONS)) {
        if(!picks.includes(key))
            value.style.display = 'none';
    }
    if(picks[0] == picks[1]){
        CLONE = document.getElementById(picks[0]).cloneNode(true);
        document.getElementById('icons').appendChild(CLONE);
    }
    ICONS[picks[0]].style.order = -1;
    addPicksText(picks);
}

function housePick(){
    const iconArray = ['rock', 'paper', 'scissors'];
    return iconArray[Math.floor(Math.random() * 3)];
}

function addPicksText(picks){
    playerPicked = document.createElement("p");
    playerPicked.textContent = 'YOU PICKED:';
    playerPicked.style.marginTop = '-50px';
    playerPicked.style.color = 'white';
    housePicked = document.createElement("p");
    housePicked.textContent = 'HOUSE PICKED:';
    housePicked.style.marginTop = '-50px';
    housePicked.style.color = 'white';
    housePicked.style.float = 'right';
    ICONS[picks[0]].appendChild(playerPicked);
    if(CLONE != undefined)
        CLONE.appendChild(housePicked);
    else
        ICONS[picks[1]].appendChild(housePicked);
}

function updateScore(){
    document.getElementById('score').textContent = currentWins;
}

function gameResult(picks){
    if(picks[0] == picks[1])
        return 'Its a tie!';
    else{
        let won = false;
        switch(picks[0]){
            case 'rock':
                if(picks[1] == 'scissors')
                    won = true;
                break;
            case 'paper':
                if(picks[1] == 'rock')
                    won = true;
                break;
            case 'scissors':
                if(picks[1] == 'paper')
                    won = true;
                break;
        }
        if(won){
            currentWins++;
            return 'Player wins!';
        }
        else{
            currentWins--;
            return 'House wins!';
        }
    }
}