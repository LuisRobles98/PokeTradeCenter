package com.poketradecenter.Service.interfaces;

import java.util.List;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;

public interface ICartaService {
	Integer recuperarTotalCartasPorExpansion(Integer expansionId);
	List<Carta> recuperarCartasCrearBarajasPorCriterios(CriteriosCarta criterios);
}