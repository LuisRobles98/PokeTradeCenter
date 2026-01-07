package com.poketradecenter.Clase;

public class BarajaUsuario extends Baraja {
	private Integer usuarioId;
	
	public Integer getUsuarioId() {return usuarioId;}
	public void setUsuarioId(Integer usuarioId) {this.usuarioId = usuarioId;}
	
	public BarajaUsuario() {}
	
	public BarajaUsuario(BarajaPublica barajaPublica) {
		this.setNombre(barajaPublica.getNombre());
		this.setCartas(barajaPublica.getCartas());
		this.setCreadorId(barajaPublica.getCreadorId());
	}
}