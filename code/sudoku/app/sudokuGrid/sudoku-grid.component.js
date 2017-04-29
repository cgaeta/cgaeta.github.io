// Define the `sudokuGrid` controller
angular.
	module('sudokuGrid').
	component('sudokuGrid', {
		template: `<sudoku-nine ng-repeat="n in $ctrl.nines track by $index" index="n.idx" update-nine="$ctrl.getChange(square)" squares="n.squares"></sudoku-nine>`,
		controller: function SudokuGridController($scope, GridFactory){
			
			this.nines = GridFactory.nines;
			
		}
	});
