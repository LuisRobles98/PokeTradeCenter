package com.poketradecenter.Service.interfaces;
import java.util.List;
import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Clase.CartaUsuario;

public interface IColeccionCartasService {
	List<CartaUsuario> recuperarCartaUsuarioPorCriterios(CriteriosCartaUsuario criteriosCartaUsuario);
	void actualizarCarta(CartaUsuario cartaUsuario);
	Integer recuperarTotalCartasPorExpansion(Integer expansionId);
}