const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

let user;
let computer;
let turn = 0;
let boardStatus = Array(9).fill('E');  // Empty

const changeMsg = (msg) => {
    document.querySelector('h1').textContent = msg;
}

startGame();

function startGame() {
    turn = 0;
    boardStatus = Array(9).fill('E');; 

    changeMsg('Choose your team:');
    document.querySelector('#xBtn').style.display = 'inline';
    document.querySelector('#oBtn').style.display = 'inline';
    document.querySelector('#or').style.display = 'inline';
    document.querySelector('footer').style.display = 'none';


    document.querySelector('#level').style.display = 'flex';


    document.querySelector('#board').style.display = 'none';

    for (let i=0; i<9; i++) {
        document.querySelector('#sq'+i.toString()).style.display = 'none';
        document.querySelector('#sq'+i.toString()).textContent = '';
        document.querySelector('#sq'+i.toString()).style.backgroundColor = 'white';
    }

    document.querySelector("#restartBtn").style.display = 'none';
}

function onXClick() {
    user = 'X';
    computer = 'O';
    loadBoard();
}

function onOClick() {
    user = 'O';
    computer = 'X';
    loadBoard();
}

function compPlayEasy() {
    let compSq;
    do {
        compSq = Math.floor(Math.random()*9);
        if (document.querySelector('#sq'+compSq.toString()).textContent == ''){
            break;
        }
    } while (true);
    return compSq;  
}

function compPlayHard() {

    // IF THERE IS AN OPPORTUNITY TO WIN, GO FOR IT
    // CHECK HORIZONTALS
    let boardStr = boardStatus.map( el=> { return el===computer ? '*' : el}).join('');
    switch (boardStr.slice(0,3)){
        case 'E**':
            return 0;
        case '*E*':
            return 1;
        case '**E':
            return 2;
        }
    switch (boardStr.slice(3,6)){
        case 'E**':
            return 3;
        case '*E*':
            return 4;
        case '**E':
            return 5;
        }
    switch (boardStr.slice(6,9)){
        case 'E**':
            return 6;
        case '*E*':
            return 7;
        case '**E':
            return 8;
        }
    boardStr = ([boardStatus[0], boardStatus[3] , boardStatus[6] , boardStatus[1] , boardStatus[4] , 
               boardStatus[7] , boardStatus[2] , boardStatus[5] , boardStatus[8]])
                .map( el=> { return el===computer ? '*' : el}).join('');
    // CHECK VERTICALS
    switch (boardStr.slice(0,3)){
        case 'E**':
            return 0;
        case '*E*':
            return 3;
        case '**E':
            return 6;
        }
    switch (boardStr.slice(3,6)){
        case 'E**':
            return 1;
        case '*E*':
            return 4;
        case '**E':
            return 7;
        }
    switch (boardStr.slice(6,9)){
        case 'E**':
            return 2;
        case '*E*':
            return 5;
        case '**E':
            return 8;
        }
    // CHECK DIAGONALS
    boardStr = ([boardStatus[0] , boardStatus[4] , boardStatus[8]]) 
                .map( el=> { return el===computer ? '*' : el}).join('');
    switch (boardStr.slice(0,3)){
        case 'E**':
            return 0;
        case '*E*':
            return 4;
        case '**E':
            return 8;
        }
    boardStr = ([boardStatus[2] , boardStatus[4] , boardStatus[6]]) 
                .map( el=> { return el===computer ? '*' : el}).join('');
    switch (boardStr.slice(0,3)){
        case 'E**':
            return 2;
        case '*E*':
            return 4;
        case '**E':
            return 6;
        }
    // IF THERE IS A RISK OF THE USER WIN FILL IT UP BEFORE
    boardStr = boardStatus.map( el=> { return el===user ? '#' : el}).join('');
    // CHECK HORIZONTALS

    switch (boardStr.slice(0,3)){
        case 'E##':
            return 0;
        case '#E#':
            return 1;
        case '##E':
            return 2;
        }
    switch (boardStr.slice(3,6)){
        case 'E##':
            return 3;
        case '#E#':
            return 4;
        case '##E':
            return 5;
        }
    switch (boardStr.slice(6,9)){
        case 'E##':
            return 6;
        case '#E#':
            return 7;
        case '##E':
            return 8;
        }
    boardStr = ([boardStatus[0] , boardStatus[3] , boardStatus[6] , boardStatus[1] , boardStatus[4] , 
               boardStatus[7] , boardStatus[2] , boardStatus[5] , boardStatus[8]])
                .map( el=> { return el===user ? '#' : el}).join('');
        // CHECK VERTICALS
    switch (boardStr.slice(0,3)){
        case 'E##':
            return 0;
        case '#E#':
            return 3;
        case '##E':
            return 6;
        }
    switch (boardStr.slice(3,6)){
        case 'E##':
            return 1;
        case '#E#':
            return 4;
        case '##E':
            return 7;
        }
    switch (boardStr.slice(6,9)){
        case 'E##':
            return 2;
        case '#E#':
            return 5;
        case '##E':
            return 8;
        }
    // CHECK DIAGONALS
    boardStr = ([boardStatus[0] , boardStatus[4] , boardStatus[8]])
                .map( el=> { return el===user ? '#' : el}).join('');
    switch (boardStr.slice(0,3)){
        case 'E##':
            return 0;
        case '#E#':
            return 4;
        case '##E':
            return 8;
        }
    boardStr = ([boardStatus[2] , boardStatus[4] , boardStatus[6]])
                .map( el=> { return el===user ? '#' : el}).join('');
    switch (boardStr.slice(0,3)){
        case 'E##':
            return 2;
        case '#E#':
            return 4;
        case '##E':
            return 6;
        }
    if (boardStatus[4] == 'E')
        return 4;
    // IF THE USER IS IN TWO OPPOSITE CORNERS GO TO AN ADJACENT SQUARE
    if (boardStatus[0] == user && boardStatus[8] == user) {
        if (boardStatus[1] == 'E')
            return 1;
        else if (boardStatus[3] == 'E')
            return 3;
        else if (boardStatus[5] == 'E')
            return 5;
        else if (boardStatus[7] == 'E')
            return 7;
    }
    else if (boardStatus[2] == user && boardStatus[6] == user) {
        if (boardStatus[1] == 'E')
            return 1;
        else if (boardStatus[5] == 'E')
            return 5;
        else if (boardStatus[3] == 'E')
            return 3;
        else if (boardStatus[7] == 'E')
            return 7;
    }
    // IF THE USER GOES TO A CORNER COVER THE OPPOSITE ELSE TRY THE MIDDLE SQUARE
    if (boardStatus[0] == user && boardStatus[8] == 'E')
        return 8;
    else if (boardStatus[8] == user && boardStatus[0] == 'E')
        return 0;
    else if (boardStatus[2] == user && boardStatus[6] == 'E')
        return 6;
    else if (boardStatus[6] == user && boardStatus[2] == 'E')
        return 2;

    // NO RISKS OR OPPORTUNITIES, TRY THE CORNERS
    if (boardStatus[0] == 'E')
        return 0;
    else if (boardStatus[2] == 'E')
        return 2;
    else if (boardStatus[2] == 'E')
        return 6;
    else if (boardStatus[2] == 'E')
        return 8;

    // NO CORNERS, GO FOR RANDOM
    return compPlayEasy() 

    }

