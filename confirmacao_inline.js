(function(){
	'use strict';
	
	angular.module("app", [])
		.directive("confirmacaoInline", ConfirmacaoInline)
		.controller("appController", AppController);
		
	function ConfirmacaoInline() {
		return {
			restrict: 'A',
			link: ConfirmacaoInlineLink
		};
		
		function ConfirmacaoInlineLink(scope, element, attributes) {
			var confirmaTexto = attributes['confirmaTexto'] || 'Confirmar';
			var cancelaTexto = attributes['cancelaTexto'] || 'Cancelar';
			var confirmaClass = attributes['confirmaClass'];
			var cancelaClass = attributes['cancelaClass'];
		
			var funcaoAngular = attributes['ngClick'] || attributes['dataNgClick'];
			var funcaoNativa = attributes['onclick'];
		
			element.removeAttr('ng-click');
			element.removeAttr('data-ng-click');
			element.removeAttr('onclick');
			element.unbind("click");
			element.on("click", exibeConfirmacao);
		
			function exibeConfirmacao() {
				element.after(geraBotaoCancela());
				element.after(geraBotaoConfirma());
				element.hide();
			}
			
			function geraBotaoConfirma() {
				var el = angular.element("<button>");
				el.text(confirmaTexto);
				el.addClass(confirmaClass);
				el.on("click", executaConfirmacao);
				return el;
			}
			
			function geraBotaoCancela() {
				var el = angular.element("<button>");
				el.text(cancelaTexto);
				el.addClass(cancelaClass);
				el.on("click", removeConfirmacao);
				return el;
			}
			
			function executaConfirmacao() {
				scope.$apply( function() {
					if(funcaoAngular) {
						scope.$eval(funcaoAngular);
					} else if(funcaoNativa) {
						eval(funcaoNativa);
					}
				});
				
				removeConfirmacao();
				element.remove();
			}
			
			function removeConfirmacao() {
				element.next("button").remove();
				element.next("button").remove();
				element.show();
			}
		}
	}
	
	function AppController() {
		var vm = this;
		
		vm.contador = 1;
		vm.mensagem = "Aguardando confirma\u00e7\u00e3o...";
		vm.confirmar = confirmar;
		
		function confirmar() {
			console.debug(vm.contador++);
			vm.mensagem = "Confirmado! Obrigado.";
		}
	}
	
})();