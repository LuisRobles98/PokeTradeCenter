package com.poketradecenter.Service.interfaces;
import java.util.List;

import com.poketradecenter.Clase.BarajaLike;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosMisBarajas;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;

public interface IBarajasPublicasService {
	List<BarajaPublica> recuperarBarajasPublicasPorCriterios(CriteriosBarajasPublicas criterios);
	Carta recuperarCartaBarajasPublicas(CriteriosCarta criterios);
	Usuario recuperarCreadorBarajasPublicas(CriteriosUsuario criterios);
	boolean comprobarLikeABaraja(CriteriosBarajasPublicas criterios);
	void darLikeABaraja(BarajaLike barajaLike);
	void guardarBarajaPublicaComoUsuario(BarajaUsuario barajaUsuario);
	boolean comprobarBarajaPublicaGuardada(CriteriosMisBarajas criterios);
}