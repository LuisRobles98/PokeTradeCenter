package com.poketradecenter.Service.implementaciones;

import java.time.LocalDateTime;
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
import com.poketradecenter.Service.interfaces.IIntercambiosActivosService;
import com.poketradecenter.Service.interfaces.IUsuarioService;
import com.poketradecenter.Utilities.implementaciones.Constantes;

@Service
public class IntercambiosActivosService implements IIntercambiosActivosService {
	
	@Autowired
	private IIntercambioMapper intercambioMapper;
	@Autowired
	private ICartaService cartaService;
	@Autowired
	private IUsuarioService usuarioService;
	
	@Override
	public List<Intercambio> recuperarIntercambiosActivosPorCriterios(CriteriosIntercambio criterios) {
		try {
			return intercambioMapper.recuperarIntercambiosActivosPorCriterios(criterios);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al recuperar los intercambios activos del tablón", e);
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
	public void actualizarIntercambio(Intercambio intercambio) {
		validarIntercambio(intercambio);
		completarDatosActualizarIntercambio(intercambio);
		actualizar(intercambio);
	}
	
	private void validarIntercambio(Intercambio intercambio) {
		if(intercambio.getEstadoId().equals(Constantes.INTERCAMBIO_ACTIVO_ESTADO_OFERTA_RECIBIDA)) {
			throw new RuntimeException("Se ha insertado un estado que no corresponde");
		}
		if(intercambio.getEstadoId().equals(Constantes.INTERCAMBIO_ACTIVO_ESTADO_SIN_OFERTA) && intercambio.getContraparteId() != null) {
			throw new RuntimeException("Si se vuelve a publicar el intercambio no puede haber una persona como contraparte");
		}
		if(intercambio.getEstadoId().equals(Constantes.INTERCAMBIO_ACTIVO_ESTADO_OFERTA_ACEPTADA) && intercambio.getContraparteId() == null) {
			throw new RuntimeException("Tiene que haber una persona como contraparte al aceptar el intercambio");
		}
	}
	
	private void completarDatosActualizarIntercambio(Intercambio intercambio) {
		if(intercambio.getEstadoId().equals(Constantes.INTERCAMBIO_ACTIVO_ESTADO_SIN_OFERTA)) {
			intercambio.setCartaOfrecerFinalExpansionId(null);
			intercambio.setCartaOfrecerFinalCartaJuegoId(null);
			intercambio.setCartaQuererFinalExpansionId(null);
			intercambio.setCartaQuererFinalCartaJuegoId(null);
		}
		intercambio.setFechaCambio(LocalDateTime.now());
	}
	
	private void actualizar(Intercambio intercambio) {
		try {
			intercambioMapper.actualizar(intercambio);
		} catch(RuntimeException e) {
			throw new RuntimeException("Ha ocurrido un error al actualizar el intercambio", e);
		}
	}
	
	@Override
	public Integer recuperarTotalCartasPorExpansion(Integer expansionId) {
		return cartaService.recuperarTotalCartasPorExpansion(expansionId);
	}
}