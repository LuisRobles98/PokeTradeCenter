package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.CriteriosBarajaUsuario;

@Mapper
public interface IBarajaUsuarioMapper {
	void guardar(BarajaUsuario baraja);
	List<BarajaUsuario> recuperarMisBarajasPorCriterios(CriteriosBarajaUsuario criterios);
	void eliminarMiBaraja(BarajaUsuario baraja);
}