$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	limpiarYCargarTabla();
	
	//prueba (barrar cuando se vea que funciona la tabla)
	function recuperarBarajas() {
		let barajas = [];
		for(let i=0; i <8; i++) {
			barajas.push(crearBarajaPrueba());
		}	
		return barajas;
	}
					
	function limpiarYCargarTabla() {
		cargarTabla();
	}
	
	async function cargarTabla() {
		//let barajas = await recuperarBarajasUsuario();
	}
	
	function crearBarajaPrueba() {
		let baraja = {};
		baraja.id = 1;
		baraja.barajaNombre = "Baraja charizard EX y arcanine EX";
		baraja.cartas = "1,36;1,41;1,37;1,38;1,39;1,40;1,45;1,44;1,43;1,42;1,46;1,47;1,48;1,49;1,50;1,51;1,52;8,2;8,8;8,9;";
		return baraja;
	}
	
	new Tabulator("#tablaBarajas", {
		data: recuperarBarajas(),
		layout: "fitDataStretch",
		rowHeight: 140,
		height:"710px",
		headerVisible: false,
		columns : [
			{
				
     			field: "id",
     			formatter: function(cell) {
					 const d = cell.getRow().getData();
					 
					 //portada
					 let primeraCarta = d.cartas.split(";")[0];
					 let [expansionId, cartaJuegoId] = primeraCarta.split(",");
					 let imgPortada =  `/imagenes/cartas/${expansionId}/${cartaJuegoId}.png`;
					 
					 //fondo baraja
					 //let carta = recuperarCarta(expansionId,cartaJuegoId);
					 let carta = {};
					 carta.energiaId = 2;
					 let imgFondo = `/misBarajas/imagenes/fondo${carta.energiaId}.png`;
 					 return `<div class="tablaCell">
 					 			<img class="fondo" src="${imgFondo}">
                        		<img class="portada" src="${imgPortada}">
                        		<span>${d.barajaNombre}</span>
                    		</div>`;
				}
			}
		]
	});	

});