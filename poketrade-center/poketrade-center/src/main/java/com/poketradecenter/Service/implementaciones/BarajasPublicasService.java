package com.poketradecenter.Service.implementaciones;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.BarajaLike;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Mapper.interfaces.IBarajaLikeMapper;
import com.poketradecenter.Mapper.interfaces.IBarajaPublicaMapper;
import com.poketradecenter.Service.interfaces.IBarajasPublicasService;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ICrearBarajasService;
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
	
	@Override
	public List<BarajaPublica> recuperarBarajasPublicasPorCriterios(CriteriosBarajasPublicas criterios) {
		try {
			List<BarajaPublica> barajas = barajaPublicaMapper.recuperarBarajasPublicasPorCriterios(criterios);
			return barajas;
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
	public void darLikeABaraja(CriteriosBarajasPublicas criterios) {
		darLike(criterios);
		guardarLike(criterios);
	}
	
	private void darLike(CriteriosBarajasPublicas criterios) {
		CriteriosBarajasPublicas criteriosBusqueda = new CriteriosBarajasPublicas();
		criteriosBusqueda.setBarajaId(criterios.getBarajaId());
		BarajaPublica baraja = recuperarBarajasPublicasPorCriterios(criteriosBusqueda).get(0);
		baraja.setMeGusta(baraja.getMeGusta() + 1);
		actualizarBaraja(baraja);
	}
	
	private void actualizarBaraja(BarajaPublica baraja) {
		try {
			barajaPublicaMapper.actualizarBaraja(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar la baraja", e);
		}
	}
	
	private void guardarLike(CriteriosBarajasPublicas criterios) {
		BarajaLike baraja = new BarajaLike();
		baraja.setBarajaId(criterios.getBarajaId());
		baraja.setUsuarioId(criterios.getUsuarioId());
		guardarBarajaLike(baraja);
	}
	
	private void guardarBarajaLike(BarajaLike baraja) {
		try {
			barajaLikeMapper.crear(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al crear el like de la baraja", e);
		}
	}
	
	@Override
	public void guardarBaraja(CriteriosBarajasPublicas criterios) {
		CriteriosBarajasPublicas criteriosBusqueda = new CriteriosBarajasPublicas();
		criteriosBusqueda.setBarajaId(criterios.getBarajaId());
		BarajaPublica barajaPublica = recuperarBarajasPublicasPorCriterios(criteriosBusqueda).get(0);
		BarajaUsuario barajaUsuario = new BarajaUsuario(barajaPublica); 
		barajaUsuario.setUsuarioId(criterios.getUsuarioId());
		crearBarajasService.guardarBaraja(barajaUsuario);
	}
}