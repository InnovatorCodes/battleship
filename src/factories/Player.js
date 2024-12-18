import GameBoard from "./Gameboard";

export default function Player() {
  let gameboard = GameBoard();
  function placeShip(name, startCoords, orientation) {
    return gameboard.placeShip(name, startCoords, orientation);
  }

  function recordHit([x, y], perspective) {
    return gameboard.receiveAttack([x, y], perspective);
  }

  const allShipsPlaced = () => gameboard.allShipsPlaced();
  const allShipsSunk = () => gameboard.allSunk();
  const renderBoard = (perspective) => gameboard.renderBoard(perspective);
  const getFleet=()=>gameboard.getFleet()
  return {
    placeShip,
    allShipsPlaced,
    allShipsSunk,
    recordHit,
    renderBoard,
    getFleet
  };
}
