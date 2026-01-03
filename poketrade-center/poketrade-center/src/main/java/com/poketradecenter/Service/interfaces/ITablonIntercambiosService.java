package com.poketradecenter.Service.interfaces;
import java.util.List;
import java.util.Map;

import com.poketradecenter.Clase.CriteriosIntercambiosPublicos;
import com.poketradecenter.Clase.Intercambio;

public interface ITablonIntercambiosService {
	CriteriosIntercambiosPublicos crearCriteriosIntercambiosPublicosParams(Map<String, String> params);
	List<Intercambio> recuperarIntercambiosPublicosPorCriterios(CriteriosIntercambiosPublicos criterios);
}