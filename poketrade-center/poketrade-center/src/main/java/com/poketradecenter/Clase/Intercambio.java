package com.poketradecenter.Clase;

import java.time.LocalDateTime;
import java.util.List;

public class Intercambio {
	private Integer id;
	private Integer ofertanteId;
	private Integer contraparteId;
	private List<CartaIntercambio> cartasOfrecer;
	private List<CartaIntercambio> cartasQuerer;
	private Integer estadoId;
	private Integer cartaOfrecerFinalExpansionId;
	private Integer cartaOfrecerFinalCartaJuegoId;
	private Integer cartaQuererFinalExpansionId;
	private Integer cartaQuererFinalCartaJuegoId;
	private LocalDateTime fechaCreacion;
	private LocalDateTime fechaCambio;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public Integer getOfertanteId() {return ofertanteId;}
	public void setOfertanteId(Integer ofertanteId) {this.ofertanteId = ofertanteId;}
	
	public Integer getContraparteId() {return contraparteId;}
	public void setContraparteId(Integer contraparteId) {this.contraparteId = contraparteId;}
	
	public List<CartaIntercambio> getCartasOfrecer() {return cartasOfrecer;}
	public void setCartasOfrecer(List<CartaIntercambio> cartasOfrecer) {this.cartasOfrecer = cartasOfrecer;}
	
	public List<CartaIntercambio> getCartasQuerer() {return cartasQuerer;}
	public void setCartasQuerer(List<CartaIntercambio> cartasQuerer) {this.cartasQuerer = cartasQuerer;}
	
	public Integer getEstadoId() {return estadoId;}
	public void setEstadoId(Integer estadoId) {this.estadoId = estadoId;}
	
	public Integer getCartaOfrecerFinalExpansionId() {return cartaOfrecerFinalExpansionId;}
	public void setCartaOfrecerFinalExpansionId(Integer cartaOfrecerFinalExpansionId) {this.cartaOfrecerFinalExpansionId = cartaOfrecerFinalExpansionId;}
	
	public Integer getCartaOfrecerFinalCartaJuegoId() {return cartaOfrecerFinalCartaJuegoId;}
	public void setCartaOfrecerFinalCartaJuegoId(Integer cartaOfrecerFinalCartaJuegoId) {this.cartaOfrecerFinalCartaJuegoId = cartaOfrecerFinalCartaJuegoId;}
	
	public Integer getCartaQuererFinalExpansionId() {return cartaQuererFinalExpansionId;}
	public void setCartaQuererFinalExpansionId(Integer cartaQuererFinalExpansionId) {this.cartaQuererFinalExpansionId = cartaQuererFinalExpansionId;}
	
	public Integer getCartaQuererFinalCartaJuegoId() {return cartaQuererFinalCartaJuegoId;}
	public void setCartaQuererFinalCartaJuegoId(Integer cartaQuererFinalCartaJuegoId) {this.cartaQuererFinalCartaJuegoId = cartaQuererFinalCartaJuegoId;}
	
	public LocalDateTime getFechaCreacion() {return fechaCreacion;}
	public void setFechaCreacion(LocalDateTime fechaCreacion) {this.fechaCreacion = fechaCreacion;}
	
	public LocalDateTime getFechaCambio() {return fechaCambio;}
	public void setFechaCambio(LocalDateTime fechaCambio) {this.fechaCambio = fechaCambio;}
}