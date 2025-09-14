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
	public void guardarUsuario(Usuario usuario) {
		try {
			usuarioMapper.guardar(usuario);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error guardando los datos del usuario", e);
		}
	}
	
	@Override
	public void actualizarUsuario(Usuario usuario) {
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
    	            case "icono":
    	                criterios.setIcono(value);
    	                break;
    	            case "idJuego":
    	                criterios.setIdJuego(value);
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