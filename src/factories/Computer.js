import Player from "./Player";

export default function Computer() {
  let mustExplore = [];
  let lastdir;
  let comp = Player("player2");
  const enemyBoard = Array(10)
    .fill()
    .map(() =>
      Array(10)
        .fill()
        .map(() => 0),
    );

  const placeShips = () => {
    const board = Array(10)
      .fill()
      .map(() =>
        Array(10)
          .fill()
          .map(() => 0),
      );
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
          for (let j = 0; j < length; j++) {
            if (board[x + j][y]) {
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
          for (let j = 0; j < length; j++) {
            if (board[x][y + j]) {
              collision = true;
              break;
            }
          }
        } while (collision);
      }
      if (comp.placeShip(name, [x, y], orientation)) {
        if (orientation) for (let j = 0; j < length; j++) board[x + j][y] = 1;
        else for (let j = 0; j < length; j++) board[x][y + j] = 1;
      }
    }
  };

  function recordHit([x, y], perspective) {
    return comp.recordHit([x, y], perspective);
  }

  function launchAttack() {
    if (mustExplore.length == 0) {
      let attack;
      do {
        attack = generateRandomAttack();
      } while (!isValidPosition(attack[0], attack[1]));
      lastdir = null;
      return attack;
    } else {
      let nextAttack;
      do {
        if (mustExplore.length == 0) {
          lastdir = null;
          break;
        }
        nextAttack = mustExplore.pop();
        lastdir = nextAttack.dir;
      } while (!isValidPosition(nextAttack.pos[0], nextAttack.pos[1]));
      if (lastdir != null) return nextAttack.pos;
      else {
        let attack;
        do {
          attack = generateRandomAttack();
        } while (!isValidPosition(attack[0], attack[1]));
        lastdir = null;
        return attack;
      }
    }

    function generateRandomAttack() {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      return [x, y];
    }
  }

  const logResult = ([x, y], result) => {
    enemyBoard[x][y] = result;
    if (result == 2) {
      mustExplore = [];
    } else if (result == 1) {
      if (lastdir == null) {
        const deltas = [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ];
        for (const [dx, dy] of deltas) {
          const newRow = x + dx;
          const newCol = y + dy;
          if (isValidPosition(newRow, newCol))
            mustExplore.push(createPosition(newRow, newCol, dx, dy));
        }
      } else {
        let newX, newY;
        newX = x + lastdir[0];
        newY = y + lastdir[1];
        mustExplore.push(createPosition(newX, newY, lastdir[0], lastdir[1]));
      }
    }
  };

  function createPosition(row, col, dx, dy) {
    return {
      pos: [row, col],
      dir: [dx, dy],
    };
  }

  function isValidPosition(row, col) {
    return (
      row >= 0 && col >= 0 && row < 10 && col < 10 && enemyBoard[row][col] == 0
    );
  }
  const allShipsSunk = () => comp.allShipsSunk();
  const renderBoard = (perspective) => comp.renderBoard(perspective);
  const getFleet = () => comp.getFleet();
  const shipsLeft = () => comp.shipsLeft();
  return {
    placeShips,
    recordHit,
    launchAttack,
    logResult,
    allShipsSunk,
    renderBoard,
    getFleet,
    shipsLeft,
  };
}
