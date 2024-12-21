import allycarrier from "../assets/ally_ships/carrier.svg";
import allycruiser from "../assets/ally_ships/cruiser.svg";
import allybattleship from "../assets/ally_ships/battleship.svg";
import allysubmarine from "../assets/ally_ships/submarine.svg";
import allydestroyer from "../assets/ally_ships/destroyer.svg";
import verticalsvg from "../assets/SVGs/vertical.svg";
import horizontalsvg from "../assets/SVGs/horizontal.svg";
import confirmsvg from "../assets/SVGs/confirm.svg";
import resetsvg from "../assets/SVGs/reset.svg";
import randomizesvg from "../assets/SVGs/randomize.svg";

const shipSVGs = [
  allycarrier,
  allybattleship,
  allycruiser,
  allysubmarine,
  allydestroyer,
];
const shipNames = [
  "CARRIER",
  "BATTLESHIP",
  "CRUISER",
  "SUBMARINE",
  "DESTROYER",
];
const shipLengths = [5, 4, 3, 3, 2];

let orientation = 0,
  length;
let shipsvg;
let currentDragCells = [];
let appendedShips = [];
let shipsPlacement = [];

function clearHighlightCells() {
  currentDragCells.forEach((cell) => {
    cell.classList.remove("dragover");
    cell.classList.remove("invalid");
  });
  currentDragCells = []; // Reset the list
}

function addHighlightCells(x, y, length, orientation) {
  clearHighlightCells(); // Clear any existing highlights first

  if (orientation) {
    // Vertical placement
    let i;
    let invalid = false;
    for (i = 0; i < length; i++) {
      if (x + i < 10) {
        const cell = document.querySelectorAll(".cell")[(x + i) * 10 + y];
        if (cell) {
          cell.classList.add("dragover");
          currentDragCells.push(cell); // Track the highlighted cell
          if (cell.dataset.ship != "null") invalid = true;
        }
      } else break;
    }
    if (i < length) {
      for (let j = 0; j < i; j++)
        document
          .querySelectorAll(".cell")
          [(x + j) * 10 + y].classList.add("invalid");
    } else if (invalid) {
      for (let j = 0; j < length; j++)
        document
          .querySelectorAll(".cell")
          [(x + j) * 10 + y].classList.add("invalid");
    }
  } else {
    // Horizontal placement
    let i;
    let invalid = false;
    for (i = 0; i < length; i++) {
      if (y + i < 10) {
        const cell = document.querySelectorAll(".cell")[x * 10 + y + i];
        if (cell) {
          cell.classList.add("dragover");
          currentDragCells.push(cell); // Track the highlighted cell
          if (cell.dataset.ship != "null") invalid = true;
        }
      } else break;
    }
    if (i < length) {
      for (let j = 0; j < i; j++)
        document
          .querySelectorAll(".cell")
          [x * 10 + y + j].classList.add("invalid");
    } else if (invalid) {
      for (let j = 0; j < length; j++)
        document
          .querySelectorAll(".cell")
          [x * 10 + y + j].classList.add("invalid");
    }
  }
}

