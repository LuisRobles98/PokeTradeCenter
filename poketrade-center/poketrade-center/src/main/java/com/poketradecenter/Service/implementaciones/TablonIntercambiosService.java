package com.poketradecenter.Service.implementaciones;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosIntercambiosPublicos;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Mapper.interfaces.IIntercambioMapper;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ITablonIntercambiosService;
import com.poketradecenter.Service.interfaces.IUsuarioService;

@Service
public class TablonIntercambiosService implements ITablonIntercambiosService {
	
	@Autowired
	private IIntercambioMapper intercambioMapper;
	@Autowired
	private ICartaService cartaService;
	@Autowired
	private IUsuarioService usuarioService;
	
	@Override
	public List<Intercambio> recuperarIntercambiosPublicosPorCriterios(CriteriosIntercambiosPublicos criterios) {
		try {
			return intercambioMapper.recuperarIntercambiosPublicosPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar los intercambios públicos del tablón", e);
		}
	}
	
	@Override
	public Usuario recuperarUsuarioPorCriterios(CriteriosUsuario criterios) {
		return usuarioService.recuperarUsuarioPorCriterios(criterios).get(0);
	}
	
	@Override
	public Carta recuperarCartaPorCriterios(CriteriosCarta criterios) {
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(0);
	}
	
	@Override
	public void solicitarIntercambio(Intercambio intercambio) {
		validarDatosIntercambio(intercambio);
		completarDatosSolicitarIntercambio(intercambio);
		solicitar(intercambio);
	}
	
	private void validarDatosIntercambio(Intercambio intercambio) {
		if(intercambio.getCartaOfrecerFinal() == null) {
			throw new RuntimeException("No has seleccionado ninguna carta para quedarte");
		}
		if(intercambio.getCartaQuererFinal() == null) {
			throw new RuntimeException("No has seleccionado ninguna carta para ofrecer");
		}
		Carta cartaParaOfrecer = recuperarCarta(intercambio.getCartaOfrecerFinal());
		Carta cartaParaQuerer = recuperarCarta(intercambio.getCartaQuererFinal());
		if(cartaParaOfrecer.getRarezaId() != cartaParaQuerer.getRarezaId()) {
			throw new RuntimeException("Las rarezas de las cartas seleccionadas no coinciden");
		}
		
		CriteriosIntercambiosPublicos criterios = new CriteriosIntercambiosPublicos();
		criterios.setId(intercambio.getId());
		Intercambio intercambioBBDD = recuperarIntercambiosPublicosPorCriterios(criterios).get(0);
		if(intercambioBBDD.getEstadoId() != 1) {
			throw new RuntimeException("Parece que alguien se te ha adelantado y ya ha solicitado el intercambio");
		}
	}
	
	private Carta recuperarCarta(String cartaIntercambio) {
		String[] carta = cartaIntercambio.split(",");
		CriteriosCarta criterios = new CriteriosCarta();
		List<Integer> expansiones = new ArrayList<>();
		expansiones.add(Integer.parseInt(carta[0].trim()));
		criterios.setExpansiones(expansiones);
		criterios.setCartaJuegoId(Integer.parseInt(carta[1].trim()));
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(0);
	}
	
	private void completarDatosSolicitarIntercambio(Intercambio intercambio) {
		Carta cartaParaOfrecer = recuperarCarta(intercambio.getCartaOfrecerFinal());
		Carta cartaParaQuerer = recuperarCarta(intercambio.getCartaQuererFinal());
		intercambio.setCartaOfrecerFinalNombre(cartaParaOfrecer.getNombre());
		intercambio.setCartaOfrecerFinalNombre(cartaParaQuerer.getNombre());
		intercambio.setEstadoId(2);
		intercambio.setFechaCambio(LocalDateTime.now());
	}
	
	private void solicitar(Intercambio intercambio) {
		try {
			intercambioMapper.solicitarIntercambio(intercambio);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar un intercambios público del tablón", e);
		}
	}
}