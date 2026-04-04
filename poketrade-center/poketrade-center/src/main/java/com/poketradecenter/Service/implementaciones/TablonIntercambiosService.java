package com.poketradecenter.Service.implementaciones;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosIntercambio;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Mapper.interfaces.IIntercambioMapper;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.ITablonIntercambiosService;
import com.poketradecenter.Service.interfaces.IUsuarioService;
import com.poketradecenter.Utilities.implementaciones.Constantes;

@Service
public class TablonIntercambiosService implements ITablonIntercambiosService {
	
	@Autowired
	private IIntercambioMapper intercambioMapper;
	@Autowired
	private ICartaService cartaService;
	@Autowired
	private IUsuarioService usuarioService;
	
	@Override
	public List<Intercambio> recuperarIntercambiosPublicosPorCriterios(CriteriosIntercambio criterios) {
		try {
			return intercambioMapper.recuperarIntercambiosPublicosPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar los intercambios públicos del tablón", e);
		}
	}
	
	@Override
	public Usuario recuperarUsuarioPorCriterios(CriteriosUsuario criterios) {
		return usuarioService.recuperarUsuarioPorCriterios(criterios).get(Constantes.PRIMER_ELEMENTO);
	}
	
	@Override
	public Carta recuperarCartaPorCriterios(CriteriosCarta criterios) {
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(Constantes.PRIMER_ELEMENTO);
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
		
		CriteriosIntercambio criterios = new CriteriosIntercambio();
		criterios.setId(intercambio.getId());
		Intercambio intercambioBBDD = recuperarIntercambiosPublicosPorCriterios(criterios).get(Constantes.PRIMER_ELEMENTO);
		if(intercambioBBDD.getEstadoId() != Constantes.INTERCAMBIO_PUBLICO_ESTADO_SIN_OFERTA) {
			throw new RuntimeException("Parece que alguien se te ha adelantado y ya ha solicitado el intercambio");
		}
	}
	
	private Carta recuperarCarta(String cartaIntercambio) {
		String[] carta = cartaIntercambio.split(",");
		CriteriosCarta criterios = new CriteriosCarta();
		List<Integer> expansiones = new ArrayList<>();
		expansiones.add(Integer.parseInt(carta[Constantes.PRIMER_ELEMENTO].trim()));
		criterios.setExpansiones(expansiones);
		criterios.setCartaJuegoId(Integer.parseInt(carta[Constantes.ELEMENTO_1].trim()));
		return cartaService.recuperarCartasCrearBarajasPorCriterios(criterios).get(Constantes.PRIMER_ELEMENTO);
	}
	
	private void completarDatosSolicitarIntercambio(Intercambio intercambio) {
		Carta cartaParaOfrecer = recuperarCarta(intercambio.getCartaOfrecerFinal());
		Carta cartaParaQuerer = recuperarCarta(intercambio.getCartaQuererFinal());
		intercambio.setCartaOfrecerFinalNombre(cartaParaOfrecer.getNombre());
		intercambio.setCartaQuererFinalNombre(cartaParaQuerer.getNombre());
		intercambio.setEstadoId(Constantes.INTERCAMBIO_PUBLICO_ESTADO_OFERTA_RECIBIDA);
		intercambio.setFechaCambio(Constantes.FECHA_ACTUAL);
	}
	
	private void solicitar(Intercambio intercambio) {
		try {
			intercambioMapper.solicitarIntercambio(intercambio);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar un intercambios público del tablón", e);
		}
	}
}