import "./styles.css";
import { fleetSetup } from "./fleetSetup";
import { startGame } from "./Game";

let currentMainDiv;

function gameControl(mode){
    const mainDiv=document.querySelector('.maindiv');
    let player1_ships,player2_ships;
    currentMainDiv=fleetSetup('player1',setupComplete)
    mainDiv.appendChild(currentMainDiv)
    function setupComplete(shipsPlacement,playerName){
        if(playerName=='player1'){
            player1_ships=shipsPlacement;
            if(mode=='pvp'){
                mainDiv.removeChild(currentMainDiv)
                currentMainDiv=fleetSetup('player2',setupComplete)
                mainDiv.appendChild(currentMainDiv)
            }
            else {
                mainDiv.removeChild(currentMainDiv);
                currentMainDiv=startGame(mode,player1_ships)
            }
        } 
        else{
            player2_ships=shipsPlacement;
            mainDiv.removeChild(currentMainDiv);
            currentMainDiv=startGame(mode,player1_ships,player2_ships)
        }
    } 
}

gameControl('pvp');

/*const radar=document.createElement('div');
radar.classList.add('radar');
const scanner=document.createElement('div');
scanner.classList.add('scanner')
radar.appendChild(scanner);
document.querySelector('.player2').appendChild(radar);
*/
