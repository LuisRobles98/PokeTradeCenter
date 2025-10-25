package com.poketradecenter.Clase;

public class CartaUsuario extends Carta {
	
	private Integer id;
	private Integer usuarioId;
	private boolean obtenida;
	
	public void setId(Integer id) {this.id = id;}
	public Integer getId() {return id;}
	
	public void setUsuarioId(Integer usuarioId) {this.usuarioId = usuarioId;}
	public Integer getUsuarioId() {return usuarioId;}
	
	public boolean isObtenida() {return obtenida;}
	public void setObtenida(boolean obtenida) {this.obtenida = obtenida;}
}