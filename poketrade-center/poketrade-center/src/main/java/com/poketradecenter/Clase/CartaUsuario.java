package com.poketradecenter.Clase;

public class CartaUsuario extends Carta {
	private Integer usuarioId;
	private boolean obtenida;
	
	public void setUsuarioId(Integer usuarioId) {this.usuarioId = usuarioId;}
	public Integer getUsuarioId() {return usuarioId;}
	
	public boolean isObtenida() {return obtenida;}
	public void setObtenida(boolean obtenida) {this.obtenida = obtenida;}
}