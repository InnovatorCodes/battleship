import Player from "./Player";

export default function Computer() {
  let comp = new Player("player2");
  let board = Array(10)
    .fill()
    .map(() =>
      Array(10)
        .fill()
        .map(() => 0),
    );
  const enemyBoard = Array(10)
    .fill()
    .map(() =>
      Array(10)
        .fill()
        .map(() => 0),
    );

  function placeShips() {
    const shipNames = [
      "carrier",
      "battleship",
      "cruiser",
      "submarine",
      "destroyer",
    ];
    const shipLengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < 5; i++) {
      let orientation = Math.random() > 0.5 ? 1 : 0;
      let length = shipLengths[i];
      let name = shipNames[i];
      let x, y;
      if (orientation) {
        let collision;
        do {
          collision = false;
          x = Math.floor(Math.random() * (10 - length));
          y = Math.floor(Math.random() * 10);
          for (let i = 0; i < length; i++) {
            if (board[x + i][y]) {
              collision = true;
              break;
            }
          }
        } while (collision);
      } else {
        let collision;
        do {
          collision = false;
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * (10 - length));
          for (let i = 0; i < length; i++) {
            if (board[x][y + i]) {
              collision = true;
              break;
            }
          }
        } while (collision);
      }
      if (comp.placeShip(name, [x, y], orientation)) {
        if (orientation) for (let i = 0; i < length; i++) board[x + i][y] = 1;
        else for (let i = 0; i < length; i++) board[x][y + i] = 1;
      }
    }
  }

  function recordHit([x, y], perspective) {
    return comp.recordHit([x, y], perspective);
  }

  function launchAttack() {
    let x, y;
    let repeatedAttack;
    do {
      repeatedAttack = false;
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      if (enemyBoard[x][y] != 0) repeatedAttack = true;
    } while (repeatedAttack);
    return [x, y];
  }

  const logResult = ([x, y], result) => {
    enemyBoard[x][y] = result;
  };
  const allShipsSunk = () => comp.allShipsSunk();
  return { placeShips, recordHit, launchAttack, logResult, allShipsSunk };
}
