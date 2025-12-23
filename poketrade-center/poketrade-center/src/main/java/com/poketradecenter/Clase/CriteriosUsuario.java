package com.poketradecenter.Clase;

public class CriteriosUsuario {
	
	private Integer id;
	private String nombre;
	private String email;
	private String password;
	private String juegoId;
	private Integer iconoId;
	private Integer emblema1Id;
	private Integer emblema2Id;
	private Integer emblema3Id;
	
	
	public void setId(Integer id) {this.id = id;}
	public Integer getId() {return id;}
	
	public void setNombre(String nombre) {this.nombre = nombre;}
	public String getNombre() {return nombre;}
	
	public void setEmail(String email) {this.email = email;}
	public String getEmail() {return email;}
	
	public void setPassword(String password) {this.password = password;}
	public String getPassword() {return password;}
	
	public void setJuegoId(String juegoId) {this.juegoId = juegoId;}
	public String getJuegoId() {return juegoId;}
	
	public void setIconoId(Integer iconoId) {this.iconoId = iconoId;}
	public Integer getIconoId() {return iconoId;}
	
	public void setEmblema1Id(Integer emblema1Id) {this.emblema1Id = emblema1Id;}
	public Integer getEmblema1Id() {return emblema1Id;}
	
	public void setEmblema2Id(Integer emblema2Id) {this.emblema2Id = emblema2Id;}
	public Integer getEmblema2Id() {return emblema2Id;}
	
	public void setEmblema3Id(Integer emblema3Id) {this.emblema3Id = emblema3Id;}
	public Integer getEmblema3Id() {return emblema3Id;}
	
	
}