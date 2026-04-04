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
 	            case Constantes.CRITERIOS_CARTA_USUARIO_USUARIO_ID:
 	                criterios.setUsuarioId(Integer.parseInt(value));
 	                break;
 	            case Constantes.CRITERIOS_CARTA_USUARIO_EXPANSIONES:
 	            	List<Integer> expansiones = Arrays.stream(value.split(","))
         				.map(String::trim)
         				.filter(s -> !s.isEmpty())
         				.map(Integer::parseInt)
         				.collect(Collectors.toList());
 	                criterios.setExpansiones(expansiones);
 	                break;
 	            case Constantes.CRITERIOS_CARTA_USUARIO_CARTA_JUEGO_ID:
 	                criterios.setCartaJuegoId(Integer.parseInt(value));
 	                break;
 	            case Constantes.CRITERIOS_CARTA_USUARIO_NOMBRE:
 	                criterios.setNombre(value);
 	                break;
 	            case Constantes.CRITERIOS_CARTA_USUARIO_RAREZAS:
 	            	List<Integer> rarezas = Arrays.stream(value.split(","))
	            			.map(String::trim)
	                        .filter(s -> !s.isEmpty())
	                        .map(Integer::parseInt)
	                        .collect(Collectors.toList());
 	            	criterios.setRarezas(rarezas);
 	                break;
	            case Constantes.CRITERIOS_CARTA_USUARIO_ENERGIAS:
 	            	List<Integer> energias = Arrays.stream(value.split(","))
	            			.map(String::trim)
	                        .filter(s -> !s.isEmpty())
	                        .map(Integer::parseInt)
	                        .collect(Collectors.toList());
 	            	criterios.setEnergias(energias);
 	                break;
	            case Constantes.CRITERIOS_CARTA_USUARIO_TIPOS:
 	            	List<Integer> tipos = Arrays.stream(value.split(","))
	            			.map(String::trim)
	                        .filter(s -> !s.isEmpty())
	                        .map(Integer::parseInt)
	                        .collect(Collectors.toList());
 	            	criterios.setTipos(tipos);
 	                break;
	            case Constantes.CRITERIOS_CARTA_USUARIO_OBTENIDA:
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
	            case Constantes.CRITERIOS_USUARIO_EMAIL:
	                criterios.setEmail(value);
	                break;
	            case Constantes.CRITERIOS_USUARIO_PASSWORD:
	                criterios.setPassword(value);
	                break;
	            case Constantes.CRITERIOS_USUARIO_NOMBRE:
	                criterios.setNombre(value);
	                break;
	            case Constantes.CRITERIOS_USUARIO_JUEGO_ID:
	                criterios.setJuegoId(value);
	                break;
  	            case Constantes.CRITERIOS_USUARIO_ICONO_ID:
	                criterios.setIconoId(Integer.parseInt(value));
	                break;
  	            case Constantes.CRITERIOS_USUARIO_EMBLEMA_1_ID:
	                criterios.setIconoId(Integer.parseInt(value));
	                break;
  	            case Constantes.CRITERIOS_USUARIO_EMBLEMA_2_ID:
	                criterios.setIconoId(Integer.parseInt(value));
	                break;
  	            case Constantes.CRITERIOS_USUARIO_EMBLEMA_3_ID:
	                criterios.setIconoId(Integer.parseInt(value));
	                break;
	            case Constantes.CRITERIOS_USUARIO_ID:
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
	            case Constantes.CRITERIOS_CARTA_EXPANSIONES:
	            	List<Integer> expansiones = Arrays.stream(value.split(","))
        				.map(String::trim)
        				.filter(s -> !s.isEmpty())
        				.map(Integer::parseInt)
        				.collect(Collectors.toList());
	                criterios.setExpansiones(expansiones);
	                break;
	            case Constantes.CRITERIOS_CARTA_CARTA_JUEGO_ID:
	                criterios.setCartaJuegoId(Integer.parseInt(value));
	                break;
	            case Constantes.CRITERIOS_CARTA_NOMBRE:
	                criterios.setNombre(value);
	                break;
	            case Constantes.CRITERIOS_CARTA_RAREZAS:
	            	List<Integer> rarezas = Arrays.stream(value.split(","))
            			.map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .map(Integer::parseInt)
                        .collect(Collectors.toList());
	            	criterios.setRarezas(rarezas);
	                break;
   	            case Constantes.CRITERIOS_CARTA_ENERGIAS:
	            	List<Integer> energias = Arrays.stream(value.split(","))
            			.map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .map(Integer::parseInt)
                        .collect(Collectors.toList());
	            	criterios.setEnergias(energias);
	                break;
   	            case Constantes.CRITERIOS_CARTA_TIPOS:
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
	        	case Constantes.CRITERIOS_BARAJA_PUBLICA_USUARIO_ID:
	        		criterios.setUsuarioId(Integer.parseInt(value));
	        		break;
	            case Constantes.CRITERIOS_BARAJA_PUBLICA_CARTA_NOMBRE:
	                criterios.setCartaNombre(value);
	                break;
	            case Constantes.CRITERIOS_BARAJA_PUBLICA_ORDENACION:
	            	criterios.setOrdenacion(convertirOrdenacion.convertirOrdenacionBarajasPublicas(value));
	            	break;
	            case Constantes.CRITERIOS_BARAJA_PUBLICA_BARAJA_PUBLICA_ID:
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
	            case Constantes.CRITERIOS_BARAJA_USUARIO_USUARIO_ID:
	                criterios.setUsuarioId(Integer.parseInt(value));
	                break;
	            case Constantes.CRITERIOS_BARAJA_USUARIO_BARAJA_PUBLICA_ID:
	                criterios.setBarajaPublicaId(Integer.parseInt(value));
	                break;
	            case Constantes.CRITERIOS_BARAJA_USUARIO_CARTA_NOMBRE:
	                criterios.setCartaNombre(value);
	                break;
	            case Constantes.CRITERIOS_BARAJA_USUARIO_ORDENACION:
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
	        	case Constantes.CRITERIOS_INTERCAMBIO_ID:
	        		criterios.setId(Integer.parseInt(value));
	        		break;
	        	case Constantes.CRITERIOS_INTERCAMBIO_USUARIO_ID:
	        		criterios.setUsuarioId(Integer.parseInt(value));
	        		break;
	            case Constantes.CRITERIOS_INTERCAMBIO_NOMBRE_OFRECER:
	                criterios.setCartasOfrecerNombre(value);
	                break;
	            case Constantes.CRITERIOS_INTERCAMBIO_NOMBRE_QUERER:
	            	criterios.setCartasQuererNombre(value);
	            	break;
	            case Constantes.CRITERIOS_INTERCAMBIO_ESTADO_ID:
	            	criterios.setEstadoId(Integer.parseInt(value));
	            	break;
	            case Constantes.CRITERIOS_INTERCAMBIO_ORDENACION:
	            	criterios.setOrdenacion(convertirOrdenacion.convertirOrdenacionTablonIntercambios(value));
	            	break;
	            default:
	                break;
	        }
	    });
		return criterios;
	}
}