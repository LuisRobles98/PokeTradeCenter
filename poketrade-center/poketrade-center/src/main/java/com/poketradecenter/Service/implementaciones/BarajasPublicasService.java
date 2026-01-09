package com.poketradecenter.Service.implementaciones;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.BarajaLike;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosMisBarajas;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Mapper.interfaces.IBarajaLikeMapper;
import com.poketradecenter.Mapper.interfaces.IBarajaPublicaMapper;
import com.poketradecenter.Service.interfaces.IBarajasPublicasService;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ICrearBarajasService;
import com.poketradecenter.Service.interfaces.IMisBarajasService;
import com.poketradecenter.Service.interfaces.IUsuarioService;

@Service
public class BarajasPublicasService implements IBarajasPublicasService {
	
	@Autowired
	private IBarajaPublicaMapper barajaPublicaMapper;
	@Autowired
	private IBarajaLikeMapper barajaLikeMapper;
	@Autowired
	private ICartaService cartaService;
	@Autowired
	private IUsuarioService usuarioService;
	@Autowired
	private ICrearBarajasService crearBarajasService;
	@Autowired
	private IMisBarajasService misBarajasService;
	
	@Override
	public List<BarajaPublica> recuperarBarajasPublicasPorCriterios(CriteriosBarajasPublicas criterios) {
		try {
			return barajaPublicaMapper.recuperarBarajasPublicasPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar las barajas públicas", e);
		}
	}
	
	@Override
	public Carta recuperarCartaBarajasPublicas(CriteriosCarta criterios) {	
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(0);
	}
	
	@Override
	public Usuario recuperarCreadorBarajasPublicas(CriteriosUsuario criterios) {	
		return usuarioService.recuperarUsuarioPorCriterios(criterios).get(0);
	}
	
	@Override
	public boolean comprobarLikeABaraja(CriteriosBarajasPublicas criterios) {
		try {
			return barajaLikeMapper.recuperarBarajaLikePorCriterios(criterios).size() > 0;
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al comprobar si ya se había dado like a esa baraja", e);
		}
	}
	
	@Override
	public void darLikeABaraja(BarajaLike barajaLike) {
		darLike(barajaLike);
		guardarBarajaLike(barajaLike);
	}
	
	private void darLike(BarajaLike barajaLike) {
		CriteriosBarajasPublicas criteriosBusqueda = new CriteriosBarajasPublicas();
		criteriosBusqueda.setBarajaPublicaId(barajaLike.getBarajaPublicaId());
		BarajaPublica baraja = recuperarBarajasPublicasPorCriterios(criteriosBusqueda).get(0);
		baraja.setMeGusta(baraja.getMeGusta() + 1);
		actualizarBaraja(baraja);
	}
	
	private void actualizarBaraja(BarajaPublica baraja) {
		try {
			barajaPublicaMapper.actualizar(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar la baraja", e);
		}
	}
	
	private void guardarBarajaLike(BarajaLike baraja) {
		try {
			barajaLikeMapper.crear(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al crear el like de la baraja", e);
		}
	}
	
	@Override
	public boolean comprobarBarajaPublicaGuardada(CriteriosMisBarajas criterios) {
		return misBarajasService.recuperarMisBarajasPorCriterios(criterios).size() > 0;
	}
	
	@Override
	public void guardarBarajaPublicaComoUsuario(BarajaUsuario barajaUsuario) {
		crearBarajasService.guardarBarajaPublicaComoUsuario(barajaUsuario);
	}
}