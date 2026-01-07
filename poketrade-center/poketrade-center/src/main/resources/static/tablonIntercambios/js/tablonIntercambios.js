$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let ordenSeleccionado = null;
	let portadasMostrar = [];
	let cartaQuieroSeleccionada = [];
	let cartaOfrezcoSeleccionada = [];
	let intercambioSeleccionadaCompleta = null;
	limpiarYCargarTabla();
	
	function limpiarYCargarTabla() {
		$("#popupMostrarIntercambio").hide();
		$("#inputNombreCartaOfrecer").val("");
		$("#inputNombreCartaQuerer").val("");
		ordenSeleccionado = null;
		intercambioSeleccionadaCompleta = null;
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
		let intercambiosRecuperadas = await recuperarIntercambiosPublicosPorCriterios()
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
			intercambioSeleccionadaCompleta = row.getData();
			vaciarCartaQuiero();
			vaciarCartaOfrezco();
			mostrarIntercambio(row.getData());
		});
		
		$("#inputNombreCartaOfrecer").on("input", async function() {
			let intercambios = await recuperarIntercambiosPublicosPorCriterios();
    		await formarPortadas(intercambios);
			await renderizarTabla(tablaIntercambios, intercambios);
    		mostrarIntercambio(intercambioSeleccionadaCompleta);
		});
		
		$("#inputNombreCartaQuerer").on("input", async function() {
			let intercambios = await recuperarIntercambiosPublicosPorCriterios();
    		await formarPortadas(intercambios);
			await renderizarTabla(tablaIntercambios, intercambios);
    		mostrarIntercambio(intercambioSeleccionadaCompleta);
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
			let intercambios = await recuperarIntercambiosPublicosPorCriterios();
    		await formarPortadas(intercambios);
    		await renderizarTabla(tablaIntercambios, intercambios);
	    	mostrarIntercambio(intercambioSeleccionadaCompleta);
		});
		
		//boton actualizar
		$("#botonActualizar").click(async function() {
			let intercambios = await recuperarIntercambiosPublicosPorCriterios();
    		await formarPortadas(intercambios);
			await renderizarTabla(tablaIntercambios, intercambios);
			mostrarIntercambio(intercambioSeleccionadaCompleta);
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
		return await recuperarCartaPrincipal(criterios);
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
			
			//let creador = await recuperarCreador();
			if(intercambio.cartasOfrecer.length == 1) {
				$("#textoOfrecer").text("" + " ofrece la siguiente carta:");
			} else {
				$("#textoOfrecer").text("" + " ofrece una de las siguientes cartas:");	
			}
			let contenedorOfrecer = document.getElementById("mostrarCartasOfrecer");
			contenedorOfrecer.innerHTML = "";
			let cartasOfrecer = intercambio.cartasOfrecer.split(";");
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
    		
    		if(intercambio.cartasQuerer.length == 1) {
				$("#textoQuerer").text("A cambio de la siguiente carta:");
			} else {
				$("#textoQuerer").text("A cambio de una de las siguientes cartas:");
			}
			let contenedorQuerer = document.getElementById("mostrarCartasQuerer");
			contenedorQuerer.innerHTML = "";
			let cartasQuerer = intercambio.cartasQuerer.split(";")
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
		$("#confirmarGuardar").show();
	});
	
	$("#btnCancelar").click(function() {
		$("#confirmarDarMeGusta").hide();
	});
	
	$("#btnCancelarGuardar").click(function() {
		$("#confirmarGuardar").hide();
	});
	

	$("#btnGuardar").click(async function() {
		await guardarBaraja();
		popupErroresOConfirmacion.mostrar("success", "Se ha guardado correctamente la baraja. Podrás verla en la aplicación de 'Mis barajas'", "");
		$("#botonActualizar").click();
		$("#confirmarGuardar").hide();
	});
	
	
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
		cartaQuieroSeleccionada.forEach((carta, index) => {
    		let img = document.createElement("img");
    		img.classList.add("cartaQuererYo");
    		if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				img.classList.add("cartaIntercambioAniadida");
				img.src = carta.src;
				img.dataset.expansionId = carta.expansionId;
    			img.dataset.cartaJuegoId = carta.cartaJuegoId;
				img.dataset.posicion = carta.posicion;
			} else {
				img.src = "/crearIntercambio/imagenes/cartaVacia.png";
				img.dataset.expansionId = 0;
    			img.dataset.cartaJuegoId = 0;
			}
    		contenedor.appendChild(img);
		});
	}
	
	function recargarQuerer() {
		let contenedor = document.getElementById("divCartaOfrecerYo");
		contenedor.innerHTML = "";
		cartaOfrezcoSeleccionada.forEach((carta, index) => {
    		let img = document.createElement("img");
    		img.classList.add("cartaOfrecerYo");
    		if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				img.classList.add("cartaIntercambioAniadida");
				img.src = carta.src;
				img.dataset.expansionId = carta.expansionId;
    			img.dataset.cartaJuegoId = carta.cartaJuegoId;
				img.dataset.posicion = carta.posicion;
			} else {
				img.src = "/crearIntercambio/imagenes/cartaVacia.png";
				img.dataset.expansionId = 0;
    			img.dataset.cartaJuegoId = 0;
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

	async function guardarBaraja() {
		let criterios = {};
		criterios.usuarioId = usuario.id;
		await guardarBarajaPublica(criterios);
	}
	
	async function renderizarTabla(tablaIntercambios, barajas) {
		tablaIntercambios.replaceData(barajas);
		let rows = tablaIntercambios.getRows();
		if (rows.length > 0) {
   			rows[0].scrollTo({top: 0, behavior: "smooth"});
		}
	}
	
});