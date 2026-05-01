package com.poketradecenter.Service.interfaces;

public interface IUsuarioGestionService {
	void insertarCartasNuevoUsuario(Integer id);
	void eliminarCartasUsuario(Integer usuarioId);
	void eliminarBarajasUsuario(Integer usuarioId);
	void eliminarIntercambios(Integer usuarioId);
}