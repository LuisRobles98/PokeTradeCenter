package com.poketradecenter.Utilities.implementaciones;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.CriteriosBarajaPublica;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Clase.CriteriosIntercambio;
import com.poketradecenter.Clase.CriteriosBarajaUsuario;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Utilities.interfaces.IConvertirOrdenacion;
import com.poketradecenter.Utilities.interfaces.ICrearCriterios;

@Service
public class CrearCriterios implements ICrearCriterios {
	
	@Autowired
	private IConvertirOrdenacion convertirOrdenacion;

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
	
	@Override
	public CriteriosBarajaPublica crearCriteriosBarajaPublicaParams(Map<String, String> params) {
	   CriteriosBarajaPublica criterios = new CriteriosBarajaPublica();
	   params.forEach((key, value) -> {
	        switch(key) {
	        	case "usuarioId":
	        		criterios.setUsuarioId(Integer.parseInt(value));
	        		break;
	            case "cartaNombre":
	                criterios.setCartaNombre(value);
	                break;
	            case "ordenacion":
	            	criterios.setOrdenacion(convertirOrdenacion.convertirOrdenacionBarajasPublicas(value));
	            	break;
	            case "barajaPublicaId":
	            	criterios.setBarajaPublicaId(Integer.parseInt(value));
	            	break;
	            default:
	                break;
	        }
	    });
        return criterios;
	}
	
	@Override
	public CriteriosBarajaUsuario crearCriteriosBarajaUsuarioParams(Map<String, String> params) {
	   CriteriosBarajaUsuario criterios = new CriteriosBarajaUsuario();
	   params.forEach((key, value) -> {
	        switch(key) {
	            case "usuarioId":
	                criterios.setUsuarioId(Integer.parseInt(value));
	                break;
	            case "barajaPublicaId":
	                criterios.setBarajaPublicaId(Integer.parseInt(value));
	                break;
	            case "cartaNombre":
	                criterios.setCartaNombre(value);
	                break;
	            case "ordenacion":
	            	criterios.setOrdenacion(convertirOrdenacion.convertirOrdenacionMisBarajas(value));
	            	break;
	            default:
	                break;
	        }
	    });
        return criterios;
	}
	
	@Override
	public CriteriosIntercambio crearCriteriosIntercambioParams(Map<String, String> params) {
		CriteriosIntercambio criterios = new CriteriosIntercambio();
    	   params.forEach((key, value) -> {
    	        switch(key) {
    	        	case "id":
    	        		criterios.setId(Integer.parseInt(value));
    	        		break;
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
    	            	criterios.setOrdenacion(convertirOrdenacion.convertirOrdenacionTablonIntercambios(value));
    	            	break;
    	            default:
    	                break;
    	        }
    	    });
        return criterios;
	}
	
}