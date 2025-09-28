package com.poketradecenter.Clase;

import java.util.List;

public class CriteriosCartaUsuario {
	
	private Integer id;
	private Integer usuarioId;
	private Integer expansionId;
	private Integer cartaJuegoId;
	private String nombre;
	private List<Integer> rarezas;
	private List<Integer> energias;
	private List<Integer> tipos;
	private Boolean obtenida;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public Integer getUsuarioId() {return usuarioId;}
	public void setUsuarioId(Integer usuarioId) {this.usuarioId = usuarioId;}
	
	public Integer getExpansionId() {return expansionId;}
	public void setExpansionId(Integer expansionId) {this.expansionId = expansionId;}
	
	public Integer getCartaJuegoId() {return cartaJuegoId;}
	public void setCartaJuegoId(Integer cartaJuegoId) {this.cartaJuegoId = cartaJuegoId;}
	
	public String getNombre() {return nombre;}
	public void setNombre(String nombre) {this.nombre = nombre;}
	
	public List<Integer> getRarezas() {return rarezas;}
	public void setRarezas(List<Integer> rarezas) {this.rarezas = rarezas;}
	
	public List<Integer> getEnergias() {return energias;}
	public void setEnergias(List<Integer> energias) {this.energias = energias;}
	
	public List<Integer> getTipos() {return tipos;}
	public void setTipos(List<Integer> tipos) {this.tipos = tipos;}
	
	public Boolean getObtenida() {return obtenida;}
	public void setObtenida(Boolean obtenida) {this.obtenida = obtenida;}
}