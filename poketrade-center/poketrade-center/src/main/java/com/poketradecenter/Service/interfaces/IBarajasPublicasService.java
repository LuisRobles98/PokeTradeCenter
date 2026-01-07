package com.poketradecenter.Service.interfaces;
import java.util.List;
import java.util.Map;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;

public interface IBarajasPublicasService {
	CriteriosBarajasPublicas crearCriteriosBarajasPublicasParams(Map<String, String> params);
	CriteriosCarta crearCriteriosCartaParams(Map<String, String> params);
	CriteriosUsuario crearCriteriosUsuarioParams(Map<String, String> params);
	List<BarajaPublica> recuperarBarajasPublicasPorCriterios(CriteriosBarajasPublicas criterios);
	Carta recuperarCartaBarajasPublicas(CriteriosCarta criterios);
	Usuario recuperarCreadorBarajasPublicas(CriteriosUsuario criterios);
	boolean comprobarLikeABaraja(CriteriosBarajasPublicas criterios);
	void darLikeABaraja(CriteriosBarajasPublicas criterios);
	void guardarBaraja(CriteriosBarajasPublicas criterios);
}