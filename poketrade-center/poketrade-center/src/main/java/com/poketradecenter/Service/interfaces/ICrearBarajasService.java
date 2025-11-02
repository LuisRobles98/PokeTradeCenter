package com.poketradecenter.Service.interfaces;
import java.util.List;
import java.util.Map;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;

public interface ICrearBarajasService {
	CriteriosCarta crearCriteriosCartaParams(Map<String, String> params);
	List<Carta> recuperarCartasPorCriterios(CriteriosCarta criteriosCarta);
	void guardarBaraja(Baraja baraja);
	void guardarPublicarBaraja(Baraja baraja);
}