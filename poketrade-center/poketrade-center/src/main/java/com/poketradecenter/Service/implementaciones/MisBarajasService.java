package com.poketradecenter.Service.implementaciones;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosMisBarajas;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Mapper.interfaces.IBarajaPublicaMapper;
import com.poketradecenter.Mapper.interfaces.IBarajaUsuarioMapper;
import com.poketradecenter.Service.interfaces.IBarajasPublicasService;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.IMisBarajasService;
import com.poketradecenter.Service.interfaces.IUsuarioService;

@Service
public class MisBarajasService implements IMisBarajasService {
	
	@Autowired
	private IBarajaUsuarioMapper barajaUsuarioMapper;
	
	@Autowired
	private ICartaService cartaService;
	
	@Autowired
	private IUsuarioService usuarioService;
	
	@Autowired
	private IBarajaPublicaMapper barajaPublicaMapper;
	
	@Override
	public List<BarajaUsuario> recuperarMisBarajasPorCriterios(CriteriosMisBarajas criterios) {
		try {
			return barajaUsuarioMapper.recuperarMisBarajasPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar tus barajas guardadas", e);
		}
	}
	
	@Override
	public Carta recuperarCartaMisBarajas(CriteriosCarta criterios) {	
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(0);
	}
	
	@Override
	public void eliminarMiBaraja(BarajaUsuario baraja) {
		try {
			barajaUsuarioMapper.eliminarMiBaraja(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al eliminar la baraja", e);
		}
	}
	
	@Override
	public Usuario recuperarCreadorMisBaraja(CriteriosBarajasPublicas criterios) {
		BarajaPublica baraja = recuperarBarajaPublica(criterios);
		CriteriosUsuario criteriosUsuario = new CriteriosUsuario();
		criteriosUsuario.setId(baraja.getCreadorId());
		return usuarioService.recuperarUsuarioPorCriterios(criteriosUsuario).get(0);
	}
	
	private BarajaPublica recuperarBarajaPublica(CriteriosBarajasPublicas criterios) {
		try {
			return barajaPublicaMapper.recuperarBarajasPublicasPorCriterios(criterios).get(0);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar la baraja pública", e);
		}
	}
}