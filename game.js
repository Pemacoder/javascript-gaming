//adding event handler to window to invoke  the arrow function and declare and initialize  the variables used for the game
window.addEventListener('DOMContentLoaded',() =>{
    var backgroundMusic = new Audio("background.webm")  //using in-built Audio() method to create Audio class
    backgroundMusic.play()                                 //using in-built play() method to play audio as background music
    backgroundMusic.loop = true;                        //setting music to loop to play continuously 
    const tiles = Array.from(document.querySelectorAll('.tile'));   //getting all the element with id tile and changing it to array and store them
    const playerDisplay = document.querySelector('.display-player');
    const restartButton = document.querySelector('#reset');
    const nextBtn = document.querySelector("#next-round");
    const playBtn = document.querySelector('#play-again');          //getting HTML elements using DOM methods and storing them in a variable
    const announcer = document.querySelector('.announcer');
    const strike = document.querySelector(".strike");
    const settingBtn = document.getElementById('setting');
    const closeBtn = document.getElementById('close');
    let board = ['','','','','','','','',''];           //array representing empty game board
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],              //8 winning conditions. Numbers are the indexes of the tiles
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    var round = 1;
                            //initializing round and points variable
    var pointx = 0;
    var pointo = 0;
    //function which will verify if a round is won or it's a tie.
    function handleResultValidation(){
        let roundWon = false;
        for(var i = 0;i <= 7; i++){
            var winCondition = winningConditions[i];   //looping 8 times as there are 8 winning conditions
            const a = board[winCondition[0]];         //when i = 0  board[a,b,c,'','','','','',''], i=1 board['','','',a,b,c,'','',''], i=2 board['','','','','','',a,b,c]
            const b = board[winCondition[1]];       //i=3 board[a,'','',b,'','',c,'',''],i=4 board['',a,'','',b,'','',c,''],i=5 board['','',a,'','',b,'','',c]
            const c = board[winCondition[2]];       //i=6 board[a,'','','',b,'','','',c], i=7 board['','',a,'',b,'',c,'','']      
            if(a === '' || b === '' || c === ''){
                continue;                               //if anyone from a,b,c is equal to '', the current iteration of the loop will be skipped due to continue
            }
            if(a === b && b ===c){                      //if a,b,c are equal then,it will execute this if block
                document.getElementById('next-round').style.display = 'inline';     //displaying next button to goto next round
                roundWon = true;
                strike.style.display = "block";                     //displaying the line to strike through the winner's names
                if(i === 0){
                    strike.classList.add("strike-row1");            //row 1 will be striked or line will appear through row 1 of the game board
                }
                else if(i ===1){
                    strike.classList.add("strike-row2");            //row2 will be striked
                }
                else if(i === 2){
                    strike.classList.add("strike-row3")             //row3 will be striked
                }
                else if(i === 3){
                    strike.classList.add("strike-col1");            //column 1 wil be striked
                }
                else if(i === 4){
                    strike.classList.add("strike-col2");            //column 2 will be striked
                }
                else if(i === 5){
                    strike.classList.add("strike-col3");            //column 3 will be striked
                }
                else if(i === 6){
                    strike.classList.add("strike-diagonal1");       //the game board will be striked diagonally from top left to bottom right
                }
                else if(i ===7){
                    strike.classList.add("strike-diagonal2");       //the game board will be striked diagonally from top right to bottom left
                }
                break;
            }
        }
        if(roundWon){                                            //if roundWon is true, then announce function will be called and winner for current round will be declared
        announce(currentPlayer === 'X'? PLAYERX_WON : PLAYERO_WON);
        if(currentPlayer === 'X'){                  
            pointx = pointx + 1;
            document.getElementById("scoreX").innerHTML = pointx;
        }                                                               //points will be updated depending on the current player
        else if(currentPlayer === 'O'){
            pointo = pointo + 1;
            document.getElementById('scoreO').innerHTML = pointo;
        }
        score();                                        //score function is called
        isGameActive = false;
        return;
        }
        if(!board.includes('')){                        //if all the boxes of the game board is filled and if round is not won,then this block will be executed
            document.getElementById('next-round').style.display = 'inline';    //showing next button
            announce(TIE);                  //calling announce function
            score()                         //calling score function to check the scores
            return;
        }  
    }

                                            //this function is to announce the current round's result. The winner's name or declare as tie
    const announce = (type) => {
        switch(type){                                           
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerHTML = 'Tie';
        }
        announcer.style.display = "block";
        /* announcer.classList.remove('hide'); */
    };
    var over = new Audio('game_over.wav');     //using built-in Audio() method to create audio class and create an object containing audio
    
  
    function score(){               //this function checks for the scores of each player and game round and declares the final winner
       /*  document.querySelector(".score").style.display = "block"; */
        if(round == 2){
            if(pointx >= 2){                                                   //this block will be executed if player X wins continuously for 2 times
                celebrateVictory()                            //calling celebrateVictory function 
                document.getElementById('final-winner').innerHTML = `Player X won!`     //declaring winner's name
            }
            else if(pointo >= 2 ){                                              //this block will be executed if player O wins continuously for 2 times
                celebrateVictory()                            //calling celebrateVictory function to declare the final winner
                document.getElementById('final-winner').innerHTML = `Player O won!`   //declaring winner's name
            }
        }
        if(pointx > pointo && round == 3){                      //this block will be executed if player X wins after 3 round
                celebrateVictory()                            //calling celebrateVictory function to declare the final winner
                document.getElementById('final-winner').innerHTML = "player X won!";          //declaring winner's name
            }
        else if(pointo > pointx && round == 3){                  //this block will be executed if player O wins after 3 round
                document.getElementById('final-winner').innerHTML = "Player O won!";      //  //declaring winner's name
                celebrateVictory();                           //calling celebrateVictory function to declare the final winner
            }
        else if(pointo === pointx && round == 3){               //this block will be executed if the points for both the players are equal even after round 3
            document.getElementById('tie-round').style.display = "block";
            document.getElementById('tie-round').innerHTML = "Winner Not Decided! Play Tie Breaking Round";  //displaying message of tie
        }
        if(round == 4){                                     //tie breaking round
            if(pointx > pointo){            //if player X wins the round 4, this block will be executed
                celebrateVictory()
                document.getElementById('final-winner').innerHTML = "player X won!";
            }
            else if(pointo > pointx){          //if player O wins the round 4, this block will be executed
                document.getElementById('final-winner').innerHTML = "Player O won!";
                celebrateVictory();
            }
            else {                                  //if nobody wins the round 4 then this block will be executed 
                over.play()                             //play game over music
                restartButton.style.display = "none";
                nextBtn.style.display = "none";                 //hiding restart, next buttons and message displaying player's turn
                playerDisplay.style.display = "none";
                announcer.innerHTML = "It's a TIE!";    //announcing that it's a tie
                playBtn.style.display = "inline";
                document.querySelector('.final-winner').style.display = 'block';    //displaying final winner
                document.getElementById('final-winner').innerHTML = "No winner for this round." //message saying it's a tie
                document.querySelector('.final-winner').style.backgroundImage = "url(tie.png)";     //changing background image for the winner to tie
            }
        }
    }
    const celebrateVictory = () => {            //function to indicate or celebrate victory 
        over.play();                            //play game over audio
        setTimeout(() =>{                       //setting timeout which will delay the displaying of  winner and background image for winner by 200ms
            restartButton.style.display = "none";
            nextBtn.style.display = "none";
            playerDisplay.style.display = 'none';       //hiding buttons and turn displayer
            announcer.style.display = 'none';
            playBtn.style.display = "inline";           //displaying play again button 
            document.querySelector('.final-winner').style.display = "block";  //displaying background image
        },200)
    }
    const isValidAction = (tile) => {           // this function checks whether an action is valid or not
        if(tile.innerHTML === 'X' || tile.innerText === 'O'){
                                            //returns false if the clicked box already  contain player's name
            return false;
        }
        return true;                        //returns true if the box/board is empty
    }
    const updateBoard = (index) => {
        board[index] = currentPlayer;              // updates the boaard with the index at the tile's index
    } 
    const updateBoard1 = (index) => {
        board[index] = '';                  //clears player's name and sets empty 
    }



    const changePlayer = () => {                //changes player if this function is called
        playerDisplay.classList.remove(`player${currentPlayer}`);   //removes playerx or playero from the playerDisplay's classlist
        currentPlayer = currentPlayer ==="X"? "O": "X";                //change player to x if current player is O or vice versa
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }



    const userAction = (tile, index) => {           //checks for the user's action and many function is invoked in here
        var clickSound = new Audio ('sound.webm')       //click sound
        clickSound.play();
        if(isValidAction(tile) && isGameActive){            //checks for player's action validation 
            tile.innerText = currentPlayer;                 //if it is valid,the board is updated with the current player and shown on the page
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);             
            handleResultValidation();       //function calling
            changePlayer();
        }
        else if(isGameActive){
            tile.innerText = '';        //if action is not valid but if game is still active, then the player's name from the page is removed
            updateBoard1(index);        //function calling
            changePlayer();

        }
    }


    const resetBoard = () => {              //resets the board , resets round to 1,sets points to 0
        round = 1;
        document.getElementById('roundNo').innerHTML = round;
        clear();                //called clear() function
        pointo = 0;
        pointx = 0;
        document.getElementById("scoreX").innerHTML = 0;
        document.getElementById("scoreO").innerHTML = 0; 
    
    }
    const playAgain = () => {           //plalyAgain() function sets round to 1, hides winner announcer and tie message, changes the backgroun image of final winner
        round = 1;
        document.getElementById('roundNo').innerHTML = round;
        document.getElementById('tie-round').style.display = "none";
        announcer.style.display = "none";
        document.querySelector('.final-winner').style.backgroundImage = "url(win.jpg)";
        resetBoard();                       //resetBoard() function is called to clear the board/game box
        restartButton.style.display = "inline";
        playerDisplay.style.display = "inline";     //showing restart button and turn diplayer button
        playBtn.style.display = "none";
        document.querySelector('.final-winner').style.display ="none" // hiding final winner displayer
    }
    const gotoNextRound = () => {       //goes to next round by:
        round++;                        //increasing the round by 1
        document.getElementById('roundNo').innerHTML = round;  //displaying round 
        clear()                         //clears the board by calling clear() function 
        announcer.style.display = "none";
        nextBtn.style.display = "none";     //hiding button and message
    }
    const clear = () => {       //clear function
        board = ['','','','','','','','',''];       //set board to 9 empty array
        isGameActive =true;
        strike.style.display = "none";                 // hiding the striking line
        strike.classList.remove("strike-row1")
        strike.classList.remove("strike-row2")
        strike.classList.remove("strike-row3")
        strike.classList.remove("strike-col1")
        strike.classList.remove("strike-col2")
        strike.classList.remove("strike-col3")
        strike.classList.remove("strike-diagonal1")
        strike.classList.remove("strike-diagonal2")
        if(currentPlayer === 'O'){                  //changing player
            changePlayer();
        }                                               
        tiles.forEach(tile => {
            tile.innerText = '';                //setting each tiles text content to '' and removing playero and player x from classlist
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
    var count = 0;
    let volumeUp = document.querySelector('.volume-up');
    let  volumeMute = document.querySelector('.volume-mute');       //variable initialization for the volume up and volume mute button
    function controlBackgroundMusic(){
                                                            //function to control the background music
        if(count == 0){
            count = 1;                                  //when clicked or called the function for first time, music will be stopped
            volumeUp.style.display = 'none';
            volumeMute.style.display = 'inline'
            backgroundMusic.pause();  
        }
        else{
            count = 0;
            volumeMute.style.display = 'none';          //when clicked or called for second time , music is played
            volumeUp.style.display = 'inline';
            backgroundMusic.play();
        }
    }

    tiles.forEach( (tile, index) =>{                //adding event handler to each and every element inside tiles and calling userAction() function
        tile.addEventListener('click', () => userAction(tile, index));
    });
    restartButton.addEventListener('click',resetBoard); //event handler for the restart button and calls rsetBoard function 
    nextBtn.addEventListener('click',gotoNextRound)     //event handler for the next round button and calls gatoNextRound function
    playBtn.addEventListener('click',playAgain)         //event handler for the play Again button and calls playAgain function
    settingBtn.addEventListener('click',()=>{           //event handler for the more button and displays multiple buttons
        document.querySelector('.more').style.display = "inline";
    })
    closeBtn.addEventListener('click',()=>{
        document.querySelector('.more').style.display = 'none';     //event handler for the close button and closes the more button options
    })
    volumeUp.addEventListener('click',controlBackgroundMusic)          //event which calls  controlBackgroundMusic function
    volumeMute.addEventListener('click',controlBackgroundMusic)         //event which calls  controlBackgroundMusic function
}) 