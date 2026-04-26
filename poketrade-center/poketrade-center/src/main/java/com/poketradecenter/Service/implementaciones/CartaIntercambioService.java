package com.poketradecenter.Service.implementaciones;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CartaIntercambio;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Mapper.interfaces.ICartaIntercambioMapper;
import com.poketradecenter.Service.interfaces.ICartaIntercambioService;
import com.poketradecenter.Utilities.implementaciones.Constantes;

@Service
public class CartaIntercambioService implements ICartaIntercambioService {
	
	@Autowired
	private ICartaIntercambioMapper cartaIntercambioMapper;
	
	@Override
	public void guardarCartasIntercambio(Intercambio intercambio) {
		guardarCartasIntercambioOfrecer(intercambio);
		guardarCartasIntercambioQuerer(intercambio);
	}
	
	private void guardarCartasIntercambioOfrecer(Intercambio intercambio) {
		List<CartaIntercambio> cartas = intercambio.getCartasOfrecer();
		Integer intercambioId = intercambio.getId();
		Integer orden = Constantes.CONTADOR_1;
		
		for(CartaIntercambio carta : cartas) {
			CartaIntercambio cartaIntercambio = generarCartaIntercambio(carta, intercambioId, orden);
			guardarCartaOfrecer(cartaIntercambio);
			orden ++;
		}
	}
	
	private void guardarCartasIntercambioQuerer(Intercambio intercambio) {
		List<CartaIntercambio> cartas = intercambio.getCartasQuerer();
		Integer intercambioId = intercambio.getId();
		Integer orden = Constantes.CONTADOR_1;
		
		for(CartaIntercambio carta : cartas) {
			CartaIntercambio cartaIntercambio = generarCartaIntercambio(carta, intercambioId, orden);
			guardarCartaQuerer(cartaIntercambio);
			orden ++;
		}
	}
	
	private void guardarCartaOfrecer(CartaIntercambio cartaIntercambio) {
		try {
			cartaIntercambioMapper.guardarOfrecer(cartaIntercambio);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al guardar una carta del intercambio", e);
		}
	}
	
	private void guardarCartaQuerer(CartaIntercambio cartaIntercambio) {
		try {
			cartaIntercambioMapper.guardarQuerer(cartaIntercambio);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al guardar una carta del intercambio", e);
		}
	}
	
	private CartaIntercambio generarCartaIntercambio(CartaIntercambio carta, Integer intercambioId, Integer orden) {
		CartaIntercambio cartaIntercambio = new CartaIntercambio();
		cartaIntercambio.setIntercambioId(intercambioId);
		cartaIntercambio.setExpansionId(carta.getExpansionId());
		cartaIntercambio.setCartaJuegoId(carta.getCartaJuegoId());
		cartaIntercambio.setOrden(orden);
		return cartaIntercambio;
	}
}