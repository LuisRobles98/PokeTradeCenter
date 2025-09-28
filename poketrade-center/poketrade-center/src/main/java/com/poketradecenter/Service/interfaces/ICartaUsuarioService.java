package com.poketradecenter.Service.interfaces;
import java.util.List;
import java.util.Map;

import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Clase.CartaUsuario;

public interface ICartaUsuarioService {
	List<CartaUsuario> recuperarCartaUsuarioPorCriterios(CriteriosCartaUsuario criteriosCartaUsuario);
	CriteriosCartaUsuario crearCriteriosCartaUsuarioParams(Map<String, String> params);
	void actualizarCarta(CartaUsuario cartaUsuario);
}