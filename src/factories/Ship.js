export default function Ship(name,orientation,startCoords){
    let length=0;
    let hitCount=0;
    let sunk=false;
    switch (name) {
        case "carrier":
            length=5;            
            break;
        case "battleship":
            length=4;
            break;
        case "cruiser":
            length=3;
            break;
        case "submarine":
            length=3;
            break;
        case "destroyer":
            length=2;
            break;
        default:
            break;
    }

    function hit(){
        if(!sunk){
            hitCount++;
            isSunk();
        }
    }

    function isSunk(){
        if(!sunk && hitCount>=length){
            sunk=true;
            return true;
        }
        return sunk;
    }

    return {
        shipName: name,
        orientation,
        startCoords,
        isSunk,
        hit,
        hitCount: ()=>hitCount,
        getLength: ()=>length,
    };
}