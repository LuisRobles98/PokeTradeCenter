package com.poketradecenter.Service.implementaciones;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Mapper.interfaces.IBarajaPublicaMapper;
import com.poketradecenter.Mapper.interfaces.IBarajaUsuarioMapper;
import com.poketradecenter.Service.interfaces.IBarajasPublicasService;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ICrearBarajasService;

@Service
public class CrearBarajasService implements ICrearBarajasService {
	
	@Autowired
	private ICartaService cartaService;
	@Autowired
	private IBarajaUsuarioMapper barajaUsuarioMapper;
	@Autowired
	private IBarajaPublicaMapper barajaPublicaMapper;
	@Override
	public List<Carta> recuperarCartasPorCriterios(CriteriosCarta criterios) {
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios);
	}
	
	@Override
	public void guardarBaraja(BarajaUsuario baraja) {
		validarCartas(baraja.getCartas());
		construirBaraja(baraja);
		guardar(baraja);
	}
	
	@Override
	public void publicarBaraja(BarajaPublica baraja) {
		validarCartas(baraja.getCartas());
		construirBaraja(baraja);
		publicar(baraja);
	}
	
	private void validarCartas(String cartasBarajaGuardarPublicar) {
		List<Carta> cartas = new ArrayList<>();
		String[] cartasBaraja = cartasBarajaGuardarPublicar.split(";");
		
		for(String carta : cartasBaraja) {
			String[] cartaBaraja = carta.split(",");
			CriteriosCarta criterios = new CriteriosCarta();
			List<Integer> expansiones = new ArrayList<>();
			expansiones.add(Integer.parseInt(cartaBaraja[0].trim()));
			criterios.setExpansiones(expansiones);
			criterios.setCartaJuegoId(Integer.parseInt(cartaBaraja[1].trim()));
			List<Carta> cartasBBDD = cartaService.recuperarCartasCrearBarajasPorCriterios(criterios);
			if(cartasBBDD.isEmpty()) {
				throw new RuntimeException("No existe ninguna carta que coincida que la marcada en el sistema");
			}
			cartas.add(cartasBBDD.get(0));
		}
		
		//validar tamaño baraja
		Integer contadorCartas = 0;
		for(Carta carta : cartas) {
			if(carta.getExpansionId() != 0 && carta.getCartaJuegoId() != 0) {
				contadorCartas++;
			}
		}
		if(contadorCartas != 20) {
			throw new RuntimeException("La baraja no tiene 20 cartas");
		}
		
		//validar cartas repetidas mas de dos cartas
		for(Carta carta1 : cartas) {
			if(carta1.getExpansionId() != 0 && carta1.getCartaJuegoId() != 0) {
				Integer contadorRepetidas = 0;
				for(Carta carta2 : cartas) {
					if(carta2.getExpansionId() != 0 && carta2.getCartaJuegoId() != 0) {
						if(carta1.getExpansionId() == carta2.getExpansionId() && carta1.getCartaJuegoId() == carta2.getCartaJuegoId()) {
							contadorRepetidas++;
						}
					}
				}
				if(contadorRepetidas > 2) {
					throw new RuntimeException("Hay cartas que estan repetidas más de dos veces");
				}
			}
		}
		
		//validar que haya alguna carta básica
		boolean basica = false;
		for(Carta carta : cartas) {
			if(carta.getExpansionId() != 0 && carta.getCartaJuegoId() != 0) {
				if(carta.getBasico()) {
					basica = true;
				}
			}
		}
		if(!basica) {
			throw new RuntimeException("La baraja no tiene ninguna carta básica");
		}
	}
	
	private void construirBaraja(Baraja baraja) {
		String[] cartaBaraja1 = baraja.getCartas().split(";")[0].split(",");
		String[] cartaBaraja2 = baraja.getCartas().split(";")[1].split(",");
		
		CriteriosCarta criterios = new CriteriosCarta();
		List<Integer> expansiones = new ArrayList<>();
		expansiones.add(Integer.parseInt(cartaBaraja1[0].trim()));
		criterios.setExpansiones(expansiones);
		criterios.setCartaJuegoId(Integer.parseInt(cartaBaraja1[1].trim()));
		Carta primeraCarta = cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(0);
		
		expansiones = new ArrayList<>();
		expansiones.add(Integer.parseInt(cartaBaraja2[0].trim()));
		criterios.setExpansiones(expansiones);
		criterios.setCartaJuegoId(Integer.parseInt(cartaBaraja2[1].trim()));
		Carta segundaCarta = cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(0);
		
		String nombreBaraja = "Baraja ";
		if(primeraCarta.getExpansionId() == segundaCarta.getExpansionId() && primeraCarta.getCartaJuegoId() == segundaCarta.getCartaJuegoId()) {
			nombreBaraja += primeraCarta.getNombre();
		} else {
			nombreBaraja += primeraCarta.getNombre();
			char inicialSegundaCarta = segundaCarta.getNombre().charAt(0);
			String conjuncion = (inicialSegundaCarta == 'i') ? " e " : " y ";
			nombreBaraja += conjuncion + segundaCarta.getNombre();
		}
		baraja.setNombre(nombreBaraja);
		baraja.setFechaCreacion(LocalDateTime.now());
	}
	
	private void guardar(BarajaUsuario baraja) {
		try {
			barajaUsuarioMapper.guardarBaraja(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al guardar la baraja", e);
		}
	}
	

	private void publicar(BarajaPublica baraja) {
		try {
			barajaPublicaMapper.publicarBaraja(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al publicar la baraja", e);
		}
	}
}