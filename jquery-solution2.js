//  1. document ready
//    1.1. define global variables
//      1.1.1. $boxes
//      1.1.1. $turnText
//      1.1.1. $resetButton
//      1.1.1. turnCounter
//      1.1.1. oMoves
//      1.1.1. xMoves
//      1.1.1. winningCombinations
//    1.2. addXO
//      1.2.1 Check turn
//      1.2.2 if x's turn or o's turn
//        1.2.2.1 push the data-num to xMoves/oMoves
//        1.2.2.2 change box text to x/o
//        1.2.2.3 add class to box
//        1.2.2.4 increase turnCounter
//        1.2.2.5 change turnText
//        1.2.2.6 checkForWin
//    1.3. addXOListener
//    1.4. resetBoard
//    1.5. addResetListener
//    1.6. checkForWin
//    1.7. init

$(document).ready(function(){
  // define global variables
  var $boxes       = $("td"); // game board cells
  var $turnText    = $(".playerTurn"); //
  var $resetButton = $("#reset"); // reset button
  var turnCounter  = 0;
  var oMoves       = [];
  var xMoves       = [];

  var winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];

  // reset every variable to default settings
  var resetBoard = function(e){
    turnCounter = 0;
    oMoves      = [];
    xMoves      = [];
    $boxes.text("").attr("class", "");
    $turnText.text("It is X's turn");
  };

  var addResetListener = function () {
    $resetButton.on('click', resetBoard);
  };

  var checkForWin = function (movesArr, player) {
    // loop through winningCombinations
    winningCombinations.forEach(function(combinations){
      // define winCounter to store how many time we match the combinations
      var winCounter = 0;
      // loop through combinations
      combinations.forEach(function(number){
        // try to find if number is inside movesArr
        if (movesArr.indexOf(number) === -1 ) {
          // if it doesn't return to break out of this loop
          return;
        } else {
          // if found increase winCounter
          winCounter++;
        }
      });

      // when the combination loop finished check if winCounter is equal to 3
      if (winCounter === 3) {
        alert("Game over, " + player + " wins!");
        resetBoard();
      }
    });
  };

  var addXO = function ($elem, movesArr, currPlayer, nextPlayer) {
    movesArr.push(parseInt($elem.data("num")));
    $elem.text(currPlayer).addClass(currPlayer);
    $turnText.text("It is " + nextPlayer + "'s turn");
    turnCounter++;
    checkForWin(movesArr, currPlayer);
  };

  var addXOListener = function () {
    $boxes.off().on('click', function (e) {
      var $box = $(this);

      if (turnCounter % 2 === 0) {
        addXO($box, xMoves, "X", "O");
      } else {
        addXO($box, oMoves, "O", "X");
      }
    });
  };

  var init = function () {
    addXOListener();
    addResetListener();
  };

  init();

});
