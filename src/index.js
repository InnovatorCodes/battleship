import allycarrier from "./assets/ally_ships/carrier2.svg"
import allycruiser from "./assets/ally_ships/cruiser.svg";
import allybattleship from "./assets/ally_ships/battleship.svg";
import allysubmarine from "./assets/ally_ships/submarine3.svg";
import allydestroyer from "./assets/ally_ships/destroyer.svg";
import "./styles.css";

function fleetSetup(){
  document.querySelector(".maindiv").appendChild(createSetupBoard());
}
const shipSVGs=[allycarrier,allybattleship,allycruiser,allysubmarine,allydestroyer];
const shipNames=["CARRIER","BATTLESHIP","CRUISER","SUBMARINE","DESTROYER"];
//let length, shipsvg;
const shipLengths=[5,4,3,3,2];

/*function setShipSVG(shipName){
  switch (shipName) {
    case "carrier":
      shipimg=carriersvg;
      break;
    case "battleship":
      shipimg=battleshipsvg;
      break;
    case "cruiser":
      shipimg=cruisersvg;
      break;
    case "submarine":
      shipimg=submarinesvg;
      break;
    case "destroyer":
      shipimg=destroyersvg;
      break;
    default:
      break;
  }
}*/

let orientation,length;
let shipsvg;
let currentDragCells = [];

function clearHighlightCells() {
  currentDragCells.forEach(cell => {
    cell.classList.remove('dragover');
    cell.classList.remove('invalid');
  });
  currentDragCells = []; // Reset the list
}

function addHighlightCells(x, y, length, orientation) {
  clearHighlightCells(); // Clear any existing highlights first

  if (orientation) { // Vertical placement
    let i;
    for (i = 0; i < length; i++) {
      if (x + i < 10) {
        const cell = document.querySelectorAll('.cell')[(x + i) * 10 + y];
        if (cell) {
          cell.classList.add('dragover');
          currentDragCells.push(cell); // Track the highlighted cell
        }
      }
      else break;
    }
    if(i<length){
      for(let j=0;j<i;j++) document.querySelectorAll('.cell')[(x + i) * 10 + y].classList.add('invalid');
    }
  } else { // Horizontal placement
    let i;
    for (i = 0; i < length; i++) {
      if (y + i < 10) {
        const cell = document.querySelectorAll('.cell')[x * 10 + y + i];
        if (cell) {
          cell.classList.add('dragover');
          currentDragCells.push(cell); // Track the highlighted cell
        }
      }
      else break
    }
    if(i<length){
      for(let j=0;j<i;j++) document.querySelectorAll('.cell')[x * 10 + y+j].classList.add('invalid');
    }
  }
}

function createSetupBoard(){
  const playerDiv = document.createElement("div");
  playerDiv.classList.add("player");
  playerDiv.classList.add("setup");
  const boardInfo = document.createElement("div");
  boardInfo.classList.add("boardInfo");
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.pos = `${i} ${j}`;
      cell.addEventListener('dragover',(event)=>{
        event.preventDefault()
      })
      cell.addEventListener('dragenter',(event)=>{
        const dragTarget = event.target;
        if (dragTarget.classList.contains('cell')) {
          const [x, y] = dragTarget.dataset.pos.split(' ').map(Number);
          addHighlightCells(x, y, length, orientation); // Highlight the appropriate cells
        }
      });
      cell.addEventListener('drop',(event)=>{
        const targetCell=event.target;
        if(targetCell.classList.contains('cell')) {
          let startCoords=targetCell.dataset.pos.split(' ').map(Number);
          if(!targetCell.classList.contains('invalid')){
            placeShipUI(event.dataTransfer.getData("text"),startCoords,orientation)
          }
        }
        clearHighlightCells();
      })
      boardDiv.appendChild(cell);
    }
    boardDiv.addEventListener('dragleave',(event)=>{
      if (!boardDiv.contains(event.relatedTarget)) {
        clearHighlightCells();
        // Handle logic for leaving the board
      }
    })
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
  const title = document.createElement("h1");
  boardInfo.append(columnNames, rowNames);
  title.textContent = "DEPLOY YOUR FLEET"
  const fleet=document.createElement('div');
  for(let i=0;i<5;i++){
    const shipDiv=document.createElement('div');
    shipDiv.draggable=true;
    shipDiv.classList.add('shipdiv');
    const shipImg=document.createElement('img');
    shipImg.classList.add('shipimg');
    const shipName=document.createElement('div');
    shipName.classList.add('shipname');
    shipImg.src=shipSVGs[i];
    shipName.textContent=shipNames[i];
    shipDiv.append(shipImg,shipName);
    shipDiv.dataset.name=shipNames[i].toLowerCase();
    shipDiv.dataset.length=shipLengths[i];
    shipDiv.dataset.orientation=0;
    fleet.appendChild(shipDiv);
    shipDiv.addEventListener('dragstart',(event)=>{
      const draggableElement=event.target;
      const rect = draggableElement.getBoundingClientRect();
      const dragImage = draggableElement.cloneNode(true);

      // Apply the same styles to the drag image
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-9999px'; // Hide it offscreen
      dragImage.style.width=`${rect.width}px`;
      document.querySelector(".fleet").appendChild(dragImage);
  
      // Set the custom drag image
      event.dataTransfer.setDragImage(dragImage, 0.8*rect.width, 50); // Offset for the cursor position
      event.dataTransfer.setData("text",draggableElement.dataset.name);

      length=parseInt(draggableElement.dataset.length);
      orientation=parseInt(draggableElement.dataset.orientation);

      // Clean up after the drag ends
      draggableElement.addEventListener('dragend', () => {
        dragImage.remove();
      });
    })
  } 
  fleet.classList.add('fleet');
  playerDiv.append(title, boardInfo,fleet);
  return playerDiv;

}

fleetSetup()

function placeShipUI(name,startCoords,orientation) {
  setShipInfo(name);
  const boardDiv = document.querySelector(`.board`);
  const shipImg = document.createElement("img");
  shipImg.src = shipsvg;
  shipImg.classList.add("shipimg");
  shipImg.style.width = `calc(var(--cell-size)*${length})`;
  if (orientation) {
    //shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]})`
            //shipImg.style.left=`calc(var(--cell-size)*${startCoords[1]-length+1})`;
    shipImg.style.transform = "rotate(270deg)";
    shipImg.style.transformOrigin = `${(1 / (2 * length)) * 100}% 50%`;
    if (name == "submarine") shipImg.style.height = `var(--cell-size)*0.8`;
    boardDiv
      .querySelectorAll(".cell")
      [
        (startCoords[0] + length - 1) * 10 + startCoords[1]
      ].appendChild(shipImg);
    //player.querySelector('.board').appendChild(shipImg);
    for (let i = 0; i < length; i++)
      boardDiv.querySelectorAll(".cell")[
        (startCoords[0] + i) * 10 + startCoords[1]
      ].dataset.ship = name;
  } else {
    //shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]})`
            //shipImg.style.left=`calc(var(--cell-size)*${startCoords[1]})`;
    //player.querySelector('.board').appendChild(shipImg);
    boardDiv.querySelectorAll(".cell")[startCoords[0] * 10 + startCoords[1]].appendChild(shipImg);
  }
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




/*const radar=document.createElement('div');
radar.classList.add('radar');
const scanner=document.createElement('div');
scanner.classList.add('scanner')
radar.appendChild(scanner);
document.querySelector('.player2').appendChild(radar);
*/
