// Define the `sudokuSolverApp` module
angular.module('sudokuSolverApp', ['sudokuGrid', 'sudokuNine', 'sudokuSquare', 'sudokuPossibility'])
	.factory("GridFactory", function(){
	
	//var self = this;
	var self = {};
			
	Square = function(x,y){
		this.val = null;
		this.possibilities = [true, true, true, true, true, true, true, true, true];
		this.x = x;
		this.y = y;
		this.idx = x + 9 * y;
		this.nineIdx = Math.floor(x/3) + 3*Math.floor(y/3);
		this.autoFilled = false;
	};

	function addSquare(sq){
		if(this.squares.length > 8)
			throw "Too many squares";
		if(this instanceof Row)
			sq.row = this;
		else if(this instanceof Column)
			sq.column = this;
		else if(this instanceof Nine)
			sq.nine = this;

		this.squares.push(sq);
		return sq;
	}

	function getSquare(idx){
		if(idx > 8)
			throw "Row not that big";
		return this.squares[idx];
	}

	function iterate(func){
		for(var i = 0; i < 9; i++)
			func.call(this.squares[i]);
	}

	function testPossibilities(){
		if(this.val !== null && this.val !== undefined)
			return;
		var count = 0,
				last = -1;
		for(var i = 0; i < 9; i++)
			if(this.possibilities[i]){
				count++;
				last = i;
			}
		if(count === 1){
			this.val = last+1;
			this.autoFilled = true;
			this.possibilities[last] = false;
			this.adjustPossibilities();
		}
	}

	function testNeighbors(){
		this.row.iterate(this.testPossibilities);
		this.column.iterate(this.testPossibilities);
		this.nine.iterate(this.testPossibilities);
	}

	function resetNeighbors(){
		this.row.iterate(this.resetPossibilities);
		this.column.iterate(this.resetPossibilities);
		this.nine.iterate(this.resetPossibilities);
	}

	function adjustPossibilities(){
		if(this.val === null || this.val === undefined){
			this.resetPossibilities();
			this.resetNeighbors();
		}

		else{
			this.autofilled = false;
			var v = this.val-1;
			for(var i = 0; i < 9; i++){
				this.row.squares[i].possibilities[v] = false;
				this.column.squares[i].possibilities[v] = false;
				this.nine.squares[i].possibilities[v] = false;
			}

			this.testNeighbors();
		}
	}

	function resetPossibilities(){
		this.autoFilled = false;
		for(var i = 0; i < 9; i++)
			this.possibilities[i] = this.val === null;

		if(this.val !== null)
			this.doubleCheckPossibilities();
	}

	function doubleCheckPossibilities(){
		for(var i = 0; i < 9; i++){
			var v = this.row.squares[i].val;
			if(v !== null)
				this.possibilities[v-1] = false;

			v = this.column.squares[i].val;
			if(v !== null)
				this.possibilities[v-1] = false;

			v = this.nine.squares[i].val;
			if(v !== null)
				this.possibilities[v-1] = false;
		}
	}

	Square.prototype.testPossibilities = testPossibilities;
	Square.prototype.testNeighbors = testNeighbors;
	Square.prototype.adjustPossibilities = adjustPossibilities;
	Square.prototype.resetPossibilities = resetPossibilities;
	Square.prototype.resetNeighbors = resetNeighbors;
	Square.prototype.doubleCheckPossibilities = doubleCheckPossibilities;

	Group = function(){
		this.squares = [];
	};
	Group.prototype.addSquare = addSquare;
	Group.prototype.getSquare = getSquare;
	Group.prototype.iterate = iterate;

	Row = function(y){
		Group.call(this);
		this.y = y;
	};
	Row.prototype = Object.create(Group.prototype);
	Row.prototype.constructor = Row;

	Column = function(x){
		Group.call(this);
		this.x = x;
	};
	Column.prototype = Object.create(Group.prototype);
	Column.prototype.constructor = Column;

	Nine = function(idx){
		Group.call(this);
		this.idx = idx;
	};
	Nine.prototype = Object.create(Group.prototype);
	Nine.prototype.constructor = Nine;

	self.allSquares = [];
	self.rows = [];
	self.columns = [];
	self.nines = [];

	function expandGrid(){
		for(var i = 0; i < 9; i++){
			self.columns.push(new Column(i));
			self.rows.push(new Row(i));
			self.nines.push(new Nine(i));
		}
	}

	function addToGrid(sq){
		self.rows[sq.y].addSquare(sq);
		self.columns[sq.x].addSquare(sq);
		self.nines[sq.nineIdx].addSquare(sq);
		self.allSquares.push(sq);
	}

	function instantiateSquares(){
		for(var i = 0; i < 9; i++)
			for(var j = 0; j < 9; j++)
				addToGrid(new Square(j, i));
	}

	self.getChange = function(square){
		square.adjustPossibilities();
	};

	expandGrid();
	instantiateSquares();
	
	return self;
	
});
