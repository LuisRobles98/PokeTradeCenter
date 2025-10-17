package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Clase.CartaUsuario;

@Mapper
public interface ICartaUsuarioMapper {
	List<CartaUsuario> recuperarPorCriterios(CriteriosCartaUsuario criterios);
	void actualizar(CartaUsuario cartaUsuario);
	Integer recuperarTotalCartasPorExpansion(Integer expansionId);
}