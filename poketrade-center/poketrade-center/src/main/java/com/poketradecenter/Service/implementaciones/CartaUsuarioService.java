package com.poketradecenter.Service.implementaciones;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.CartaUsuario;
import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Service.interfaces.ICartaUsuarioService;
import com.poketradecenter.Service.interfaces.IUsuarioService;
import com.poketradecenter.Mapper.interfaces.ICartaUsuarioMapper;
import com.poketradecenter.Mapper.interfaces.IUsuarioMapper;

@Service
public class CartaUsuarioService implements ICartaUsuarioService {
	
	@Autowired
	private ICartaUsuarioMapper cartaUsuarioMapper;
	

	@Override
	public List<CartaUsuario> recuperarCartaUsuarioPorCriterios(CriteriosCartaUsuario criterios) {
		try {
			List<CartaUsuario> cartas = cartaUsuarioMapper.recuperarPorCriterios(criterios);
			return cartas;
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar los datos de las cartas del usuario", e);
		}
	}
	
	@Override
	public void actualizarCarta(CartaUsuario cartaUsuario) {
		try {
			cartaUsuarioMapper.actualizar(cartaUsuario);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar los datos de la carta", e);
		}
	}
	
	@Override
	public Integer recuperarTotalCartasPorExpansion(Integer expansionId) {
		try {
			return cartaUsuarioMapper.recuperarTotalCartasPorExpansion(expansionId);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar el total de cartas de la expansión", e);
		}
	}
	
	@Override
	public CriteriosCartaUsuario crearCriteriosCartaUsuarioParams(Map<String, String> params) {
    	CriteriosCartaUsuario criterios = new CriteriosCartaUsuario();
    	   params.forEach((key, value) -> {
    	        switch(key) {
    	        	case "id":
    	        		criterios.setId(Integer.parseInt(value));
    	        		break;
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