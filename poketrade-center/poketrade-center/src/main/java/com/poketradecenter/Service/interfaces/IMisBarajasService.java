package com.poketradecenter.Service.interfaces;
import java.util.List;
import java.util.Map;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosMisBarajas;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;

public interface IMisBarajasService {
	CriteriosMisBarajas crearCriteriosMisBarajasParams(Map<String, String> params);
	CriteriosCarta crearCriteriosCartaParams(Map<String, String> params);
	CriteriosUsuario crearCriteriosUsuarioParams(Map<String, String> params);
	List<BarajaUsuario> recuperarMisBarajasPorCriterios(CriteriosMisBarajas criterios);
	Carta recuperarCartaMisBarajas(CriteriosCarta criterios);
	void eliminarMiBaraja(BarajaUsuario baraja);
	Usuario recuperarCreadorMisBaraja(CriteriosUsuario criterios);
}