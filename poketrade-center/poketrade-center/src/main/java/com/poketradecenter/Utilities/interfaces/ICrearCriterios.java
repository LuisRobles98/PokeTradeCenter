package com.poketradecenter.Utilities.interfaces;

import java.util.Map;

import com.poketradecenter.Clase.CriteriosBarajaPublica;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Clase.CriteriosIntercambio;
import com.poketradecenter.Clase.CriteriosBarajaUsuario;
import com.poketradecenter.Clase.CriteriosUsuario;

public interface ICrearCriterios {
	 CriteriosCartaUsuario crearCriteriosCartaUsuarioParams(Map<String, String> params);
	 CriteriosUsuario crearCriteriosUsuarioParams(Map<String, String> params);
	 CriteriosCarta crearCriteriosCartaParams(Map<String, String> params);
	 CriteriosBarajaPublica crearCriteriosBarajaPublicaParams(Map<String, String> params);
	 CriteriosBarajaUsuario crearCriteriosBarajaUsuarioParams(Map<String, String> params);
	 CriteriosIntercambio crearCriteriosIntercambioParams(Map<String, String> params);
}