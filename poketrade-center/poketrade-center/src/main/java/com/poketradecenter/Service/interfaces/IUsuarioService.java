package com.poketradecenter.Service.interfaces;
import java.util.List;

import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;

public interface IUsuarioService {
	void guardarUsuario(Usuario usuario);
	List<Usuario> recuperarUsuarioPorCriterios(CriteriosUsuario criteriosUsuario);
}