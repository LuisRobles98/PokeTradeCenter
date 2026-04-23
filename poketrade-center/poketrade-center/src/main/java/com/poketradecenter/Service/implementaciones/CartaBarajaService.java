package com.poketradecenter.Service.implementaciones;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CartaBaraja;
import com.poketradecenter.Mapper.interfaces.ICartaBarajaMapper;
import com.poketradecenter.Service.interfaces.ICartaBarajaService;


@Service
public class CartaBarajaService implements ICartaBarajaService {
	
	@Autowired
	private ICartaBarajaMapper cartaBarajaMapper;
	
	public void guardarCartasBaraja(Baraja baraja) {
		Integer barajaId = baraja.getId();
		List<Carta> cartas = baraja.getCartas();
		Integer orden = 0;
		for(Carta carta : cartas) {
			orden ++;
			CartaBaraja cartaBaraja = generarCartaBaraja(carta, barajaId, orden);
			guardar(cartaBaraja);
		}
	}
	
	private CartaBaraja generarCartaBaraja(Carta carta, Integer barajaId, Integer orden) {
		Integer expansionId = carta.getExpansionId();
		Integer cartaJuegoId = carta.getCartaJuegoId();
		
		CartaBaraja cartaBaraja = new CartaBaraja();
		cartaBaraja.setBarajaId(barajaId);
		cartaBaraja.setExpansionId(expansionId);
		cartaBaraja.setCartaJuegoId(cartaJuegoId);
		cartaBaraja.setOrden(orden);
		
		return cartaBaraja;
	}
	
	private void guardar(CartaBaraja cartaBaraja) {
		try {
			cartaBarajaMapper.guardar(cartaBaraja);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al guardar las cartas de la baraja", e);
		}
	}
}
