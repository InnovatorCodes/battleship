import allycarrier from "./../assets/ally_ships/carrier2.svg";
import allybattleship from "./../assets/ally_ships/battleship.svg";
import allysubmarine from "./../assets/ally_ships/submarine.svg";
import allydestroyer from "./../assets/ally_ships/destroyer.svg";
import allycruiser from "./../assets/ally_ships/cruiser.svg";
import enemycarrier from "../assets/enemy_ships/carrier2.svg";
import enemybattleship from "../assets/enemy_ships/battleship.svg";
import enemysubmarine from "../assets/enemy_ships/submarine.svg";
import enemycruiser from "../assets/enemy_ships/cruiser.svg";
import enemydestroyer from "../assets/enemy_ships/destroyer.svg";
import miss_svg from "./../assets/miss.svg";
import hit_svg from "./../assets/hit.svg";

let length, shipsvg;
function setShipInfo(name, type) {
  switch (name) {
    case "carrier":
      length = 5;
      if (type == "ally") shipsvg = allycarrier;
      else shipsvg = enemycarrier;
      break;
    case "battleship":
      length = 4;
      if (type == "ally") shipsvg = allybattleship;
      else shipsvg = enemybattleship;
      break;
    case "cruiser":
      length = 3;
      if (type == "ally") shipsvg = allycruiser;
      else shipsvg = enemycruiser;
      break;
    case "submarine":
      length = 3;
      if (type == "ally") shipsvg = allysubmarine;
      else shipsvg = enemysubmarine;
      break;
    case "destroyer":
      length = 2;
      if (type == "ally") shipsvg = allydestroyer;
      else shipsvg = enemydestroyer;
      break;
    default:
      break;
  }
}

function recordHitUI([x, y], attackResult, perspective, ship) {
  console.log(attackResult);
  let boardName = perspective == "enemy" ? "player2" : "player1";
  if (attackResult == -1) {
    const miss = document.createElement("img");
    miss.src = miss_svg;
    miss.classList.add("hit");
    document
      .querySelectorAll(`.${boardName} .cell`)
      [x * 10 + y].appendChild(miss);
  } else {
    if (attackResult == 2) {
      let shipName = ship.shipName;
      let orientation = ship.orientation;
      let startCoords = ship.startCoords;
      setShipInfo(shipName, "enemy");
      if (boardName == "player2") {
        const enemyShip = document.createElement("img");
        enemyShip.classList.add("shipimg");
        enemyShip.src = shipsvg;
        enemyShip.style.width = `calc(var(--cell-size)*${length})`;
        enemyShip.style.animation = "fadeIn 0.5s forwards";
        if (shipName == "submarine")
          enemyShip.style.height = `var(--cell-size)*0.8`;
        if (orientation) {
          enemyShip.style.transform = "rotate(270deg)";
          enemyShip.style.transformOrigin = `${(1 / (2 * length)) * 100}% 50%`;
          document
            .querySelectorAll(".player2 .cell")
            [
              (startCoords[0] + length - 1) * 10 + startCoords[1]
            ].appendChild(enemyShip);
        } else
          document
            .querySelectorAll(".player2 .cell")
            [startCoords[0] * 10 + startCoords[1]].appendChild(enemyShip);
      } else {
        let shipCell;
        if (orientation)
          shipCell =
            document.querySelectorAll(".player1 .cell")[
              (startCoords[0] + length - 1) * 10 + startCoords[1]
            ];
        else
          shipCell =
            document.querySelectorAll(".player1 .cell")[
              startCoords[0] * 10 + startCoords[1]
            ];
        //console.log(startCoords,shipCell);
        shipCell.querySelector(".shipimg").style.animation =
          "fadeOut 0.5s forwards";
      }
      //console.log(document.querySelectorAll('.player2 .cell'))
    }
    const hit = document.createElement("img");
    hit.src = hit_svg;
    hit.classList.add("hit");
    document
      .querySelectorAll(`.${boardName} .cell`)
      [x * 10 + y].appendChild(hit);
  }
}

