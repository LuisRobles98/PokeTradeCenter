package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.CriteriosBarajaPublica;

@Mapper
public interface IBarajaPublicaMapper {
	List<BarajaPublica> recuperarBarajasPublicasPorCriterios(CriteriosBarajaPublica criterios);
	void guardar(BarajaPublica barajaPublica);
}