$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let expansionSeleccionada = null;
	let listaRarezas = [];
	let listaEnergias = [];
	let listaTipos = [];
	
	$(".expansionLogo").click(function() {
		limpiarBuscador();
		$("#buscadorCartas").show();
		expansionSeleccionada = $(this).data("id");
		let imagen = $(this).attr("id");
		$("#imagenPopupBuscador").attr("src", "/imagenes/expansiones/" + imagen + ".png");
		cargarCartas();
	});
	
	function limpiarBuscador() {
		//quitamos campo expansion
		expansionSeleccionada = null;
		
		//limpiamos input nombre carta
		$("#inputNombreCarta").val("");
		
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
	});
	
	//cargar cartas
	function cargarCartas() {
		$("#resultadosCartas").show();
	}
	
	
});