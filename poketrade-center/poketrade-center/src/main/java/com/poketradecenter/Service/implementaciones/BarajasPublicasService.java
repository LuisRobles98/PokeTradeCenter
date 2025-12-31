package com.poketradecenter.Service.implementaciones;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.BarajaLike;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Mapper.interfaces.IBarajaLikeMapper;
import com.poketradecenter.Mapper.interfaces.IBarajaPublicaMapper;
import com.poketradecenter.Service.interfaces.IBarajasPublicasService;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ICrearBarajasService;
import com.poketradecenter.Service.interfaces.IUsuarioService;

@Service
public class BarajasPublicasService implements IBarajasPublicasService {
	
	@Autowired
	private IBarajaPublicaMapper barajaPublicaMapper;
	
	@Autowired
	private IBarajaLikeMapper barajaLikeMapper;
	
	@Autowired
	private ICartaService cartaService;
	
	@Autowired
	private IUsuarioService usuarioService;
	
	@Autowired
	private ICrearBarajasService crearBarajasService;
	
	@Override
	public List<Baraja> recuperarBarajasPublicasPorCriterios(CriteriosBarajasPublicas criterios) {
		try {
			return barajaPublicaMapper.recuperarBarajasPublicasPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar las barajas públicas", e);
		}
	}
	
	@Override
	public Carta recuperarCartaBarajasPublicas(CriteriosCarta criterios) {	
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(0);
	}
	
	@Override
	public Usuario recuperarCreadorBarajasPublicas(CriteriosUsuario criterios) {	
		return usuarioService.recuperarUsuarioPorCriterios(criterios).get(0);
	}
	
	@Override
	public boolean comprobarLikeABaraja(CriteriosBarajasPublicas criterios) {
		try {
			return barajaLikeMapper.recuperarBarajaLikePorCriterios(criterios).size() > 0;
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al comprobar si ya se había dado like a esa baraja", e);
		}
	}
	
	@Override
	public void darLikeABaraja(CriteriosBarajasPublicas criterios) {
		darLike(criterios);
		guardarLike(criterios);
	}
	
	private void darLike(CriteriosBarajasPublicas criterios) {
		CriteriosBarajasPublicas criteriosBusqueda = new CriteriosBarajasPublicas();
		criteriosBusqueda.setBarajaId(criterios.getBarajaId());
		Baraja baraja = recuperarBarajasPublicasPorCriterios(criteriosBusqueda).get(0);
		baraja.setMeGusta(baraja.getMeGusta() + 1);
		actualizarBaraja(baraja);
	}
	
	private void actualizarBaraja(Baraja baraja) {
		try {
			barajaPublicaMapper.actualizarBaraja(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar la baraja", e);
		}
	}
	
	private void guardarLike(CriteriosBarajasPublicas criterios) {
		BarajaLike baraja = new BarajaLike();
		baraja.setBarajaId(criterios.getBarajaId());
		baraja.setUsuarioId(criterios.getUsuarioId());
		guardarBarajaLike(baraja);
	}
	
	private void guardarBarajaLike(BarajaLike baraja) {
		try {
			barajaLikeMapper.crear(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al crear el like de la baraja", e);
		}
	}
	
	@Override
	public void guardarBaraja(CriteriosBarajasPublicas criterios) {
		CriteriosBarajasPublicas criteriosBusqueda = new CriteriosBarajasPublicas();
		criteriosBusqueda.setBarajaId(criterios.getBarajaId());
		Baraja baraja = recuperarBarajasPublicasPorCriterios(criteriosBusqueda).get(0);
		baraja.setUsuarioId(criterios.getUsuarioId());
		crearBarajasService.guardarBaraja(baraja);
	}
	
	@Override
	public CriteriosBarajasPublicas crearCriteriosBarajasPublicasParams(Map<String, String> params) {
		CriteriosBarajasPublicas criterios = new CriteriosBarajasPublicas();
    	   params.forEach((key, value) -> {
    	        switch(key) {
    	        	case "usuarioId":
    	        		criterios.setUsuarioId(Integer.parseInt(value));
    	        		break;
    	            case "nombre":
    	                criterios.setNombre(value);
    	                break;
    	            case "ordenacion":
    	            	criterios.setOrdenacion(convertirOrdenacion(value));
    	            	break;
    	            case "barajaId":
    	            	criterios.setBarajaId(Integer.parseInt(value));
    	            	break;
    	            default:
    	                break;
    	        }
    	    });
        return criterios;
	}
	
	private String convertirOrdenacion(String ordenacion) {
		switch(ordenacion) {
			case "likes_desc":
				return "me_gusta DESC";
			case "likes_asc":
				return "me_gusta ASC";
			case "fecha_desc":
				return "fecha_creacion DESC";
			case "fecha_asc":
				return "fecha_creacion ASC";
			default:
				return null;
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