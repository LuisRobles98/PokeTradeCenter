package com.poketradecenter.Service.implementaciones;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.CartaUsuario;
import com.poketradecenter.Clase.CriteriosBarajaUsuario;
import com.poketradecenter.Clase.CriteriosIntercambio;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Mapper.interfaces.IBarajaUsuarioMapper;
import com.poketradecenter.Mapper.interfaces.ICartaUsuarioMapper;
import com.poketradecenter.Mapper.interfaces.IIntercambioMapper;
import com.poketradecenter.Service.interfaces.IUsuarioGestionService;
import com.poketradecenter.Utilities.implementaciones.Constantes;

@Service
public class UsuarioGestionService implements IUsuarioGestionService { 
	@Autowired
	private ICartaUsuarioMapper cartaUsuarioMapper;
	@Autowired
	private IBarajaUsuarioMapper barajaUsuarioMapper;
	@Autowired
	private IIntercambioMapper intercambioMapper;
	
	
	@Async
	@Override
	public void insertarCartasNuevoUsuario(Integer usuarioId) {
		insertarCartasUsuario(usuarioId);
	}
	
	private void insertarCartasUsuario(Integer usuarioId) {
		CartaUsuario cartaUsuario = new CartaUsuario();
		cartaUsuario.setUsuarioId(usuarioId);
		cartaUsuario.setObtenida(false);
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_1; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_1);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_2; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_2);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_3; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_3);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_4; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_4);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_5; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_5);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_6; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_6);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_7; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_7);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_8; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_8);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_9; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_9);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_10; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_10);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_11; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_11);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
		for(Integer i = Constantes.CONTADOR_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_12; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_12);
			cartaUsuario.setCartaJuegoId(i);
			insertarCarta(cartaUsuario);
		}
	}
	
	private void insertarCarta(CartaUsuario cartaUsuario) {
		try {
			cartaUsuarioMapper.insertar(cartaUsuario);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error insertando cartas de usuario", e);
		}
	}
	
	@Override
	public void eliminarCartasUsuario(Integer usuarioId) {
		try {
			cartaUsuarioMapper.eliminar(usuarioId);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al eliminar las cartas del usuario", e);
		}
	}
	
	@Override
	public void eliminarBarajasUsuario(Integer usuarioId) {
		CriteriosBarajaUsuario criterios = new CriteriosBarajaUsuario();
		criterios.setUsuarioId(usuarioId);
		List<BarajaUsuario> barajas = recuperarMisBarajasPorCriterios(criterios);
		for(BarajaUsuario baraja : barajas) {
			eliminarBaraja(baraja);
		}
	}
	
	private void eliminarBaraja(BarajaUsuario baraja) {
		try {
			barajaUsuarioMapper.eliminarMiBaraja(baraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al eliminar la baraja", e);
		}
	}
	
	private List<BarajaUsuario> recuperarMisBarajasPorCriterios(CriteriosBarajaUsuario criterios) {
		try {
			return barajaUsuarioMapper.recuperarMisBarajasPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar tus barajas guardadas", e);
		}
	}
	
	@Override
	public void eliminarIntercambios(Integer usuarioId) {
		CriteriosIntercambio criterios = new CriteriosIntercambio();
		criterios.setUsuarioId(usuarioId);
		List<Intercambio> intercambios = recuperarIntercambiosActivosPorCriterios(criterios);
		for(Intercambio intercambio : intercambios) {
			if(intercambio.getOfertanteId().equals(usuarioId)) {
				intercambio.setEstadoId(Constantes.INTERCAMBIO_ACTIVO_ESTADO_FINALIZADO);
				intercambio.setFechaCambio(LocalDateTime.now());
				actualizar(intercambio);
			} else if(intercambio.getContraparteId().equals(usuarioId)) {
				intercambio.setContraparteId(null);
				intercambio.setEstadoId(Constantes.INTERCAMBIO_ACTIVO_ESTADO_SIN_OFERTA);
				intercambio.setCartaOfrecerFinalExpansionId(null);
				intercambio.setCartaOfrecerFinalCartaJuegoId(null);
				intercambio.setCartaQuererFinalExpansionId(null);
				intercambio.setCartaQuererFinalCartaJuegoId(null);
				intercambio.setFechaCambio(LocalDateTime.now());
				actualizar(intercambio);
			}
		}
	}
	
	private List<Intercambio> recuperarIntercambiosActivosPorCriterios(CriteriosIntercambio criterios) {
		try {
			return intercambioMapper.recuperarIntercambiosActivosPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar los intercambios activos del tablón", e);
		}
	}
	
	private void actualizar(Intercambio intercambio) {
		try {
			intercambioMapper.actualizar(intercambio);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar el intercambio", e);
		}
	}
}