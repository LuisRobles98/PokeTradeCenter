package com.poketradecenter.Service.implementaciones;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Mapper.interfaces.ICartaMapper;
import com.poketradecenter.Service.interfaces.ICartaService;

@Service
public class CartaService implements ICartaService {
	
	@Autowired
	private ICartaMapper cartaMapper;
	
	@Override
	public Integer recuperarTotalCartasPorExpansion(Integer expansionId) {
		try {
			return cartaMapper.recuperarTotalCartasPorExpansion(expansionId);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar el total de cartas de la expansión", e);
		}
	}
	
	@Override
	public List<Carta> recuperarCartasPorCriterios(CriteriosCarta criterios) {
		try {
			return cartaMapper.recuperarCartasCrearBarajasPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar cartas durante la creacion de barajas", e);
		}
	}
	
}