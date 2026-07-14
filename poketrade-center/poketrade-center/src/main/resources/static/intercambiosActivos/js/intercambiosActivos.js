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
		let intercambiosRecuperados = await recuperarIntercambiosActivosPorCriterios();
		await formarPortadas(intercambiosRecuperados);
		
		const tablaIntercambios = new Tabulator("#tablaIntercambios", {
			data: intercambiosRecuperados,
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
	
	async function formarPortadas(intercambiosRecuperados) {
		let portadas = [];
		
		for (const intercambio of intercambiosRecuperados) {
			let portada = {};
			portada.imgPortadaOfrecer = [];
			let cartasOfrecer = intercambio.cartasOfrecer;
			portada.imgPortadaQuerer = [];
			let cartasQuerer = intercambio.cartasQuerer;
			portada.intercambioId = intercambio.id;

			for(const carta of cartasOfrecer) {
				portada.imgPortadaOfrecer.push(`/imagenes/cartas/${carta.expansionId}/${carta.cartaJuegoId}.png`);
			}
			
			for(const carta of cartasQuerer) {
				portada.imgPortadaQuerer.push(`/imagenes/cartas/${carta.expansionId}/${carta.cartaJuegoId}.png`);
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
		if(intercambios.length === 0) {
			$("#textoNoResultados").show();
		} else {
			$("#textoNoResultados").hide();
		}
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
		let masDeUnaCarta = false;
		$("#popupMostrarIntercambio").show();
		$("#divEstado1").show();
		$("#divEstado2").hide();
		$("#divEstado3").hide();
		$("#textoEstado").text("Hasta el momento, nadie te ha hecho una oferta por este intercambio");
		let cartasOfrecer = intercambio.cartasOfrecer;
		if(cartasOfrecer.length == 1) {
			masDeUnaCarta = false;
			$("#textoOfrecer1").text("Carta para ofrecer");
			let carta = cartasOfrecer[0];
			$("#expansionContainerOfrecer1").removeClass("oculto");
			$("#expansionIdOfrecer1").attr("src", "/imagenes/expansiones/" + carta.expansionId + ".png");
			$("#cartaJuegoContainerOfrecer1").removeClass("oculto");
 			$("#cartaJuegoOfrecer1").text(String(carta.cartaJuegoId).padStart(3, '0') + "/" + String(await recuperarTotalCartasExpansionId(carta.expansionId)).padStart(3, '0'));
		} else {
			masDeUnaCarta = true;
			$("#textoOfrecer1").text("Cartas para ofrecer");	
			$("#expansionContainerOfrecer1").addClass("oculto");
			$("#cartaJuegoContainerOfrecer1").addClass("oculto");
		}
		let contenedorOfrecer = document.getElementById("mostrarCartasOfrecer1");
		contenedorOfrecer.innerHTML = "";
		contenedorOfrecer.className = "mostrarCartasOfrecer1 abanicoMostrarOfrecer-" + cartasOfrecer.length;
		cartasOfrecer.forEach(carta => {
			let img = document.createElement("img");
    		img.classList.add("carta");
    		img.src = "/imagenes/cartas/" + carta.expansionId + "/" + carta.cartaJuegoId + ".png";
        	img.dataset.expansionId = carta.expansionId;
    		img.dataset.cartaJuegoId = carta.cartaJuegoId;
    		if(masDeUnaCarta) {
				img.addEventListener("mouseenter", async function() {
					$("#expansionContainerOfrecer1").removeClass("oculto");
					$("#expansionIdOfrecer1").attr("src", "/imagenes/expansiones/" + carta.expansionId + ".png");
					$("#cartaJuegoContainerOfrecer1").removeClass("oculto");
 					$("#cartaJuegoOfrecer1").text(String(carta.cartaJuegoId).padStart(3, '0') + "/" + String(await recuperarTotalCartasExpansionId(carta.expansionId)).padStart(3, '0'));
				});
				 img.addEventListener("mouseleave", function() { 
		 			$("#expansionContainerOfrecer1").addClass("oculto");
					$("#cartaJuegoContainerOfrecer1").addClass("oculto");
				 });
			}
    		contenedorOfrecer.appendChild(img);
		});
		contenedorOfrecer.scrollTo({ top: 0, behavior: "smooth" });
			
		let cartasQuerer = intercambio.cartasQuerer;
		if(cartasQuerer.length == 1) {
			masDeUnaCarta = false;
			$("#textoQuerer1").text("Carta para recibir");
			let carta = cartasQuerer[0];
			$("#expansionContainerQuerer1").removeClass("oculto");
			$("#expansionIdQuerer1").attr("src", "/imagenes/expansiones/" + carta.expansionId + ".png");
			$("#cartaJuegoContainerQuerer1").removeClass("oculto");
 			$("#cartaJuegoQuerer1").text(String(carta.cartaJuegoId).padStart(3, '0') + "/" + String(await recuperarTotalCartasExpansionId(carta.expansionId)).padStart(3, '0'));
		} else {
			masDeUnaCarta = true;
			$("#textoQuerer1").text("Cartas para recibir");
			$("#expansionContainerQuerer1").addClass("oculto");
			$("#cartaJuegoContainerQuerer1").addClass("oculto");
		}
		let contenedorQuerer = document.getElementById("mostrarCartasQuerer1");
		contenedorQuerer.innerHTML = "";
		contenedorQuerer.className = "mostrarCartasQuerer1 abanicoMostrarQuerer-" + cartasQuerer.length;
		cartasQuerer.forEach(carta => {
			let img = document.createElement("img");
    		img.classList.add("carta");
    		img.src = "/imagenes/cartas/" + carta.expansionId + "/" + carta.cartaJuegoId + ".png";
        	img.dataset.expansionId = carta.expansionId;
    		img.dataset.cartaJuegoId = carta.cartaJuegoId;
    		if(masDeUnaCarta) {
				img.addEventListener("mouseenter", async function() {
					$("#expansionContainerQuerer1").removeClass("oculto");
					$("#expansionIdQuerer1").attr("src", "/imagenes/expansiones/" + carta.expansionId + ".png");
					$("#cartaJuegoContainerQuerer1").removeClass("oculto");
 					$("#cartaJuegoQuerer1").text(String(carta.cartaJuegoId).padStart(3, '0') + "/" + String(await recuperarTotalCartasExpansionId(carta.expansionId)).padStart(3, '0'));
				});
				 img.addEventListener("mouseleave", function() { 
		 			$("#expansionContainerQuerer1").addClass("oculto");
					$("#cartaJuegoContainerQuerer1").addClass("oculto");
				 });
			}
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
			$("#textoEstado").text(contraparte.nombre + " te ha hecho la siguiente oferta");
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
		
		let cartaOfrecerFinalExpansionId = intercambio.cartaOfrecerFinalExpansionId;
		let cartaOfrecerFinalCartaJuegoId = intercambio.cartaOfrecerFinalCartaJuegoId;
		let contenedorOfrecer = document.getElementById("mostrarCartasOfrecer2");
		contenedorOfrecer.innerHTML = "";
		contenedorOfrecer.className = "mostrarCartasOfrecer23 abanicoMostrarOfrecer-1";
		
		let imgOfrecer = document.createElement("img");
		imgOfrecer.classList.add("carta");
		imgOfrecer.src = "/imagenes/cartas/" + cartaOfrecerFinalExpansionId + "/" + cartaOfrecerFinalCartaJuegoId + ".png";
    	imgOfrecer.dataset.expansionId = cartaOfrecerFinalExpansionId;
		imgOfrecer.dataset.cartaJuegoId = cartaOfrecerFinalCartaJuegoId;
		contenedorOfrecer.appendChild(imgOfrecer);
    		
		$("#expansionContainerOfrecer2").removeClass("oculto");
		$("#expansionIdOfrecer2").attr("src", "/imagenes/expansiones/" + cartaOfrecerFinalExpansionId + ".png");
		$("#cartaJuegoContainerOfrecer2").removeClass("oculto");
		$("#cartaJuegoOfrecer2").text(String(cartaOfrecerFinalCartaJuegoId).padStart(3, '0') + "/" + String(await recuperarTotalCartasExpansionId(cartaOfrecerFinalExpansionId)).padStart(3, '0'));
		contenedorOfrecer.scrollTo({ top: 0, behavior: "smooth" });
		
		let cartaQuererFinalExpansionId = intercambio.cartaQuererFinalExpansionId;
		let cartaQuererFinalCartaJuegoId = intercambio.cartaQuererFinalCartaJuegoId;
		let contenedorQuerer = document.getElementById("mostrarCartasQuerer2");
		contenedorQuerer.innerHTML = "";
		contenedorQuerer.className = "mostrarCartasQuerer23 abanicoMostrarQuerer-1";
		
		let imgQuerer = document.createElement("img");
		imgQuerer.classList.add("carta");
		imgQuerer.src = "/imagenes/cartas/" + cartaQuererFinalExpansionId + "/" + cartaQuererFinalCartaJuegoId + ".png";
    	imgQuerer.dataset.expansionId = cartaQuererFinalExpansionId;
		imgQuerer.dataset.cartaJuegoId = cartaQuererFinalCartaJuegoId;
		contenedorQuerer.appendChild(imgQuerer);
    		
		$("#expansionContainerQuerer2").removeClass("oculto");
		$("#expansionIdQuerer2").attr("src", "/imagenes/expansiones/" + cartaQuererFinalExpansionId + ".png");
		$("#cartaJuegoContainerQuerer2").removeClass("oculto");
		$("#cartaJuegoQuerer2").text(String(cartaQuererFinalCartaJuegoId).padStart(3, '0') + "/" + String(await recuperarTotalCartasExpansionId(cartaQuererFinalExpansionId)).padStart(3, '0'));
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
			$("#textoEstado").text("Has aceptado la oferta de " + contraparte.nombre);
			$("#textoOfrecer3").text("Darás");
			$("#textoQuerer3").text("Recibirás");
			$("#nombreUsuario").text("Id Pokemon TCG Pocket de " + contraparte.nombre);
			$("#idJuegoIntercambio").text(contraparte.juegoId);
			$("#botonera3").show();
		} else {
			criteriosUsuario.id = intercambio.ofertanteId;
			let ofertante = await recuperarUsuarioIntercambio(criteriosUsuario);
			$("#textoEstado").text(ofertante.nombre + " ha aceptado tu oferta");
			$("#textoQuerer3").text("Darás");
			$("#textoOfrecer3").text("Recibirás");
			$("#nombreUsuario").text("Id Pokémon TCG Pocket de " + ofertante.nombre);
			$("#idJuegoIntercambio").text(ofertante.juegoId);
			$("#botonera3").show();
		}
		
		let cartaOfrecerFinalExpansionId = intercambio.cartaOfrecerFinalExpansionId;
		let cartaOfrecerFinalCartaJuegoId = intercambio.cartaOfrecerFinalCartaJuegoId;
		let contenedorOfrecer = document.getElementById("mostrarCartasOfrecer3");
		contenedorOfrecer.innerHTML = "";
		contenedorOfrecer.className = "mostrarCartasOfrecer23 abanicoMostrarOfrecer-1";
		
		let imgOfrecer = document.createElement("img");
		imgOfrecer.classList.add("carta");
		imgOfrecer.src = "/imagenes/cartas/" + cartaOfrecerFinalExpansionId + "/" + cartaOfrecerFinalCartaJuegoId + ".png";
    	imgOfrecer.dataset.expansionId = cartaOfrecerFinalExpansionId;
		imgOfrecer.dataset.cartaJuegoId = cartaOfrecerFinalCartaJuegoId;
		contenedorOfrecer.appendChild(imgOfrecer);
		
		$("#expansionContainerOfrecer3").removeClass("oculto");
		$("#expansionIdOfrecer3").attr("src", "/imagenes/expansiones/" + cartaOfrecerFinalExpansionId + ".png");
		$("#cartaJuegoContainerOfrecer3").removeClass("oculto");
		$("#cartaJuegoOfrecer3").text(String(cartaOfrecerFinalCartaJuegoId).padStart(3, '0') + "/" + String(await recuperarTotalCartasExpansionId(cartaOfrecerFinalExpansionId)).padStart(3, '0'));
		contenedorOfrecer.scrollTo({ top: 0, behavior: "smooth" });
		
		let cartaQuererFinalExpansionId = intercambio.cartaQuererFinalExpansionId;
		let cartaQuererFinalCartaJuegoId = intercambio.cartaQuererFinalCartaJuegoId;
		let contenedorQuerer = document.getElementById("mostrarCartasQuerer3");
		contenedorQuerer.innerHTML = "";
		contenedorQuerer.className = "mostrarCartasQuerer23 abanicoMostrarQuerer-1";
		
		let imgQuerer = document.createElement("img");
		imgQuerer.classList.add("carta");
		imgQuerer.src = "/imagenes/cartas/" + cartaQuererFinalExpansionId + "/" + cartaQuererFinalCartaJuegoId + ".png";
    	imgQuerer.dataset.expansionId = cartaQuererFinalExpansionId;
		imgQuerer.dataset.cartaJuegoId = cartaQuererFinalCartaJuegoId;
		contenedorQuerer.appendChild(imgQuerer);
		
		$("#expansionContainerQuerer3").removeClass("oculto");
		$("#expansionIdQuerer3").attr("src", "/imagenes/expansiones/" + cartaQuererFinalExpansionId + ".png");
		$("#cartaJuegoContainerQuerer3").removeClass("oculto");
		$("#cartaJuegoQuerer3").text(String(cartaQuererFinalCartaJuegoId).padStart(3, '0') + "/" + String(await recuperarTotalCartasExpansionId(cartaQuererFinalExpansionId)).padStart(3, '0'));
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
		let intercambio = construirActualizarIntercambio(intercambioSeleccionadoCompleto, 4, null);
		let errores = await validarDatosActualizarIntercambio(intercambio);
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha eliminado correctamente el intercambio", "");
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}	
		}
		$("#confirmarEliminarIntercambio").hide();
	});
	
	$("#btnEliminarRechazar").click(async function() {
		let intercambio = construirActualizarIntercambio(intercambioSeleccionadoCompleto, 4, intercambioSeleccionadoCompleto.contraparteId);
		let errores = await validarDatosActualizarIntercambio(intercambio);
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha eliminado correctamente el intercambio", "");
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}	
		}
		$("#confirmarRechazarIntercambio").hide();
	});
	
	$("#btnOfertarRechazar").click(async function() {
		let intercambio = construirActualizarIntercambio(intercambioSeleccionadoCompleto, 1, null);
		let errores = await validarDatosActualizarIntercambio(intercambio);
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha vuelto a ofertar correctamente el intercambio", "");
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}	
		}
		$("#confirmarRechazarIntercambio").hide();
	});
	
	$("#btnAceptarAceptar").click(async function() {
		let intercambio = construirActualizarIntercambio(intercambioSeleccionadoCompleto, 3, intercambioSeleccionadoCompleto.contraparteId);
		let errores = await validarDatosActualizarIntercambio(intercambio);
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha aceptado correctamente el intercambio", "");
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}	
		}
		$("#confirmarAceptarIntercambio").hide();
	});
	
	$("#btnFinalizarFinalizar").click(async function() {
		let intercambio = construirActualizarIntercambio(intercambioSeleccionadoCompleto, 4, intercambioSeleccionadoCompleto.contraparteId);
		let errores = await validarDatosActualizarIntercambio(intercambio);
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				await actualizarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha finalizado correctamente el intercambio", "");
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}	
		}
		$("#confirmarFinalizarIntercambio").hide();
	});
	

	function construirActualizarIntercambio(intercambio, estado, contraparteId) {
		intercambio.estadoId = estado;
		intercambio.contraparteId = contraparteId;
		return intercambio;
	}
		
	async function validarDatosActualizarIntercambio(intercambio) {
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
	
	async function recuperarTotalCartasExpansionId(expansionId) {
		return await recuperarTotalCartasExpansion(expansionId);
	}
});