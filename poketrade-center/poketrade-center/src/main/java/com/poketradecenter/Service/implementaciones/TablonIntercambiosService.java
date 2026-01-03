package com.poketradecenter.Service.implementaciones;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.CriteriosIntercambiosPublicos;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Mapper.interfaces.IIntercambioMapper;
import com.poketradecenter.Service.interfaces.ITablonIntercambiosService;

@Service
public class TablonIntercambiosService implements ITablonIntercambiosService {
	
	@Autowired
	private IIntercambioMapper intercambioMapper;
	
	@Override
	public List<Intercambio> recuperarIntercambiosPublicosPorCriterios(CriteriosIntercambiosPublicos criterios) {
		try {
			return intercambioMapper.recuperarIntercambiosPublicosPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar los inntercambios públicos del tablón", e);
		}
	}
	
	@Override
	public CriteriosIntercambiosPublicos crearCriteriosIntercambiosPublicosParams(Map<String, String> params) {
		CriteriosIntercambiosPublicos criterios = new CriteriosIntercambiosPublicos();
    	   params.forEach((key, value) -> {
    	        switch(key) {
    	        	case "usuarioId":
    	        		criterios.setUsuarioId(Integer.parseInt(value));
    	        		break;
    	            case "cartasOfrecerNombre":
    	                criterios.setCartasOfrecerNombre(value);
    	                break;
    	            case "cartasQuererNombre":
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
}