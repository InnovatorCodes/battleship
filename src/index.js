import "./styles.css";
import Player from "./factories/Player";
import Computer from "./factories/Computer";

//let mode='ai';

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
      cell.dataset.ship = null;
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

let player1, player2;

function battleshipAI() {
  player1 = Player("player1");
  player2 = Computer();

  document.querySelector(".boards").appendChild(createBoard("player1"));
  document.querySelector(".boards").appendChild(createBoard("player2"));

  player1.placeShip("carrier", [5, 0], 1, "player1");
  player1.placeShip("battleship", [6, 1], 1, "player1");
  player1.placeShip("cruiser", [7, 2], 1, "player1");
  player1.placeShip("submarine", [7, 3], 1, "player1");
  player1.placeShip("destroyer", [8, 4], 1, "player1");
  player2.placeShips();
}

document.addEventListener("DOMContentLoaded", () => {
  battleshipAI();
  const boardPlayer2 = document.querySelector(".player2 .board");
  boardPlayer2.addEventListener("click", handleUserClick);
});

function handleUserClick(event) {
  const boardPlayer2 = document.querySelector(".player2 .board");
  let target = event.target;
  if (target.classList.contains("cell")) {
    let x, y;
    let pos = target.dataset.pos;
    [x, y] = pos.split(" ");
    let userAttackRes = player2.recordHit(
      [parseInt(x), parseInt(y)],
      "player2",
    );
    if (player2.allShipsSunk()) {
      boardPlayer2.removeEventListener("click", handleUserClick);
      console.log("You Won");
      return;
    }
    if (userAttackRes != 0) {
      let compAttack = player2.launchAttack();
      let compAttackRes = player1.recordHit(compAttack, "player1");
      if (player1.allShipsSunk()) {
        boardPlayer2.removeEventListener("click", handleUserClick);
        console.log("Oops! Computer Won");
        return;
      }
      //if(attackResult==0) console.log([x,y],'repeat attack');
      player2.logResult(compAttack, compAttackRes);
    }
  }
}
/*const radar=document.createElement('div');
radar.classList.add('radar');
const scanner=document.createElement('div');
scanner.classList.add('scanner')
radar.appendChild(scanner);
document.querySelector('.player2').appendChild(radar);
*/
