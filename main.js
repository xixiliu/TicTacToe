// Write the title of the game
// you need this comment!
// GIT FLYBY MUST HAVE THIS
document.write("<h2>Kat's Tic Tac Toe Game!</h2>");

// variables that will be used to create the playing space
var canvas = document.createElement('canvas'),
	height = 600,
	width = 600,
	context = canvas.getContext('2d'),
	grid;
canvas.height = height;
canvas.width = width;

// have our playing space underneath our title
canvas.style.cssText = "display: block";


// use a 2D array to keep track of what player played what square (0 = blank, 1 = X, 2 = 0)
// each list represents one column
var spaces = [[0,0,0],[0,0,0],[0,0,0]];

// keep track of who is playing
var player1 = true;
// keep track of how many turns have happened
var turns = 0;

// add the canvas element to the document
window.onload = function() {
  document.body.appendChild(canvas);
};

// we will use this function to instatnize our grid
function Grid(width, height){
	this.width = width;
	this.height = height;
}

// this is the function to draw the lines on our canvas and create a grid
Grid.prototype.render = function() {
  context.fillStyle = "#e74c3c";
  context.fillRect(this.width/3, 0, 10, this.height);
  context.fillRect(this.width/3*2, 0, 10, this.height);
  context.fillRect(0, this.height/3, this.width, 10);
  context.fillRect(0, this.height/3*2, this.width, 10)
};

// create a grid
grid = new Grid(width, height);

// function used to create our playing space and the grid
var render = function() {
  // define the color of our playing space
  context.fillStyle = "#3498db";
  // draw our playing space
  context.fillRect(0, 0, width, height);
  // call the Grid object's render method which will draw the grid lines
  grid.render();
};

// call the render function
render();

// call the drawX function if someone clicks on the canvas
canvas.addEventListener("click", drawX, false);

// draw an X or O in the appropriate square
function drawX(event)
{
  // x and y are defined based on the mouse position at the time of the click event
  var x = event.x;
  var y = event.y;

  // redefine x and y relative to the canvas
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  // determine which row and column the user clicked
  var col = Math.floor(x/200);
  var row = Math.floor(y/200);
  // define the color of our X or O
  context.fillStyle = "#c0392b";
  // draw a X or O
  context.beginPath();
  context.font="200px Helvetica";
  if(spaces[col][row]==0){
	  if(player1){
	  	context.fillText("X",col*200+25,row*200+175);
	  }else {
		context.fillText("O",col*200+25,row*200+175);	
	  }
  } else {
  	alert("Someone already played there!")
  }

  // updates our spaces array to keep track of who played where
  if(player1){
  	spaces[col][row] = 1;
  } else {
  	spaces[col][row] = 2;
  }
  // call the checkForWinner function
  checkForWinner(player1);
  // switch who is the active player
  player1 = !player1;
}

function checkForWinner(player) {
	// increment the number of turns taken place in the game
	turns += 1;
	// define our winner variable which we will default to false
	var winner = false;
	// iterate through our rows and columns to see if someone got three in a row
	for(var i=0; i<spaces.length; i++){
		// each list in spaces is a column so spaces[i] is the ith column
		// so we iterate through the ith column and compare one square to the next, the
		// reduce function will provide us with a single final value (either 0, 1, 2 or false)
		var col = spaces[i].reduce(function(a, b){return (a === b)?a:false});
		// we can create a list of the rows and use the same function as we did for the columns
		var row = [spaces[0][i],spaces[1][i],spaces[2][i]].reduce(function(a, b){return (a === b)?a:false});
		if(col == 1 || col == 2) {
			winner = true;
			break;
		} else if(row == 1 || row == 2){
			winner = true;
			break;
		}
	}
	// these two if statements check for a winner on the diagonal 
	if(spaces[0][0] == spaces[1][1] && spaces[1][1] == spaces[2][2] && spaces[0][0] != 0){
		winner = true;
	}
	if(spaces[2][0] == spaces[1][1] && spaces[1][1] == spaces[0][2] && spaces[2][0] != 0){
		winner = true;
	}
	// If there is a winner, declare who won, and restart the game
	if(winner) {
		if(player){
			alert("Player One Won!");
			restart();
		} else {
			alert("Player Two Won!");
			restart();
		}
	// If there is no winner and the board is full, declare a draw, and restart the game
	} else if(turns == 9){
		alert("Draw!");
		restart();
	}
}

// restart the game 
// lalala
function restart() {
	// clear the playing area
	context.clearRect ( 0 , 0 , canvas.width, canvas.height );
	// redraw the playing area and grid lines
	render();
	// player 1 is the current player again
	player1 = true;
	// change number of turns to zero
	turns = 0;
	// spaces array should contain only 0's
	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			spaces[i][j] = 0;
		}
	}
}