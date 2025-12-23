package com.poketradecenter.Service.implementaciones;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.CartaUsuario;
import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.IColeccionCartasService;
import com.poketradecenter.Mapper.interfaces.ICartaUsuarioMapper;

@Service
public class ColeccionCartasService implements IColeccionCartasService {
	
	@Autowired
	private ICartaUsuarioMapper cartaUsuarioMapper;
	@Autowired
	private ICartaService cartaService;
	

	@Override
	public List<CartaUsuario> recuperarCartaUsuarioPorCriterios(CriteriosCartaUsuario criterios) {
		try {
			return cartaUsuarioMapper.recuperarPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar los datos de las cartas del usuario", e);
		}
	}
	
	@Override
	public void actualizarCarta(CartaUsuario cartaUsuario) {
		validarActualizarCarta(cartaUsuario);
		actualizar(cartaUsuario);
	}
	
	private void validarActualizarCarta(CartaUsuario cartaUsuario) {
		CartaUsuario cartaUsuarioBBDD = recuperarCartaUsuario(cartaUsuario);
		if(cartaUsuarioBBDD != null && (cartaUsuario.isObtenida() == cartaUsuarioBBDD.isObtenida())) {
			throw new RuntimeException("El estado de la carta es el mismo que el almacenado en el sistema");
		}
	}
	
	private CartaUsuario recuperarCartaUsuario(CartaUsuario cartaUsuario) {
		CriteriosCartaUsuario criterios = new CriteriosCartaUsuario();
		List<Integer> expansiones = new ArrayList<>();
		expansiones.add(cartaUsuario.getExpansionId());
		criterios.setExpansiones(expansiones);
		criterios.setCartaJuegoId(cartaUsuario.getCartaJuegoId());
		return recuperarCartaUsuarioPorCriterios(criterios).get(0);
	}
	
	private void actualizar(CartaUsuario cartaUsuario) {
		try {
			cartaUsuarioMapper.actualizar(cartaUsuario);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar los datos de la carta", e);
		}
	}
	
	@Override
	public Integer recuperarTotalCartasPorExpansion(Integer expansionId) {
		try {
			return cartaService.recuperarTotalCartasPorExpansion(expansionId);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar el total de cartas de la expansión", e);
		}
	}
	
	@Override
	public CriteriosCartaUsuario crearCriteriosCartaUsuarioParams(Map<String, String> params) {
    	CriteriosCartaUsuario criterios = new CriteriosCartaUsuario();
    	   params.forEach((key, value) -> {
    	        switch(key) {
    	            case "usuarioId":
    	                criterios.setUsuarioId(Integer.parseInt(value));
    	                break;
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
       	            case "obtenida":
       	            	if(value == "null") {
       	            		criterios.setObtenida(null);
       	            	} else {
       	            		criterios.setObtenida(Boolean.parseBoolean(value));
       	            	}
    	            default:
    	                break;
    	        }
    	    });
        return criterios;
	}
}