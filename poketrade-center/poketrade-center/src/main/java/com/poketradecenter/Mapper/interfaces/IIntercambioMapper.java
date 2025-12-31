package com.poketradecenter.Mapper.interfaces;
import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.Intercambio;

@Mapper
public interface IIntercambioMapper {
	void publicarIntercambio(Intercambio intercambio);
}