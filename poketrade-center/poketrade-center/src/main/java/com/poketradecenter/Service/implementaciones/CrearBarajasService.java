package com.poketradecenter.Service.implementaciones;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Mapper.interfaces.IBarajaMapper;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ICrearBarajasService;

@Service
public class CrearBarajasService implements ICrearBarajasService {
	
	@Autowired
	private ICartaService cartaService;
	@Autowired
	private IBarajaMapper barajaMapper;
	

	@Override
	public List<Carta> recuperarCartasPorCriterios(CriteriosCarta criterios) {
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios);
	}
	
	@Override
	public void guardarBaraja(Baraja baraja) {
		try {
			validarCartas(baraja);
			construirBaraja(baraja);
			guardar(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public void guardarPublicarBaraja(Baraja baraja) {
		try {
			validarCartas(baraja);
			construirBaraja(baraja);
			guardar(baraja);
			baraja.setCreadorId(baraja.getUsuarioId());
			publicar(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException(e);
		}
	}
	
	private void validarCartas(Baraja baraja) {
		
		List<Carta> cartas = new ArrayList<>();
		
		String[] cartasBaraja = baraja.getCartas().split(";");
		
		for(String carta : cartasBaraja) {
			String[] cartaBaraja = carta.split(",");
			CriteriosCarta criterios = new CriteriosCarta();
			List<Integer> expansiones = new ArrayList<>();
			expansiones.add(Integer.parseInt(cartaBaraja[0].trim()));
			criterios.setExpansiones(expansiones);
			criterios.setCartaJuegoId(Integer.parseInt(cartaBaraja[1].trim()));
			Carta cartaBuscada = cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(0);
			cartas.add(cartaBuscada);
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
		if((primeraCarta.getRarezaId() == 4) || (primeraCarta.getExpansionId() == 12)) {
			nombreBaraja += primeraCarta.getNombre() + " EX";
		} else {
			nombreBaraja += primeraCarta.getNombre();
		}
		
		if((segundaCarta.getRarezaId() == 4) || (segundaCarta.getExpansionId() == 12)) {
			if(segundaCarta.getNombre().charAt(0) != 'i') {
				nombreBaraja += " y " + segundaCarta.getNombre() + " EX";
			} else {
				nombreBaraja += " e " + segundaCarta.getNombre() + " EX";
			}
		} else {
			if(segundaCarta.getNombre().charAt(0) != 'i') { 
				nombreBaraja += " y " + segundaCarta.getNombre();
			} else {
				nombreBaraja += " e " + segundaCarta.getNombre();
			}
		}
		
		baraja.setBarajaNombre(nombreBaraja);
		baraja.setFechaCreacion(LocalDate.now());
	}
	
	private void guardar(Baraja baraja) {
		try {
			barajaMapper.guardarBaraja(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al guardar la baraja", e);
		}
	}
	
	private void publicar(Baraja baraja) {
		try {
			barajaMapper.publicarBaraja(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al publicar la baraja", e);
		}
	}
	

	@Override
	public CriteriosCarta crearCriteriosCartaParams(Map<String, String> params) {
    	CriteriosCarta criterios = new CriteriosCarta();
    	   params.forEach((key, value) -> {
    	        switch(key) {
    	            case "expansiones":
    	            	List<Integer> expansiones = Arrays.stream(value.split(","))
            				.map(String::trim)
            				.filter(s -> !s.isEmpty())
            				.map(Integer::parseInt)
            				.collect(Collectors.toList());
    	                criterios.setExpansiones(expansiones);
    	                break;
    	            case "cartaJuegoId":
    	                criterios.setCartaJuegoId(Integer.parseInt(value));
    	                break;
    	            case "nombre":
    	                criterios.setNombre(value);
    	                break;
    	            case "rarezas":
    	            	List<Integer> rarezas = Arrays.stream(value.split(","))
	            			.map(String::trim)
	                        .filter(s -> !s.isEmpty())
	                        .map(Integer::parseInt)
	                        .collect(Collectors.toList());
    	            	criterios.setRarezas(rarezas);
    	                break;
       	            case "energias":
    	            	List<Integer> energias = Arrays.stream(value.split(","))
	            			.map(String::trim)
	                        .filter(s -> !s.isEmpty())
	                        .map(Integer::parseInt)
	                        .collect(Collectors.toList());
    	            	criterios.setEnergias(energias);
    	                break;
       	            case "tipos":
    	            	List<Integer> tipos = Arrays.stream(value.split(","))
	            			.map(String::trim)
	                        .filter(s -> !s.isEmpty())
	                        .map(Integer::parseInt)
	                        .collect(Collectors.toList());
    	            	criterios.setTipos(tipos);
    	                break;
    	            default:
    	                break;
    	        }
    	    });
        return criterios;
	}
}