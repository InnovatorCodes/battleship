import GameBoard from "./Gameboard";
import carriersvg from "./../assets/carrier_ally2.svg";
import battleshipsvg from "./../assets/battleship_ally.svg";
import submarinesvg from "./../assets/submarine_ally.svg"
import destroyersvg from "./../assets/destroyer_ally.svg";
import cruisersvg from "./../assets/cruiser_ally.svg";
import enemycarrier from "../assets/enemy_ships/carrier2.svg";
import enemybattleship from "../assets/enemy_ships/battleship.svg";
import enemysubmarine from "../assets/enemy_ships/submarine.svg";
import enemycruiser from "../assets/enemy_ships/cruiser.svg";
import enemydestroyer from "../assets/enemy_ships/destroyer.svg";
import miss_svg from "./../assets/miss.svg";
import hit_svg from "./../assets/hit.svg";

export default function Player(){
    let gameboard=GameBoard();
    let length,shipsvg
    function placeShip(name,startCoords,orientation,playerName){
        if(gameboard.placeShip(name,startCoords,orientation)){
            if(playerName=='player1'){
                setShipInfo(name,'ally');
                placeShipUI(name,length,shipsvg,startCoords,orientation);
            } 
            return true;
        }
        return false;  
    }

    function setShipInfo(name,type){
        switch (name) {
            case "carrier":
                length=5;
                if(type=='ally') shipsvg=carriersvg;
                else shipsvg=enemycarrier;       
                break;
            case "battleship":
                length=4;
                if(type=='ally') shipsvg=battleshipsvg;
                else shipsvg=enemybattleship;
                break;
            case "cruiser":
                length=3;
                if(type=='ally') shipsvg=cruisersvg;
                else shipsvg=enemycruiser;
                break;
            case "submarine":
                length=3;
                if(type=='ally') shipsvg=submarinesvg;
                else shipsvg=enemysubmarine;
                break;
            case "destroyer":
                length=2;
                if(type=='ally') shipsvg=destroyersvg
                else shipsvg=enemydestroyer;
                break;
            default:
                break;
        }
    }

    function placeShipUI(name,length,shipsvg,startCoords,orientation){
        const player=document.querySelector(`.player1`);
        const shipImg=document.createElement('img');
        shipImg.src=shipsvg;
        shipImg.classList.add('shipimg');
        shipImg.style.width=`calc(var(--cell-size)*${length})`;
        if(orientation){
            /*shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]})`
            shipImg.style.left=`calc(var(--cell-size)*${startCoords[1]-length+1})`;*/
            shipImg.style.transform='rotate(270deg)';
            shipImg.style.transformOrigin=`${1/(2*length)*100}% 50%`;
            if(name=='submarine') shipImg.style.height=`var(--cell-size)*0.8`;
            player.querySelectorAll('.cell')[(startCoords[0]+length-1)*10+startCoords[1]].appendChild(shipImg);
            //player.querySelector('.board').appendChild(shipImg);
            for(let i=0;i<length;i++) player.querySelectorAll('.cell')[(startCoords[0]+i)*10+startCoords[1]].dataset.ship=name;
        } 
        else{
            /*shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]})`
            shipImg.style.left=`calc(var(--cell-size)*${startCoords[1]})`;*/
            if(name=='submarine'){
                shipImg.style.height=`var(--cell-size)*0.8`;
                shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]+0.1})`
            } 
            //player.querySelector('.board').appendChild(shipImg);
            player.querySelectorAll('.cell')[startCoords[0]*10+startCoords[1]];
            for(let i=0;i<length;i++) player.querySelectorAll('.cell')[startCoords[0]*10+startCoords[1]+i].dataset.ship=name;
        }
    }

    function recordHit([x,y],playerName){
        let attackResult=gameboard.receiveAttack([x,y]);
        if(attackResult) receiveAttackUI([x,y],attackResult,playerName);
        return attackResult;
    }

    function receiveAttackUI([x,y],attackResult,playerName){
        if(attackResult==-1){
            const miss=document.createElement('img');
            miss.src=miss_svg;
            miss.classList.add('hit');
            document.querySelectorAll(`.${playerName} .cell`)[(x*10)+y].appendChild(miss);
        }
        else{
            if(attackResult==2){
                if(playerName=='player2'){
                    let shipName=gameboard.getShipName([x,y]);
                    let orientation=gameboard.getShipOrientation([x,y]);
                    let startCoords=gameboard.getShipStartCoords([x,y]);
                    setShipInfo(shipName,'enemy');
                    const enemyShip=document.createElement('img');
                    enemyShip.classList.add('shipimg');
                    enemyShip.src=shipsvg;
                    enemyShip.style.width=`calc(var(--cell-size)*${length})`;
                    enemyShip.style.animation='fadeIn 0.5s forwards';
                    if(shipName=='submarine') enemyShip.style.height=`var(--cell-size)*0.8`;
                    if(orientation){
                        enemyShip.style.transform='rotate(270deg)';
                        enemyShip.style.transformOrigin=`${1/(2*length)*100}% 50%`;
                        document.querySelectorAll('.player2 .cell')[(startCoords[0]+length-1)*10+startCoords[1]].appendChild(enemyShip);
                    }
                    else document.querySelectorAll('.player2 .cell')[(startCoords[0])*10+startCoords[1]].appendChild(enemyShip);
                }
                else{
                    let startCoords=gameboard.getShipStartCoords([x,y]);
                    let orientation=gameboard.getShipOrientation([x,y]);
                    let shipCell;
                    if(orientation) shipCell=document.querySelectorAll('.player1 .cell')[(startCoords[0]+length-1)*10+startCoords[1]];
                    else shipCell=document.querySelectorAll('.player1 .cell')[startCoords[0]*10+startCoords[1]];
                    shipCell.firstChild.style.animation='fadeOut 0.5s forwards';
                }
                
                //console.log(document.querySelectorAll('.player2 .cell'))
            }
            const hit=document.createElement('img');
            hit.src=hit_svg;
            hit.classList.add('hit');           
            document.querySelectorAll(`.${playerName} .cell`)[x*10+y].appendChild(hit);
        }
    }

    const allShipsPlaced=()=>gameboard.allShipsPlaced();
    const allShipsSunk=()=>gameboard.allSunk();
    return { 
        placeShip,
        allShipsPlaced,
        allShipsSunk,
        recordHit
    }
}