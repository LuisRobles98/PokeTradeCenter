package com.poketradecenter.Clase;

public class CriteriosIntercambio {
	
	private Integer id;
	private Integer usuarioId;
	private String cartasOfrecerNombre;
	private String cartasQuererNombre;
	private String ordenacion;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public Integer getUsuarioId() {return usuarioId;}
	public void setUsuarioId(Integer usuarioId) {this.usuarioId = usuarioId;}
	
	public String getCartasOfrecerNombre() {return cartasOfrecerNombre;}
	public void setCartasOfrecerNombre(String cartasOfrecerNombre) {this.cartasOfrecerNombre = cartasOfrecerNombre;}
	
	public String getCartasQuererNombre() {return cartasQuererNombre;}
	public void setCartasQuererNombre(String cartasQuererNombre) {this.cartasQuererNombre = cartasQuererNombre;}
	
	public String getOrdenacion() {return ordenacion;}
	public void setOrdenacion(String ordenacion) {this.ordenacion = ordenacion;}
}