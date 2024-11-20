import "./styles.css";
import Player from "./factories/Player";

const player1=Player('player1');
const player2=Player('player2');

function createBoard(name){
    const playerDiv=document.createElement('div');
    playerDiv.classList.add('player');
    playerDiv.classList.add(name);
    const boardInfo=document.createElement('div');
    boardInfo.classList.add('boardInfo');
    const boardDiv=document.createElement('div');
    boardDiv.classList.add('board');
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            const cell=document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.pos=`${i},${j}`;
            cell.dataset.ship=null;
            boardDiv.appendChild(cell);
        }
    }
    boardInfo.appendChild(boardDiv);
    const columnNames=document.createElement('div');
    columnNames.classList.add('columnnames');
    for(let i=0;i<10;i++){
        const name=document.createElement('div');
        name.textContent=String.fromCharCode(i+65);
        columnNames.appendChild(name);
    }
    const rowNames=document.createElement('div');
    rowNames.classList.add('rownames');
    for(let i=0;i<10;i++){
        const name=document.createElement('div');
        name.textContent=i+1;
        rowNames.appendChild(name);
    }
    const title=document.createElement('h1');
    boardInfo.append(columnNames,rowNames);
    title.textContent=name=='player1'?'ALLY WATERS':'ENEMY WATERS';
    playerDiv.append(title,boardInfo);
    return playerDiv;
}

document.querySelector('.boards').appendChild(createBoard('player1'));
document.querySelector('.boards').appendChild(createBoard('player2'));

player1.placeShip('carrier',[5,0],1);
player1.placeShip('battleship',[6,1],1);
player1.placeShip('cruiser',[7,2],1);
player1.placeShip('submarine',[7,3],1);
player1.placeShip('destroyer',[8,4],1);

player2.placeShip('carrier',[0,0],0);
player2.placeShip('battleship',[1,0],0);
player2.placeShip('cruiser',[2,0],0);
player2.placeShip('submarine',[3,0],0);
player2.placeShip('destroyer',[4,0],0);

console.log(player1.allShipsPlaced());
console.log(player2.allShipsPlaced());

console.log(player1.allShipsSunk());
console.log(player2.allShipsSunk());

/*const radar=document.createElement('div');
radar.classList.add('radar');
const scanner=document.createElement('div');
scanner.classList.add('scanner')
radar.appendChild(scanner);
document.querySelector('.player2').appendChild(radar);
*/
        