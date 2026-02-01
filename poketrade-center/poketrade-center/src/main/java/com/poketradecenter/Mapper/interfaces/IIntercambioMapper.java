package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.CriteriosIntercambio;
import com.poketradecenter.Clase.Intercambio;

@Mapper
public interface IIntercambioMapper {
	void publicarIntercambio(Intercambio intercambio);
	List<Intercambio> recuperarIntercambiosPublicosPorCriterios(CriteriosIntercambio criterios);
	void solicitarIntercambio(Intercambio intercambio);
	List<Intercambio> recuperarIntercambiosActivosPorCriterios(CriteriosIntercambio criterios);
	void actualizar(Intercambio intercambio);
}