// Define the `sudoku-possibility` module controller
angular.
	module('sudokuPossibility').
	component('sudokuPossibility', {
		template: `{{$ctrl.value}}`,
		controller: function SudokuPossibilityController(){
			
			var self = this;
			
		},
		bindings: {
			value: '<',
			possible: '=',
			onUpdate: '&'
		}
	})
