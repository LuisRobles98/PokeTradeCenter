package com.poketradecenter.Service.implementaciones;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Mapper.interfaces.IBarajaMapper;
import com.poketradecenter.Service.interfaces.IBarajaService;

@Service
public class BarajaService implements IBarajaService {
	
	@Autowired
	private IBarajaMapper barajaMapper;
	
	@Override
	public Baraja guardarBaraja(Baraja baraja) {
		try {
			barajaMapper.guardar(baraja);
			return baraja;
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al guardar la baraja", e);
		}
	}
	
}