function loadBoard() {
    document.querySelector('#xBtn').style.display = 'none';
    document.querySelector('#oBtn').style.display = 'none';
    document.querySelector('#or').style.display = 'none';
    document.querySelector('footer').style.display = 'flex';

    document.querySelector('#level').style.display = 'none';

    document.querySelector('#board').style.display = 'grid';

    for (let i=0; i<9; i++) {
        document.querySelector('#sq'+i.toString()).style.display = 'flex';
    }

    document.querySelector("#restartBtn").style.display = 'flex';

    for (let i=0; i<9; i++) {
        document.querySelector('#sq'+i.toString()).addEventListener('click',onSqClick);
    }

    changeMsg('You Play now...');
}

function onEasyClick(){
    document.querySelector('#easyRadio').checked = true;
}


function onHardClick(){
    document.querySelector('#hardRadio').checked = true;
}

function onSqClick(evt) {
    if (evt.target.textContent !== '')
        return;
    let txt;
    if (turn%2 == 0) { // user
        txt = document.createTextNode(user);
        evt.target.appendChild(txt);
        boardStatus[Number(evt.target.id.slice(-1))] = user;
        turn++;
    }
    console.log(boardStatus);

    let isWin = checkWin(user);
    if (isWin !== -1) {
        console.log(winCombos[isWin]);
        winCombos[isWin].forEach(elem => {
            document.querySelector('#sq'+elem.toString()).style.backgroundColor = 'yellow';
        })
        changeMsg('You Won!!!');

        return;
    }

    if (checkTie()) {
        changeMsg('Tie Game!!!!');
        return;

    }

    let compSq;

    if (document.querySelector('#easyRadio').checked)
        compSq = compPlayEasy();
    else
        compSq =  compPlayHard();

    txt = document.createTextNode(computer);
    document.querySelector('#sq'+compSq.toString()).appendChild(txt);

    
    boardStatus[compSq] = computer;
    turn++;

    isWin = checkWin(computer);
    if ( isWin !== -1) {
        console.log(winCombos[isWin]);
        winCombos[isWin].forEach(elem => {
            document.querySelector('#sq'+elem.toString()).style.backgroundColor = 'yellow';
        })
        document.querySelector('h1').textContent = 'Computer Won!!!'
        return;
    }
    if (checkTie()) {
        changeMsg('Tie Game!!!!');
        return;

    }

}

function checkWin(symbol) {
    for (let i = 0; i < winCombos.length; i++) {
        let winCombo = winCombos[i];
        let win = winCombo.reduce((acc, val) => acc && (boardStatus[val] === symbol), true);
        if (win) {
            return i;
        }
    }
    return -1;
  };


  function checkTie() {
    let tie=true;
    boardStatus.forEach( elem => {
        if (elem == 'E')
            tie = false;
    });
    return tie;
  }

  function onRestartClick() {
    startGame();
  }