/*
ch
*/
























$( document ).ready(function() {


var playerarrA=[];
var playerarrB=[];
var winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];


function init(){
     $('.playerTurn').text("It is X's turn");
      var player =1; //player turn
      //when the sqaure is clicked
      $('.square').on('click',function(event){
      //store the square selected
        var $squareSelected = $(this);
        //check if the box is selected before
        if ($squareSelected.hasClass('ex')||$squareSelected.hasClass('oh'))
         {
          alert('this square is selected');
         }else{ //if it isn't selected before


            if(player===1){ //player1='X'
              $squareSelected.addClass('ex');
              $squareSelected.text("X");
              //color the box and add 'X'
              playerarrA.push($squareSelected.data("index-number"));
              //push the data index number of the selected box and record its moves in an array
              checkwin(playerarrA);//check whether 'X' is winning
              $('.playerTurn').text("It is O's turn");
              player=2;
            }else{
              $squareSelected.addClass('oh');
              console.log($squareSelected.data("index-number"));
               playerarrB.push($squareSelected.data("index-number"));
              $('.oh').text("O");
              checkwin(playerarrB);
              $('.playerTurn').text("It is X's turn");
              player=1;
              }
          }
      });

      $('#reset').on('click',function(event){

         clearBoard();
      });

  };

    function checkwin(array){
    //loop through each winning combinations
        winningCombinations.forEach(function(combination){
          //define win counter
          var win=0;
          //loop through the each combination and each number in the combination
          combination.forEach(function(num){
            //check if the input array has the number
                   if (array.indexOf(num)==-1){
            //if it don't have the number, exit
                      return;

                   }else{

             //find the number and win counter ++
                    win++;
                   }
          });
          //when win counter=3, the array has 3 matched number in a combo.
          if (win===3){
            alert('you win');
            clearBoard(); //restart
            return;

          }

        });

     };






   function clearBoard(){
    $('.playerTurn').text("It is X's turn");
     //reset the square divs
      if ($('.square').hasClass('ex')||$('.square').hasClass('oh')){
       $('.square').removeClass('ex').text('');
       $('.square').removeClass('oh').text('');
      };
    //reset the array of the playermoves
     playerarrA=[];
     playerarrB=[];
    //reset turns

   }

init();


});