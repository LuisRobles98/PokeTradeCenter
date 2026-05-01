package com.poketradecenter.Mapper.interfaces;
import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.CartaIntercambio;

@Mapper
public interface ICartaIntercambioMapper {
	void guardarOfrecer(CartaIntercambio cartaIntercambio);
	void guardarQuerer(CartaIntercambio cartaIntercambio);
}