function fleetSetup(name, callback) {
  const playerDiv = document.createElement("div");
  playerDiv.classList.add("player");
  playerDiv.classList.add("setup");
  const boardInfo = document.createElement("div");
  boardInfo.classList.add("boardInfo");
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");
  const radar = document.createElement("div");
  radar.classList.add("radar");
  const scanner = document.createElement("div");
  scanner.classList.add("scanner");
  radar.appendChild(scanner);
  boardDiv.appendChild(radar);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.pos = `${i} ${j}`;
      cell.dataset.ship = null;
      cell.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
      cell.addEventListener("dragenter", (event) => {
        const dragTarget = event.target;
        if (dragTarget.classList.contains("cell")) {
          const [x, y] = dragTarget.dataset.pos.split(" ").map(Number);
          addHighlightCells(x, y, length, orientation); // Highlight the appropriate cells
        }
      });
      cell.addEventListener("drop", (event) => {
        const targetCell = event.target;
        if (targetCell.classList.contains("cell")) {
          let startCoords = targetCell.dataset.pos.split(" ").map(Number);
          let name = event.dataTransfer.getData("text");
          if (!targetCell.classList.contains("invalid")) {
            let valid = true;
            if (orientation) {
              for (let i = 0; i < length; i++) {
                if (
                  document
                    .querySelectorAll(".cell")
                    [
                      (startCoords[0] + i) * 10 + startCoords[1]
                    ].classList.contains("invalid")
                ) {
                  valid = false;
                  break;
                }
              }
            } else {
              for (let i = 0; i < length; i++) {
                if (
                  document
                    .querySelectorAll(".cell")
                    [
                      startCoords[0] * 10 + startCoords[1] + i
                    ].classList.contains("invalid")
                ) {
                  valid = false;
                  break;
                }
              }
            }
            if (valid) {
              placeShipUI(name, startCoords, orientation);
              shipsPlacement.push([name, startCoords, orientation]);
            }
          }
        }
        clearHighlightCells();
      });
      boardDiv.appendChild(cell);
    }
  }
  boardInfo.appendChild(boardDiv);
  boardDiv.addEventListener("dragleave", (event) => {
    // Check if the drag has truly left the board
    if (!boardDiv.contains(event.relatedTarget)) {
      clearHighlightCells();
      // Handle logic for leaving the board
    }
  });
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
  const playerName = document.createElement("h1");
  playerName.classList.add("playername");
  playerName.textContent = `COMMANDER ${name},`;
  const title = document.createElement("h1");
  title.classList.add("title");
  boardInfo.append(columnNames, rowNames);
  title.textContent = "DEPLOY YOUR FLEET";
  const fleet = createFleetUI();
  fleet.classList.add("fleet");
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  const confirmbtn = document.createElement("div");
  confirmbtn.classList.add("confirm");
  const confirmImg = document.createElement("img");
  confirmImg.src = confirmsvg;
  const confirmText = document.createElement("div");
  confirmText.textContent = "CONFIRM";
  confirmbtn.append(confirmImg, confirmText);
  const resetbtn = document.createElement("div");
  resetbtn.classList.add("reset");
  const resetImg = document.createElement("img");
  resetImg.src = resetsvg;
  const resetText = document.createElement("div");
  resetText.textContent = "RESET";
  resetbtn.append(resetImg, resetText);
  const randomizebtn = document.createElement("div");
  randomizebtn.classList.add("randomize");
  const randomizeImg = document.createElement("img");
  randomizeImg.src = randomizesvg;
  const randomizeText = document.createElement("div");
  randomizeText.textContent = "RANDOMIZE";
  randomizebtn.append(randomizeImg, randomizeText);
  buttons.append(randomizebtn, resetbtn, confirmbtn);

  confirmbtn.addEventListener("click", () => {
    if (shipsPlacement.length == 5) {
      callback(shipsPlacement, name);
    }
  });

  function resetFleetSetup() {
    appendedShips.forEach((shipCell) => {
      shipCell.removeChild(shipCell.firstChild);
    });
    appendedShips = [];
    const boardDiv = document.querySelector(".board");
    shipsPlacement.forEach(([name, startCoords, orientation]) => {
      let length = shipLengths[shipNames.indexOf(name.toUpperCase())];
      if (orientation)
        for (let i = 0; i < length; i++)
          boardDiv.querySelectorAll(".cell")[
            (startCoords[0] + i) * 10 + startCoords[1]
          ].dataset.ship = null;
      else
        for (let i = 0; i < length; i++)
          boardDiv.querySelectorAll(".cell")[
            startCoords[0] * 10 + startCoords[1] + i
          ].dataset.ship = null;
    });
    shipsPlacement = [];
    const oldFleet = playerDiv.querySelector(".fleet");
    const newFleet = createFleetUI();
    newFleet.classList.add("fleet");
    playerDiv.removeChild(oldFleet);
    playerDiv.insertBefore(newFleet, buttons);
  }

  resetbtn.addEventListener("click", () => {
    resetFleetSetup();
  });

  function placeShipsRandom() {
    resetFleetSetup();
    shipsPlacement = [];
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
        for (let j = 0; j < length; j++) board[x + j][y] = 1;
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
        for (let j = 0; j < length; j++) board[x][y + j] = 1;
      }
      placeShipUI(name, [x, y], orientation);
      shipsPlacement.push([name, [x, y], orientation]);
    }
  }

  randomizebtn.addEventListener("click", () => {
    placeShipsRandom();
  });

  playerDiv.append(playerName, title, boardInfo, fleet, buttons);
  playerDiv.style.animation = "fadeIn forwards 1s";
  document.querySelector(".maindiv").appendChild(playerDiv);
  return playerDiv;
}

