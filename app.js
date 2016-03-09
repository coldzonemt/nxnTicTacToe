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
			console.log(boardSize);
			if(boardSize < 3 || boardSize > 8) {
				//or an alert, because they are more annoying.
				alert('YO I SAID BETWEEN 3 AND 8');
			} else {
				//remove form
				$('.initial-setup').empty();
				generateBoard(boardSize);
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
				$('.game-tiles').append('<div class ="tile" id='+i+'-'+j+'>' + i +','+ j + '</div>');
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
	each turn, the div is checked for its state (has it been clicked?), and the turn number is 
	evaluated to determine if an X or an O should be played, 
	*/
	function playGame(size) {
		console.log(size, "Game Size");
		var numTurns = 0;  
		var maxTurns = size*size;
		var rowX = {};
		var rowO = {};
		var columnX = {}; 
		var columnO = {}; 
		//Initial rows object
		for(var i=0; i<size; i++) {
			rowX[i]=0; 
			columnX[i]=0; 
			rowO[i]=0; 
			columnO[i]=0; 
		}
		console.log(rowX, rowO, columnX, columnO);

		$('.game-tiles').on('click', '.tile', function(){
			
			var coordinate = $(this).prop('id');
			var x = parseInt(coordinate[0]); 
			var y = parseInt(coordinate[2]);

			if(numTurns%2 === 0 && !$(this).data('clicked') && numTurns < maxTurns) {
				$(this).empty(); 
				$(this).append('X'); 
				$(this).data('clicked', true);


				//board[x][y]="X";
				rowX[x] += 1; 
				columnX[y] += 1; 

				checkWinner(rowX, columnX, size, 'X');
				numTurns ++;  


			} else if (!$(this).data('clicked') && numTurns < maxTurns){
				$(this).empty();
				$(this).append('O');
				$(this).data('clicked', true);



				rowO[x] += 1; 
				columnO[y] += 1; 

				checkWinner(rowO, columnO, size, 'O');
				numTurns ++;  
			}
		});
	}
		
 	/*
	The checkWinner function takes in an array of the coordinates played for X or O and the size of the board 
	and checks for a win-state in the horizontal direction, vertical direction, and the two diagnoal directions. 
	Size is a string, so I am using type coercion ('==') in my comparisons for winning. 
 	*/
	function checkWinner(row, column, size, turn) {
		var winState = false; 
		
		for(var item in row) {
			if(row[item] == size) {
				winState = true; 
			}
		}

		for(var item in column) {
			if(column[item] == size) {
				winState = true; 
			}
		}
		
		//if winner in any case, append new element on top of the game congratulating the winner
		 if(winState) {
		 	$('.game-tiles').append('<div class="winning-message"> CONGRATULATIONS! '+turn+' WINS!!</div>'); 
		 	$('.game-tiles').append('<button class="play-again-message"> Would you like to play again?</button>'); 
		 	$('.play-again-message').on('click', function(){
		 		location.reload();  
		 	});
		 }
	}
});


