package com.poketradecenter.Service.implementaciones;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CartaBaraja;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Mapper.interfaces.IBarajaPublicaMapper;
import com.poketradecenter.Mapper.interfaces.IBarajaUsuarioMapper;
import com.poketradecenter.Service.interfaces.IBarajaService;
import com.poketradecenter.Service.interfaces.ICartaBarajaService;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ICrearBarajasService;
import com.poketradecenter.Utilities.implementaciones.Constantes;

@Service
public class CrearBarajasService implements ICrearBarajasService {
	
	@Autowired
	private ICartaService cartaService;
	@Autowired
	private IBarajaUsuarioMapper barajaUsuarioMapper;
	@Autowired
	private IBarajaPublicaMapper barajaPublicaMapper;
	@Autowired
	private IBarajaService barajaService;
	@Autowired
	private ICartaBarajaService cartaBarajaService;
	
	
	@Override
	public List<Carta> recuperarCartasPorCriterios(CriteriosCarta criterios) {
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios);
	}
	
	@Override
	public void guardarBaraja(BarajaUsuario barajaUsuario) {
		List<Carta> cartas = establecerCartas(barajaUsuario.getBaraja());
		validarCartas(cartas);
		construirBaraja(barajaUsuario.getBaraja(), cartas);
		guardarBaraja(barajaUsuario.getBaraja());
		construirBarajaUsuario(barajaUsuario);
		guardarBarajaUsuario(barajaUsuario);
	}
	
	@Override
	public void publicarBaraja(BarajaPublica barajaPublica) {
		List<Carta> cartas = establecerCartas(barajaPublica.getBaraja());
		validarCartas(cartas);
		construirBaraja(barajaPublica.getBaraja(), cartas);
		guardarBaraja(barajaPublica.getBaraja());
		construirBarajaPublica(barajaPublica);
		guardarBarajaPublica(barajaPublica);
	}
	
	@Override
	public void guardarPublicarBaraja(BarajaPublica barajaPublica) {
		List<Carta> cartas = establecerCartas(barajaPublica.getBaraja());
		validarCartas(cartas);
		construirBaraja(barajaPublica.getBaraja(), cartas);
		guardarBaraja(barajaPublica.getBaraja());
		construirBarajaPublica(barajaPublica);
		guardarBarajaPublica(barajaPublica);
		
		BarajaUsuario barajaUsuario = new BarajaUsuario();
		barajaUsuario.setUsuarioId(barajaPublica.getCreadorId());
		barajaUsuario.setBarajaPublicaId(barajaPublica.getId());
		barajaUsuario.setBarajaId(barajaPublica.getBarajaId());
		barajaUsuario.setFechaCreacion(LocalDateTime.now());
		guardarBarajaUsuario(barajaUsuario);
	}
	
	private void validarCartas(List<Carta> cartasBarajaGuardarPublicar) {
		//validar tamaño baraja
		Integer contadorCartas = Constantes.CONTADOR_0;
		for(Carta carta : cartasBarajaGuardarPublicar) {
			if(!carta.getExpansionId().equals(Constantes.CERO) && !carta.getCartaJuegoId().equals(Constantes.CERO)) {
				contadorCartas++;
			}
		}
		if(contadorCartas != Constantes.MAXIMO_CARTAS_BARAJA) {
			throw new RuntimeException("La baraja no tiene 20 cartas");
		}
		//validar cartas repetidas mas de dos cartas
		for(Carta carta1 : cartasBarajaGuardarPublicar) {
			if(!carta1.getExpansionId().equals(Constantes.CERO) && !carta1.getCartaJuegoId().equals(Constantes.CERO)) {
				Integer contadorRepetidas = Constantes.CONTADOR_0;
				for(Carta carta2 : cartasBarajaGuardarPublicar) {
					if(!carta2.getExpansionId().equals(Constantes.CERO) && !carta2.getCartaJuegoId().equals(Constantes.CERO)) {
						if(carta1.getExpansionId().equals(carta2.getExpansionId()) && carta1.getCartaJuegoId().equals(carta2.getCartaJuegoId())) {
							contadorRepetidas++;
						}
					}
				}
				if(contadorRepetidas > Constantes.MAXIMO_CARTAS_REPETIDAS) {
					throw new RuntimeException("Hay cartas que estan repetidas más de dos veces");
				}
			}
		}
		//validar que haya alguna carta básica
		boolean basica = false;
		for(Carta carta : cartasBarajaGuardarPublicar) {
			if(!carta.getExpansionId().equals(Constantes.CERO) && !carta.getCartaJuegoId().equals(Constantes.CERO)) {
				if(carta.getBasico()) {
					basica = true;
				}
			}
		}
		if(!basica) {
			throw new RuntimeException("La baraja no tiene ninguna carta básica");
		}
	}
	
	private void construirBaraja(Baraja baraja, List<Carta> cartas) {
		Carta primeraCarta = cartas.get(Constantes.PRIMER_ELEMENTO);
		Carta segundaCarta = cartas.get(Constantes.ELEMENTO_1);
		
		String nombreBaraja = "Baraja ";
		if(primeraCarta.getExpansionId().equals(segundaCarta.getExpansionId()) && primeraCarta.getCartaJuegoId().equals(segundaCarta.getCartaJuegoId())) {
			nombreBaraja += primeraCarta.getNombre();
		} else {
			nombreBaraja += primeraCarta.getNombre();
			char inicialSegundaCarta = segundaCarta.getNombre().charAt(0);
			String conjuncion = (inicialSegundaCarta == 'i') ? " e " : " y ";
			nombreBaraja += conjuncion + segundaCarta.getNombre();
		}
		baraja.setNombre(nombreBaraja);
	}
	
	private Baraja guardarBaraja(Baraja baraja) {
		Baraja barajaCrear = barajaService.guardarBaraja(baraja);
		cartaBarajaService.guardarCartasBaraja(barajaCrear);
		return baraja;
	}
	
	private void construirBarajaUsuario(BarajaUsuario barajaUsuario) {
		barajaUsuario.setBarajaId(barajaUsuario.getBaraja().getId());
		barajaUsuario.setFechaCreacion(LocalDateTime.now());
	}
	
	private void construirBarajaPublica(BarajaPublica barajaPublica) {
		barajaPublica.setBarajaId(barajaPublica.getBaraja().getId());
		barajaPublica.setMeGusta(Constantes.CERO_LIKES);
		barajaPublica.setFechaCreacion(LocalDateTime.now());
	}
	
	private BarajaUsuario guardarBarajaUsuario(BarajaUsuario barajaUsuario) {
		try {
			barajaUsuarioMapper.guardar(barajaUsuario);
			return barajaUsuario;
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al guardar la baraja del usuario", e);
		}
	}
	
	private BarajaPublica guardarBarajaPublica(BarajaPublica barajaPublica) {
		try {
			barajaPublicaMapper.guardar(barajaPublica);
			return barajaPublica;
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al publicar la baraja", e);
		}
	}
	
	@Override
	public void guardarBarajaPublicaComoUsuario(BarajaUsuario barajaUsuario) {
		barajaUsuario.setFechaCreacion(LocalDateTime.now());
		guardarBarajaUsuario(barajaUsuario);
	}
	
	private List<Carta> establecerCartas(Baraja baraja) {
		List<Carta> listaCartasBBDD = new ArrayList<>();
		for(CartaBaraja carta : baraja.getCartas()) {
			CriteriosCarta criterios = construirCriterios(carta);
			List<Carta> cartasBBDD = cartaService.recuperarCartasCrearBarajasPorCriterios(criterios);
			listaCartasBBDD.add(cartasBBDD.get(Constantes.PRIMER_ELEMENTO));
		}
		return listaCartasBBDD;
	}
	
	private CriteriosCarta construirCriterios(CartaBaraja carta) {
		CriteriosCarta criterios = new CriteriosCarta();
		List<Integer> expansiones = new ArrayList<>();
		expansiones.add(carta.getExpansionId());
		criterios.setExpansiones(expansiones);
		criterios.setCartaJuegoId(carta.getCartaJuegoId());
		return criterios;
	}
}