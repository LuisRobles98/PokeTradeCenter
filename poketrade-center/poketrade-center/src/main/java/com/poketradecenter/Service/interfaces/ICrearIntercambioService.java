package com.poketradecenter.Service.interfaces;
import java.util.List;
import java.util.Map;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.Intercambio;

public interface ICrearIntercambioService {
	List<Carta> recuperarCartasPorCriterios(CriteriosCarta criteriosCarta);
	void publicarIntercambio(Intercambio intercambio);
}