function renderMap(perspective, shipFleet, board) {
  function appendShip(ship, boardName) {
    const shipImg = document.createElement("img");
    shipImg.src = shipsvg;
    shipImg.classList.add("shipimg");
    shipImg.style.width = `calc(var(--cell-size)*${length})`;
    if (perspective == "enemy")
      shipImg.style.animation = "fadeOut 0.5s forwards";
    if (ship.orientation) {
      shipImg.style.transform = "rotate(270deg)";
      shipImg.style.transformOrigin = `${(1 / (2 * length)) * 100}% 50%`;
      if (ship.shipName == "submarine")
        shipImg.style.height = `var(--cell-size)*0.8`;
      document
        .querySelectorAll(`.${boardName} .cell`)
        [
          (ship.startCoords[0] + length - 1) * 10 + ship.startCoords[1]
        ].appendChild(shipImg);
    } else {
      if (ship.shipName == "submarine") {
        shipImg.style.height = `var(--cell-size)*0.8`;
        shipImg.style.top = `calc(var(--cell-size)*${ship.startCoords[0] + 0.1})`;
      }
      document
        .querySelectorAll(`.${boardName} .cell`)
        [ship.startCoords[0] * 10 + ship.startCoords[1]].appendChild(shipImg);
    }
  }

  function removeChildNodes(boardName) {
    document.querySelectorAll(`.${boardName} .cell`).forEach((cell) => {
      if (cell.hasChildNodes()) {
        while (cell.hasChildNodes()) cell.removeChild(cell.firstChild);
      }
    });
  }

  let boardName = perspective == "user" ? "player1" : "player2";
  if (boardName == "player1") {
    removeChildNodes("player1");
    shipFleet.forEach((ship) => {
      setShipInfo(ship.shipName, "ally");
      appendShip(ship, "player1");
    });
  } else {
    removeChildNodes("player2");
    shipFleet.forEach((ship) => {
      if (ship.isSunk()) {
        setShipInfo(ship.shipName, "enemy");
        appendShip(ship, "player2");
      }
    });
  }
  board.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell.hit) {
        if (!(cell.ship == null)) {
          const hit = document.createElement("img");
          hit.src = hit_svg;
          hit.classList.add("hit");
          document
            .querySelectorAll(`.${boardName} .cell`)
            [x * 10 + y].appendChild(hit);
        } else {
          const miss = document.createElement("img");
          miss.src = miss_svg;
          miss.classList.add("hit");
          document
            .querySelectorAll(`.${boardName} .cell`)
            [x * 10 + y].appendChild(miss);
        }
      }
    });
  });
}

function placeShipUI(ship) {
  let name = ship.shipName;
  let startCoords = ship.startCoords;
  let orientation = ship.orientation;
  setShipInfo(name, "ally");
  const player = document.querySelector(`.player1`);
  const shipImg = document.createElement("img");
  shipImg.src = shipsvg;
  shipImg.classList.add("shipimg");
  shipImg.style.width = `calc(var(--cell-size)*${length})`;
  if (orientation) {
    /*shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]})`
            shipImg.style.left=`calc(var(--cell-size)*${startCoords[1]-length+1})`;*/
    shipImg.style.transform = "rotate(270deg)";
    shipImg.style.transformOrigin = `${(1 / (2 * length)) * 100}% 50%`;
    if (name == "submarine") shipImg.style.height = `var(--cell-size)*0.8`;
    player
      .querySelectorAll(".cell")
      [
        (startCoords[0] + length - 1) * 10 + startCoords[1]
      ].appendChild(shipImg);
    //player.querySelector('.board').appendChild(shipImg);
    for (let i = 0; i < length; i++)
      player.querySelectorAll(".cell")[
        (startCoords[0] + i) * 10 + startCoords[1]
      ].dataset.ship = name;
  } else {
    /*shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]})`
            shipImg.style.left=`calc(var(--cell-size)*${startCoords[1]})`;*/
    if (name == "submarine") {
      shipImg.style.height = `var(--cell-size)*0.8`;
      shipImg.style.top = `calc(var(--cell-size)*${startCoords[0] + 0.1})`;
    }
    //player.querySelector('.board').appendChild(shipImg);
    player.querySelectorAll(".cell")[startCoords[0] * 10 + startCoords[1]];
    for (let i = 0; i < length; i++)
      player.querySelectorAll(".cell")[
        startCoords[0] * 10 + startCoords[1] + i
      ].dataset.ship = name;
  }
}

export { recordHitUI, renderMap, placeShipUI };
