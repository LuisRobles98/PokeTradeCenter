$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let estadoSeleccionado = null;
	let ordenSeleccionado = null;
	let portadasMostrar = [];
	let cartaQuieroSeleccionada = [];
	let cartaOfrezcoSeleccionada = [];
	let intercambioSeleccionadoCompleto = null;
	limpiarYCargarTabla();
	
	function limpiarYCargarTabla() {
		$("#popupMostrarIntercambio").hide();
		$("#inputNombreCartaOfrecer").val("");
		$("#inputNombreCartaQuerer").val("");
		intercambioSeleccionadoCompleto = null;
		initTabla();
	}
	
	async function initTabla() {
		let intercambiosRecuperadas = await recuperarIntercambiosActivosPorCriterios();
		await formarPortadas(intercambiosRecuperadas);
		
		const tablaIntercambios = new Tabulator("#tablaIntercambios", {
			data: intercambiosRecuperadas,
			layout: "fitDataStretch",
			rowHeight: 140,
			height:"715px",
			headerVisible: false,
			columns : [
				{
	     			field: "id",
	     			formatter: function(cell) {
						 let d = cell.getRow().getData();
						 let portada = portadasMostrar.find(p => p.intercambioId == d.id);
						 let imgPortadaOfrecer = portada ? portada.imgPortadaOfrecer : "";
						 let imgPortadaQuerer = portada ? portada.imgPortadaQuerer : "";
						 					
	 					 return `<div class="tablaCell">
	                        		<div class="abanicoOfrecer-${portada.imgPortadaOfrecer.length}">
                    					${portada.imgPortadaOfrecer.map(img => `<img src="${img}" class="portada">`).join("")}
                					</div>
                					<i class="fa-solid fa-arrow-right-arrow-left iconoIntercambioPortada"></i>
	                    			<div class="abanicoQuerer-${portada.imgPortadaQuerer.length}">
                    					${portada.imgPortadaQuerer.map(img => `<img src="${img}" class="portada">`).join("")}
                					</div>
            					</div>`;
					}
				}
			]
		});
			
		tablaIntercambios.on("rowClick", function(e, row){
			intercambioSeleccionadoCompleto = row.getData();
			mostrarIntercambio(row.getData());
		});
		
		$("#inputNombreCartaOfrecer").on("input", async function() {
			let intercambios = await recuperarIntercambiosActivosPorCriterios();
    		await formarPortadas(intercambios);
			await renderizarTabla(tablaIntercambios, intercambios);
    		mostrarIntercambio(intercambioSeleccionadoCompleto);
		});
		
		$("#inputNombreCartaQuerer").on("input", async function() {
			let intercambios = await recuperarIntercambiosActivosPorCriterios();
    		await formarPortadas(intercambios);
			await renderizarTabla(tablaIntercambios, intercambios);
    		mostrarIntercambio(intercambioSeleccionadoCompleto);
		});
		
		//funcionalidad botones busqueda estado
		$(".botonEstado").off("click").on("click", async function() {	
			let valor = $(this).data("id");
			$(".botonEstado").removeClass("seleccionada");
			if(estadoSeleccionado === valor) {
				estadoSeleccionado = null;
			} else {
				estadoSeleccionado = valor;
				$(this).addClass("seleccionada");
			}
			let intercambios = await recuperarIntercambiosActivosPorCriterios();
    		await formarPortadas(intercambios);
    		await renderizarTabla(tablaIntercambios, intercambios);
	    	mostrarIntercambio(intercambioSeleccionadoCompleto);
		});
		
		
		//funcionalidad botones busqueda orden
		$(".botonOrden").off("click").on("click", async function() {
			let valor = $(this).data("id");
			$(".botonOrden").removeClass("seleccionada");
			if(ordenSeleccionado === valor) {
				ordenSeleccionado = null;
			} else {
				ordenSeleccionado = valor;
				$(this).addClass("seleccionada");
			}
			let intercambios = await recuperarIntercambiosActivosPorCriterios();
    		await formarPortadas(intercambios);
    		await renderizarTabla(tablaIntercambios, intercambios);
	    	mostrarIntercambio(intercambioSeleccionadoCompleto);
		});
		
		//boton actualizar
		$("#botonActualizar").off("click").click(async function() {
			let intercambios = await recuperarIntercambiosActivosPorCriterios();
    		await formarPortadas(intercambios);
			await renderizarTabla(tablaIntercambios, intercambios);
			mostrarIntercambio(intercambioSeleccionadoCompleto);
		});
	}
	
	async function formarPortadas(intercambiosRecuperadas) {
		let portadas = [];
		
		for (const intercambio of intercambiosRecuperadas) {
			let portada = {};
			portada.imgPortadaOfrecer = [];
			let cartasOfrecer = intercambio.cartasOfrecer.split(";");
			portada.imgPortadaQuerer = [];
			let cartasQuerer = intercambio.cartasQuerer.split(";");

			portada.intercambioId = intercambio.id;
			
			for(const carta of cartasOfrecer) {
				let [expansionId, cartaJuegoId] = carta.split(",");
				portada.imgPortadaOfrecer.push(`/imagenes/cartas/${expansionId}/${cartaJuegoId}.png`);
			}
			
			for(const carta of cartasQuerer) {
				let [expansionId, cartaJuegoId] = carta.split(",");
				portada.imgPortadaQuerer.push(`/imagenes/cartas/${expansionId}/${cartaJuegoId}.png`);
			}
			portadas.push(portada);
		};
	
		portadasMostrar = portadas;
	}
	
	async function recuperarCarta(expansionId, cartaJuegoId) {
		let criterios = {};
		let expansiones = [];
		expansiones.push(expansionId);
		criterios.expansiones = expansiones;
		criterios.cartaJuegoId = cartaJuegoId;
		return await recuperarCartaIntercambio(criterios);
	}
	
	
	async function recuperarIntercambiosActivosPorCriterios() {
		let criterios = {};
		criterios.usuarioId = usuario.id;
		criterios.nombreOfrecer = $("#inputNombreCartaOfrecer").val();
		criterios.nombreQuerer = $("#inputNombreCartaQuerer").val();
		criterios.estadoId = estadoSeleccionado;
		criterios.ordenacion = ordenSeleccionado;
		let intercambios = await recuperarIntercambiosActivos(criterios);
		return intercambios;
	}
	
	function mostrarIntercambio(intercambio) {
		if(intercambio != null) {
			if(intercambio.estadoId == 1) {
				mostrarIntercambioEstado1(intercambio);
			} else if(intercambio.estadoId == 2) {
				mostrarIntercambioEstado2(intercambio);
			} else if(intercambio.estadoId == 3) {
				mostrarIntercambioEstado3(intercambio);
			}
		}
	}
	
	async function mostrarIntercambioEstado1(intercambio) {
		$("#popupMostrarIntercambio").show();
		$("#divEstado1").show();
		$("#divEstado2").hide();
		$("#divEstado3").hide();
		$("#textoEstado").text("Hasta el momento, nadie te ha hecho una oferta por este intercambio:");
		let cartasOfrecer = intercambio.cartasOfrecer.split(";");
		if(cartasOfrecer.length == 1) {
			$("#textoOfrecer1").text("Carta para ofrecer");
		} else {
			$("#textoOfrecer1").text("Cartas para ofrecer");	
		}
		let contenedorOfrecer = document.getElementById("mostrarCartasOfrecer1");
		contenedorOfrecer.innerHTML = "";
		contenedorOfrecer.className = "mostrarCartasOfrecer1 abanicoMostrarOfrecer-" + cartasOfrecer.length;
		cartasOfrecer.forEach(carta => {
			let img = document.createElement("img");
    		img.classList.add("carta");
    		let [expansionId, cartaJuegoId] = carta.split(",");
    		img.src = "/imagenes/cartas/" + expansionId + "/" + cartaJuegoId + ".png";
        	img.dataset.expansionId = expansionId;
    		img.dataset.cartaJuegoId = cartaJuegoId;
    		contenedorOfrecer.appendChild(img);
		});
		contenedorOfrecer.scrollTo({ top: 0, behavior: "smooth" });
		
		let cartasQuerer = intercambio.cartasQuerer.split(";")
		if(cartasQuerer.length == 1) {
			$("#textoQuerer1").text("Carta para recibir");
		} else {
			$("#textoQuerer1").text("Cartas para recibir");
		}
		let contenedorQuerer = document.getElementById("mostrarCartasQuerer1");
		contenedorQuerer.innerHTML = "";
		contenedorQuerer.className = "mostrarCartasQuerer1 abanicoMostrarQuerer-" + cartasQuerer.length;
		cartasQuerer.forEach(carta => {
			let img = document.createElement("img");
    		img.classList.add("carta");
    		let [expansionId, cartaJuegoId] = carta.split(",");
    		img.src = "/imagenes/cartas/" + expansionId + "/" + cartaJuegoId + ".png";
        	img.dataset.expansionId = expansionId;
    		img.dataset.cartaJuegoId = cartaJuegoId;
    		contenedorQuerer.appendChild(img);
		});
		contenedorQuerer.scrollTo({ top: 0, behavior: "smooth" });
	}
	
	async function mostrarIntercambioEstado2(intercambio) {
		$("#popupMostrarIntercambio").show();
		$("#divEstado1").hide();
		$("#divEstado2").show();
		$("#divEstado3").hide();
		
		let criteriosUsuario = {};
		if(intercambio.ofertanteId == usuario.id) {
			criteriosUsuario.id = intercambio.contraparteId;
			let contraparte = await recuperarUsuarioIntercambio(criteriosUsuario);
			$("#textoEstado").text(contraparte.nombre + " te han hecho la siguiente oferta:");
			$("#textoOfrecer2").text("Darás");
			$("#textoQuerer2").text("Recibirás");
			$("#textoEsperar").hide();
			$("#botonera2").show();
		} else {
			criteriosUsuario.id = intercambio.ofertanteId;
			let ofertante = await recuperarUsuarioIntercambio(criteriosUsuario);
			$("#textoEstado").text("Le has hecho la siguente oferta a " + ofertante.nombre);
			$("#textoQuerer2").text("Darás");
			$("#textoOfrecer2").text("Recibirás");
			$("#textoEsperar").show();
			$("#botonera2").hide();
		}
		
		let cartasOfrecer = intercambio.cartaOfrecerFinal.split(";");
		let contenedorOfrecer = document.getElementById("mostrarCartasOfrecer2");
		contenedorOfrecer.innerHTML = "";
		contenedorOfrecer.className = "mostrarCartasOfrecer2 abanicoMostrarOfrecer-" + cartasOfrecer.length;
		cartasOfrecer.forEach(carta => {
			let img = document.createElement("img");
    		img.classList.add("carta");
    		let [expansionId, cartaJuegoId] = carta.split(",");
    		img.src = "/imagenes/cartas/" + expansionId + "/" + cartaJuegoId + ".png";
        	img.dataset.expansionId = expansionId;
    		img.dataset.cartaJuegoId = cartaJuegoId;
    		contenedorOfrecer.appendChild(img);
		});
		contenedorOfrecer.scrollTo({ top: 0, behavior: "smooth" });
		
		let cartasQuerer = intercambio.cartaQuererFinal.split(";")
		let contenedorQuerer = document.getElementById("mostrarCartasQuerer2");
		contenedorQuerer.innerHTML = "";
		contenedorQuerer.className = "mostrarCartasQuerer2 abanicoMostrarQuerer-" + cartasQuerer.length;
		cartasQuerer.forEach(carta => {
			let img = document.createElement("img");
    		img.classList.add("carta");
    		let [expansionId, cartaJuegoId] = carta.split(",");
    		img.src = "/imagenes/cartas/" + expansionId + "/" + cartaJuegoId + ".png";
        	img.dataset.expansionId = expansionId;
    		img.dataset.cartaJuegoId = cartaJuegoId;
    		contenedorQuerer.appendChild(img);
		});
		contenedorOfrecer.scrollTo({ top: 0, behavior: "smooth" });
	}
	
	async function mostrarIntercambioEstado3(intercambio) {
		$("#popupMostrarIntercambio").show();
		$("#divEstado1").hide();
		$("#divEstado2").hide();
		$("#divEstado3").show();
		
		let criteriosUsuario = {};
		if(intercambio.ofertanteId == usuario.id) {
			criteriosUsuario.id = intercambio.contraparteId;
			let contraparte = await recuperarUsuarioIntercambio(criteriosUsuario);
			$("#textoEstado").text("Has aceptado la oferta de " + contraparte.nombre + ":");
			$("#textoOfrecer3").text("Darás");
			$("#textoQuerer3").text("Recibirás");
			$("#nombreUsuario").text("Id Pokemon TCG Pocket de " + contraparte.nombre);
			$("#idJuegoIntercambio").text(contraparte.juegoId);
			$("#botonera3").show();
		} else {
			criteriosUsuario.id = intercambio.ofertanteId;
			let ofertante = await recuperarUsuarioIntercambio(criteriosUsuario);
			$("#textoEstado").text(ofertante.nombre + "ha aceptado tu oferta:");
			$("#textoQuerer3").text("Darás");
			$("#textoOfrecer3").text("Recibirás");
			$("#nombreUsuario").text("Id Pokémon TCG Pocket de " + ofertante.nombre);
			$("#idJuegoIntercambio").text(ofertante.juegoId);
			$("#botonera3").hide();
		}
		
		let cartasOfrecer = intercambio.cartaOfrecerFinal.split(";");
		let contenedorOfrecer = document.getElementById("mostrarCartasOfrecer3");
		contenedorOfrecer.innerHTML = "";
		contenedorOfrecer.className = "mostrarCartasOfrecer3 abanicoMostrarOfrecer-" + cartasOfrecer.length;
		cartasOfrecer.forEach(carta => {
			let img = document.createElement("img");
    		img.classList.add("carta");
    		let [expansionId, cartaJuegoId] = carta.split(",");
    		img.src = "/imagenes/cartas/" + expansionId + "/" + cartaJuegoId + ".png";
        	img.dataset.expansionId = expansionId;
    		img.dataset.cartaJuegoId = cartaJuegoId;
    		contenedorOfrecer.appendChild(img);
		});
		contenedorOfrecer.scrollTo({ top: 0, behavior: "smooth" });
		
		let cartasQuerer = intercambio.cartaQuererFinal.split(";")
		let contenedorQuerer = document.getElementById("mostrarCartasQuerer3");
		contenedorQuerer.innerHTML = "";
		contenedorQuerer.className = "mostrarCartasQuerer3 abanicoMostrarQuerer-" + cartasQuerer.length;
		cartasQuerer.forEach(carta => {
			let img = document.createElement("img");
    		img.classList.add("carta");
    		let [expansionId, cartaJuegoId] = carta.split(",");
    		img.src = "/imagenes/cartas/" + expansionId + "/" + cartaJuegoId + ".png";
        	img.dataset.expansionId = expansionId;
    		img.dataset.cartaJuegoId = cartaJuegoId;
    		contenedorQuerer.appendChild(img);
		});
		contenedorOfrecer.scrollTo({ top: 0, behavior: "smooth" });
	}
	
	
	
	$("#btnEliminarIntercambio").click(function() {
		$("#confirmarEliminarIntercambio").show();
	});
	
	$("#btnRechazarIntercambio").click(function() {
		$("#confirmarRechazarIntercambio").show();
	});
	
	$("#btnAceptarIntercambio").click(function() {
		$("#confirmarAceptarIntercambio").show();
	});
	
	$("#btnFinalizarIntercambio").click(function() {
		$("#confirmarFinalizarIntercambio").show();
	});
	
	$("#btnCancelarEliminar").click(function() {
		$("#confirmarEliminarIntercambio").hide();
	});
	
	$("#btnCancelarRechazar").click(function() {
		$("#confirmarRechazarIntercambio").hide();
	});
	
	$("#btnCancelarAceptar").click(function() {
		$("#confirmarAceptarIntercambio").hide();
	});
	
	$("#btnCancelarFinalizar").click(function() {
		$("#confirmarFinalizarIntercambio").hide();
	});
	
	
	$("#btnEliminarEliminar").click(async function() {
		let intercambio = construirActualizarIntercambio(intercambioSeleccionadoCompleto.id, 4, null);
		let errores = await validarDatos(intercambio);
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha eliminado correctamente el intercambio", "");
				$("#confirmarEliminarIntercambio").hide();
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}	
		}
	});
	
	$("#btnEliminarRechazar").click(async function() {
		let intercambio = construirActualizarIntercambio(intercambioSeleccionadoCompleto.id, 4, intercambioSeleccionadoCompleto.contraparteId);
		let errores = await validarDatos(intercambio);
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha eliminado correctamente el intercambio", "");
				$("#confirmarRechazarIntercambio").hide();
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}	
		}
	});
	
	$("#btnOfertarRechazar").click(async function() {
		let intercambio = construirActualizarIntercambio(intercambioSeleccionadoCompleto.id, 1, null);
		let errores = await validarDatos(intercambio);
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha vuelto a ofertar correctamente el intercambio", "");
				$("#confirmarRechazarIntercambio").hide();
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}	
		}
	});
	
	$("#btnAceptarAceptar").click(async function() {
		let intercambio = construirActualizarIntercambio(intercambioSeleccionadoCompleto.id, 3, intercambioSeleccionadoCompleto.contraparteId);
		let errores = await validarDatos(intercambio);
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha aceptado correctamente el intercambio", "");
				$("#confirmarAceptarIntercambio").hide();
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}	
		}
	});
	
	$("#btnFinalizarFinalizar").click(async function() {
		let intercambio = construirActualizarIntercambio(intercambioSeleccionadoCompleto.id, 4, intercambioSeleccionadoCompleto.contraparteId);
		let errores = await validarDatos(intercambio);
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha finalizado correctamente el intercambio", "");
				$("#confirmarFinalizarIntercambio").hide();
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}	
		}
	});
	

	function construirActualizarIntercambio(id, estado, contraparteId) {
		let intercambio = {};
		intercambio.id = id;
		intercambio.estadoId = estado;
		intercambio.contraparteId = contraparteId;
		return intercambio;
	}
		
	async function validarDatos(intercambio) {
		let errores = "";
		
		if(intercambio.estadoId == 2) {
			errores = errores += "- Se ha insertado un estado que no corresponde" + "<br>";
		}
		
		if(intercambio.estadoId == 1 && intercambio.contraparteId != null) {
			errores = errores += "- Si se vuelve a publicar el intercambio no puede haber una persona como contraparte" + "<br>";
		}

		if(intercambio.estadoId == 3 && intercambio.contraparteId == null) {
			errores = errores += "- Tiene que haber una persona como contraparte al aceptar el intercambio" + "<br>";
		}
		
		return errores;
	}
		
	async function renderizarTabla(tablaIntercambios, barajas) {
		tablaIntercambios.replaceData(barajas);
		let rows = tablaIntercambios.getRows();
		if (rows.length > 0) {
   			rows[0].scrollTo({top: 0, behavior: "smooth"});
		}
	}
	
});