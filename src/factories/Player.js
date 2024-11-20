import GameBoard from "./Gameboard";
import carriersvg from "./../assets/carrier_ally.svg";
import battleshipsvg from "./../assets/battleship_ally.svg";
import submarinesvg from "./../assets/submarine_ally.svg"
import destroyersvg from "./../assets/destroyer_ally.svg";
import cruisersvg from "./../assets/cruiser_ally.svg";

export default function Player(playerName){
    let gameboard=GameBoard();
    function placeShip(name,startCoords,orientation){
        let length;
        let shipsvg;
        switch (name) {
            case "carrier":
                length=5;
                shipsvg=carriersvg         
                break;
            case "battleship":
                length=4;
                shipsvg=battleshipsvg;
                break;
            case "cruiser":
                length=3;
                shipsvg=cruisersvg;
                break;
            case "submarine":
                length=3;
                shipsvg=submarinesvg;
                break;
            case "destroyer":
                length=2;
                shipsvg=destroyersvg;
                break;
            default:
                break;
        }
        if(gameboard.placeShip(name,startCoords,orientation))
            if(playerName=='player1') placeShipUI(name,length,shipsvg,startCoords,orientation);
    }

    function placeShipUI(name,length,shipsvg,startCoords,orientation){
        const player=document.querySelector(`.player1`);
            const shipImg=document.createElement('img');
            shipImg.src=shipsvg;
            shipImg.classList.add('shipimg');
            shipImg.style.width=`calc(var(--cell-size)*${length})`;
            if(orientation){
                shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]})`
                shipImg.style.left=`calc(var(--cell-size)*${startCoords[1]-length+1})`;
                shipImg.style.transform='rotate(270deg)';
                shipImg.style.transformOrigin=`${(2*length-1)/(2*length)*100}% 50%`;
                if(name=='submarine'){
                    shipImg.style.height=`var(--cell-size)*0.8`;
                    shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]+0.1})`
                } 
                player.querySelector('.board').appendChild(shipImg);
                for(let i=0;i<length;i++) player.querySelectorAll('.cell')[(startCoords[0]+i)*10+startCoords[1]].dataset.ship=name;
            } 
            else{
                shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]})`
                shipImg.style.left=`calc(var(--cell-size)*${startCoords[1]})`;
                if(name=='submarine'){
                    shipImg.style.height=`var(--cell-size)*0.8`;
                    shipImg.style.top=`calc(var(--cell-size)*${startCoords[0]+0.1})`
                } 
                player.querySelector('.board').appendChild(shipImg);
                for(let i=0;i<length;i++) player.querySelectorAll('.cell')[startCoords[0]*10+startCoords[1]+i].dataset.ship=name;
            }
    }

    function recordHit([x,y]){
        let attackResult=gameboard.receiveAttack([x,y]);
        if(attackResult==0){
            console.log('Cannot attack the same location twice');
        }
        else if(attackResult==-1){
            console.log('miss');
        }
        else console.log('hit');
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