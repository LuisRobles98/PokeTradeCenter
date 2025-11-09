package com.poketradecenter.Service.implementaciones;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Service.interfaces.IUsuarioService;
import com.poketradecenter.Mapper.interfaces.IUsuarioMapper;

@Service
public class UsuarioService implements IUsuarioService {
	
	@Autowired
	private IUsuarioMapper usuarioMapper;
	
	@Override
	public void crearUsuario(Usuario usuario) {
		validarDatosUsuario(usuario, true);
		crear(usuario);
	}
	
	private void crear(Usuario usuario) {
		try {
			usuarioMapper.crear(usuario);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error guardando los datos del usuario", e);
		}
	}
	
	@Override
	public void actualizarUsuario(Usuario usuario) {
		validarDatosUsuario(usuario, false);
		actualizarDatosUsuario(usuario);
	}
	
	private void validarDatosUsuario(Usuario usuario, boolean esCrear) {
		//nombre de usuario(ambas)
		if(usuario.getNombre() == null || usuario.getNombre().isBlank()) {
			throw new RuntimeException("El nombre de usuario no puede estar vacío");
		} else if(usuario.getNombre().length() > 45){
			throw new RuntimeException("El nombre de usuario no puede tener más de 45 caracteres");
		}
		
		if(esCrear) {
			//contraseña(crear)
			if(usuario.getPassword().isBlank()) {
				throw new RuntimeException("La contraseña no puede estar vacía");
			}
			
			//email(crear)
			if(existeCorreoEnBBDD(usuario.getEmail())) {
				throw new RuntimeException("Ya existe una cuenta con este correo");
			}
		} else {
			//contraseña(actualizar)
			if(!usuario.getPassword().isBlank()) {
				if(usuario.getPassword().length() < 8) {
					throw new RuntimeException("La contraseña debe tener 8 caracteres como mínimo");
				} else if(usuario.getPassword().length() > 45) {
					throw new RuntimeException("La contraseña no puede tener más de 45 caracteres");
				}
			}
			//id tcg(actualizar)
			if(usuario.getJuegoId() == null || usuario.getJuegoId().isBlank()) {
				throw new RuntimeException("El id de TCG Pocket no puede estar vacío");
			} else if(usuario.getJuegoId().length() > 45){
				throw new RuntimeException("El id de TCG Pocket no puede tener más de 45 caracteres");
			}
			
			//correo(actualizar)
			if(usuario.getEmail() != null) {
				throw new RuntimeException("El correo no se puede modificar");
			}
			
			//icono(actualizar)
			if(usuario.getIconoId() == null) {
				throw new RuntimeException("No hay nigún icono definido");
			} else if(usuario.getIconoId() < 1 || usuario.getIconoId() > 54) {
				throw new RuntimeException("El icono no corresponde con ninguno del sistema");
			}
			
			//emblema1(actualizar)
			if(usuario.getEmblema1Id() == null) {
				throw new RuntimeException("No hay ningún emblema definido en la primera posición");
			} else if(usuario.getEmblema1Id() < 0 || usuario.getEmblema1Id() > 28) {
				throw new RuntimeException("El primer emblema no corresponde con ninguno del sistema");
			}
			
			//emblema2(actualizar)
			if(usuario.getEmblema2Id() == null) {
				throw new RuntimeException("No hay ningún emblema definido en la segunda posición");
			} else if(usuario.getEmblema2Id() < 0 || usuario.getEmblema2Id() > 28) {
				throw new RuntimeException("El segundo emblema no corresponde con ninguno del sistema");
			}
			
			//emblema3(actualizar)
			if(usuario.getEmblema3Id() == null) {
				throw new RuntimeException("No hay ningún emblema definido en la tercera posición");
			} else if(usuario.getEmblema3Id() < 0 || usuario.getEmblema3Id() > 28) {
				throw new RuntimeException("El tercer emblema no corresponde con ninguno del sistema");
			}
		}
	}
	
	private boolean existeCorreoEnBBDD(String correo) {
		CriteriosUsuario criterios = new CriteriosUsuario();
		criterios.setEmail(correo);
		return !recuperarUsuarioPorCriterios(criterios).isEmpty();
	}
	
	private void actualizarDatosUsuario(Usuario usuario) {
		try {
			usuarioMapper.actualizar(usuario);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error actualizando los datos del usuario", e);
		}
	}
	
	
	
	@Override
	public List<Usuario> recuperarUsuarioPorCriterios(CriteriosUsuario criterios) {
		try {
			List<Usuario> usuarios = usuarioMapper.recuperarPorCriterios(criterios);
			eliminarPassword(usuarios);
			return usuarios;
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar los datos del usuario", e);
		}
	}
	
	private void eliminarPassword(List<Usuario> usuarios) {
		for(Usuario usuario : usuarios) {
			usuario.setPassword(null);
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
}