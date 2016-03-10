$(document).ready(function(){
	/*
	The function getBoardSize is the first function called in this game, and triggers the next function in the
	series of functions needed to play this game. If you wish to change the dimensions of the board to larger or smaller
	than 8 and 3, respectively, you may do so by modifying this function. This function is immediately invoked once 
	the DOM is ready, as it is trigger by the button click, which indicates that the user has selected an appropriately 
	sized board and is ready to play the game.
	*/
	(function getBoardSize() {
		$('.start-game').click(function() {
			var boardSize = $('#game-size').val()
			if(boardSize < 3 || boardSize > 8) {
				alert('Alerts are annoying. Please pick a number between 3 and 8!');
			} else {
				$('.initial-setup').empty();
				generateBoard(boardSize);
			}
			if(boardSize <= 4) {
				$('.game-tiles').css('margin-left', '40%');
			} else if(boardSize > 4 && boardSize <= 6) {
				$('.game-tiles').css('margin-left', '35%');
			} else {
				$('.game-tiles').css('margin-left', '28%');
			}
		});		
	})();

	/*
	The function generateBoard takes in the size parameter from the getBoardSize function and uses this information
	to generate the board or requested dimensions. It will also take this information and pass it to 
	the playGame function to ensure that the proper number of turns are accounted for. 
	*/
	function generateBoard(n) { 
		for(var i=0; i<n; i++) {
			for(var j=0; j<n; j++) {
				$('.game-tiles').append('<div class ="tile" id='+i+'-'+j+'>-</div>');
				if(j === n-1) {
					$('.game-tiles').append('<br>');
				}	
			}
		}
		playGame(n); 
	}

	/*
	The playGame function takes care of the game play, with the help of the function checkWinner.
	This function takes in the size of the game and uses it to manage the number of turns. For 
	each turn, the div is checked for its state (i.e., has it been clicked?), and the turn number is 
	evaluated to determine if an X or an O should be played, 
	*/
	function playGame(size) {
		var numTurns = 0;  
		var maxTurns = size*size;
		var rowX = {};
		var rowO = {};
		var columnX = {}; 
		var columnO = {}; 
		var diagonalRightX = 0; 
		var diagonalRightO = 0; 
		var diagonalLeftO = 0;
		var diagnoalLeftX = 0;

		//Initial rows and columns object for determining a winning game
		for(var i=0; i<size; i++) {
			rowX[i]=0; 
			columnX[i]=0; 
			rowO[i]=0; 
			columnO[i]=0; 
		}

		$('.game-tiles').on('click', '.tile', function(){
			
			var coordinate = $(this).prop('id');
			var x = parseInt(coordinate[0]); 
			var y = parseInt(coordinate[2]);

			if(numTurns%2 === 0 && !$(this).data('clicked') && numTurns < maxTurns) {
				$(this).empty(); 
				$(this).append('X'); 
				$(this).data('clicked', true);


				if(checkDiagonalLeft(x, y, size)){
					diagnoalLeftX++;
				}
				if(x===y) {
					diagonalRightX++; 
				}

				rowX[x] += 1; 
				columnX[y] += 1; 

				checkWinner(rowX, columnX, diagnoalLeftX, diagonalRightX, size, 'X', numTurns);
				numTurns ++;  


			} else if (!$(this).data('clicked') && numTurns < maxTurns){
				$(this).empty();
				$(this).append('O');
				$(this).data('clicked', true);


				if(checkDiagonalLeft(x, y, size)){
					diagonalLeftO++;
				}

				if(x===y){
					diagonalRightO++; 
				}

				rowO[x] += 1; 
				columnO[y] += 1; 

				checkWinner(rowO, columnO, diagonalLeftO, diagonalRightO, size, 'O', numTurns);
				numTurns ++;  
			}
		});
	}

	/*
	The checkDiagonalLeft function checks to see if a cell from the left corner to bottom right corner
	has been filled. It will return a boolean, true if the coordinates fall on the line, and false if not.
	*/
	function checkDiagonalLeft(x, y, size) {
		var counter = parseInt(size); 
		for(var i=0; i<size; i++){
			if(x === i && y === (size-(1+i))) {
				return true; 
			}
		}
		return false; 
	}	
 	/*
	The checkWinner function takes in an array of the coordinates played for X or O, the results of checking diagonal right,
	the results of checking diagonal left, the size of the board, the turn (X or O), and the turn number, 
	and checks for a win-state in the horizontal direction, vertical direction, and the two diagnoal directions. 
	Size is a string, so it is converted to an integer for comparisons. 
 	*/
	function checkWinner(row, column, diagonalRight, diagonalLeft, size, turn, turnNum) {
		var winState = false;
		var flag = true; 
		size = parseInt(size);
		
			for(var item in row) {
				if(row[item] === size) {
					winState = true; 
				}
			}

			for(var item in column) {
				if(column[item] === size) {
					winState = true; 
				}
			}
			if(diagonalRight === size) {
				winState = true;
			}

			if(diagonalLeft === size) {
				winState = true; 
			}


		//If a tie, append a new element notifying players of a tie, and allows the players the option to play again
		if(turnNum === (size*size)-1 && !winState){
			$('.initial-setup').append('<div class="tie-message"> It\'s a tie!!!</div>'); 
		 	$('.initial-setup').append('<button class="play-again-message"> Would you like to play again?</button>'); 
		 	$('.play-again-message').on('click', function(){
		 		location.reload();  
		 	});
		}
		
		//If winner, append new element on top of the game congratulating the winner and offering to start a new game
		if(winState) {
		 	$('.initial-setup').append('<div class="winning-message"> CONGRATULATIONS! '+turn+' WINS!!</div>'); 
		 	$('.initial-setup').append('<button class="play-again-message"> Would you like to play again?</button>'); 
		 	$('.play-again-message').on('click', function(){
		 		location.reload();  
		 	});
		}
	}
});


