import Player from "./factories/Player";
import Computer from "./factories/Computer";

function createBoard(name) {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");
    playerDiv.classList.add(name);
    const boardInfo = document.createElement("div");
    boardInfo.classList.add("boardInfo");
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.pos = `${i} ${j}`;
        boardDiv.appendChild(cell);
      }
    }
    boardInfo.appendChild(boardDiv);
    const columnNames = document.createElement("div");
    columnNames.classList.add("columnnames");
    for (let i = 0; i < 10; i++) {
      const name = document.createElement("div");
      name.textContent = String.fromCharCode(i + 65);
      columnNames.appendChild(name);
    }
    const rowNames = document.createElement("div");
    rowNames.classList.add("rownames");
    for (let i = 0; i < 10; i++) {
      const name = document.createElement("div");
      name.textContent = i + 1;
      rowNames.appendChild(name);
    }
    const title = document.createElement("h1");
    boardInfo.append(columnNames, rowNames);
    title.textContent = name == "player1" ? "ALLY WATERS" : "ENEMY WATERS";
    playerDiv.append(title, boardInfo);
    return playerDiv;
  }
 
function startGame(mode,player1_Name,player1_ships,player2_Name,player2_ships,gameOverCallback){
  const battlePage=document.createElement('div');
  battlePage.classList.add('battlePage');
  const boards=document.createElement("div");
  boards.classList.add('boards');
  const result=document.createElement('dialog');
  battlePage.appendChild(boards);
  battlePage.style.animation="fadeIn forwards 1s"
  document.querySelector('.maindiv').append(battlePage,result)
  let player1, player2;
  let turn = 0;

  if (mode == "ai") {
    battleshipAI(player1_Name,player1_ships);
    const boardPlayer2 = document.querySelector(".player2 .board");
    boardPlayer2.addEventListener("click", handleUserClickAI);
  } else {
    battleshipPvP(player1_Name,player1_ships,player2_Name,player2_ships);
    const boardPlayer2 = document.querySelector(".player2 .board");
    boardPlayer2.addEventListener("click", handleUserClickPVP);
  }
  return battlePage

  function battleshipAI(player1_Name,player1_ships) {
    player1 = Player(player1_Name);
    player2 = Computer();
  
    document.querySelector('.boards').appendChild(createBoard("player1"));
    document.querySelector('.boards').appendChild(createBoard("player2"));
  
    player1_ships.forEach(([name,startcoords,orientation])=>player1.placeShip(name,startcoords,orientation))
    player2.placeShips();
    console.log(player2.getFleet());
    player1.renderBoard('user');
    player2.renderBoard('enemy');
    gameOverCallback(player1.name,false)
  }

  
  function handleUserClickAI(event) {
    //gameOverCallback('player1',false)
    const boardPlayer2 = document.querySelector(".player2 .board");
    let target = event.target;
    if (target.classList.contains("cell")) {
      let x, y;
      let pos = target.dataset.pos;
      [x, y] = pos.split(" ");
      let userAttackRes = player2.recordHit([parseInt(x), parseInt(y)], "enemy");
      if (player2.allShipsSunk()) {
        boardPlayer2.removeEventListener("click", handleUserClickAI);
        gameOverCallback(player1.name,false)
        return;
      }
      if (userAttackRes != 0) {
        let compAttack = player2.launchAttack();
        let compAttackRes = player1.recordHit(compAttack, "user");
        if (player1.allShipsSunk()) {
          boardPlayer2.removeEventListener("click", handleUserClickAI);
          gameOverCallback(player1.name,true);
          return;
        }
        //if(attackResult==0) console.log([x,y],'repeat attack');
        player2.logResult(compAttack, compAttackRes);
      }
    }
  }
  
  function battleshipPvP(player1_Name,player1_ships,player2_Name,player2_ships) {
    player1 = Player(player1_Name);
    player2 = Player(player2_Name);
  
    boards.appendChild(createBoard("player1"));
    boards.appendChild(createBoard("player2"));
  
    player1_ships.forEach(([name,startcoords,orientation])=>player1.placeShip(name,startcoords,orientation))
    player2_ships.forEach(([name,startcoords,orientation])=>player2.placeShip(name,startcoords,orientation))
    player1.renderBoard('user');
    player2.renderBoard('enemy');
  }
  
  function handleUserClickPVP(event) {
    const boardPlayer2 = document.querySelector(".player2 .board");
    let target = event.target;
    let currentPlayer, currentOpponent;
    if (turn == 0) {
      currentPlayer = player1;
      currentOpponent = player2;
    } else {
      currentPlayer = player2;
      currentOpponent = player1;
    }
    if (target.classList.contains("cell")) {
      let x, y;
      let pos = target.dataset.pos;
      [x, y] = pos.split(" ");
      let playerAttackRes;
      playerAttackRes = currentOpponent.recordHit(
        [parseInt(x), parseInt(y)],
        "enemy",
      );
      if (currentOpponent.allShipsSunk()) {
        boardPlayer2.removeEventListener("click", handleUserClickPVP);
        gameOverCallback(currentPlayer.name,false)
        return;
      }
      if (playerAttackRes != 0) {
        currentOpponent.renderBoard("user");
        currentPlayer.renderBoard("enemy");
        if (turn == 0) turn++;
        else turn--;
      }
    }
  }
}

export {startGame}