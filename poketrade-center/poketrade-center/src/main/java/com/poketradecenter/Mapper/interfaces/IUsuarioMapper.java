package com.poketradecenter.Mapper.interfaces;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;

@Mapper
public interface IUsuarioMapper {
	void guardar(Usuario usuario);
	List<Usuario> recuperarPorCriterios(CriteriosUsuario criterios);
	void actualizar(Usuario usuario);
}