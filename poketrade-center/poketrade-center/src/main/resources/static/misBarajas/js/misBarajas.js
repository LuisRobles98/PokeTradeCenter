$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let barajaSeleccionadaCompleta = null;
	let barajaSeleccionada = null;
	let ordenSeleccionado = null;
	limpiarYCargarTabla();
	
	function limpiarYCargarTabla() {
		$("#popupMostrarBaraja").hide();
		$("#inputNombreBaraja").val("");
		barajaSeleccionadaCompleta = null;
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
			let carta = await recuperarCarta(expansionId,cartaJuegoId);
			portada.barajaId = baraja.id;
			portada.imgPortada = `/imagenes/cartas/${expansionId}/${cartaJuegoId}.png`;
			let cartaEnergia = carta.energiaId ?? "null";
			portada.imgFondo = `/imagenes/fondos/fondo${cartaEnergia}.png`;
			portada.nombre = baraja.nombre;
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
						 					
	 					 return `<div class="tablaCell">
	 					 			<img class="fondo" src="${imgFondo}">
	                        		<img class="portada" src="${imgPortada}">
	                        		<span>${nombre}</span>
	                    		</div>`;
					}
				}
			]
		});
		
		tablaBarajas.on("rowClick", function(e, row){
			barajaSeleccionadaCompleta = row.getData();
			barajaSeleccionada = row.getData().id;
	    	mostrarBaraja(row.getData());
		});
		
		//busqueda por nombre de baraja
		$("#inputNombreBaraja").on("input", async function() {
    		let barajas = await recuperarBarajasPorCriterios();
    		renderizarTabla(tablaBarajas, barajas)
    		mostrarBaraja(barajaSeleccionadaCompleta);
		});
		
		//funcionalidad botones busqueda(ordenación por fechas)
		$(".botonOrden").click(async function() {
			let valor = $(this).data("id");
			$(".botonOrden").removeClass("seleccionada");
			if(ordenSeleccionado === valor) {
				ordenSeleccionado = null;
			} else {
				ordenSeleccionado = valor;
				$(this).addClass("seleccionada");
			}
	    	let barajas = await recuperarBarajasPorCriterios();
	    	renderizarTabla(tablaBarajas, barajas)
	    	mostrarBaraja(barajaSeleccionadaCompleta);
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
		criterios.ordenacion = ordenSeleccionado;
		let barajas = await recuperarBarajasUsuario(criterios);
		return barajas;
	}
	
	async function mostrarBaraja(baraja) {
		if(baraja != null) {
			$("#popupMostrarBaraja").show();
			if(baraja.creadorId == null) {
				$("#textoCreador").text(baraja.nombre + " creada por " + usuario.nombre);
			} else {
				let criterios = {};
				criterios.id = baraja.creadorId;
				let creador = await recuperarCreador(criterios);
				$("#textoCreador").text(baraja.nombre + " creada por " + creador.nombre);
			}
			let contenedor = document.getElementById("mostrarCartas");
			contenedor.innerHTML = "";
			let cartas = baraja.cartas.split(";");
			cartas.forEach(carta => {
				let img = document.createElement("img");
	        	img.classList.add("carta");
	        	let [expansionId, cartaJuegoId] = carta.split(",");
	        	img.src = "/imagenes/cartas/" + expansionId + "/" + cartaJuegoId + ".png";
	        	contenedor.appendChild(img);
			});
	    	contenedor.scrollTo({ top: 0, behavior: "smooth" });	
		}
	}
	
	$("#botonEliminarBaraja").click(function() {
		$("#confirmar").show();
	});
	
	$("#btnEliminar").click(async function() {
		await eliminarBaraja();
		$("#confirmar").hide();
		limpiarYCargarTabla();
	});
	
	$("#btnCancelar").click(function() {
		$("#confirmar").hide();
	});
	
	async function eliminarBaraja() {
		let baraja = {};
		baraja.id = barajaSeleccionada;
		baraja.usuarioId = usuario.id
		await eliminar(baraja);
		popupErroresOConfirmacion.mostrar("success", "La baraja se ha eliminado correctamente", "");
		limpiarYCargarTabla();
	}
	
	async function renderizarTabla(tablaBarajas, barajas) {
		tablaBarajas.replaceData(barajas);
		let rows = tablaBarajas.getRows();
		if (rows.length > 0) {
   			rows[0].scrollTo({top: 0, behavior: "smooth"});
		}
	}
	
});