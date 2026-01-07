package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;

@Mapper
public interface IBarajaPublicaMapper {
	List<BarajaPublica> recuperarBarajasPublicasPorCriterios(CriteriosBarajasPublicas criterios);
	void publicarBaraja(BarajaPublica baraja);
	void actualizarBaraja(BarajaPublica baraja);
}