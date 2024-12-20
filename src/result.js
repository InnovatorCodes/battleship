
function displayResultDialog(playerName,compWinner,restartGameCallback){
    const resDialog=document.querySelector('dialog');
    const maintext=document.createElement('div');
    maintext.classList.add('maintext');
    const subtext=document.createElement('div');
    subtext.classList.add('subtext');
    if(compWinner){ 
        maintext.textContent="The Tide Has Turned Against You!"
        subtext.innerText=`Commander ${playerName}, you have faced defeat\n but a true captain never gives up.`
        resDialog.classList.add('defeat')
    }
    else{
        maintext.textContent="No Ship Left Standing!";
        subtext.innerText=`Commander ${playerName}, you have emerged victorious\nyou are A true champion of the seas!`;
    }
    const restart=document.createElement('div');
    restart.classList.add('restart');
    restart.textContent='PLAY AGAIN'
    restart.addEventListener('click',()=>{
        restartGameCallback();
    })
    resDialog.append(maintext,subtext,restart);
    resDialog.showModal();
}

function hideResultDialog(){
    const resDialog=document.querySelector('dialog');
    resDialog.classList.add('remove');
    setTimeout(()=>{
        resDialog.close();
        document.querySelector('.maindiv').removeChild(resDialog);
    },1000);
}

export {displayResultDialog,hideResultDialog}