$(document).ready(function() {
	//constantes
	let usuario = usuarioLogado.recuperar();
	let expansionSeleccionada = null;
	let listaRarezas = [];
	let listaEnergias = [];
	let listatipos = [];

	limpiarAplicacion();
	
	//abrir cada expansion
	$("#expansionGenesFormidables").click(function() {
		expansionSeleccionada = 1;
		seleccionarExpansion(expansionSeleccionada, $(this).attr("id"));
	});
	$("#expansionLaIslaSingular").click(function() {
		expansionSeleccionada = 2;
		seleccionarExpansion(expansionSeleccionada, $(this).attr("id"));
	});
	$("#expansionPugnaEspaciotemporal").click(function() {
		expansionSeleccionada = 3;
		seleccionarExpansion(expansionSeleccionada);
	});
	$("#expansionLuzTriunfal").click(function() {
		expansionSeleccionada = 4;
		seleccionarExpansion(expansionSeleccionada, $(this).attr("id"));
	});
	$("#expansionFestivalBrillante").click(function() {
		expansionSeleccionada = 5;
		seleccionarExpansion(expansionSeleccionada, $(this).attr("id"));
	});
	$("#expansionGuardianesCelestiales").click(function() {
		expansionSeleccionada = 6;
		seleccionarExpansion(expansionSeleccionada, $(this).attr("id"));
	});
	$("#expansionCrisisDimensional").click(function() {
		expansionSeleccionada = 7;
		seleccionarExpansion(expansionSeleccionada, $(this).attr("id"));
	});
	$("#expansionArboledaDeEevee").click(function() {
		expansionSeleccionada = 8;
		seleccionarExpansion(expansionSeleccionada, $(this).attr("id"));
	});
	$("#expansionSaberMarinoYCeleste").click(function() {
		expansionSeleccionada = 9;
		seleccionarExpansion(expansionSeleccionada, $(this).attr("id"));
	});
	$("#expansionManantialOculto").click(function() {
		expansionSeleccionada = 10;
		seleccionarExpansion(expansionSeleccionada, $(this).attr("id"));
	});
	$("#expansionPromoA").click(function() {
		expansionSeleccionada = -1;
		seleccionarExpansion(expansionSeleccionada, $(this).attr("id"));
	});
	
	async function seleccionarExpansion(expansionSeleccionada, imagen) {
		cargarBuscador(expansionSeleccionada, imagen)
	}
	
	function cargarBuscador(expansionSeleccionada, imagen) {
		$("#buscadorCartas").show();
		$("#imagenPopupBuscador").attr("src", "/imagenes/expansiones/" + imagen + ".png");
		cargarComboRareza();
		cargarComboEnergia();
		cargarComboTipo();
	}
	
	
	$("#romboX1RarezaCarta").click(function() {
		insertarEliminarRareza("romboX1RarezaCarta", 1);
	});
	
	$("#romboX2RarezaCarta").click(function() {
		insertarEliminarRareza("romboX2RarezaCarta", 2);
	});
	
	$("#romboX3RarezaCarta").click(function() {
		insertarEliminarRareza("romboX3RarezaCarta", 3);
	});
	
	$("#romboX4RarezaCarta").click(function() {
		insertarEliminarRareza("romboX4RarezaCarta", 4);
	});
	
	$("#estrellaX1RarezaCarta").click(function() {
		insertarEliminarRareza("estrellaX1RarezaCarta", 5);
	});
	
	$("#estrellaX2RarezaCarta").click(function() {
		insertarEliminarRareza("estrellaX2RarezaCarta", 6);
	});
	
	$("#estrellaX3RarezaCarta").click(function() {
		insertarEliminarRareza("estrellaX3RarezaCarta", 7);
	});
	
	$("#estrellaSX1RarezaCarta").click(function() {
		insertarEliminarRareza("estrellaSX1RarezaCarta", 8);
	});
	
	$("#estrellaSX2RarezaCarta").click(function() {
		insertarEliminarRareza("estrellaSX2RarezaCarta", 9);
	});
	
	$("#coronaX1RarezaCarta").click(function() {
		insertarEliminarRareza("coronaX1RarezaCarta", 10);
	});
	
	function insertarEliminarRareza(elemento, id) {
		$("#" + elemento).toggleClass("rarezaSeleccionada");
		for(let i in listaRarezas) {
			if(listaRarezas[i] == id) {
				listaRarezas = listaRarezas.filter(e => e != id);
				return;
			}
		}
		listaRarezas.push(id);
	}
	
	
	
	
	
	
	//TODO QUITAR TODOS LOS COMBOS
	function cargarComboRareza() {
		const comboRareza = document.getElementById("comboRareza");
		combo.cargarRareza(comboRareza);
	}
	
	function cargarComboEnergia() {
		const comboEnergia = document.getElementById("comboEnergia");
		combo.cargarEnergia(comboEnergia);
	}
	
	function cargarComboTipo() {
		const comboTipo = document.getElementById("comboTipo");
		combo.cargarTipo(comboTipo);
	}
	
	function limpiarAplicacion() {
		
	}
		
	
});