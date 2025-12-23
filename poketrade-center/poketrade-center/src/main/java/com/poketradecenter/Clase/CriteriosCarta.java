package com.poketradecenter.Clase;

import java.util.List;

public class CriteriosCarta {
	
	private Integer cartaJuegoId;
	private String nombre;
	private List<Integer> expansiones;
	private List<Integer> rarezas;
	private List<Integer> energias;
	private List<Integer> tipos;
		
	public Integer getCartaJuegoId() {return cartaJuegoId;}
	public void setCartaJuegoId(Integer cartaJuegoId) {this.cartaJuegoId = cartaJuegoId;}
	
	public String getNombre() {return nombre;}
	public void setNombre(String nombre) {this.nombre = nombre;}
	
	public List<Integer> getExpansiones() {return expansiones;}
	public void setExpansiones(List<Integer> expansiones) {this.expansiones = expansiones;}
	
	public List<Integer> getRarezas() {return rarezas;}
	public void setRarezas(List<Integer> rarezas) {this.rarezas = rarezas;}
	
	public List<Integer> getEnergias() {return energias;}
	public void setEnergias(List<Integer> energias) {this.energias = energias;}
	
	public List<Integer> getTipos() {return tipos;}
	public void setTipos(List<Integer> tipos) {this.tipos = tipos;}
}