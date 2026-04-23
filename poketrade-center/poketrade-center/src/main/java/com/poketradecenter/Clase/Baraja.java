package com.poketradecenter.Clase;

import java.util.List;

public class Baraja {
	private Integer id;
	private String nombre;
	private List<Carta> cartas;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public String getNombre() {return nombre;}
	public void setNombre(String nombre) {this.nombre = nombre;}
	
	public List<Carta> getCartas() {return cartas;}
	public void setCartas(List<Carta> cartas) {this.cartas = cartas;}
}