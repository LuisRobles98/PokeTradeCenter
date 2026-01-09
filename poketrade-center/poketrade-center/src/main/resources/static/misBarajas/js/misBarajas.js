$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let barajaSeleccionadaCompleta = null;
	let barajaSeleccionada = null;
	let ordenSeleccionado = null;
	limpiarYCargarTabla();
	
	function limpiarYCargarTabla() {
		$("#popupMostrarBaraja").hide();
		$("#inputNombreCarta").val("");
		barajaSeleccionadaCompleta = null;
		barajaSeleccionada = null;
		ordenSeleccionado = null;
		initTabla();
	}
	
	async function initTabla() {
		let barajasRecuperadas = await recuperarBarajasPorCriterios();
		let portadas = [];
		
		for (const barajaUsuario of barajasRecuperadas) {
			let portada = {};
			let baraja = barajaUsuario.baraja;
			let primeraCarta = baraja.cartas.split(";")[0];
			let [expansionId, cartaJuegoId] = primeraCarta.split(",");
			let carta = await recuperarCarta(expansionId,cartaJuegoId);
			portada.barajaUsuarioId = barajaUsuario.id;
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
						 let portada = portadas.find(p => p.barajaUsuarioId == d.id);
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
		$("#inputNombreCarta").on("input", async function() {
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
		criterios.cartaNombre = $("#inputNombreCarta").val();
		criterios.usuarioId = usuario.id;
		criterios.ordenacion = ordenSeleccionado;
		let barajas = await recuperarBarajasUsuario(criterios);
		return barajas;
	}
	
	async function mostrarBaraja(barajaUsuario) {
		if(barajaUsuario != null) {
			let baraja = barajaUsuario.baraja;
			$("#popupMostrarBaraja").show();
			if(barajaUsuario.barajaPublicaId == null) {
				$("#textoCreador").text(baraja.nombre + " creada por " + usuario.nombre);
			} else {
				let criterios = {};
				criterios.id = barajaUsuario.barajaPublicaId;
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
		let barajaUsuario = {};
		barajaUsuario.id = barajaSeleccionadaCompleta.id;
		barajaUsuario.usuarioId = usuario.id
		await eliminar(barajaUsuario);
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