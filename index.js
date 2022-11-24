//Using DOM methods to get html elements 
const instruction = document.getElementById('instructions');        //getting button with id instructions using getElementById method 
const close = document.getElementById('manual');                    //getting the instructiion section to show when the button is clicked
//adding event handler 
instruction.addEventListener('click',() =>{
    close.style.display = 'block';          //changing display to block to show instructions. Display in the css is none
})
close.addEventListener('click',() =>{       
    close.style.display = "none";           //changing display to none to hide instruction
})