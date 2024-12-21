import Player from "../factories/Player.js";
import Computer from "../factories/Computer.js";

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
  const title = document.createElement("div");
  title.classList.add("title");
  const territory = document.createElement("h1");
  const playerName = document.createElement("h1");
  playerName.classList.add("playername");
  title.append(playerName, territory);
  boardInfo.append(columnNames, rowNames);
  territory.textContent = name == "player1" ? "ALLY WATERS" : "ENEMY WATERS";
  playerDiv.append(title, boardInfo);
  return playerDiv;
}

function startGame(
  mode,
  player1_Name,
  player1_ships,
  player2_Name,
  player2_ships,
  gameOverCallback,
) {
  const battlePage = document.createElement("div");
  battlePage.classList.add("battlePage");
  const boards = document.createElement("div");
  boards.classList.add("boards");
  const result = document.createElement("dialog");
  const attackres = document.createElement("div");
  attackres.classList.add("attackres");
  battlePage.append(attackres, boards);
  if (mode == "pvp") {
    const passDevice = document.createElement("div");
    passDevice.classList.add("passdevice");
    passDevice.textContent = `PLEASE WAIT TILL THE "PASS DEVICE" SCREEN APPEARS BEFORE PASSING THE DEVICE TO YOUR OPPONENT TO AVOID SPOILERS`;
    battlePage.appendChild(passDevice);
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content");
    const maintext = document.createElement("div");
    maintext.classList.add("maintext");
    maintext.textContent = "It's Time to Switch!";
    const subtext = document.createElement("div");
    subtext.classList.add("subtext");
    subtext.textContent =
      "Pass the device to your opponent to continue the battle.";
    const changebtn = document.createElement("div");
    changebtn.classList.add("changeplayer");
    changebtn.textContent = "Done";
    changebtn.addEventListener("click", () => {
      document
        .querySelector(".player2 .board")
        .addEventListener("click", handleUserClickPVP);
      overlay.classList.add("hidden");
    });
    overlayContent.append(maintext, subtext, changebtn);
    overlay.appendChild(overlayContent);
    document.querySelector(".maindiv").appendChild(overlay);
  }
  battlePage.style.animation = "fadeIn forwards 1s";
  document.querySelector(".maindiv").append(battlePage, result);
  let player1, player2;
  let turn = 0;

  if (mode == "ai") {
    battleshipAI(player1_Name, player1_ships);
    const boardPlayer2 = document.querySelector(".player2 .board");
    boardPlayer2.addEventListener("click", handleUserClickAI);
  } else {
    battleshipPvP(player1_Name, player1_ships, player2_Name, player2_ships);
    const boardPlayer2 = document.querySelector(".player2 .board");
    boardPlayer2.addEventListener("click", handleUserClickPVP);
  }
  return battlePage;

  function battleshipAI(player1_Name, player1_ships) {
    player1 = Player(player1_Name);
    player2 = Computer();

    document.querySelector(".boards").appendChild(createBoard("player1"));
    document.querySelector(".boards").appendChild(createBoard("player2"));

    player1_ships.forEach(([name, startcoords, orientation]) =>
      player1.placeShip(name, startcoords, orientation),
    );
    player2.placeShips();
    document.querySelectorAll(".title .playername")[0].textContent =
      player1_Name;
    document.querySelectorAll(".title .playername")[1].textContent = "COMPUTER";
    player1.renderBoard("user");
    player2.renderBoard("enemy");
    document.querySelector(".attackres").textContent =
      `COMMANDER ${player1.name.toUpperCase()}, IT'S YOUR TURN. CHOOSE YOUR NEXT ATTACK`;
  }

  function handleUserClickAI(event) {
    const boardPlayer2 = document.querySelector(".player2 .board");
    let target = event.target;
    if (target.classList.contains("cell")) {
      let x, y;
      let pos = target.dataset.pos;
      [x, y] = pos.split(" ");
      const attackres = document.querySelector(".attackres");
      let userAttackRes = player2.recordHit(
        [parseInt(x), parseInt(y)],
        "enemy",
      );
      attackres.textContent = "IT'S THE COMPUTER'S TURN";
      if (userAttackRes == 2)
        attackres.textContent = `COMMANDER ${player1.name.toUpperCase()}, ${5 - player2.shipsLeft()} SHIP${5 - player2.shipsLeft() > 1 ? "S" : ""} DOWN. ${player2.shipsLeft()} TO GO`;
      boardPlayer2.removeEventListener("click", handleUserClickAI);
      if (player2.allShipsSunk()) {
        gameOverCallback(player1.name, false);
        return;
      }
      if (userAttackRes != 0) {
        setTimeout(() => {
          let compAttack = player2.launchAttack();
          let compAttackRes = player1.recordHit(compAttack, "user");
          if (player1.allShipsSunk()) {
            boardPlayer2.removeEventListener("click", handleUserClickAI);
            gameOverCallback(player1.name, true);
            return;
          }
          player2.logResult(compAttack, compAttackRes);
          boardPlayer2.addEventListener("click", handleUserClickAI);
          attackres.textContent = `COMMANDER ${player1.name.toUpperCase()}, IT'S YOUR TURN. CHOOSE YOUR NEXT ATTACK`;
        }, 2000);
      } else {
        boardPlayer2.addEventListener("click", handleUserClickAI);
        attackres.textContent = `COMMANDER ${player1.name.toUpperCase()}, YOU CANNOT ATTACK AN ALREADY ATTACKED REGION. CHOOSE A DIFFERENT ATTACK`;
      }
    }
  }

  function battleshipPvP(
    player1_Name,
    player1_ships,
    player2_Name,
    player2_ships,
  ) {
    player1 = Player(player1_Name);
    player2 = Player(player2_Name);

    boards.appendChild(createBoard("player1"));
    boards.appendChild(createBoard("player2"));

    player1_ships.forEach(([name, startcoords, orientation]) =>
      player1.placeShip(name, startcoords, orientation),
    );
    player2_ships.forEach(([name, startcoords, orientation]) =>
      player2.placeShip(name, startcoords, orientation),
    );
    document.querySelectorAll(".title .playername")[0].textContent =
      player1_Name;
    document.querySelectorAll(".title .playername")[1].textContent =
      player2_Name;
    player1.renderBoard("user");
    player2.renderBoard("enemy");
    document.querySelector(".overlay").classList.remove("hidden");
    document.querySelector(".attackres").textContent =
      `COMMANDER ${player1.name.toUpperCase()}, IT'S YOUR TURN. CHOOSE YOUR NEXT ATTACK`;
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
      if (playerAttackRes == 2)
        document.querySelector(".attackres").textContent =
          `COMMANDER ${currentOpponent.name.toUpperCase()}, ${5 - currentOpponent.shipsLeft()} SHIP${5 - currentOpponent.shipsLeft() > 1 ? "S" : ""} DOWN. ${currentOpponent.shipsLeft()} TO GO`;
      if (currentOpponent.allShipsSunk()) {
        boardPlayer2.removeEventListener("click", handleUserClickPVP);
        gameOverCallback(currentPlayer.name, false);
        return;
      }
      if (playerAttackRes != 0) {
        boardPlayer2.removeEventListener("click", handleUserClickPVP);
        setTimeout(() => {
          document.querySelector(".overlay").classList.remove("hidden");
          setTimeout(() => {
            document.querySelector(".attackres").textContent =
              `COMMANDER ${currentOpponent.name.toUpperCase()}, IT'S YOUR TURN. CHOOSE YOUR NEXT ATTACK`;
            document.querySelectorAll(".title .playername")[0].textContent =
              currentOpponent.name;
            document.querySelectorAll(".title .playername")[1].textContent =
              currentPlayer.name;
            currentOpponent.renderBoard("user");
            currentPlayer.renderBoard("enemy");
            if (turn == 0) turn++;
            else turn--;
          }, 400);
        }, 1750);
      }
    }
  }
}

export { startGame };
