import Ship from "./Ship";
import { recordHitUI, renderMap } from "../components/GameboardUI";
export default function GameBoard() {
  const board = Array(10)
    .fill()
    .map(() =>
      Array(10)
        .fill()
        .map(() => ({ ship: null, hit: false })),
    );
  const shipFleet = Array(5).fill(null);
  let sunkShips = 0,
    ship;
  function receiveAttack([x, y], perspective) {
    if (!repeatedAttack([x, y]) && allShipsPlaced()) {
      let attackResult = 0;
      if (shipPresent([x, y]) && !board[x][y].ship.isSunk()) {
        board[x][y].hit = true;
        ship = board[x][y].ship;
        ship.hit();
        attackResult = 1;
        if (ship.isSunk()) {
          sunkShips++;
          attackResult = 2;
        }
      } else {
        board[x][y].hit = true;
        attackResult = -1;
      }
      recordHitUI([x, y], attackResult, perspective, ship);
      return attackResult;
    }
    return 0;
  }
  function repeatedAttack([x, y]) {
    return board[x][y].hit;
  }
  function shipPresent([x, y]) {
    return !!board[x][y].ship;
  }
  function allShipsPlaced() {
    return shipFleet.filter((value) => value == null).length == 0;
  }

  const allSunk = () => sunkShips == 5;
  const placeShip = (name, startCoords, orientation) => {
    let shipIndex;
    switch (name) {
      case "carrier":
        shipIndex = 4;
        break;
      case "battleship":
        shipIndex = 3;
        break;
      case "cruiser":
        shipIndex = 2;
        break;
      case "submarine":
        shipIndex = 1;
        break;
      case "destroyer":
        shipIndex = 0;
        break;
      default:
        return false;
    }
    if (shipFleet[shipIndex] != null) return false;
    let newShip = new Ship(name, orientation, startCoords);
    let [x, y] = startCoords;
    if (x < 0 || y < 0 || x > 9 || y > 9) return false;
    let length = newShip.getLength();
    if (orientation == 0) {
      if (y + length - 1 > 9) return false;
      for (let i = 0; i < length; i++) {
        if (!board[x][y + i].ship) board[x][y + i].ship = newShip;
        else {
          for (let j = 0; j < i; j++) board[x][y + j].ship = null;
          return false;
        }
      }
    } else {
      if (x + length - 1 > 9) return false;
      for (let i = 0; i < length; i++) {
        if (!board[x + i][y].ship) board[x + i][y].ship = newShip;
        else {
          for (let j = 0; j < i; j++) board[x + j][y].ship = null;
          return false;
        }
      }
    }
    shipFleet[shipIndex] = newShip;
    return true;
  };

  const getFleet = () => shipFleet;
  const getShipHits = () => {
    let allShipHits = [];
    shipFleet.forEach((ship) => {
      if (ship != null) allShipHits.push(ship.hitCount());
      else allShipHits.push(null);
    });
    return allShipHits;
  };
  const getShipName = ([x, y]) => board[x][y].ship.shipName;
  const getShipOrientation = ([x, y]) => board[x][y].ship.orientation;
  const getShipStartCoords = ([x, y]) => board[x][y].ship.startCoords;
  const renderBoard = (name,perspective) => renderMap(name,perspective, shipFleet, board);
  return {
    receiveAttack,
    allSunk,
    placeShip,
    allShipsPlaced,
    getFleet,
    getShipHits,
    getShipName,
    getShipOrientation,
    getShipStartCoords,
    renderBoard,

  };
}
