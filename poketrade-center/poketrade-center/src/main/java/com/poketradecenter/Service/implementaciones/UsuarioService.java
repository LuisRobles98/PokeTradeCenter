package com.poketradecenter.Service.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}