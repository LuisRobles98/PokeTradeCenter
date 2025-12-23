package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;

@Mapper
public interface IBarajaPublicaMapper {
	List<Baraja> recuperarBarajasPublicasPorCriterios(CriteriosBarajasPublicas criterios);
	void actualizarBaraja(Baraja baraja);
}