package com.poketradecenter.Clase;

public class CriteriosBarajaPublica {
	
	private Integer barajaPublicaId;
	private Integer usuarioId;
	private String cartaNombre;
	private String ordenacion;
	
	public Integer getBarajaPublicaId() {return barajaPublicaId;}
	public void setBarajaPublicaId(Integer barajaPublicaId) {this.barajaPublicaId = barajaPublicaId;}
	
	public Integer getUsuarioId() {return usuarioId;}
	public void setUsuarioId(Integer usuarioId) {this.usuarioId = usuarioId;}
	
	public String getCartaNombre() {return cartaNombre;}
	public void setCartaNombre(String cartaNombre) {this.cartaNombre = cartaNombre;}
	
	public String getOrdenacion() {return ordenacion;}
	public void setOrdenacion(String ordenacion) {this.ordenacion = ordenacion;}
}