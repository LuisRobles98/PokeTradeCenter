package com.poketradecenter.Service.implementaciones;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CartaIntercambio;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Mapper.interfaces.IIntercambioMapper;
import com.poketradecenter.Service.interfaces.ICartaIntercambioService;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ICrearIntercambioService;
import com.poketradecenter.Utilities.implementaciones.Constantes;

@Service
public class CrearIntercambioService implements ICrearIntercambioService {
	
	@Autowired
	private ICartaService cartaService;
	
	@Autowired
	private IIntercambioMapper intercambioMapper;
	
	@Autowired
	private ICartaIntercambioService cartaIntercambioService;
	
	@Override
	public List<Carta> recuperarCartasPorCriterios(CriteriosCarta criterios) {
		return cartaService.recuperarCartasCrearIntercambioPorCriterios(criterios);
	}
	
	@Override
	public void publicarIntercambio(Intercambio intercambio) {
		validarPublicarIntercambio(intercambio);
		rellenarDatosPublicar(intercambio);
		publicar(intercambio);
	}
	
	private void validarPublicarIntercambio(Intercambio intercambio) {
		//validar que las cartas ofertadas y queridas existen en el sistema
		List<Carta> cartasOfrecer = recuperarCartas(intercambio.getCartasOfrecer());
		List<Carta> cartasQuerer = recuperarCartas(intercambio.getCartasQuerer());
			
		//validar que hay al menos una carta que ofrezcas y quieras
		if(cartasOfrecer.isEmpty()) {
			throw new RuntimeException("No has seleccionado ninguna carta para ofrecer");
		}
		
		if(cartasQuerer.isEmpty()) {
			throw new RuntimeException("No has seleccionado ninguna carta para querer");
		}
		
		//validar que no hay una misma carta mas de una vez en ofrecer o en querer
		for(Carta carta1 : cartasOfrecer) {
			Integer contador = Constantes.CONTADOR_0;
			for(Carta carta2 : cartasOfrecer) {
				if(carta1.getExpansionId().equals(carta2.getExpansionId()) && carta1.getCartaJuegoId().equals(carta2.getCartaJuegoId())) {
					contador++;
				}
			}
			if(contador > Constantes.MAXIMO_CARTAS_IGUALES) {
				throw new RuntimeException("Has añadido una carta repetida en la sección de ofrecer");
			}
		}
		
		for(Carta carta1 : cartasQuerer) {
			Integer contador = Constantes.CONTADOR_0;
			for(Carta carta2 : cartasQuerer) {
				if(carta1.getExpansionId().equals(carta2.getExpansionId()) && carta1.getCartaJuegoId().equals(carta2.getCartaJuegoId())) {
					contador++;
				}
			}
			if(contador > Constantes.MAXIMO_CARTAS_IGUALES) {
				throw new RuntimeException("Has añadido una carta repetida en la sección de querer");
			}
		}
		
		//validar que no hay cartas iguales en ofrecer y querer
		for(Carta carta1 : cartasOfrecer) {
			for(Carta carta2 : cartasQuerer) {
				if(carta1.getExpansionId().equals(carta2.getExpansionId()) && carta1.getCartaJuegoId().equals(carta2.getCartaJuegoId())) {
					throw new RuntimeException("Has añadido una carta en ofrecer igual en querer");
				}
			}
		}
		
		//validar que hay al menos la misma rareza de ofrecer y querer
		for(Carta carta1 : cartasOfrecer) {
			boolean coincideRareza = false;
			for(Carta carta2 : cartasQuerer) {
				if(carta1.getRarezaId().equals(carta2.getRarezaId())) {
					coincideRareza = true;
				}
			}
			if(!coincideRareza) {
				throw new RuntimeException("No hay ninguna carta en la sección de querer que coincida en rareza con alguna de las cartas de la sección de ofrecer");
			}
		}
		
		for(Carta carta1 : cartasQuerer) {
			boolean coincideRareza = false;
			for(Carta carta2 : cartasOfrecer) {
				if(carta1.getRarezaId().equals(carta2.getRarezaId())) {
					coincideRareza = true;
				}
			}
			if(!coincideRareza) {
				throw new RuntimeException("No hay ninguna carta en la sección de ofrecer que coincida en rareza con alguna de las cartas de la sección de querer");
			}
		}
	}
	
	private void rellenarDatosPublicar(Intercambio intercambio) {
		intercambio.setContraparteId(null);
		intercambio.setEstadoId(Constantes.CREAR_INTERCAMBIO_ESTADO_SIN_OFERTA);
		intercambio.setCartaOfrecerFinalExpansionId(null);
		intercambio.setCartaOfrecerFinalCartaJuegoId(null);
		intercambio.setCartaQuererFinalExpansionId(null);
		intercambio.setCartaQuererFinalCartaJuegoId(null);
		intercambio.setFechaCreacion(LocalDateTime.now());
		intercambio.setFechaCambio(LocalDateTime.now());
	}
	
	private void publicar(Intercambio intercambio) {
		guardarIntercambio(intercambio);
		cartaIntercambioService.guardarCartasIntercambio(intercambio);
	}
	
	private void guardarIntercambio(Intercambio intercambio) {
		try {
			intercambioMapper.publicarIntercambio(intercambio);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al publicar el intercambio", e);
		}
	}
	
	private List<Carta> recuperarCartas(List<CartaIntercambio> cartas) {
		List<Carta> cartasDatosCompletos = new ArrayList<>();
		for(CartaIntercambio carta : cartas) {
			CriteriosCarta criterios = new CriteriosCarta();
			List<Integer> expansiones = new ArrayList<>();
			expansiones.add(carta.getExpansionId());
			criterios.setExpansiones(expansiones);
			criterios.setCartaJuegoId(carta.getCartaJuegoId());
			List<Carta> cartasBBDD = cartaService.recuperarCartasCrearIntercambioPorCriterios(criterios);
			if(cartasBBDD.isEmpty()) {
				throw new RuntimeException("No existe ninguna carta que coincida que la marcada en el sistema");
			}
			cartasDatosCompletos.add(cartasBBDD.get(Constantes.PRIMER_ELEMENTO));
		}	
		return cartasDatosCompletos;
	}
}