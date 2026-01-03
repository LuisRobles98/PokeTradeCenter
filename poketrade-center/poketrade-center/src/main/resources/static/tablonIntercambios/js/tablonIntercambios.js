$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let barajaSeleccionadaCompleta = null;
	let barajaSeleccionada = null;
	let ordenSeleccionado = null;
	let portadasMostrar = [];
	limpiarYCargarTabla();
	
	function limpiarYCargarTabla() {
		$("#popupMostrarBaraja").hide();
		$("#inputNombreCartaOfrecer").val("");
		$("#inputNombreCartaQuerer").val("");
		barajaSeleccionadaCompleta = null
		barajaSeleccionada = null;
		ordenSeleccionado = null;
		initTabla();
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
						 let portada = portadasMostrar.find(p => p.barajaId == d.id);
						 let imgPortada = portada ? portada.imgPortada : "";
                    	 let imgFondo = portada ? portada.imgFondo : "";
                    	 let nombre = portada ? portada.nombre : "";
                    	 let meGusta = portada ? portada.meGusta : 0;
						 					
	 					 return `<div class="tablaCell">
	 					 			<img class="fondo" src="${imgFondo}">
	                        		<img class="portada" src="${imgPortada}">
	                        		<span>${nombre}<i class="fa-regular fa-heart" style="color:red; margin-left: 20px;"></i>           ${meGusta}</span>
	                    		</div>`;
					}
				}
			]
		});
			
		tablaIntercambios.on("rowClick", function(e, row){
			barajaSeleccionadaCompleta = row.getData();
			barajaSeleccionada = row.getData().id;
	    	mostrarBaraja(row.getData());
		});
		
		$("#inputNombreCartaOfrecer").on("input", async function() {
			let barajas = await recuperarIntercambiosPublicosPorCriterios();
    		await formarPortadas(barajas);
			await renderizarTabla(tablaIntercambios, barajas);
    		mostrarBaraja(barajaSeleccionadaCompleta);
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
			let barajas = await recuperarIntercambiosPublicosPorCriterios();
    		await formarPortadas(barajas);
    		await renderizarTabla(tablaIntercambios, barajas);
	    	mostrarBaraja(barajaSeleccionadaCompleta);
		});
		
		//boton actualizar
		$("#botonActualizar").click(async function() {
			let barajas = await recuperarIntercambiosPublicosPorCriterios();
    		await formarPortadas(barajas);
			await renderizarTabla(tablaIntercambios, barajas);
			mostrarBaraja(barajaSeleccionadaCompleta);
		});
	}
	
	async function formarPortadas(intercambiosRecuperadas) {
		let portadas = [];
		
		for (const intercambio of intercambiosRecuperadas) {
			let portada = {};
			portada.imgPortadaOfrecer = [];
			let cartasOfrecer = intercambio.cartasOfrecer.split(";").filter(c => c.trim() !== "");;
			portada.imgPortadaQuerer = [];
			let cartasQuerer = intercambio.cartasQuerer.split(";").filter(c => c.trim() !== "");;

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
	
	async function mostrarBaraja(baraja) {
		if(baraja != null) {
			$("#popupMostrarBaraja").show();
			let criterios = {};
			criterios.id = baraja.creadorId;
			let creador = await recuperarCreador(criterios);
			$("#textoCreador").text(baraja.nombre + " creada por " + creador.nombre);
			let contenedor = document.getElementById("mostrarCartas");
			contenedor.innerHTML = "";
			let cartas = baraja.cartas.split(";");
			cartas.pop();//para eliminar el ultimo creado por el split ";"
			cartas.forEach(carta => {
				let img = document.createElement("img");
        		img.classList.add("carta");
        		let [expansionId, cartaJuegoId] = carta.split(",");
        		img.src = "/imagenes/cartas/" + expansionId + "/" + cartaJuegoId + ".png";
        		contenedor.appendChild(img);
			});
    		contenedor.scrollTo({ top: 0, behavior: "smooth" });
		}
	}
		
	$("#btnMeGusta").click(function() {
		$("#confirmarDarMeGusta").show();
	});
	
	$("#btnGuardarBaraja").click(function() {
		$("#confirmarGuardar").show();
	});
	
	$("#btnCancelar").click(function() {
		$("#confirmarDarMeGusta").hide();
	});
	
	$("#btnCancelarGuardar").click(function() {
		$("#confirmarGuardar").hide();
	});
	
	$("#btnLike").click(async function() {
		if(! await comprobarSiLike()) {
			await darLike();
			popupErroresOConfirmacion.mostrar("success", "Se ha dado like a la baraja correctamente", "");
			$("#botonActualizar").click();
		} else {
			popupErroresOConfirmacion.mostrar("error", "Ya has dado like a esta baraja", "");
			mostrarBaraja(barajaSeleccionadaCompleta);
		}
		
		$("#confirmarDarMeGusta").hide();
	});
	
	$("#btnGuardar").click(async function() {
		await guardarBaraja();
		popupErroresOConfirmacion.mostrar("success", "Se ha guardado correctamente la baraja. Podrás verla en la aplicación de 'Mis barajas'", "");
		$("#botonActualizar").click();
		$("#confirmarGuardar").hide();
	});
	
	async function comprobarSiLike() {
		let criterios = {};
		criterios.usuarioId = usuario.id;
		criterios.barajaId = barajaSeleccionada;
		return await comprobarSiLikeABaraja(criterios);
	}
	
	async function darLike() {
		let criterios = {};
		criterios.usuarioId = usuario.id;
		criterios.barajaId = barajaSeleccionada;
		await darLikeABaraja(criterios);
	}
	
	async function guardarBaraja() {
		let criterios = {};
		criterios.usuarioId = usuario.id;
		criterios.barajaId = barajaSeleccionada;
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