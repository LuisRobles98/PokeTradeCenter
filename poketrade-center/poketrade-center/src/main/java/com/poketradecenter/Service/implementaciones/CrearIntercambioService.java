package com.poketradecenter.Service.implementaciones;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Mapper.interfaces.IIntercambioMapper;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ICrearIntercambioService;

@Service
public class CrearIntercambioService implements ICrearIntercambioService {
	
	@Autowired
	private ICartaService cartaService;
	
	@Autowired
	private IIntercambioMapper intercambioMapper;
	
	
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
		List<Carta> cartasOfrecer = recuperarCartasOfrecer(intercambio);
		List<Carta> cartasQuerer = recuperarCartasQuerer(intercambio);
			
		//validar que hay al menos una carta que ofrezcas y quieras
		if(cartasOfrecer.isEmpty()) {
			throw new RuntimeException("No has seleccionado ninguna carta para ofrecer");
		}
		
		if(cartasQuerer.isEmpty()) {
			throw new RuntimeException("No has seleccionado ninguna carta para querer");
		}
		
		//validar que no hay una misma carta mas de una vez en ofrecer o en querer
		for(Carta carta1 : cartasOfrecer) {
			Integer contador = 0;
			for(Carta carta2 : cartasOfrecer) {
				if(carta1.getExpansionId() == carta2.getExpansionId() && carta1.getCartaJuegoId() == carta2.getCartaJuegoId()) {
					contador++;
				}
			}
			if(contador > 1) {
				throw new RuntimeException("Has añadido una carta repetida en la sección de ofrecer");
			}
		}
		
		for(Carta carta1 : cartasQuerer) {
			Integer contador = 0;
			for(Carta carta2 : cartasQuerer) {
				if(carta1.getExpansionId() == carta2.getExpansionId() && carta1.getCartaJuegoId() == carta2.getCartaJuegoId()) {
					contador++;
				}
			}
			if(contador > 1) {
				throw new RuntimeException("Has añadido una carta repetida en la sección de querer");
			}
		}
		
		//validar que no hay cartas iguales en ofrecer y querer
		for(Carta carta1 : cartasOfrecer) {
			for(Carta carta2 : cartasQuerer) {
				if(carta1.getExpansionId() == carta2.getExpansionId() && carta1.getCartaJuegoId() == carta2.getCartaJuegoId()) {
					throw new RuntimeException("Has añadido una carta en ofrecer igual en querer");
				}
			}
		}
		
		
		//validar que hay al menos la misma rareza de ofrecer y querer
		for(Carta carta1 : cartasOfrecer) {
			boolean coincideRareza = false;
			for(Carta carta2 : cartasQuerer) {
				if(carta1.getRarezaId() == carta2.getRarezaId()) {
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
				if(carta1.getRarezaId() == carta2.getRarezaId()) {
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
		
		List<Carta> cartasOfrecer = recuperarCartasOfrecer(intercambio);
		String nombreCartasOfrecerIntercambio = cartasOfrecer.stream().map(Carta::getNombre).collect(Collectors.joining(" "));
		intercambio.setCartasOfrecerNombre(nombreCartasOfrecerIntercambio);
		
		List<Carta> cartasQuerer = recuperarCartasQuerer(intercambio);
		String nombreCartasQuererIntercambio = cartasQuerer.stream().map(Carta::getNombre).collect(Collectors.joining(" "));
		intercambio.setCartasQuererNombre(nombreCartasQuererIntercambio);
		
		intercambio.setEstadoId(1);//abierta
		intercambio.setCartaOfrecerFinal(null);
		intercambio.setCartaQuererFinal(null);
		intercambio.setCartaOfrecerFinalNombre(null);
		intercambio.setCartaQuererFinalNombre(null);
		intercambio.setFechaCreacion(LocalDateTime.now());
		intercambio.setFechaCambio(LocalDateTime.now());
	}
	
	private void publicar(Intercambio intercambio) {
		try {
			intercambioMapper.publicarIntercambio(intercambio);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al publicar el intercambio", e);
		}
	}
	
	private List<Carta> recuperarCartasOfrecer(Intercambio intercambio) {
		List<Carta> cartasOfrecer = new ArrayList<>();
		String[] cartasBarajaOfrecer = intercambio.getCartasOfrecer().split(";");
		
		for(String carta : cartasBarajaOfrecer) {
			String[] cartaBaraja = carta.split(",");
			CriteriosCarta criterios = new CriteriosCarta();
			List<Integer> expansiones = new ArrayList<>();
			expansiones.add(Integer.parseInt(cartaBaraja[0].trim()));
			criterios.setExpansiones(expansiones);
			criterios.setCartaJuegoId(Integer.parseInt(cartaBaraja[1].trim()));
			List<Carta> cartasBBDD = cartaService.recuperarCartasCrearIntercambioPorCriterios(criterios);
			if(cartasBBDD.isEmpty()) {
				throw new RuntimeException("No existe ninguna carta que coincida que la marcada en el sistema");
			}
			cartasOfrecer.add(cartasBBDD.get(0));
		}
		return cartasOfrecer;
	}
	
	private List<Carta> recuperarCartasQuerer(Intercambio intercambio) { 
		List<Carta> cartasQuerer = new ArrayList<>();
		String[] cartasBarajaQuerer = intercambio.getCartasQuerer().split(";");
		
		for(String carta : cartasBarajaQuerer) {
			String[] cartaBaraja = carta.split(",");
			CriteriosCarta criterios = new CriteriosCarta();
			List<Integer> expansiones = new ArrayList<>();
			expansiones.add(Integer.parseInt(cartaBaraja[0].trim()));
			criterios.setExpansiones(expansiones);
			criterios.setCartaJuegoId(Integer.parseInt(cartaBaraja[1].trim()));
			List<Carta> cartasBBDD = cartaService.recuperarCartasCrearIntercambioPorCriterios(criterios);
			if(cartasBBDD.isEmpty()) {
				throw new RuntimeException("No existe ninguna carta que coincida que la marcada en el sistema");
			}
			cartasQuerer.add(cartasBBDD.get(0));
		}
		return cartasQuerer;
	}
}