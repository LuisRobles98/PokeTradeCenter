package com.poketradecenter.Clase;

import java.time.LocalDateTime;

public class BarajaUsuario {
	private Integer id;
	private Integer usuarioId;
	private Integer barajaPublicaId;
	private Integer barajaId;
	private Baraja baraja;
	private LocalDateTime fechaCreacion;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public Integer getUsuarioId() {return usuarioId;}
	public void setUsuarioId(Integer usuarioId) {this.usuarioId = usuarioId;}
	
	public Integer getBarajaPublicaId() {return barajaPublicaId;}
	public void setBarajaPublicaId(Integer barajaPublicaId) {this.barajaPublicaId = barajaPublicaId;}
	
	public Integer getBarajaId() {return barajaId;}
	public void setBarajaId(Integer barajaId) {this.barajaId = barajaId;}
	
	public Baraja getBaraja() {return baraja;}
	public void setBaraja(Baraja baraja) {this.baraja = baraja;}
	
	public LocalDateTime getFechaCreacion() {return fechaCreacion;}
	public void setFechaCreacion(LocalDateTime localDateTime) {this.fechaCreacion = localDateTime;}
}