package com.poketradecenter.Service.interfaces;
import java.util.List;
import java.util.Map;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosIntercambiosPublicos;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Clase.Usuario;

public interface ITablonIntercambiosService {
	CriteriosIntercambiosPublicos crearCriteriosIntercambiosPublicosParams(Map<String, String> params);
	List<Intercambio> recuperarIntercambiosPublicosPorCriterios(CriteriosIntercambiosPublicos criterios);
	CriteriosCarta crearCriteriosCartaParams(Map<String, String> params);
	CriteriosUsuario crearCriteriosUsuarioParams(Map<String, String> params);
	Carta recuperarCartaPorCriterios(CriteriosCarta criterios);
	void solicitarIntercambio(Intercambio intercambio);
	Usuario recuperarUsuarioPorCriterios(CriteriosUsuario criterios);
}