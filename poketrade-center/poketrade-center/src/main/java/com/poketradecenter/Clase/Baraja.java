package com.poketradecenter.Clase;

import java.time.LocalDateTime;

public class Baraja {
	private Integer id;
	private String nombre;
	private String cartas;
	private Integer creadorId;
	private LocalDateTime fechaCreacion;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public String getNombre() {return nombre;}
	public void setNombre(String nombre) {this.nombre = nombre;}
	
	public String getCartas() {return cartas;}
	public void setCartas(String cartas) {this.cartas = cartas;}
		
	public Integer getCreadorId() {return creadorId;}
	public void setCreadorId(Integer creadorId) {this.creadorId = creadorId;}
	
	public LocalDateTime getFechaCreacion() {return fechaCreacion;}
	public void setFechaCreacion(LocalDateTime localDateTime) {this.fechaCreacion = localDateTime;}
}