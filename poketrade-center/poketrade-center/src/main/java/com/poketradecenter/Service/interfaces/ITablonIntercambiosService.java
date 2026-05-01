package com.poketradecenter.Service.interfaces;
import java.util.List;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosIntercambio;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Clase.Usuario;

public interface ITablonIntercambiosService {
	List<Intercambio> recuperarIntercambiosPublicosPorCriterios(CriteriosIntercambio criterios);
	Carta recuperarCartaPorCriterios(CriteriosCarta criterios);
	void solicitarIntercambio(Intercambio intercambio);
	Usuario recuperarUsuarioPorCriterios(CriteriosUsuario criterios);
	Integer recuperarTotalCartasPorExpansion(Integer expansionId);
}