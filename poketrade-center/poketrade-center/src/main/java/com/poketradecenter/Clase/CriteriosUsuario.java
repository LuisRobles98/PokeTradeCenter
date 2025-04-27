package com.poketradecenter.Clase;

public class CriteriosUsuario {
	
	private Integer id;
	private String nombre;
	private String email;
	private String password;
	private String icono;
	private String idJuego;
	
	public void setId(Integer id) {this.id = id;}
	public Integer getId() {return id;}
	
	public void setNombre(String nombre) {this.nombre = nombre;}
	public String getNombre() {return nombre;}
	
	public void setEmail(String email) {this.email = email;}
	public String getEmail() {return email;}
	
	public void setPassword(String password) {this.password = password;}
	public String getPassword() {return password;}
	
	public void setIcono(String icono) {this.icono = icono;}
	public String getIcono() {return icono;}
	
	public void setIdJuego(String idJuego) {this.idJuego = idJuego;}
	public String getIdJuego() {return idJuego;}
}