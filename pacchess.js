Board = function() {
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

    this.clear = function() {
	this.squares = [[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null]];
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

    this.draw = function(board_div) {
	board_div.empty();
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
		    console.log(this);
		    console.log("You clicked on "+y+","+x);
		});
		r.append(square);
	    }
	    t.append(r);
	}
	board_div.append(t);
    };

    this.reset();

    return this;
}

$(document).ready(function() {
    board_div = $('#board');
    board = Board();
    board.draw(board_div);
});