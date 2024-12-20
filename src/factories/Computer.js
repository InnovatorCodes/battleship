import Player from "./Player";

export default function Computer() {
  let comp = Player("player2");
  const enemyBoard = Array(10)
    .fill()
    .map(() =>
      Array(10)
        .fill()
        .map(() => 0),
    );

  const placeShips=()=>{
    const board = Array(10)
      .fill()
      .map(() =>
        Array(10)
          .fill()
          .map(() => 0)
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
      if(comp.placeShip(name,[x,y],orientation)){
        if(orientation) for(let j=0;j<length;j++)board[x+j][y]=1;
        else for(let j=0;j<length;j++)board[x][y+j]=1;
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
  const renderBoard=(perspective)=>comp.renderBoard(perspective)
  const getFleet=()=>comp.getFleet()
  return { placeShips, recordHit, launchAttack, logResult, allShipsSunk,renderBoard,getFleet };
}
