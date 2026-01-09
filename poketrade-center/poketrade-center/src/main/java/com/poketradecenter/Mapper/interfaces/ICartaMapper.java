package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;

@Mapper
public interface ICartaMapper {
	Integer recuperarTotalCartasPorExpansion(Integer expansionId);
	List<Carta> recuperarCartasCrearBarajasPorCriterios(CriteriosCarta criterios);
	List<Carta> recuperarCartasCrearIntercambioPorCriterios(CriteriosCarta criterios);
}