package com.poketradecenter.Clase;

public class CartaUsuario {
	
	private Integer id;
	private Integer usuarioId;
	private Integer expansionId;
	private Integer cartaJuegoId;
	private String nombre;
	private Integer rarezaId;
	private Integer energiaId;
	private Integer tipoId;
	private boolean obtenida;
	
	public void setId(Integer id) {this.id = id;}
	public Integer getId() {return id;}
	
	public void setUsuarioId(Integer usuarioId) {this.usuarioId = usuarioId;}
	public Integer getUsuarioId() {return usuarioId;}
	
	public void setExpansionId(Integer expansionId) {this.expansionId = expansionId;}
	public Integer getExpansionId() {return expansionId;}
	
	public void setCartaJuegoId(Integer cartaJuegoId) {this.cartaJuegoId = cartaJuegoId;}
	public Integer getCartaJuegoId() {return cartaJuegoId;}
	
	public void setNombre(String nombre) {this.nombre = nombre;}
	public String getNombre() {return nombre;}
	
	public Integer getRarezaId() {return rarezaId;}
	public void setRarezaId(Integer rarezaId) {this.rarezaId = rarezaId;}
	
	public Integer getEnergiaId() {return energiaId;}
	public void setEnergiaId(Integer energiaId) {this.energiaId = energiaId;}
	
	public Integer getTipoId() {return tipoId;}
	public void setTipoId(Integer tipoId) {this.tipoId = tipoId;}
	
	public boolean isObtenida() {return obtenida;}
	public void setObtenida(boolean obtenida) {this.obtenida = obtenida;}
	
	
	
	
	
}