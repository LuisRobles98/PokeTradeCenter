package com.poketradecenter.Mapper.interfaces;
import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.CartaBaraja;

@Mapper
public interface ICartaBarajaMapper {
	void guardar(CartaBaraja cartaBaraja);
}