import GameBoard from "./Gameboard.js";

export default function Player(name) {
  let shipsAfloat = 5;
  let gameboard = GameBoard();
  function placeShip(name, startCoords, orientation) {
    return gameboard.placeShip(name, startCoords, orientation);
  }

  function recordHit([x, y], perspective) {
    let attackResult = gameboard.receiveAttack([x, y], perspective);
    if (attackResult == 2) shipsAfloat--;
    return attackResult;
  }

  const allShipsPlaced = () => gameboard.allShipsPlaced();
  const allShipsSunk = () => gameboard.allSunk();
  const renderBoard = (perspective) => gameboard.renderBoard(perspective);
  const getFleet = () => gameboard.getFleet();
  const shipsLeft = () => shipsAfloat;
  return {
    name,
    placeShip,
    allShipsPlaced,
    allShipsSunk,
    recordHit,
    renderBoard,
    getFleet,
    shipsLeft,
  };
}
