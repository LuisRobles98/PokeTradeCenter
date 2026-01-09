package com.poketradecenter.Utilities.interfaces;

import java.util.Map;

import com.poketradecenter.Clase.CriteriosBarajasPublicas;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Clase.CriteriosIntercambiosPublicos;
import com.poketradecenter.Clase.CriteriosMisBarajas;
import com.poketradecenter.Clase.CriteriosUsuario;

public interface ICrearCriterios {
	 CriteriosCartaUsuario crearCriteriosCartaUsuarioParams(Map<String, String> params);
	 CriteriosUsuario crearCriteriosUsuarioParams(Map<String, String> params);
	 CriteriosCarta crearCriteriosCartaParams(Map<String, String> params);
	 CriteriosBarajasPublicas crearCriteriosBarajasPublicasParams(Map<String, String> params);
	 CriteriosMisBarajas crearCriteriosMisBarajasParams(Map<String, String> params);
	 CriteriosIntercambiosPublicos crearCriteriosIntercambiosPublicosParams(Map<String, String> params);
}