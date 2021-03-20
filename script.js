const statusDisplay=document.querySelector(".game-status");
let gameActive=true;

let currentPlayer="Player1";
let gameState=["","","","","","","","",""];

document.querySelectorAll(".cell").forEach((cell)=>cell.addEventListener("click",handleCellClick));
document.querySelector(".game-restart").addEventListener("click",handleRestartGame);

const winningMessage=()=>{
    return "Congratulations! "+currentPlayer+" wins";
}

const drawMessage=()=>"Draw!";
const currentPlayerTurn=()=>`It is ${currentPlayer}'s turn`;

statusDisplay.innerHTML=currentPlayerTurn();

function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex]=currentPlayer;
    clickedCell.innerHTML=currentPlayer==="Player1"?"X":"O";
}

const winningConditions=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

function handlePlayerChange(){
    currentPlayer=currentPlayer==="Player1"?"Player2":"Player1";
    statusDisplay.innerHTML=currentPlayerTurn();
}

function handleResultValidation(){
    let roundWon=false;
    for(let i=0;i<winningConditions.length;i++){
        const condition=winningConditions[i];

        let a=gameState[condition[0]];
        let b=gameState[condition[1]];
        let c=gameState[condition[2]];

        if(a===""||b===""||c===""){
            continue;
        }
        if(a===b&&b===c){
            roundWon=true;
            break;
        }

    }

    if(roundWon){
        statusDisplay.innerHTML=winningMessage();
        gameActive=false;
        return;
    }
    let roundDraw=!gameState.includes("");

    if(roundDraw){
        statusDisplay.innerHTML=drawMessage();
        gameActive=false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent){
    const clickedCell=clickedCellEvent.target;
    const clickedCellIndex=parseInt(clickedCell.getAttribute("id"));

    if(gameState[clickedCellIndex]!=="" || !gameActive){
        return;
    }

    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(){
    gameActive=true;
    currentPlayer="Player1";
    gameState=["","","","","","","","",""];
    statusDisplay.innerHTML=currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell)=>cell.innerHTML="");
}