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
		intercambioSeleccionadoCompleto = null;
		vaciarCartaQuiero();
		vaciarCartaOfrezco();
		initTabla();
	}
	
	function vaciarCartaQuiero() {
		cartaQuieroSeleccionada = Array.from({ length: 1 }, () => ({
			expansionId: 0,
			cartaJuegoId: 0
		}));
		recargarOfrecer();
	}
	
	function vaciarCartaOfrezco() {
		cartaOfrezcoSeleccionada = Array.from({ length: 1 }, () => ({
			expansionId: 0,
			cartaJuegoId: 0
		}));
		recargarQuerer();
	}
	
	async function initTabla() {
		let intercambiosRecuperadas = await recuperarIntercambiosPublicosPorCriterios();
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
			vaciarCartaQuiero();
			vaciarCartaOfrezco();
			mostrarIntercambio(row.getData());
		});
		
		$("#inputNombreCartaOfrecer").on("input", async function() {
			let intercambios = await recuperarIntercambiosPublicosPorCriterios();
    		await formarPortadas(intercambios);
			await renderizarTabla(tablaIntercambios, intercambios);
    		mostrarIntercambio(intercambioSeleccionadoCompleto);
		});
		
		$("#inputNombreCartaQuerer").on("input", async function() {
			let intercambios = await recuperarIntercambiosPublicosPorCriterios();
    		await formarPortadas(intercambios);
			await renderizarTabla(tablaIntercambios, intercambios);
    		mostrarIntercambio(intercambioSeleccionadoCompleto);
		});
		
		//funcionalidad botones busqueda
		$(".botonOrden").off("click").click(async function() {
			let valor = $(this).data("id");
			$(".botonOrden").removeClass("seleccionada");
			if(ordenSeleccionado === valor) {
				ordenSeleccionado = null;
			} else {
				ordenSeleccionado = valor;
				$(this).addClass("seleccionada");
			}
			let intercambios = await recuperarIntercambiosPublicosPorCriterios();
    		await formarPortadas(intercambios);
    		await renderizarTabla(tablaIntercambios, intercambios);
	    	mostrarIntercambio(intercambioSeleccionadoCompleto);
		});
		
		//boton actualizar
		$("#botonActualizar").off("click").click(async function() {
			let intercambios = await recuperarIntercambiosPublicosPorCriterios();
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
	
	
	async function recuperarIntercambiosPublicosPorCriterios() {
		let criterios = {};
		criterios.usuarioId = usuario.id;
		criterios.nombreOfrecer = $("#inputNombreCartaOfrecer").val();
		criterios.nombreQuerer = $("#inputNombreCartaQuerer").val();
		criterios.ordenacion = ordenSeleccionado;
		let intercambios = await recuperarIntercambiosPublicos(criterios);
		return intercambios;
	}
	
	async function mostrarIntercambio(intercambio) {
		if(intercambio != null) {
			$("#popupMostrarIntercambio").show();
			let criteriosCreador = {};
			criteriosCreador.id = intercambio.ofertanteId;
			let creador = await recuperarCreadorIntercambio(criteriosCreador);
			let cartasOfrecer = intercambio.cartasOfrecer.split(";");
			if(cartasOfrecer.length == 1) {
				$("#textoOfrecer").text(creador.nombre + " ofrece la siguiente carta:").removeClass("textoOfrecer").addClass("textoOfrecerUna");
			} else {
				$("#textoOfrecer").text(creador.nombre + " ofrece una de las siguientes cartas:").removeClass("textoOfrecerUna").addClass("textoOfrecer");	
			}
			let contenedorOfrecer = document.getElementById("mostrarCartasOfrecer");
			contenedorOfrecer.innerHTML = "";
			contenedorOfrecer.className = "mostrarCartasOfrecer abanicoMostrarOfrecer-" + cartasOfrecer.length;
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
				$("#textoQuerer").text("A cambio de la siguiente carta:").removeClass("textoQuerer").addClass("textoQuererUna");
			} else {
				$("#textoQuerer").text("A cambio de una de las siguientes cartas:").removeClass("textoQuererUna").addClass("textoQuerer");
			}
			let contenedorQuerer = document.getElementById("mostrarCartasQuerer");
			contenedorQuerer.innerHTML = "";
			contenedorQuerer.className = "mostrarCartasQuerer abanicoMostrarQuerer-" + cartasQuerer.length;
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
    		
    		$("#textoQuererYo").text("Me quedo con esta carta:");
    		$("#textoOfrecerYo").text("Te doy esta carta:");
		}
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
				limpiarYCargarTabla();
			}catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Se han producido el siguiente error en el sistema:",error.message);
			}
		}
		$("#confirmarIntercambio").hide();
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
		let intercambioBBDD = await recuperarIntercambiosPublicos(criterios);
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
	
	//funcion seleccionar carta quiero
	$("#mostrarCartasOfrecer").on("click", ".carta", function() {
    	cartaQuieroSeleccionada = Array.from({ length: 1 }, () => ({
			expansionId: $(this).data("expansionId"),
			cartaJuegoId: $(this).data("cartaJuegoId"),
			src: $(this).attr("src")
		}));
		recargarOfrecer();
	});
	
	//funcion seleccionar carta doy
	$("#mostrarCartasQuerer").on("click", ".carta", function() {
    	cartaOfrezcoSeleccionada = Array.from({ length: 1 }, () => ({
			expansionId: $(this).data("expansionId"),
			cartaJuegoId: $(this).data("cartaJuegoId"),
			src: $(this).attr("src")
		}));
		recargarQuerer();
	});
	
	function recargarOfrecer() {
		let contenedor = document.getElementById("divCartaQuererYo");
		contenedor.innerHTML = "";
		cartaQuieroSeleccionada.forEach(async (carta, index) => {
    		let img = document.createElement("img");
    		img.classList.add("cartaQuererYo");
    		if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				img.classList.add("cartaIntercambioAniadida");
				img.src = carta.src;
				img.dataset.expansionId = carta.expansionId;
    			img.dataset.cartaJuegoId = carta.cartaJuegoId;
				img.dataset.posicion = carta.posicion;
     			$("#expansionQuererYo").show().attr("src", "/imagenes/expansiones/" + carta.expansionId + ".png");
     			$("#cartaJuegoIdQuererYo").show();
     			$("#cartaJuegoQuererYo").text(String(carta.cartaJuegoId).padStart(3, '0') + "/" + String(await recuperarTotalCartasExpansionId(carta.expansionId)).padStart(3, '0'));
			} else {
				img.src = "/crearIntercambio/imagenes/cartaVacia.png";
				img.dataset.expansionId = 0;
    			img.dataset.cartaJuegoId = 0;
    			$("#expansionQuererYo").hide();
    			$("#cartaJuegoIdQuererYo").hide();
			}
    		contenedor.appendChild(img);
		});
	}
	
	function recargarQuerer() {
		let contenedor = document.getElementById("divCartaOfrecerYo");
		contenedor.innerHTML = "";
		cartaOfrezcoSeleccionada.forEach(async (carta, index) => {
    		let img = document.createElement("img");
    		img.classList.add("cartaOfrecerYo");
    		if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				img.classList.add("cartaIntercambioAniadida");
				img.src = carta.src;
				img.dataset.expansionId = carta.expansionId;
    			img.dataset.cartaJuegoId = carta.cartaJuegoId;
				img.dataset.posicion = carta.posicion;
     			$("#expansionOfrecerYo").show().attr("src", "/imagenes/expansiones/" + carta.expansionId + ".png");
     			$("#cartaJuegoIdOfrecerYo").show();
     			$("#cartaJuegoOfrecerYo").text(String(carta.cartaJuegoId).padStart(3, '0') + "/" + String(await recuperarTotalCartasExpansionId(carta.expansionId)).padStart(3, '0'));
			} else {
				img.src = "/crearIntercambio/imagenes/cartaVacia.png";
				img.dataset.expansionId = 0;
    			img.dataset.cartaJuegoId = 0;
    			$("#expansionOfrecerYo").hide();
    			$("#cartaJuegoIdOfrecerYo").hide();
			}
    		contenedor.appendChild(img);
		});
	}
	
	//funcion eliminar carta que quiero
	$("#divCartaQuererYo").on("click", ".cartaIntercambioAniadida", function() {
		vaciarCartaQuiero();
	});
	
	//funcion eliminar carta que ofrezco
	$("#divCartaOfrecerYo").on("click", ".cartaIntercambioAniadida", function() {
		vaciarCartaOfrezco();
	});
	
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