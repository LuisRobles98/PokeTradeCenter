$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let barajaSeleccionada = null;
	let ordenSeleccionado = null;
	limpiarYCargarTabla();
	
	function limpiarYCargarTabla() {
		$("#popupMostrarBaraja").hide();
		$("#inputNombreBaraja").val("");
		barajaSeleccionada = null;
		ordenSeleccionado = null;
		initTabla();
	}
	
	async function initTabla() {
		let barajasRecuperadas = await recuperarBarajasPorCriterios();
		let portadas = [];
		
		for (const baraja of barajasRecuperadas) {
			let portada = {};
			let primeraCarta = baraja.cartas.split(";")[0];
			let [expansionId, cartaJuegoId] = primeraCarta.split(",");
			//let carta = await recuperarCarta(expansionId,cartaJuegoId);
			let carta = {};
			carta.energiaId = 1;
			
			portada.barajaId = baraja.id;
			portada.imgPortada = `/imagenes/cartas/${expansionId}/${cartaJuegoId}.png`;
			portada.imgFondo = `/imagenes/fondos/fondo${carta.energiaId}.png`;
			portada.nombre = baraja.nombre;
			portada.meGusta = baraja.meGusta;
			portadas.push(portada);
		};
		
		const tablaBarajas = new Tabulator("#tablaBarajas", {
			data: barajasRecuperadas,
			layout: "fitDataStretch",
			rowHeight: 140,
			height:"710px",
			headerVisible: false,
			columns : [
				{
	     			field: "id",
	     			formatter: function(cell) {
						 let d = cell.getRow().getData();
						 let portada = portadas.find(p => p.barajaId == d.id);
						 let imgPortada = portada ? portada.imgPortada : "";
                    	 let imgFondo = portada ? portada.imgFondo : "";
                    	 let nombre = portada ? portada.nombre : "";
                    	 let meGusta = portada ? portada.meGusta : 0;
						 					
	 					 return `<div class="tablaCell">
	 					 			<img class="fondo" src="${imgFondo}">
	                        		<img class="portada" src="${imgPortada}">
	                        		<span>${nombre}<i class="fa-regular fa-heart" style="color:red; margin-left: 20px;"></i>           ${meGusta}</span>
	                    		</div>`;
					}
				}
			]
		});
		
		tablaBarajas.on("rowClick", function(e, row){
			barajaSeleccionada = row.getData().id;
	    	mostrarBaraja(row.getData());
		});
		
		$("#inputNombreBaraja").on("input", async function() {
    		let barajas = await recuperarBarajasPorCriterios();
    		tablaBarajas.replaceData(barajas); // actualiza la tabla
		});
	}
	
	async function recuperarCarta(expansionId, cartaJuegoId) {
		let criterios = {};
		let expansiones = [];
		expansiones.push(expansionId);
		criterios.expansiones = expansiones;
		criterios.cartaJuegoId = cartaJuegoId;
		return await recuperarCartaPrincipal(criterios);
	}
	
	
	async function recuperarBarajasPorCriterios() {
		let criterios = {};
		criterios.nombre = $("#inputNombreBaraja").val();
		criterios.usuarioId = usuario.id;
		criterios.orden = ordenSeleccionado != null ? ordenSeleccionado : "";
		//let barajas = await recuperarBarajasUsuario(criterios);
		//TODO ELIMINAR DESPUES
		let barajas = [];
		let baraja1 = {};
		let baraja2 = {};
		let baraja3 = {};
		baraja1.id = 1; baraja1.creadorId = 14; baraja1.nombre = "Baraja venusaur EX e ivysaur"; baraja1.cartas = "1,4;1,2;1,1;1,3;1,5;1,10;1,9;1,8;1,6;1,7;1,17;1,18;1,19;1,20;1,25;1,24;1,23;1,22;1,21;1,26;"; baraja1.meGusta = 0;
		baraja2.id = 2; baraja2.creadorId = 17; baraja2.nombre = "Baraja venusaur EX e ivysaur"; baraja2.cartas = "1,4;1,2;1,1;1,3;1,5;1,10;1,9;1,8;1,6;1,7;1,17;1,18;1,19;1,20;1,25;1,24;1,23;1,22;1,21;1,26;"; baraja2.meGusta = 4;
		baraja3.id = 3; baraja3.creadorId = 22; baraja3.nombre = "Baraja venusaur EX e ivysaur"; baraja3.cartas = "1,4;1,2;1,1;1,3;1,5;1,10;1,9;1,8;1,6;1,7;1,17;1,18;1,19;1,20;1,25;1,24;1,23;1,22;1,21;1,26;"; baraja3.meGusta = 2;
		barajas.push(baraja1);
		barajas.push(baraja2);
		barajas.push(baraja3);
		
		return barajas;
	}
	
	async function mostrarBaraja(baraja) {
		$("#popupMostrarBaraja").show();
		if(baraja.creadorId == null) {
			$("#textoCreador").text(baraja.nombre + " creada por " + usuario.nombre);
		} else {
			let criterios = {};
			criterios.id = baraja.creadorId;
			//let creador = await recuperarCreador(criterios);
			let creador = {};
			creador.nombre = "Prueba";
			
			
			$("#textoCreador").text(baraja.nombre + " creada por " + creador.nombre);
		}
		let contenedor = document.getElementById("mostrarCartas");
		contenedor.innerHTML = "";
		let cartas = baraja.cartas.split(";");
		cartas.pop();//para eliminar el ultimo creado por el split ";"
		cartas.forEach(carta => {
			let img = document.createElement("img");
        	img.classList.add("carta");
        	let [expansionId, cartaJuegoId] = carta.split(",");
        	img.src = "/imagenes/cartas/" + expansionId + "/" + cartaJuegoId + ".png";
        	contenedor.appendChild(img);
		});
    	contenedor.scrollTo({ top: 0, behavior: "smooth" });
	}
	
	$("#botonEliminarBaraja").click(function() {
		$("#confirmar").show();
	});
	
	
	$("#btnCancelar").click(function() {
		$("#confirmar").hide();
	});
	
	//funcionalidad botones busqueda
	$(".botonOrden").click(function() {
		let valor = $(this).data("id");
		$(".botonOrden").removeClass("seleccionada");
		if(ordenSeleccionado === valor) {
			ordenSeleccionado = null;
		} else {
			ordenSeleccionado = valor;
			$(this).addClass("seleccionada");
		}
    	recuperarBarajasPorCriterios();
	});

});