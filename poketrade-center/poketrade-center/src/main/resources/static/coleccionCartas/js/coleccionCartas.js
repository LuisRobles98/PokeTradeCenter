$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let expansionSeleccionada = null;
	let listaRarezas = [];
	let listaEnergias = [];
	let listaTipos = [];
	let obtenida = null;
	
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
		
		obtenida = null;
	}
	
	$("#inputNombreCarta").on("input", function() {
    	buscarCartasUsuarioPorCriterios();
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
    	buscarCartasUsuarioPorCriterios();
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
    	buscarCartasUsuarioPorCriterios();
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
    	buscarCartasUsuarioPorCriterios();
	});
	
	//funcionalidad click obtenidas
	$(".obtenidaCarta").click(function() {
		let valor = $(this).data("id");
		$(".obtenidaCarta").removeClass("obtenidaSeleccionada");
		if(obtenida === valor) {
			obtenida = null;
		} else {
			obtenida = valor;
			$(this).addClass("obtenidaSeleccionada");
		}
    	buscarCartasUsuarioPorCriterios();
	});
	
	//cargar cartas
	function cargarCartas() {
		$("#resultadosCartas").show();
		buscarCartasUsuarioPorCriterios();
	}
	
	async function buscarCartasUsuarioPorCriterios() {
		let criterios = {};
		criterios.usuarioId = usuario.id;
		criterios.expansionId = expansionSeleccionada;
		criterios.nombre = $("#inputNombreCarta").val();
		criterios.rarezas = listaRarezas;
		criterios.energias = listaEnergias;
		criterios.tipos = listaTipos;
		criterios.obtenida = obtenida;
		let cartas = await recuperarCartasUsuarioPorCriterios(criterios);
		mostrarResultados(cartas);
	}
	
	function mostrarResultados(cartas) {
		mostrarCartas(cartas);
		calcularContadores(cartas);
	}
	
	function mostrarCartas(cartas) {
		let contenedor = document.getElementById("mostrarCartas");
		contenedor.innerHTML = "";
		cartas.forEach(carta => {
        	let img = document.createElement("img");
        	img.classList.add("carta"); // clase para aplicar CSS
        	img.src = "/imagenes/cartas/" + carta.expansionId + "/" + carta.cartaJuegoId + ".png";
        	img.dataset.id = carta.id;
        	img.dataset.obtenida = carta.obtenida;
        	
	        if (!carta.obtenida) {
            	img.classList.add("deshabilitarParcial");
        	}
        	contenedor.appendChild(img);
    	});
	}
	
	function calcularContadores(cartas) {
		calcularContador("contadorResultadoRombo", "rombo", 1, 4, cartas);
		calcularContador("contadorResultadoEstrella", "estrella", 5, 7, cartas);
		calcularContador("contadorResultadoEstrellaS", "estrellaS", 8, 9, cartas);
		calcularContador("contadorResultadoCorona", "corona", 10, 10, cartas);
	}
	
	function calcularContador(elemento, simbolo, limiteInf, limiteSup, cartas) {
		let contenedor = document.getElementById(elemento);
		contenedor.innerHTML = "";

		let contadorTotal = 0;
		let contadorObtenida = 0;

		
		cartas.forEach(carta => {
			
			if(carta.rarezaId >= limiteInf && carta.rarezaId <= limiteSup) {
				contadorTotal++;
				if(carta.obtenida) {
					contadorObtenida++;
				}
			}
    	});
    	
	    // Creamos la imagen del símbolo de rareza
	    let img = document.createElement("img");
	    img.src = "/imagenes/rarezas/" + simbolo + ".png";
	    contenedor.appendChild(img);
	
	    // Creamos el span con el contador
	    let span = document.createElement("span");
	    span.textContent = " - " + contadorObtenida + "/"  + contadorTotal;
	    contenedor.appendChild(span);
	}
	
	//funcion seleccionar carta
	$("#mostrarCartas").on("click", ".carta", function() {
		let carta = {};
		carta.id = $(this).data("id");
    	carta.obtenida = $(this).data("obtenida");
    	carta.src = $(this).attr("src");
    	abrirAmpliarCarta(carta);
	});
	

