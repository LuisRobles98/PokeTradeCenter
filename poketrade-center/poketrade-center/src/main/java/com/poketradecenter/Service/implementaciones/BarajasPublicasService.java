package com.poketradecenter.Service.implementaciones;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.BarajaLike;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajaPublica;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosBarajaUsuario;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Mapper.interfaces.IBarajaLikeMapper;
import com.poketradecenter.Mapper.interfaces.IBarajaPublicaMapper;
import com.poketradecenter.Service.interfaces.IBarajasPublicasService;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ICrearBarajasService;
import com.poketradecenter.Service.interfaces.IMisBarajasService;
import com.poketradecenter.Service.interfaces.IUsuarioService;
import com.poketradecenter.Utilities.implementaciones.Constantes;

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
	public List<BarajaPublica> recuperarBarajasPublicasPorCriterios(CriteriosBarajaPublica criterios) {
		try {
			return barajaPublicaMapper.recuperarBarajasPublicasPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar las barajas públicas", e);
		}
	}
	
	@Override
	public Carta recuperarCartaBarajasPublicas(CriteriosCarta criterios) {	
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(Constantes.PRIMER_ELEMENTO);
	}
	
	@Override
	public Usuario recuperarCreadorBarajasPublicas(CriteriosUsuario criterios) {	
		return usuarioService.recuperarUsuarioPorCriterios(criterios).get(Constantes.PRIMER_ELEMENTO);
	}
	
	@Override
	public boolean comprobarLikeABaraja(CriteriosBarajaPublica criterios) {
		try {
			return !barajaLikeMapper.recuperarBarajaLikePorCriterios(criterios).isEmpty();
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
		CriteriosBarajaPublica criteriosBusqueda = new CriteriosBarajaPublica();
		criteriosBusqueda.setBarajaPublicaId(barajaLike.getBarajaPublicaId());
		BarajaPublica baraja = recuperarBarajasPublicasPorCriterios(criteriosBusqueda).get(Constantes.PRIMER_ELEMENTO);
		baraja.setMeGusta(baraja.getMeGusta() + Constantes.SUMAR_LIKE);
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
	public boolean comprobarBarajaPublicaGuardada(CriteriosBarajaUsuario criterios) {
		return !misBarajasService.recuperarMisBarajasPorCriterios(criterios).isEmpty();
	}
	
	@Override
	public void guardarBarajaPublicaComoUsuario(BarajaUsuario barajaUsuario) {
		crearBarajasService.guardarBarajaPublicaComoUsuario(barajaUsuario);
	}
}