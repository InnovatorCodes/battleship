import "./styles.css";
import confirmsvg from "./assets/SVGs/confirm.svg";
import { fleetSetup } from "./components/fleetSetup";
import { startGame } from "./components/Game";
import { displayResultDialog, hideResultDialog } from "./components/result";

let currentMainDiv;

function gameControl(mode, player1_Name, player2_Name) {
  const mainDiv = document.querySelector(".maindiv");
  let player1_ships, player2_ships;
  currentMainDiv = fleetSetup(player1_Name, setupComplete);
  function setupComplete(shipsPlacement, playerName) {
    if (playerName == player1_Name) {
      player1_ships = shipsPlacement;
      if (mode == "pvp") {
        mainDiv.removeChild(currentMainDiv);
        currentMainDiv = fleetSetup(player2_Name, setupComplete);
      } else {
        mainDiv.removeChild(currentMainDiv);
        currentMainDiv = startGame(
          mode,
          player1_Name,
          player1_ships,
          null,
          null,
          gameOver,
        );
      }
    } else {
      player2_ships = shipsPlacement;
      mainDiv.removeChild(currentMainDiv);
      currentMainDiv = startGame(
        mode,
        player1_Name,
        player1_ships,
        player2_Name,
        player2_ships,
        gameOver,
      );
    }
  }
  function gameOver(playerName, compIsWinner) {
    currentMainDiv.classList.add("remove");
    setTimeout(() => {
      mainDiv.removeChild(currentMainDiv);
      displayResultDialog(playerName, compIsWinner, restartGame);
    });
  }
  function restartGame() {
    hideResultDialog();
    setTimeout(() => pregame(), 1000);
  }
}

function pregame() {
  let selectedMode, player1_Name;
  const mainDiv = document.querySelector(".maindiv");
  const header = document.createElement("div");
  header.classList.add("header");
  header.textContent = "BATTLESHIP";
  mainDiv.appendChild(header);
  currentMainDiv = gameMode(choiceSelected);
  function choiceSelected(choice) {
    mainDiv.removeChild(document.querySelector(".header"));
    mainDiv.removeChild(currentMainDiv);
    selectedMode = choice;
    currentMainDiv = playerNames(selectedMode, 0, nameConfirmed);
  }
  function nameConfirmed(name, playerNumber) {
    mainDiv.removeChild(currentMainDiv);
    if (selectedMode == "ai") {
      if (name == "") name = "Player 1";
      gameControl("ai", name);
    } else {
      if (playerNumber == 0) {
        player1_Name = name;
        if (player1_Name == "") player1_Name = "Player 1";
        currentMainDiv = playerNames(selectedMode, 1, nameConfirmed);
      } else {
        if (name == "") name = "Player 2";
        gameControl("pvp", player1_Name, name);
      }
    }
  }
}

function gameMode(selectCallback) {
  const modeDiv = document.createElement("div");
  modeDiv.classList.add("gamemode");
  const choices = document.createElement("div");
  const infoText = document.createElement("div");
  infoText.classList.add("infotext");
  infoText.textContent = "Choose your opponent";
  choices.classList.add("gamechoice");
  const ai = document.createElement("div");
  ai.classList.add("ai");
  const aimaintext = document.createElement("div");
  aimaintext.classList.add("maintext");
  aimaintext.textContent = "Single Player Mode";
  const aisubtext = document.createElement("div");
  aisubtext.classList.add("subtext");
  aisubtext.textContent = "User vs Computer";
  ai.append(aimaintext, aisubtext);
  ai.addEventListener("click", () => {
    selectCallback("ai");
  });
  const pvp = document.createElement("div");
  pvp.classList.add("pvp");
  const pvpmaintext = document.createElement("div");
  pvpmaintext.classList.add("maintext");
  pvpmaintext.textContent = "Multiplayer Mode";
  const pvpsubtext = document.createElement("div");
  pvpsubtext.classList.add("subtext");
  pvpsubtext.textContent = "User vs. User";
  pvp.append(pvpmaintext, pvpsubtext);
  pvp.addEventListener("click", () => selectCallback("pvp"));
  choices.append(ai, pvp);
  modeDiv.append(infoText, choices);
  document.querySelector(".maindiv").appendChild(modeDiv);
  return modeDiv;
}

function playerNames(mode, playerNumber, confirmCallback) {
  const nameDiv = document.createElement("div");
  nameDiv.classList.add("playernames");
  const infoText = document.createElement("div");
  infoText.classList.add("infotext");
  infoText.innerText = "Enter your name,\ncommander";
  const input = document.createElement("input");
  input.placeholder = `Player ${playerNumber + 1}`;
  const confirmName = document.createElement("div");
  confirmName.classList.add("confirmname");
  const confirmImg = document.createElement("img");
  confirmImg.src = confirmsvg;
  const confirmText = document.createElement("div");
  confirmText.textContent = "CONFIRM";
  confirmName.append(confirmImg, confirmText);
  confirmName.addEventListener("click", () => {
    let name = input.value.toUpperCase();
    console.log(name);
    input.textContent = "";
    confirmCallback(name, playerNumber);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      let name = input.value.toUpperCase();
      console.log(name);
      input.textContent = "";
      confirmCallback(name, playerNumber);
    }
  });
  nameDiv.append(infoText, input, confirmName);
  if (mode == "pvp") {
    const pvpPlayerNum = document.createElement("div");
    pvpPlayerNum.textContent = `Player ${playerNumber + 1}`;
    nameDiv.insertBefore(pvpPlayerNum, infoText);
    nameDiv.style.paddingTop = "1rem";
  }
  document.querySelector(".maindiv").appendChild(nameDiv);
  return nameDiv;
}

pregame();
//pregame()

/*const radar=document.createElement('div');
radar.classList.add('radar');
const scanner=document.createElement('div');
scanner.classList.add('scanner')
radar.appendChild(scanner);
document.querySelector('.player2').appendChild(radar);
*/
