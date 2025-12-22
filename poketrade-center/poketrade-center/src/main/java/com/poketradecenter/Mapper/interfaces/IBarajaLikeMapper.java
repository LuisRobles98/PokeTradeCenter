package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.BarajaLike;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;

@Mapper
public interface IBarajaLikeMapper {
	List<BarajaLike> recuperarBarajaLikePorCriterios(CriteriosBarajasPublicas criterios);
	void crear(BarajaLike baraja);
}