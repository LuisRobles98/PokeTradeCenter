package com.poketradecenter.Service.implementaciones;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.CartaUsuario;
import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Service.interfaces.ICartaService;
import com.poketradecenter.Service.interfaces.IColeccionCartasService;
import com.poketradecenter.Utilities.implementaciones.Constantes;
import com.poketradecenter.Mapper.interfaces.ICartaUsuarioMapper;

@Service
public class ColeccionCartasService implements IColeccionCartasService {
	
	@Autowired
	private ICartaUsuarioMapper cartaUsuarioMapper;
	@Autowired
	private ICartaService cartaService;
	
	@Override
	public List<CartaUsuario> recuperarCartaUsuarioPorCriterios(CriteriosCartaUsuario criterios) {
		try {
			return cartaUsuarioMapper.recuperarPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar los datos de las cartas del usuario", e);
		}
	}
	
	@Override
	public void actualizarCarta(CartaUsuario cartaUsuario) {
		validarActualizarCarta(cartaUsuario);
		actualizar(cartaUsuario);
	}
	
	private void validarActualizarCarta(CartaUsuario cartaUsuario) {
		CartaUsuario cartaUsuarioBBDD = recuperarCartaUsuario(cartaUsuario);
		if(cartaUsuarioBBDD != null && (cartaUsuario.isObtenida() == cartaUsuarioBBDD.isObtenida())) {
			throw new RuntimeException("El estado de la carta es el mismo que el almacenado en el sistema");
		}
	}
	
	private CartaUsuario recuperarCartaUsuario(CartaUsuario cartaUsuario) {
		CriteriosCartaUsuario criterios = new CriteriosCartaUsuario();
		criterios.setUsuarioId(cartaUsuario.getUsuarioId());
		List<Integer> expansiones = new ArrayList<>();
		expansiones.add(cartaUsuario.getExpansionId());
		criterios.setExpansiones(expansiones);
		criterios.setCartaJuegoId(cartaUsuario.getCartaJuegoId());
		return recuperarCartaUsuarioPorCriterios(criterios).get(Constantes.PRIMER_ELEMENTO);
	}
	
	private void actualizar(CartaUsuario cartaUsuario) {
		try {
			cartaUsuarioMapper.actualizar(cartaUsuario);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar los datos de la carta", e);
		}
	}
	
	@Override
	public Integer recuperarTotalCartasPorExpansion(Integer expansionId) {
		try {
			return cartaService.recuperarTotalCartasPorExpansion(expansionId);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar el total de cartas de la expansión", e);
		}
	}
	
	@Override
	public void insertarCartasNuevoUsuario(Integer usuarioId) {
		CartaUsuario cartaUsuario = new CartaUsuario();
		cartaUsuario.setUsuarioId(usuarioId);
		cartaUsuario.setObtenida(false);
		for(Integer i = Constantes.ELEMENTO_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_1; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_1);
			cartaUsuario.setCartaJuegoId(i);
			cartaUsuarioMapper.insertar(cartaUsuario);
		}
		for(Integer i = Constantes.ELEMENTO_1; i <= Constantes.TOTAL_CARTAS_EXPANSION_2; i++) {
			cartaUsuario.setExpansionId(Constantes.EXPANSION_2);
			cartaUsuario.setCartaJuegoId(i);
			cartaUsuarioMapper.insertar(cartaUsuario);
		}
	}
}