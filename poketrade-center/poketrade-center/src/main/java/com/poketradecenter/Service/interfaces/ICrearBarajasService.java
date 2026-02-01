package com.poketradecenter.Service.interfaces;
import java.util.List;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;

public interface ICrearBarajasService {
	List<Carta> recuperarCartasPorCriterios(CriteriosCarta criteriosCarta);
	void guardarBaraja(BarajaUsuario baraja);
	void publicarBaraja(BarajaPublica baraja);
	void guardarPublicarBaraja(BarajaPublica barajaPublica);
	void guardarBarajaPublicaComoUsuario(BarajaUsuario barajaUsuario);
}