package com.poketradecenter.Clase;

import java.time.LocalDateTime;

public class Intercambio {
	private Integer id;
	private Integer ofertanteId;
	private Integer contraparteId;
	private String cartasOfrecer;
	private String cartasQuerer;
	private String cartasOfrecerNombre;
	private String cartasQuererNombre;
	private Integer estadoId;
	private String cartaOfrecerFinal;
	private String cartaQuererFinal;
	private String cartaOfrecerFinalNombre;
	private String cartaQuererFinalNombre;
	private LocalDateTime fechaCreacion;
	private LocalDateTime fechaCambio;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public Integer getOfertanteId() {return ofertanteId;}
	public void setOfertanteId(Integer ofertanteId) {this.ofertanteId = ofertanteId;}
	
	public Integer getContraparteId() {return contraparteId;}
	public void setContraparteId(Integer contraparteId) {this.contraparteId = contraparteId;}
	
	public String getCartasOfrecer() {return cartasOfrecer;}
	public void setCartasOfrecer(String cartasOfrecer) {this.cartasOfrecer = cartasOfrecer;}
	
	public String getCartasQuerer() {return cartasQuerer;}
	public void setCartasQuerer(String cartasQuerer) {this.cartasQuerer = cartasQuerer;}
	
	public String getCartasOfrecerNombre() {return cartasOfrecerNombre;}
	public void setCartasOfrecerNombre(String cartasOfrecerNombre) {this.cartasOfrecerNombre = cartasOfrecerNombre;}
	
	public String getCartasQuererNombre() {return cartasQuererNombre;}
	public void setCartasQuererNombre(String cartasQuererNombre) {this.cartasQuererNombre = cartasQuererNombre;}
	
	public Integer getEstadoId() {return estadoId;}
	public void setEstadoId(Integer estadoId) {this.estadoId = estadoId;}
	
	public String getCartaOfrecerFinal() {return cartaOfrecerFinal;}
	public void setCartaOfrecerFinal(String cartaOfrecerFinal) {this.cartaOfrecerFinal = cartaOfrecerFinal;}
	
	public String getCartaQuererFinal() {return cartaQuererFinal;}
	public void setCartaQuererFinal(String cartaQuererFinal) {this.cartaQuererFinal = cartaQuererFinal;}
	
	public String getCartaOfrecerFinalNombre() {return cartaOfrecerFinalNombre;}
	public void setCartaOfrecerFinalNombre(String cartaOfrecerFinalNombre) {this.cartaOfrecerFinalNombre = cartaOfrecerFinalNombre;}
	
	public String getCartaQuererFinalNombre() {return cartaQuererFinalNombre;}
	public void setCartaQuererFinalNombre(String cartaQuererFinalNombre) {this.cartaQuererFinalNombre = cartaQuererFinalNombre;}
	
	public LocalDateTime getFechaCreacion() {return fechaCreacion;}
	public void setFechaCreacion(LocalDateTime fechaCreacion) {this.fechaCreacion = fechaCreacion;}
	
	public LocalDateTime getFechaCambio() {return fechaCambio;}
	public void setFechaCambio(LocalDateTime fechaCambio) {this.fechaCambio = fechaCambio;}
	
	
}