import allycarrier from "../assets/ally_ships/carrier.svg";
import allybattleship from "../assets/ally_ships/battleship.svg";
import allysubmarine from "../assets/ally_ships/submarine.svg";
import allydestroyer from "../assets/ally_ships/destroyer.svg";
import allycruiser from "../assets/ally_ships/cruiser.svg";
import enemycarrier from "../assets/enemy_ships/carrier.svg";
import enemybattleship from "../assets/enemy_ships/battleship.svg";
import enemysubmarine from "../assets/enemy_ships/submarine.svg";
import enemycruiser from "../assets/enemy_ships/cruiser.svg";
import enemydestroyer from "../assets/enemy_ships/destroyer.svg";
import miss_svg from "../assets/SVGs/miss.svg";
import hit_svg from "../assets/SVGs/hit.svg";

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
  let boardName = perspective == "enemy" ? "player2" : "player1";
  if (attackResult == -1) {
    const miss = document.createElement("img");
    miss.src = miss_svg;
    miss.classList.add("hit");
    miss.draggable = false;
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
        if (ship.shipName == "submarine")
          enemyShip.style.width = `calc(var(--cell-size)*${length}*0.94)`;
        enemyShip.style.animation = "fadeIn 0.5s forwards";
        enemyShip.style.opacity = "0.3";
        enemyShip.draggable = false;
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
        shipCell.querySelector(".shipimg").style.animation =
          "fadeOut 0.5s forwards";
      }
    }
    const hit = document.createElement("img");
    hit.src = hit_svg;
    hit.classList.add("hit");
    hit.draggable = false;
    document
      .querySelectorAll(`.${boardName} .cell`)
      [x * 10 + y].appendChild(hit);
  }
}

function renderMap(perspective, shipFleet, board) {
  function appendShip(ship, sunk, boardName) {
    const shipImg = document.createElement("img");
    shipImg.src = shipsvg;
    shipImg.classList.add("shipimg");
    shipImg.style.width = `calc(var(--cell-size)*${length})`;
    shipImg.draggable = false;
    if (sunk) shipImg.style.animation = "fadeOut 0.5s forwards";
    if (ship.orientation) {
      shipImg.style.transform = "rotate(270deg)";
      shipImg.style.transformOrigin = `${(1 / (2 * length)) * 100}% 50%`;
      if (ship.shipName == "submarine")
        shipImg.style.width = `calc(var(--cell-size)*${length}*0.94)`;
      document
        .querySelectorAll(`.${boardName} .cell`)
        [
          (ship.startCoords[0] + length - 1) * 10 + ship.startCoords[1]
        ].appendChild(shipImg);
    } else {
      if (ship.shipName == "submarine")
        shipImg.style.width = `calc(var(--cell-size)*${length}*0.94)`;
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
      appendShip(ship, ship.isSunk(), "player1");
    });
  } else {
    removeChildNodes("player2");
    shipFleet.forEach((ship) => {
      if (ship.isSunk()) {
        setShipInfo(ship.shipName, "enemy");
        appendShip(ship, ship.isSunk(), "player2");
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
          hit.draggable = false;
          document
            .querySelectorAll(`.${boardName} .cell`)
            [x * 10 + y].appendChild(hit);
        } else {
          const miss = document.createElement("img");
          miss.src = miss_svg;
          miss.classList.add("hit");
          miss.draggable = false;
          document
            .querySelectorAll(`.${boardName} .cell`)
            [x * 10 + y].appendChild(miss);
        }
      }
    });
  });
}

export { recordHitUI, renderMap };
