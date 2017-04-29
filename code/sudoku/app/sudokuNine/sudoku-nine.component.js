// Define the `sudokuNine` controller
angular.
	module('sudokuNine').
	component('sudokuNine', {
		template: `<sudoku-square ng-repeat="sq in $ctrl.squares" index="sq.idx" update-square="$ctrl.getSquare(square)" square="sq" ng-class="{ 'autoFilled': sq.autoFilled }"></sudoku-square>`,
		controller: function SudokuNineController($scope){
			
			// reference for use inside of functions with their own scope
			var self = this;
			
			self.getSquare = function getSquare(square){
				self.updateNine({ square: square });
			};
						
		},
		bindings: {
			index: "<",
			squares: "=",
			updateNine: "&"
		}
	});
