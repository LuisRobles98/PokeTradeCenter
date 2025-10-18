package com.poketradecenter.Service.implementaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
}