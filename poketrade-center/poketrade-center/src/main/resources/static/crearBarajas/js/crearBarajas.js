$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let listaExpansiones = [];
	let listaRarezas = [];
	let listaEnergias = [];
	let listaTipos = [];
	let cartasBaraja = [];
	
	limpiarBuscador();
	vaciarListadoBaraja();
	cargarCartas();
	
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
    	cartasBaraja = Array.from({ length: 20 }, (_, index) => ({
        	src: index < 2 ? "/crearBarajas/imagenes/cartaVacia2.png"
        		: "/crearBarajas/imagenes/cartaVacia.png",
        	expansionId: 0,
        	cartaJuegoId: 0
    	}));
    	
    	recargarBaraja();
	}
	
	function recargarBaraja() {
		let contenedor = document.getElementById("cartasBaraja");
		contenedor.innerHTML = "";
		cartasBaraja.forEach(carta => {
    		let img = document.createElement("img");
    		img.classList.add("cartaBaraja");
    		img.src = carta.src;
    		img.dataset.expansionId = carta.expansionId;
    		img.dataset.cartaJuegoId = carta.cartaJuegoId;
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
        	contenedor.appendChild(img);
    	});
	}
	
	//funcion añadir carta a la baraja
	$("#mostrarCartas").on("click", ".carta", function() {
		let carta = {};
		carta.expansionId = $(this).data("expansionId");
		carta.cartaJuegoId = $(this).data("cartaJuegoId");
    	carta.src = $(this).attr("src");
    	aniadirCartaABaraja(carta);
	});
	
	function aniadirCartaABaraja(nuevaCarta) {
		let insertada = false;
		cartasBaraja.forEach(carta => {
			if(carta.expansionId == 0 && carta.cartaJuegoId == 0 && !insertada) {
				carta.src = "/imagenes/cartas/" + nuevaCarta.expansionId + "/" + nuevaCarta.cartaJuegoId + ".png";
				carta.expansionId = nuevaCarta.expansionId;
        		carta.cartaJuegoId = nuevaCarta.cartaJuegoId;
        		insertada = true;
			}
		});
		recargarBaraja();
	}
		
});