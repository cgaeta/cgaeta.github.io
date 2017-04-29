// Define the `sudokuSquare` controller
angular.
	module('sudokuSquare').
	component('sudokuSquare', {
		template: `<input type="number" min="1" max="9" ng-model="$ctrl.square.val" ng-change="update()">
			<sudoku-possibility ng-repeat="possible in $ctrl.possible track by $index" value="$index+1" possible="possible" ng-class="{'possible': possible}"></sudoku-possibility>`,
		controller: function SudokuSquareController($scope){
			
			// reference for use inside of functions with their own scope
			var self = this;
			
			$scope.val = '';
			
			$scope.update = function update(){
				if(self.square.val !== undefined || self.square.val !== null)
					for(var i = 0; i < 9; i++)
						self.square.possibilities[i] = false;
				self.updateSquare({ square: self.square });
				self.square.adjustPossibilities();
			};
			

			self.possible = self.square.possibilities;
		},
		bindings: {
			index: "<",
			square: "=",
			updateSquare: "&"
		}
	});
