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
import com.poketradecenter.Clase.CriteriosIntercambiosPublicos;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Mapper.interfaces.IIntercambioMapper;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ITablonIntercambiosService;
import com.poketradecenter.Service.interfaces.IUsuarioService;

@Service
public class TablonIntercambiosService implements ITablonIntercambiosService {
	
	@Autowired
	private IIntercambioMapper intercambioMapper;
	@Autowired
	private ICartaService cartaService;
	@Autowired
	private IUsuarioService usuarioService;
	
	@Override
	public List<Intercambio> recuperarIntercambiosPublicosPorCriterios(CriteriosIntercambiosPublicos criterios) {
		try {
			return intercambioMapper.recuperarIntercambiosPublicosPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar los intercambios públicos del tablón", e);
		}
	}
	
	@Override
	public Usuario recuperarUsuarioPorCriterios(CriteriosUsuario criterios) {
		return usuarioService.recuperarUsuarioPorCriterios(criterios).get(0);
	}
	
	@Override
	public Carta recuperarCartaPorCriterios(CriteriosCarta criterios) {
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(0);
	}
	
	@Override
	public void solicitarIntercambio(Intercambio intercambio) {
		validarDatosIntercambio(intercambio);
		completarDatosSolicitarIntercambio(intercambio);
		solicitar(intercambio);
	}
	
	private void validarDatosIntercambio(Intercambio intercambio) {
		if(intercambio.getCartaOfrecerFinal() == null) {
			throw new RuntimeException("No has seleccionado ninguna carta para quedarte");
		}
		if(intercambio.getCartaQuererFinal() == null) {
			throw new RuntimeException("No has seleccionado ninguna carta para ofrecer");
		}
		Carta cartaParaOfrecer = recuperarCarta(intercambio.getCartaOfrecerFinal());
		Carta cartaParaQuerer = recuperarCarta(intercambio.getCartaQuererFinal());
		if(cartaParaOfrecer.getRarezaId() != cartaParaQuerer.getRarezaId()) {
			throw new RuntimeException("Las rarezas de las cartas seleccionadas no coinciden");
		}
	}
	
	private Carta recuperarCarta(String cartaIntercambio) {
		String[] carta = cartaIntercambio.split(",");
		CriteriosCarta criterios = new CriteriosCarta();
		List<Integer> expansiones = new ArrayList<>();
		expansiones.add(Integer.parseInt(carta[0].trim()));
		criterios.setExpansiones(expansiones);
		criterios.setCartaJuegoId(Integer.parseInt(carta[1].trim()));
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(0);
	}
	
	private void completarDatosSolicitarIntercambio(Intercambio intercambio) {
		Carta cartaParaOfrecer = recuperarCarta(intercambio.getCartaOfrecerFinal());
		Carta cartaParaQuerer = recuperarCarta(intercambio.getCartaQuererFinal());
		intercambio.setCartaOfrecerFinalNombre(cartaParaOfrecer.getNombre());
		intercambio.setCartaOfrecerFinalNombre(cartaParaQuerer.getNombre());
		intercambio.setEstadoId(2);
		intercambio.setFechaCambio(LocalDateTime.now());
	}
	
	private void solicitar(Intercambio intercambio) {
		try {
			intercambioMapper.solicitarIntercambio(intercambio);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar un intercambios público del tablón", e);
		}
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
	
	@Override
	public CriteriosIntercambiosPublicos crearCriteriosIntercambiosPublicosParams(Map<String, String> params) {
		CriteriosIntercambiosPublicos criterios = new CriteriosIntercambiosPublicos();
    	   params.forEach((key, value) -> {
    	        switch(key) {
    	        	case "usuarioId":
    	        		criterios.setUsuarioId(Integer.parseInt(value));
    	        		break;
    	            case "nombreOfrecer":
    	                criterios.setCartasOfrecerNombre(value);
    	                break;
    	            case "nombreQuerer":
    	            	criterios.setCartasQuererNombre(value);
    	            	break;
    	            case "ordenacion":
    	            	criterios.setOrdenacion(convertirOrdenacion(value));
    	            	break;
    	            default:
    	                break;
    	        }
    	    });
        return criterios;
	}
	
	private String convertirOrdenacion(String ordenacion) {
		switch(ordenacion) {
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
}