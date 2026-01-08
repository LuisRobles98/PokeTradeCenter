package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.CriteriosIntercambiosPublicos;
import com.poketradecenter.Clase.Intercambio;

@Mapper
public interface IIntercambioMapper {
	void publicarIntercambio(Intercambio intercambio);
	List<Intercambio> recuperarIntercambiosPublicosPorCriterios(CriteriosIntercambiosPublicos criterios);
	void solicitarIntercambio(Intercambio intercambio);
}