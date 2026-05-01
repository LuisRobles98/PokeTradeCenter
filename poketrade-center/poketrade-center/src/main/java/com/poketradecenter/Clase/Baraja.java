package com.poketradecenter.Clase;

import java.util.List;

public class Baraja {
	private Integer id;
	private String nombre;
	private List<CartaBaraja> cartas;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public String getNombre() {return nombre;}
	public void setNombre(String nombre) {this.nombre = nombre;}
	
	public List<CartaBaraja> getCartas() {return cartas;}
	public void setCartas(List<CartaBaraja> cartas) {this.cartas = cartas;}
}