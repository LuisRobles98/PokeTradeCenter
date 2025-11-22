package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.CriteriosMisBarajas;

@Mapper
public interface IBarajaMapper {
	void guardarBaraja(Baraja baraja);
	void publicarBaraja(Baraja baraja);
	List<Baraja> recuperarMisBarajasPorCriterios(CriteriosMisBarajas criterios);
	void eliminarMiBaraja(Baraja baraja);
}