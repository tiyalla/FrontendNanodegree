// Select color input

// Select size input


// When size is submitted by the user, call makeGrid()
const submit = document.querySelector("form");
submit.addEventListener('submit', function(evt){
  evt.preventDefault();
  makeGrid();
});

function makeGrid() {
  // Your code goes here!

  //add rows and columns
  const heightInput = document.getElementById("inputHeight");
  const rows = parseInt(heightInput.value);
  const widthInput = document.getElementById("inputWidth"); 
  const columns = parseInt(widthInput.value);
  const table = document.getElementById("pixelCanvas");
  table.innerHTML='';
  
  for(let i = 0; i < rows; i++){
    const row = document.createElement("tr");
       table.appendChild(row);
    for(let j = 0; j < columns; j++){
       const column = document.createElement("td");
       row.appendChild(column);
  }
}
//Eventlistener for color
table.addEventListener('mouseup', function(evt){
  const colorInput = document.getElementById("colorPicker"); 
  const colorValue = colorInput.value;

  evt.target.style.cssText = "background-color: "+colorValue;
});
}

