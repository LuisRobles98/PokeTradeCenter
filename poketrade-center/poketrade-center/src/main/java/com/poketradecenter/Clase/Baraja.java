package com.poketradecenter.Clase;

import java.time.LocalDate;

public class Baraja {
	private Integer id;
	private String barajaNombre;
	private String cartas;
	private Integer usuarioId;
	private Integer creadorId;
	private LocalDate fechaCreacion;
	private Integer meGusta;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public String getBarajaNombre() {return barajaNombre;}
	public void setBarajaNombre(String barajaNombre) {this.barajaNombre = barajaNombre;}
	
	public String getCartas() {return cartas;}
	public void setCartas(String cartas) {this.cartas = cartas;}
	
	public Integer getUsuarioId() {return usuarioId;}
	public void setUsuarioId(Integer usuarioId) {this.usuarioId = usuarioId;}
	
	public Integer getCreadorId() {return creadorId;}
	public void setCreadorId(Integer creadorId) {this.creadorId = creadorId;}
	
	public LocalDate getFechaCreacion() {return fechaCreacion;}
	public void setFechaCreacion(LocalDate fechaCreacion) {this.fechaCreacion = fechaCreacion;}
	
	public Integer getMeGusta() {return meGusta;}
	public void setMeGusta(Integer meGusta) {this.meGusta = meGusta;}
}