function abrirAmpliarCarta(carta) {
    // Guardamos los campos importantes
    $("#cartaSeleccionada").data("id", carta.id);
    $("#cartaSeleccionada").data("obtenida", carta.obtenida);

    // Mostramos el popup
    $("#cartaSeleccionada").show();

    // Actualizamos la imagen del popup
    $("#cartaSeleccionadaAmpliada").attr("src", carta.src);

    // Deshabilitamos la carta si no la tenemos
    if (!carta.obtenida) {
        $("#cartaSeleccionadaAmpliada").addClass("deshabilitarParcial");
    } else {
        $("#cartaSeleccionadaAmpliada").removeClass("deshabilitarParcial");
    }

    // ----------------- ROTACIÓN 3D SEGUIMIENTO CLICK -----------------
    let girando = false;
    let rotX = 0;
    let rotY = 0;
    let lastX = 0;
    let lastY = 0;

    $("#cartaSeleccionadaAmpliada").off(".rotar"); // limpiar eventos previos

    $("#cartaSeleccionadaAmpliada").on("mousedown.rotar", function(e) {
        e.preventDefault();
        girando = true;
        lastX = e.clientX;
        lastY = e.clientY;
    });

    $(document).on("mouseup.rotar", function() {
        if (!girando) return;
        girando = false;

        // Volver al centro suavemente al soltar
        rotX = 0;
        rotY = 0;
        $("#cartaSeleccionadaAmpliada").css("transform", `rotateX(0deg) rotateY(0deg)`);
    });

    $(document).on("mousemove.rotar", function(e) {
        if (!girando) return;

        // Rotación intuitiva
        rotY += (e.clientX - lastX) / 5; // derecha → derecha, izquierda → izquierda
        rotX -= (e.clientY - lastY) / 5; // abajo → abajo, arriba → arriba

        // Limitar giro máximo
        rotY = Math.max(Math.min(rotY, 45), -45);
        rotX = Math.max(Math.min(rotX, 45), -45);

        $("#cartaSeleccionadaAmpliada").css("transform", `rotateX(${rotX}deg) rotateY(${rotY}deg)`);

        lastX = e.clientX;
        lastY = e.clientY;
    });

    // ----------------- BOTÓN SALIR -----------------
    $("#btnSalir").off("click").on("click", () => {
        $("#cartaSeleccionada").hide();
        $("#cartaSeleccionadaAmpliada").css("transform", "rotateX(0deg) rotateY(0deg)");
        $("#cartaSeleccionadaAmpliada").off(".rotar"); // quitar eventos de rotación
    });

    // ----------------- BOTÓN OBTENER -----------------
    $("#btnObtener").off("click").on("click", () => {
		
		obtenerCarta(carta);		
        $("#cartaSeleccionadaAmpliada").css("transform", "rotateX(0deg) rotateY(0deg)");
        $("#cartaSeleccionadaAmpliada").off(".rotar");
    });

    // ----------------- BOTÓN QUITAR -----------------
    $("#btnQuitar").off("click").on("click", () => {
		
		quitarCarta(carta);
        $("#cartaSeleccionadaAmpliada").css("transform", "rotateX(0deg) rotateY(0deg)");
        $("#cartaSeleccionadaAmpliada").off(".rotar");
    });
}

	async function obtenerCarta(carta) {
		if(carta.obtenida) {
			popupErroresOConfirmacion.mostrar("error", "No se ha podido añadir esta carta de la colección", "Ya tienes esta carta");
		} else {
			carta.obtenida = true;
			await actualizarObtenida(carta);
			popupErroresOConfirmacion.mostrar("success", "La carta ha sido añadida a la colección");
			$("#cartaSeleccionada").hide();
			buscarCartasUsuarioPorCriterios();
		}
	}
	
	async function quitarCarta(carta) {
				if(!carta.obtenida) {
			popupErroresOConfirmacion.mostrar("error", "No se ha podido quitar esta carta de la colección", "No tienes esta carta");
		} else {
			carta.obtenida = false;
			await actualizarObtenida(carta);
			popupErroresOConfirmacion.mostrar("success", "La carta ha sido eliminada de la colección");
			$("#cartaSeleccionada").hide();
			buscarCartasUsuarioPorCriterios();
		}
	}
	
	async function actualizarObtenida(carta) {
		let cartaActualizar = {};
		cartaActualizar.id = carta.id;
		cartaActualizar.obtenida = carta.obtenida;
		await actualizarCarta(cartaActualizar);
	}

});