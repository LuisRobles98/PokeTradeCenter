package com.poketradecenter.Mapper.interfaces;
import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.Baraja;

@Mapper
public interface IBarajaMapper {
	void guardar(Baraja baraja);
}