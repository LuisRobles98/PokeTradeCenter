package com.poketradecenter.Service.interfaces;
import java.util.List;
import java.util.Map;

import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;

public interface IUsuarioService {
	void crearUsuario(Usuario usuario);
	List<Usuario> recuperarUsuarioPorCriterios(CriteriosUsuario criteriosUsuario);
	void actualizarUsuario(Usuario usuario);
	CriteriosUsuario crearCriteriosUsuarioParams(Map<String, String> params);
}