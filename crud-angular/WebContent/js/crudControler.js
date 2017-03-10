
  //Lista de dados inicial da tabela
 var dados = [
		{id:'1', marca:'Volksvagen',modelo:'Fusca',placa:'AAA4444', locatario: 'Rodrigo', dtlocacao: '2017-01-12', dtentrega: '2017-01-16'},
		{id:'2', marca:'Volksvagen',modelo:'Novo Fusca',placa:'AAA4454', locatario: 'Amarildo', dtlocacao: '2017-01-12', dtentrega: '2017-01-16'},
		{id:'3', marca:'Ford',modelo:'Fusion',placa:'AAB4445', locatario: 'Antonio', dtlocacao: '2017-01-12', dtentrega: ''},
		{id:'4', marca:'Chevrolet',modelo:'Corsa',placa:'AAC4484', locatario: 'Josefa', dtlocacao: '2017-01-30', dtentrega: ''},
		{id:'5', marca:'Chevrolet',modelo:'Vectra',placa:'DAC4784', locatario: 'Maria', dtlocacao: '2017-01-23', dtentrega: ''},
		{id:'6', marca:'Reno',modelo:'Clio',placa:'DTC9784', locatario: 'Roberta', dtlocacao: '2017-01-20', dtentrega: ''},
		{id:'7', marca:'Fiat',modelo:'Doblo',placa:'ESS9664', locatario: 'Claudia', dtlocacao: '2017-01-15', dtentrega: ''},
		{id:'8', marca:'Fiat',modelo:'Palio',placa:'OAO5584', locatario: 'Roberto', dtlocacao: '2017-01-06', dtentrega: ''},
		{id:'9', marca:'Fiat',modelo:'Mobi',placa:'FHC9879', locatario: 'Rogerio', dtlocacao: '2017-01-01', dtentrega: ''},
		{id:'10', marca:'Fiat',modelo:'Marea',placa:'ETC9884', locatario: 'Carlos', dtlocacao: '2017-01-12', dtentrega: '2017-02-01'},
		{id:'11', marca:'Fiat',modelo:'Marea',placa:'ETC9884', locatario: 'Juninho', dtlocacao: '2017-01-13', dtentrega: '2017-01-16'},
		{id:'12', marca:'Reno',modelo:'Logan',placa:'BDC9784', locatario: 'Felipe', dtlocacao: '2017-01-09', dtentrega: '2017-01-16'}
		];

  
        app.controller("carroCtrl", function($scope, $filter, $uibModal) {
        	
        	//=========== Modal
        	/**
        	 * Guarda idendificador do item selecionado no modal
        	 * 
  			 * @param {String} id
  			 * 
  			 * @return void
        	 */
        	 $scope.modal = function (id) {
        		 $scope.idModal = id;
    		  };
    		  
  			/**
  			 * Deleta carro da lista
  			 * 
  			 * @return void
  			 */
  			$scope.deletar = function() {
  				var id = $scope.idModal;

  				var length = dados.length;
  				for (i = 0; i < length; i++) {
  					if (dados[i].id === id) {
  						$scope.carros = dados.splice(i, 1);
  						updateTableData();
  					}
  				}
  			}
					

			// ========== Filtro
			$scope.filtro = {};
			
			
			$scope.buscar = function(filtro) {
				$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse
						: false;
				$scope.propertyName = propertyName;
			};

			// ========== Dados Tabela Ordenação
			$scope.propertyName = 'id';
			$scope.reverse = true;

			/**
			 * Animação para ordenação de de colunas da tabela 
			 */
			$scope.sortBy = function(propertyName) {
				$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
				$scope.propertyName = propertyName;
			};

			// ========== Dados Iniciais da Tabela Paginação
			$scope.idCorrrente = dados.length;
			$scope.totalItems = dados.length;
			$scope.currentPage = 1;
			$scope.itemsPerPage = 5;

			/**
			 * Callback executado toda a vez que o elemento html
			 * uib-pagination realiza um evento
			 * 
			 * @return void
			 */
			$scope.$watch('currentPage', function() {
				setPagingData($scope.currentPage);
			});

			/**
			 * Pagina dados da tabela, setando visualização atual
			 * 
			 * @return void
			 */
			function setPagingData(page) {
				var pagedData = dados.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
				$scope.carros = pagedData;
			}

			/**
			 * Atualiza dados da tabela
			 * 
			 * @return void
			 */
			function updateTableData() {
				setPagingData($scope.currentPage);
				$scope.totalItems = dados.length;
			}
			
			/**
			 * Formatação data Ngmodel dtentrega
			 */
			$scope.$watch('carro.dtentrega', function (newValue) {
				if(newValue !== undefined
					&& newValue !== ""
					&& newValue.length === 10)
			    $scope.carro.dtentrega = $filter('date')(newValue, 'dd/MM/yyyy'); 
			});
			
			/**
			 * Formatação data Ngmodel dtlocacao
			 */
			$scope.$watch('carro.dtlocacao', function (newValue) {
				if(newValue !== undefined
					&& newValue !== ""
					&& newValue.length === 10)
			    $scope.carro.dtlocacao = $filter('date')(newValue, 'dd/MM/yyyy'); 
			});

			// ========== Funções gerais

			$scope.exibeFormulario = false;
			$scope.carro = {};

			/**
			 * Evento para abrir formulário de carro
			 * 
			 * @return void
			 */
			$scope.cadastrar = function() {
				$scope.carro = {};
				$scope.exibeFormulario = true;
			}

			/**
			 * Salva carro inserindo ou atualizando.
			 * 
			 * @return void
			 */
			$scope.salvar = function() {

				if(!validaformulario()) {
					return;
				}
				
				if ($scope.carro.id === undefined) {
					$scope.carro.id = $scope.idCorrrente++;
					$scope.carro.placa = $scope.carro.placa.toUpperCase();
					dados.push($scope.carro);

				} else {

					var length = dados.length;
					for (i = 0; i < length; i++) {
						if (dados[i].id === $scope.carro.id) {
							$scope.carro.placa = $scope.carro.placa.toUpperCase();
							dados[i] = $scope.carro;
						}
					}
				}
				$scope.fechar();
				updateTableData();
			}
			
			
			/**
			 * Formata data da tela
			 * 
			 * @return string
			 */
			function formataDtTela(data) {				
				var adata = data.split("/");
				
				return (adata[2]+"-"+adata[1]+"-"+adata[0]);
			}
			
			
			
			
			
			//Variaveis para mensagem
			$scope.msgModelo = "";
			$scope.msgMarca = "";
			$scope.msgPlaca = "";
			$scope.msgLocatario = "";
			$scope.msgDtLocacao = "";
			$scope.msgDtEntrega = "";
			
			/**
			 * Limpa mensagens de formulário
			 * 
			 * @return void
			 */				
			function limpaMgsFormulario() {
				$scope.msgModelo = "";
				$scope.msgMarca = "";
				$scope.msgPlaca = "";
				$scope.msgLocatario = "";
				$scope.msgDtLocacao = "";
				$scope.msgDtEntrega = "";				
			}
			
			/**
			 * Validação formulário e exibe mensagens
			 * 
			 * @return boolean
			 */			
			function validaformulario() {
				limpaMgsFormulario();
				
				var msg = "Campo {0} obrigatório !!!"
				var retorno = true;
				
				//Modelo
				if($scope.carro.modelo === undefined
						|| $scope.carro.modelo === '') {
					$scope.msgModelo = msg.replace("{0}", "Modelo");
					retorno = false;
				}
				
				//Marca
				if($scope.carro.marca === undefined
						|| $scope.carro.marca === '') {
					$scope.msgMarca = msg.replace("{0}", "Marca");
					retorno = false;
				}

				//Placa
				if($scope.carro.placa === undefined
						|| $scope.carro.placa === '') {
					$scope.msgPlaca = msg.replace("{0}", "Placa");
					retorno = false;
				} else {
					if($scope.carro.placa.length !== 7
							&& $scope.carro.placa.length > 0) {
						$scope.msgPlaca = "Placa deve conter 7 caracteres !!!";
						retorno = false;
					}
				}
				

				//Placa
				if($scope.carro.placa === undefined
						|| $scope.carro.placa === '') {
					$scope.msgPlaca = msg.replace("{0}", "Placa");
					retorno = false;
				} else {
					if($scope.carro.placa.length !== 7
							&& $scope.carro.placa.length > 0) {
						$scope.msgPlaca = "Placa deve conter 7 caracteres !!!";
						retorno = false;
					}
				}
				

				//Loatario
				if($scope.carro.locatario.length > 250) {
					$scope.msgLocatario = "Placa deve conter no maxímo 250 caracteres !!!";
					retorno = false;
				}
				

				//Data locacao
				if($scope.carro.dtlocacao === undefined
						|| $scope.carro.dtlocacao === '') {
					$scope.msgDtLocacao = msg.replace("{0}", "Data Locação");
					retorno = false;
				}
				

				//Data locacao
				var sd1 = formataDtTela($scope.carro.dtlocacao);
				var sd2 = formataDtTela($scope.carro.dtentrega);
				var d1 = Date.parse(sd1);
				var d2 = Date.parse(sd2);
				if(d1 > d2) {
					$scope.msgDtEntrega = "Campo Data Locação deve ser menor que campo Data Entrega !!!";
					retorno = false;
				}				

				return retorno;
			}


			/**
			 * Fecha formulário
			 * 
			 * @return void
			 */
			$scope.fechar = function() {
				$scope.carro = {};
				$scope.exibeFormulario = !$scope.exibeFormulario;
			}



			/**
			 * Edita dados do carro
			 * 
			 * @param {Object} carro
			 * @return void
			 */
			$scope.editar = function(carro) {
				limpaMgsFormulario();
				setCarro(carro);
				$scope.exibeFormulario = true;
				updateTableData();
			}

			/**
			 * Seta dados do carro
			 * 
			 * @param {Object}
			 *            carro
			 * @return void
			 */
			function setCarro(carro) {

				var carroAux = {};

				carroAux.id = carro.id;
				carroAux.marca = carro.marca;
				carroAux.modelo = carro.modelo;
				carroAux.placa = carro.placa;
				carroAux.locatario = carro.locatario;
				carroAux.dtlocacao = carro.dtlocacao;
				carroAux.dtentrega = carro.dtentrega;


				$scope.carro = carroAux;
			}
		
    });
    
