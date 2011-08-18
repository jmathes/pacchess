Board = function(board_div) {
    this.board_div = board_div;
    this.whos_turn = 'w';
    
    this.reset = function() {
        this.squares = [['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
                ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
                ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']];
    };

    this._get_img_pos = function(y, x) {
        piece = this.squares[y][x];
        if(piece == null) {
            return '40px 0px';
        }
        lastpart = ' 0px';
        if(piece[0] == 'w') {
            lastpart = ' 40px';
        }
        switch(piece[1]) {
        case 'p':
            firstpart = '0px';
            break;
        case 'k':
            firstpart = '80px';
            break;
        case 'q':
            firstpart = '120px';
            break;
        case 'b':
            firstpart = '160px';
            break;
        case 'n':
            firstpart = '200px';
            break;
        case 'r':
            firstpart = '240px';
            break;
        }
        result = firstpart + lastpart;
        return result;
    };
    
    this.part_move = function(x, y) {
        console.log("moved");
    };

    this.draw = function() {
        var _this = this;
        this.board_div.empty();
        t = $('<table>').css({'display': 'block', 'padding': '1px solid black'}).attr('id', 'board_table');
        for(y=0; y<=7; y++) {
            r = $('<tr>').attr('id', 'r'+y);
            for(x=0; x<=7; x++) {
                color = "white";
                if(((x+y)%2)) {
                    color = "lightgrey";
                }
                square = $('<td>')
                    .attr({'id': y+''+x,
                       'x': x,
                       'y': y
                      })
                    .css({'background-color': color,
                      'background-position': (this._get_img_pos(y, x)),
                      'background-image': 'url("chesspieces_sprite.png")',
                      'height': '40px',
                      'width': '40px'
                     })
                    .append(" ");
                square.click(function() {
                    var x = $(this).attr('x');
                    var y = $(this).attr('y');
                    _this.click(x, y);
                });
                r.append(square);
            }
            t.append(r);
        }
        this.board_div.append(t);
    };
    
    this.move_start = null;
    this.move_end = null;
    this.click = function(x, y) {
        if(this.move_start == null) {
            if(this.squares[y][x] != null && this.squares[y][x][0] == this.whos_turn) {
                this.move_start = [x, y];
            }
        } else {
            this.move_end = [x, y];
            this.attempt_move();
            this.move_start = null;
            this.move_end = null;
        };
    };
    
    this.is_move_allowed = function(start, end) {
        if(start[0] == end[0] && start[1] == end[1]) {
            return false;
        };
        return true;
    };
    
    this.attempt_move = function() {
        start = this.move_start;
        end = this.move_end;
        if(this.is_move_allowed(start, end)) {
            this.squares[end[1]][end[0]] = this.squares[start[1]][start[0]];
            this.squares[start[1]][start[0]] = null;
            this.draw();
            if(this.whos_turn == 'w') {
                this.whos_turn = 'b';
            } else {
                this.whos_turn = 'w';
            }
        } else {
            alert("That move isn't allowed");
        }
    };

    this.reset();

    return this;
};


$(document).ready(function() {
    board_div = $('#board');
    board = Board(board_div);
    board.draw();
});