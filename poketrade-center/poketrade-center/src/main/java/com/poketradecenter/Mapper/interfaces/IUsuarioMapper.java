package com.poketradecenter.Mapper.interfaces;
import org.apache.ibatis.annotations.Mapper;
import com.poketradecenter.Clase.Usuario;

@Mapper
public interface IUsuarioMapper {
	void guardar(Usuario usuario);
}