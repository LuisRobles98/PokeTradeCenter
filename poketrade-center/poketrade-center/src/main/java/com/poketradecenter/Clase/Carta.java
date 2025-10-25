package com.poketradecenter.Clase;

public class Carta {
	
	private Integer expansionId;
	private Integer cartaJuegoId;
	private String nombre;
	private Integer rarezaId;
	private Integer energiaId;
	private Integer tipoId;
	private Boolean basico;
	
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
	
	public Boolean getBasico() {return basico;}
	public void setBasico(Boolean basico) {this.basico = basico;}
}