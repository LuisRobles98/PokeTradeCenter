package com.poketradecenter.Service.implementaciones;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosMisBarajas;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Mapper.interfaces.IBarajaMapper;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.IMisBarajasService;
import com.poketradecenter.Service.interfaces.IUsuarioService;

@Service
public class MisBarajasService implements IMisBarajasService {
	
	@Autowired
	private IBarajaMapper barajaMapper;
	
	@Autowired
	private ICartaService cartaService;
	
	@Autowired
	private IUsuarioService usuarioService;
	
	@Override
	public List<Baraja> recuperarMisBarajasPorCriterios(CriteriosMisBarajas criterios) {
		try {
			return barajaMapper.recuperarMisBarajasPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar tus barajas guardadas", e);
		}
	}
	
	@Override
	public Carta recuperarCartaMisBarajas(CriteriosCarta criterios) {	
		return cartaService.recuperarCartasPorCriterios(criterios).get(0);
	}
	
	@Override
	public void eliminarMiBaraja(Baraja baraja) {
		try {
			barajaMapper.eliminarMiBaraja(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al eliminar la baraja", e);
		}
	}
	
	@Override
	public Usuario recuperarCreadorMisBaraja(CriteriosUsuario criterios) {	
		return usuarioService.recuperarUsuarioPorCriterios(criterios).get(0);
	}
	
	@Override
	public CriteriosMisBarajas crearCriteriosMisBarajasParams(Map<String, String> params) {
		CriteriosMisBarajas criterios = new CriteriosMisBarajas();
    	   params.forEach((key, value) -> {
    	        switch(key) {
    	            case "usuarioId":
    	                criterios.setUsuarioId(Integer.parseInt(value));
    	                break;
    	            case "nombre":
    	                criterios.setNombre(value);
    	            default:
    	                break;
    	        }
    	    });
        return criterios;
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
    	            default:
    	                break;
    	        }
    	    });
        return criterios;
	}
	
	
	@Override
	public CriteriosUsuario crearCriteriosUsuarioParams(Map<String, String> params) {
    	CriteriosUsuario criterios = new CriteriosUsuario();
    	   params.forEach((key, value) -> {
    	        switch(key) {
    	            case "email":
    	                criterios.setEmail(value);
    	                break;
    	            case "password":
    	                criterios.setPassword(value);
    	                break;
    	            case "nombre":
    	                criterios.setNombre(value);
    	                break;
    	            case "juegoId":
    	                criterios.setJuegoId(value);
    	                break;
      	            case "iconoId":
    	                criterios.setIconoId(Integer.parseInt(value));
    	                break;
      	            case "emblema1Id":
    	                criterios.setIconoId(Integer.parseInt(value));
    	                break;
      	            case "emblema2Id":
    	                criterios.setIconoId(Integer.parseInt(value));
    	                break;
      	            case "emblema3Id":
    	                criterios.setIconoId(Integer.parseInt(value));
    	                break;
    	            case "id":
    	                criterios.setId(Integer.parseInt(value));
    	                break;
    	            default:
    	                break;
    	        }
    	    });
        return criterios;
	}
	
}