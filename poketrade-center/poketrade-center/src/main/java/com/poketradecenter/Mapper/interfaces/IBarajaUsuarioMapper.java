package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.CriteriosMisBarajas;

@Mapper
public interface IBarajaUsuarioMapper {
	void guardarBaraja(BarajaUsuario baraja);
	List<BarajaUsuario> recuperarMisBarajasPorCriterios(CriteriosMisBarajas criterios);
	void eliminarMiBaraja(BarajaUsuario baraja);
}