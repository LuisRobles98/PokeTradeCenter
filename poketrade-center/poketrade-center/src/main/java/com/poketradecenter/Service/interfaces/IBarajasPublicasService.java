package com.poketradecenter.Service.interfaces;
import java.util.List;

import com.poketradecenter.Clase.BarajaLike;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajaPublica;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosBarajaUsuario;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;

public interface IBarajasPublicasService {
	List<BarajaPublica> recuperarBarajasPublicasPorCriterios(CriteriosBarajaPublica criterios);
	Carta recuperarCartaBarajasPublicas(CriteriosCarta criterios);
	Usuario recuperarCreadorBarajasPublicas(CriteriosUsuario criterios);
	boolean comprobarLikeABaraja(CriteriosBarajaPublica criterios);
	void darLikeABaraja(BarajaLike barajaLike);
	void guardarBarajaPublicaComoUsuario(BarajaUsuario barajaUsuario);
	boolean comprobarBarajaPublicaGuardada(CriteriosBarajaUsuario criterios);
}