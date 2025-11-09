$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let listaExpansiones = [];
	let listaRarezas = [];
	let listaEnergias = [];
	let listaTipos = [];
	let obtenida = null;
	
	limpiarBuscador();
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
		
		obtenida = null;
	}
	
	$("#inputNombreCarta").on("input", function() {
    	buscarCartasUsuarioPorCriterios();
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
		criterios.expansiones = listaExpansiones;
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
        	img.dataset.expansionId = carta.expansionId;
        	img.dataset.cartaJuegoId = carta.cartaJuegoId;
        	img.dataset.obtenida = carta.obtenida;
        	
	        if (!carta.obtenida) {
            	img.classList.add("deshabilitarParcial");
        	}
        	contenedor.appendChild(img);
    	});
    	contenedor.scrollTo({ top: 0, behavior: "smooth" });
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
	    span.textContent = contadorObtenida + "/"  + contadorTotal;
	    contenedor.appendChild(span);
	}
	
	//funcion seleccionar carta
	$("#mostrarCartas").on("click", ".carta", function() {
		let carta = {};
		carta.expansionId = $(this).data("expansionId");
		carta.cartaJuegoId = $(this).data("cartaJuegoId");
    	carta.obtenida = $(this).data("obtenida");
    	carta.src = $(this).attr("src");
    	abrirAmpliarCarta(carta);
	});
	

async function abrirAmpliarCarta(carta) {
    // Guardamos los campos importantes
    $("#cartaSeleccionada").data("expansion", carta.expansionId);
    $("#cartaSeleccionada").data("cartaJuegoId", carta.cartaJuegoId);
    $("#cartaSeleccionada").data("obtenida", carta.obtenida);
    

    // Mostramos el popup
    $("#cartaSeleccionada").show();
    
    // Actualizamos la expansion de la carta
     $("#infoExpansion").attr("src", "/imagenes/expansiones/" + carta.expansionId + ".png");
     
     //Actualizamos el numero de carta con respecto al total de cartas de la expansion
     $("#infoNumero").text(carta.cartaJuegoId + "/" + await recuperarTotalCartasExpansionId(carta.expansionId));

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
			popupErroresOConfirmacion.mostrar("error", "No puedes obtener una carta que ya tienes", "");
		} else {
			try {
				carta.obtenida = true;
				await actualizarObtenida(carta);
				popupErroresOConfirmacion.mostrar("success", "La carta ha sido añadida a la colección", "");
				$("#cartaSeleccionada").hide();
				buscarCartasUsuarioPorCriterios();	
			} catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Ha ocurrido el siguiente error en el sistema:", error.message);
			}
		}
	}
	
	async function quitarCarta(carta) {
		if(!carta.obtenida) {
			popupErroresOConfirmacion.mostrar("error", "No puedes eliminar una carta que no tienes", "");
		} else {
			try {
				carta.obtenida = false;
				await actualizarObtenida(carta);
				popupErroresOConfirmacion.mostrar("success","La carta ha sido eliminada de la colección", "");
				$("#cartaSeleccionada").hide();
				buscarCartasUsuarioPorCriterios();	
			} catch(error) {
				popupErroresOConfirmacion.mostrar("error", "Ha ocurrido el siguiente error en el sistema:", error);
			}
		}
	}
	
	async function actualizarObtenida(carta) {
		let cartaActualizar = {};
		cartaActualizar.usuarioId = usuario.id;
		cartaActualizar.expansionId = carta.expansionId;
		cartaActualizar.cartaJuegoId = carta.cartaJuegoId;
		cartaActualizar.obtenida = carta.obtenida;
		await actualizarCarta(cartaActualizar);
	}
	
	async function recuperarTotalCartasExpansionId(expansionId) {
		 return await recuperarTotalCartasExpansion(expansionId);
	}

});