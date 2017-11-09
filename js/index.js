	var calculatorAppModule = angular.module("calculatorApp", []);

	calculatorAppModule.factory('Boton', function(){
		var boton = {};
		boton.query = ()=>{
			return [
				{ boton: 'AC', respuesta: 'fullReset', class: 'power' },
				{ boton: 'C', respuesta: 'reset', class: 'power' },
        { boton: 'mc', respuesta: 'mc', class: 'comun' },
        { boton: 1, respuesta: 1, class: 'claro' },
				{ boton: 2, respuesta: 2, class: 'claro' },
				{ boton: 3, respuesta: 3, class: 'claro' },
				{ boton: 'x', respuesta: '*', class: 'comun' },
				{ boton: '/', respuesta: '/', class: 'comun' },
        { boton: 'm+', respuesta: 'm+', class: 'comun' },
				{ boton: 4, respuesta: 4, class: 'claro' },
				{ boton: 5, respuesta: 5, class: 'claro' },
				{ boton: 6, respuesta: 6, class: 'claro' },
				{ boton: '-', respuesta: '-', class: 'comun' },
				{ boton: '+', respuesta: '+', class: 'comun' },
				{ boton: 'm-', respuesta: 'm-', class: 'comun' },
        { boton: 7, respuesta: 7, class: 'claro' },
				{ boton: 8, respuesta: 8, class: 'claro' },
				{ boton: 9, respuesta: 9, class: 'claro' },
				{ boton: '^', respuesta: '^', class: 'comun' },
				{ boton: '%', respuesta: '%', class: 'comun' },
				{ boton: 'mr', respuesta: 'mr', class: 'comun' },
				{ boton: 0, respuesta: 0, class: 'claro' },
				{ boton: '.', respuesta: '.', class: 'comun' },
				{ boton: '=', respuesta: '=', class: 'comun' }
			];
		};
		return boton;
	});

	calculatorAppModule.controller('StartUpController',
				function($scope, Boton) {
    
      $scope.acumulador = { total : 0, operacion: 0, ultimo: 0, ultimaOp: 0 }
      $scope.escribir = function(e) {
        if(e === 'm+' || e === 'm-' || e === 'mr' || e === 'mc' || e === '%' || e === '^') {
          alert('This function will be available soon. Im so sorry');
        }
        else if(e === 'reset') {
          $scope.acumulador.total = $scope.acumulador.ultimo;
          $scope.acumulador.operacion = $scope.acumulador.ultimaOp;
        }
        else if(e === 'fullReset') {
          $scope.acumulador.total = 0;
          $scope.acumulador.operacion = 0;
          $scope.acumulador.ultimo = 0;
          $scope.acumulador.ultimaOp = 0;
        }
        else if($scope.acumulador.total === 0 && $scope.acumulador.operacion === 0) {
          $scope.acumulador.total = e.toString();
          $scope.acumulador.operacion = e.toString();
        }
        else if($scope.acumulador.total === 0 ) {
          $scope.acumulador.total = e.toString();
        }
        else if(e === '=') {
          if($scope.acumulador.ultimo!=$scope.acumulador.total) {
            $scope.acumulador.operacion = '('+$scope.acumulador.operacion+')';
            $scope.acumulador.ultimaOp = $scope.acumulador.operacion;
            $scope.acumulador.total = eval($scope.acumulador.total);
            $scope.acumulador.ultimo = $scope.acumulador.total;
          }
          else return;
        }
        else if(!isNaN(e)) {
            $scope.acumulador.total += e.toString();
            $scope.acumulador.operacion += e.toString();
        }
        else if(!isNaN($scope.acumulador.total.toString()[$scope.acumulador.total.toString().length-1])) {
          $scope.acumulador.total += e.toString();
            $scope.acumulador.operacion += e.toString();
        }
    }
      			
			$scope.boton = Boton.query();
      
      $scope.escribirTeclado = function(e) {
        e = e || window.event; 
        var charCode = e.charCode || e.keyCode, 
              character = String.fromCharCode(charCode); 
        if(charCode>=42 && charCode <= 57) {
          $scope.escribir(character)
        }
        else if(charCode === 13) {
          e.preventDefault();
          $scope.escribir('=');
        }
        else if(charCode === 8 || charCode === 46) {
          e.preventDefault();
          $scope.escribir('reset');
        }
      }
      $scope.escribirTecladoBack = function(e) {
        e = e || window.event; 
        var charCode = e.charCode || e.keyCode, 
              character = String.fromCharCode(charCode); 
        if(charCode === 8 || charCode === 46) {
          e.preventDefault();
          $scope.escribir('reset');
        }
      };
	});