package com.poketradecenter.Clase;

import java.time.LocalDateTime;

public class BarajaPublica {
	private Integer id;
	private Integer creadorId;
	private Integer barajaId;
	private Baraja baraja;
	private Integer meGusta;
	private LocalDateTime fechaCreacion;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public Integer getCreadorId() {return creadorId;}
	public void setCreadorId(Integer creadorId) {this.creadorId = creadorId;}
	
	public Integer getBarajaId() {return barajaId;}
	public void setBarajaId(Integer barajaId) {this.barajaId = barajaId;}
	
	public Baraja getBaraja() {return baraja;}
	public void setBaraja(Baraja baraja) {this.baraja = baraja;}
	
	public Integer getMeGusta() {return meGusta;}
	public void setMeGusta(Integer meGusta) {this.meGusta = meGusta;}
	
	public LocalDateTime getFechaCreacion() {return fechaCreacion;}
	public void setFechaCreacion(LocalDateTime localDateTime) {this.fechaCreacion = localDateTime;}
}