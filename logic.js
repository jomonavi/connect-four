var logic = (function($){
    function checkHorizontal(b, x, y, player){
        var count = 0;
        for(var i = 0; i < b[x].length; i ++){
            if(b[x][i] === player.move){
                count ++;
                if(count >= 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
        
    }

    function checkVertical(b, x, y, player){
        var count = 0;
        for(var i = 0; i < b.length; i ++){
            if(b[i][y] === player.move){
                count ++;
                if(count >= 4){
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    }

    function checkDiagonalSE(b, x, y, player){
        var count = 0;
        var startIdx, startA;
        if(y - x >= 0){
            startIdx = y - x;
            startA = x - x;
        } else {
            startIdx = 0;
            startA = x - y;
        }
        for(var i = startIdx, j = startA; j < b.length; i ++, j ++){
            if(b[j][i] === player.move){
                count ++;
                if(count >= 4){
                   return true; 
                }
            } else {
                count = 0;
            }
        }
        return false;
    }

    function checkDiagonalNE(b, x, y, player){
        var count = 0;
        var startIdx, startA;
        if(x + y >= b.length){
            startA = b.length - 1;
        } else {
            startA = x + y;
        }
        startIdx = (x + y) - startA;
        for(var i = startIdx, j = startA; j >= 0; i ++, j --){
            if(b[j][i] === player.move){
                count ++;
                if(count >= 4){
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    }

    function makeMove(b, col, player, $){
        var win = null;
        for(var i = b.length - 1; i >= 0; i --){
            if(!b[i][col]){
                b[i][col] = player.move;
                win = checkWin(b, i, col, player);
                var elem = "#" + i + " > " + "." + col;
                $(elem).css({"background-color": player.name});
                if(win){
                    alert("The " + player.name + " player wins!");
                    $('#board-container').empty();
                    $('#start-btn').text("Start");
                    $('#turn-status').text("");
                    $('#board-container').css({"background-color": ""});
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    function checkWin(b, x, y, player){
        if(checkHorizontal(b, x, y, player) || checkVertical(b, x, y, player)
        || checkDiagonalSE(b, x, y, player) || checkDiagonalNE(b, x, y, player)){
            return player;
        } else {
            return false;
        }
    }

    return {
        makeMove: makeMove
    }

})($)