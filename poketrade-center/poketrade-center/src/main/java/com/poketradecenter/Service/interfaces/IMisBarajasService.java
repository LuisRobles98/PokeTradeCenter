package com.poketradecenter.Service.interfaces;
import java.util.List;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajaPublica;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosBarajaUsuario;
import com.poketradecenter.Clase.Usuario;

public interface IMisBarajasService {
	List<BarajaUsuario> recuperarMisBarajasPorCriterios(CriteriosBarajaUsuario criterios);
	Carta recuperarCartaMisBarajas(CriteriosCarta criterios);
	void eliminarMiBaraja(BarajaUsuario baraja);
	Usuario recuperarCreadorMisBaraja(CriteriosBarajaPublica criterios);
}