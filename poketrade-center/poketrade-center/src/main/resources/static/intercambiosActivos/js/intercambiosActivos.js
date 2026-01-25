$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
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
		ordenSeleccionado = null;
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
		
		//funcionalidad botones busqueda
		$(".botonOrden").click(async function() {
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
		$("#botonActualizar").click(async function() {
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
		$("#textoEstado").text("Hasta el momento, nadie te ha hecho una oferta por este intercambio");
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
			$("#textoEsperar2").hide();
			$("#botonera2").show();
		} else {
			criteriosUsuario.id = intercambio.ofertanteId;
			let ofertante = await recuperarUsuarioIntercambio(criteriosUsuario);
			$("#textoEstado").text("Le has hecho la siguente oferta a " + ofertante.nombre);
			$("#textoQuerer2").text("Darás");
			$("#textoOfrecer2").text("Recibirás");
			$("#textoEsperar2").show();
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
		
	}
	
	$("#btnSolicitarIntercambio").click(function() {
		$("#confirmarIntercambio").show();
	});
	
	$("#btnCancelar").click(function() {
		$("#confirmarIntercambio").hide();
	});
	
	$("#btnSolicitar").click(async function() {
		let errores = await validarDatos();
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			try {
				let intercambio = construirSolicitudIntercambio();
				await solicitarIntercambio(intercambio);
				popupErroresOConfirmacion.mostrar("success", "Se ha solicitado correctamente el intercambio. Podrás verla en la aplicación de 'Intercambios Activos'", "");
				$("#confirmarIntercambio").hide();
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}
		}
	});
	
	async function validarDatos() {
		let errores = "";
		if(cartaQuieroSeleccionada[0].expansionId == 0 && cartaQuieroSeleccionada[0].cartaJuegoId == 0) {
			errores = errores += "- No has seleccionado ninguna carta para quedarte" + "<br>";
		}
		
		if(cartaOfrezcoSeleccionada[0].expansionId == 0 && cartaOfrezcoSeleccionada[0].cartaJuegoId == 0) {
			errores = errores += "- No has seleccionado ninguna carta para dar" + "<br>";
		}
		
		if(errores == "") {
			let cartaQuiero = await recuperarCarta(cartaQuieroSeleccionada[0].expansionId, cartaQuieroSeleccionada[0].cartaJuegoId);
			let cartaOfrezco = await recuperarCarta(cartaOfrezcoSeleccionada[0].expansionId, cartaOfrezcoSeleccionada[0].cartaJuegoId);
			if(cartaQuiero.rarezaId != cartaOfrezco.rarezaId) {
				errores = errores += "- Las rarezas de las cartas seleccionadas no coinciden" + "<br>";
			}
		}
		
		let criterios = {};
		criterios.id = intercambioSeleccionadoCompleto.id;
		let intercambioBBDD = await recuperarIntercambiosActivos(criterios);
		if(intercambioBBDD == null || intercambioBBDD == undefined) {
			errores = errores += "- Parece que alguien se ha adelantado y ya ha solicitado el intercambio" + "<br>";
		}
		
		return errores;
	}
	
	function construirSolicitudIntercambio() {
		let intercambio = intercambioSeleccionadoCompleto;
		intercambio.cartaQuererFinal = cartaOfrezcoSeleccionada[0].expansionId + "," + cartaOfrezcoSeleccionada[0].cartaJuegoId;
		intercambio.cartaOfrecerFinal = cartaQuieroSeleccionada[0].expansionId + "," + cartaQuieroSeleccionada[0].cartaJuegoId;
		intercambio.contraparteId = usuario.id;
		return intercambio;
	}
		
	async function renderizarTabla(tablaIntercambios, barajas) {
		tablaIntercambios.replaceData(barajas);
		let rows = tablaIntercambios.getRows();
		if (rows.length > 0) {
   			rows[0].scrollTo({top: 0, behavior: "smooth"});
		}
	}
	
});