function placeShipUI(name, startCoords, orientation) {
  setShipInfo(name);
  const boardDiv = document.querySelector(`.board`);
  const shipImg = document.createElement("img");
  shipImg.src = shipsvg;
  shipImg.classList.add("shipimg");
  shipImg.draggable = false;
  shipImg.style.width = `calc(var(--cell-size)*${length})`;
  if (name == "submarine")
    shipImg.style.width = `calc(var(--cell-size)*${length}*0.94)`;
  if (orientation) {
    shipImg.style.transform = "rotate(270deg)";
    shipImg.style.transformOrigin = `${(1 / (2 * length)) * 100}% 50%`;
    boardDiv
      .querySelectorAll(".cell")
      [
        (startCoords[0] + length - 1) * 10 + startCoords[1]
      ].appendChild(shipImg);
    appendedShips.push(
      boardDiv.querySelectorAll(".cell")[
        (startCoords[0] + length - 1) * 10 + startCoords[1]
      ],
    );
    for (let i = 0; i < length; i++)
      boardDiv.querySelectorAll(".cell")[
        (startCoords[0] + i) * 10 + startCoords[1]
      ].dataset.ship = name;
  } else {
    boardDiv
      .querySelectorAll(".cell")
      [startCoords[0] * 10 + startCoords[1]].appendChild(shipImg);
    appendedShips.push(
      boardDiv.querySelectorAll(".cell")[startCoords[0] * 10 + startCoords[1]],
    );
    for (let i = 0; i < length; i++)
      boardDiv.querySelectorAll(".cell")[
        startCoords[0] * 10 + startCoords[1] + i
      ].dataset.ship = name;
  }
  let draggableElementIndex = shipNames.indexOf(name.toUpperCase());
  const draggableElement =
    document.querySelectorAll(".shipdiv")[draggableElementIndex];
  const rect = draggableElement.getBoundingClientRect();
  draggableElement.style.width = `${rect.width}px`;
  draggableElement.style.height = `${rect.height}px`;
  while (draggableElement.hasChildNodes())
    draggableElement.removeChild(draggableElement.firstChild);
  draggableElement.draggable = false;
}

function setShipInfo(name) {
  switch (name) {
    case "carrier":
      length = 5;
      shipsvg = allycarrier;
      break;
    case "battleship":
      length = 4;
      shipsvg = allybattleship;
      break;
    case "cruiser":
      length = 3;
      shipsvg = allycruiser;
      break;
    case "submarine":
      length = 3;
      shipsvg = allysubmarine;
      break;
    case "destroyer":
      length = 2;
      shipsvg = allydestroyer;
      break;
    default:
      break;
  }
}

function createFleetUI() {
  const fleet = document.createElement("div");
  const orientationbtn = document.createElement("div");
  orientationbtn.classList.add("orientation");
  const orientationImg = document.createElement("img");
  orientationImg.src = horizontalsvg;
  const orientationName = document.createElement("div");
  orientationName.textContent = "HORIZONTAL";
  orientationbtn.append(orientationImg, orientationName);
  orientationbtn.addEventListener("click", () => {
    orientationbtn.removeChild(orientationbtn.firstChild);
    const newImg = document.createElement("img");
    if (orientationName.textContent == "VERTICAL") {
      newImg.src = horizontalsvg;
      orientationName.textContent = "HORIZONTAL";
      orientation = 0;
    } else {
      newImg.src = verticalsvg;
      orientationName.textContent = "VERTICAL";
      orientation = 1;
    }
    orientationbtn.insertBefore(newImg, orientationbtn.childNodes[0]);
  });
  fleet.appendChild(orientationbtn);
  for (let i = 0; i < 5; i++) {
    const shipDiv = document.createElement("div");
    shipDiv.draggable = true;
    shipDiv.classList.add("shipdiv");
    const shipImg = document.createElement("img");
    shipImg.classList.add("shipimg");
    const shipName = document.createElement("div");
    shipName.classList.add("shipname");
    shipImg.src = shipSVGs[i];
    shipName.textContent = shipNames[i];
    shipDiv.append(shipImg, shipName);
    shipDiv.dataset.name = shipNames[i].toLowerCase();
    shipDiv.dataset.length = shipLengths[i];
    fleet.appendChild(shipDiv);
    shipDiv.addEventListener("dragstart", (event) => {
      const draggableElement = event.target;
      const rect = draggableElement.getBoundingClientRect();
      const dragImage = draggableElement.cloneNode(true);

      // Apply the same styles to the drag image
      dragImage.style.position = "absolute";
      //dragImage.style.top = '-9999px'; // Hide it offscreen
      dragImage.style.opacity = 0.001;
      dragImage.style.width = `${rect.width}px`;
      dragImage.style.border = "2px solid white";
      dragImage.style.outline = "none";
      document.querySelector(".fleet").appendChild(dragImage);

      // Set the custom drag image
      event.dataTransfer.setDragImage(dragImage, 0.8 * rect.width, 50); // Offset for the cursor position
      event.dataTransfer.setData("text", draggableElement.dataset.name);

      length = parseInt(draggableElement.dataset.length);

      // Clean up after the drag ends
      draggableElement.addEventListener("dragend", () => {
        dragImage.remove();
      });
    });
  }
  return fleet;
}

export { fleetSetup };
