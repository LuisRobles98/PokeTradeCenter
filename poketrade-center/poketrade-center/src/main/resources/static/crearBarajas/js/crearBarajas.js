$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let listaExpansiones = [];
	let listaRarezas = [];
	let listaEnergias = [];
	let listaTipos = [];
	let cartasBaraja = [];
	
	limpiar();
	
	function limpiar() {
		limpiarBuscador();
		vaciarListadoBaraja();
		cargarCartas();	
	}
	
	function limpiarBuscador() {
		//limpiamos input nombre carta
		$("#inputNombreCarta").val("");
		
		//vaciamos lista expansiones y eliminamos campos seleccionados
		listaExpansiones = [];
		$(".expansionCarta").removeClass("expansionSeleccionada");
		
		//vaciamos lista rarezas y eliminamos campos seleccionados
		listaRarezas = [];
		$(".rarezaCarta").removeClass("rarezaSeleccionada");
		
		//vaciamos lista energias y eliminamos campos seleccionados
		listaEnergias = [];
		$(".energiaCarta").removeClass("energiaSeleccionada");
		
		//vaciamos lista tipos y eliminamos campos seleccionados
		listaTipos = [];
		$(".tipoCarta").removeClass("tipoSeleccionada");
	}
	
	function vaciarListadoBaraja() {
		// Inicializar el array con 20 cartas vacías
    	cartasBaraja = Array.from({ length: 20 }, () => ({
			expansionId: 0,
			cartaJuegoId: 0,
			nombre: null,
			basico: null
		}));
    	recargarBaraja();
	}
	
	function recargarBaraja() {
		let contenedor = document.getElementById("cartasBaraja");
		contenedor.innerHTML = "";
		cartasBaraja.forEach((carta, index) => {
    		let img = document.createElement("img");
    		img.classList.add("cartaBaraja");
    		if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				img.classList.add("cartaBarajaAniadida");
				img.src = carta.src;
				img.dataset.nombre = carta.nombre;
				img.dataset.posicion = carta.posicion;
				img.dataset.basico = carta.basico;
			} else {
				img.src = index < 2 ? "/crearBarajas/imagenes/cartaVacia2.png"
        			: "/crearBarajas/imagenes/cartaVacia.png";
				img.dataset.expansionId = 0;
    			img.dataset.cartaJuegoId = 0;
    			img.dataset.nombre = null;
    			img.dataset.basico = null;
			}
    		contenedor.appendChild(img);
		});
	}
	
	$("#inputNombreCarta").on("input", function() {
    	buscarCartasBarajasPorCriterios();
	});
	
	//funcionalidad click expansiones
	$(".expansionCarta").click(function() {
		let id = $(this).data("id");
		if(listaExpansiones.includes(id)) {
        	// Quitar fondo gris y quitar de la lista
        	listaExpansiones = listaExpansiones.filter(e => e != id);
        	$(this).removeClass("expansionSeleccionada");
    	} else {
        	// Agregar fondo gris y añadir en la lista
        	listaExpansiones.push(id);
        	$(this).addClass("expansionSeleccionada");
    	}
    	buscarCartasBarajasPorCriterios();
	});
	
	//funcionalidad click rarezas
	$(".rarezaCarta").click(function() {
		let id = $(this).data("id");
		if(listaRarezas.includes(id)) {
        	// Quitar fondo gris y quitar de la lista
        	listaRarezas = listaRarezas.filter(e => e != id);
        	$(this).removeClass("rarezaSeleccionada");
    	} else {
        	// Agregar fondo gris y añadir en la lista
        	listaRarezas.push(id);
        	$(this).addClass("rarezaSeleccionada");
    	}
    	buscarCartasBarajasPorCriterios();
	});
	
	//funcionalidad click energia
	$(".energiaCarta").click(function() {
		let id = $(this).data("id");
		if(listaEnergias.includes(id)) {
        	// Quitar fondo gris y quitar de la lista
        	listaEnergias = listaEnergias.filter(e => e != id);
        	$(this).removeClass("energiaSeleccionada");
    	} else {
        	// Agregar fondo gris y añadir en la lista
        	listaEnergias.push(id);
        	$(this).addClass("energiaSeleccionada");
    	}
    	buscarCartasBarajasPorCriterios();
	});
	
	//funcionalidad click tipo
	$(".tipoCarta").click(function() {
		let id = $(this).data("id");
		if(listaTipos.includes(id)) {
        	// Quitar fondo gris y quitar de la lista
        	listaTipos = listaTipos.filter(e => e != id);
        	$(this).removeClass("tipoSeleccionada");
    	} else {
        	// Agregar fondo gris y añadir en la lista
        	listaTipos.push(id);
        	$(this).addClass("tipoSeleccionada");
    	}
    	buscarCartasBarajasPorCriterios();
	});
	
	//cargar cartas
	function cargarCartas() {
		$("#resultadosCartas").show();
		buscarCartasBarajasPorCriterios();
	}
	
	async function buscarCartasBarajasPorCriterios() {
		let criterios = {};
		criterios.expansiones = listaExpansiones;
		criterios.nombre = $("#inputNombreCarta").val();
		criterios.rarezas = listaRarezas;
		criterios.energias = listaEnergias;
		criterios.tipos = listaTipos;
		let cartas = await recuperarCartasBarajasPorCriterios(criterios);
		mostrarCartas(cartas)
	}
	

	function mostrarCartas(cartas) {
		let contenedor = document.getElementById("mostrarCartas");
		contenedor.innerHTML = "";
		cartas.forEach(carta => {
        	let img = document.createElement("img");
        	img.classList.add("carta"); // clase para aplicar CSS
        	img.src = "/imagenes/cartas/" + carta.expansionId + "/" + carta.cartaJuegoId + ".png";
        	img.dataset.expansionId = carta.expansionId;
        	img.dataset.cartaJuegoId = carta.cartaJuegoId;
        	img.dataset.nombre = carta.nombre;
        	img.dataset.basico = carta.basico;
        	contenedor.appendChild(img);
    	});
		contenedor.scrollTo({ top: 0, behavior: "smooth" });
	}
	
	//funcion añadir carta a la baraja
	$("#mostrarCartas").on("click", ".carta", function() {
		let carta = {};
		carta.expansionId = $(this).data("expansionId");
		carta.cartaJuegoId = $(this).data("cartaJuegoId");
    	carta.src = $(this).attr("src");
    	carta.nombre = $(this).data("nombre");
    	carta.basico = $(this).data("basico");
    	aniadirCartaBaraja(carta);
	});
	
	function aniadirCartaBaraja(nuevaCarta) {
		let insertada = false;
		cartasBaraja.forEach((carta, index) => {
			if(carta.expansionId == 0 && carta.cartaJuegoId == 0 && !insertada) {
				carta.src = "/imagenes/cartas/" + nuevaCarta.expansionId + "/" + nuevaCarta.cartaJuegoId + ".png";
				carta.expansionId = nuevaCarta.expansionId;
        		carta.cartaJuegoId = nuevaCarta.cartaJuegoId;
        		carta.nombre = nuevaCarta.nombre;
        		carta.basico = nuevaCarta.basico;
        		carta.posicion = index;
        		insertada = true;
			}
		});
		recargarBaraja();
	}
	
	//funcion eliminar carta de la baraja
	$("#cartasBaraja").on("click", ".cartaBarajaAniadida", function() {
		let posicionEliminar = $(this).data("posicion");
    	eliminarCartaBaraja($(this).data("posicion"));
	});
	
	function eliminarCartaBaraja(posicionEliminar) {
		const index = cartasBaraja.findIndex(carta => carta.posicion === posicionEliminar);
		if (index !== -1) {
    		cartasBaraja.splice(index, 1);
    		cartasBaraja.push({
    			expansionId: 0,
    			cartaJuegoId: 0,
    			nombre: null,
    			basico: null
  			});
  		}
		recargarBaraja();
	}
	
	$("#btnGuardar").off("click").on("click", () => {
		guardarBaraja();
    });
    
	$("#btnGuardarYPublicar").off("click").on("click", () => {
		guardarYPublicarBaraja();
    });
    
    function guardarBaraja() {
		let errores = validarDatos();
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			//guardar(cartasBaraja);
			popupErroresOConfirmacion.mostrar("success", "Se ha guardado correctamente la baraja. Podrás verla en la aplicación de 'Mis barajas'");
			limpiar()
		}
	}
	
    function guardarYPublicarBaraja() {
		let errores = validarDatos();
		if(errores != ""){
			popupErroresOConfirmacion.mostrar("error", "Se han producido los siguientes errores:",errores);
		} else {
			//guardarYPublicar(cartasBaraja);
			popupErroresOConfirmacion.mostrar("success", "Se ha guardado correctamente la baraja. Podrás verla en la aplicación de 'Mis barajas'");
			limpiar()
		}
	}
	
	function validarDatos() {
		let errores = "";
		//validar que hay 20 cartas
		let contadorCartas = 0;
		cartasBaraja.forEach(carta => {
			if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				contadorCartas++;
			}
		});
		if(contadorCartas != 20) {
			errores += "- La baraja tiene que tener 20 cartas" + "<br>";
		}
		
		//validar que no hay una misma carta mas de dos veces
		let masDeDosCartas = new Set();
		cartasBaraja.forEach(carta1 => {
			if(carta1.expansionId != 0 && carta1.cartaJuegoId != 0) {
				let contadorCartas = 0;
				let nombreCarta = carta1.nombre;
				cartasBaraja.forEach(carta2 => {
					if(carta2.expansionId != 0 && carta2.cartaJuegoId != 0) {
						if(carta1.expansionId == carta2.expansionId && carta1.cartaJuegoId == carta2.cartaJuegoId) {
							contadorCartas++;
						}
					}
				});
				if(contadorCartas > 2) {
					masDeDosCartas.add(nombreCarta);
				}
			}
		});
		
		masDeDosCartas.forEach(nombreCarta => {
			errores += "- La carta " + nombreCarta + " no puede estar más de dos veces" + "<br>";
		});
		
		//validar que hay al menos una carta básica
		let hayCartaBasica = false;
		cartasBaraja.forEach(carta => {
			if(carta.expansionId != 0 && carta.cartaJuegoId != 0) {
				if(carta.basico) {
					hayCartaBasica = true;
				}
			}
		});
		
		if(!hayCartaBasica) {
			errores += "- La baraja tiene que tener al menos una carta básica" + "<br>";
		}
		
		return errores;
	}
});