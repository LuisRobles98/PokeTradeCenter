package com.poketradecenter.Service.implementaciones;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosMisBarajas;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Mapper.interfaces.IBarajaUsuarioMapper;
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
	public Usuario recuperarCreadorMisBaraja(CriteriosUsuario criterios) {	
		return usuarioService.recuperarUsuarioPorCriterios(criterios).get(0);
	}
}