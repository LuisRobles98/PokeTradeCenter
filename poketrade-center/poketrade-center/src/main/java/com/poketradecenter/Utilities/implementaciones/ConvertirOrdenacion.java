package com.poketradecenter.Utilities.implementaciones;
import org.springframework.stereotype.Service;
import com.poketradecenter.Utilities.interfaces.IConvertirOrdenacion;

@Service
public class ConvertirOrdenacion implements IConvertirOrdenacion {
	
	@Override
	public String convertirOrdenacionBarajasPublicas(String ordenacion) {
		switch(ordenacion) {
			case Constantes.LIKES_DESC:
				return Constantes.ME_GUSTA + " " + Constantes.ORDENACION_DESCENDENTE;
			case Constantes.LIKES_ASC:
				return Constantes.ME_GUSTA + " " + Constantes.ORDENACION_ASCENDENTE;
			case Constantes.FECHA_DESC:
				return Constantes.FECHA_CREACION + " " + Constantes.ORDENACION_DESCENDENTE;
			case Constantes.FECHA_ASC:
				return Constantes.FECHA_CREACION + " " + Constantes.ORDENACION_ASCENDENTE;
			default:
				return null;
		}
	}
	
	@Override
	public String convertirOrdenacionMisBarajas(String ordenacion) {
		switch(ordenacion) {
			case Constantes.FECHA_DESC:
				return Constantes.FECHA_CREACION + " " + Constantes.ORDENACION_DESCENDENTE;
			case Constantes.FECHA_ASC:
				return Constantes.FECHA_CREACION + " " + Constantes.ORDENACION_ASCENDENTE;
			default:
				return null;
		}
	}
	
	@Override
	public String convertirOrdenacionTablonIntercambios(String ordenacion) {
		switch(ordenacion) {
			case Constantes.FECHA_DESC:
				return Constantes.FECHA_CAMBIO + " " + Constantes.ORDENACION_DESCENDENTE;
			case Constantes.FECHA_ASC:
				return Constantes.FECHA_CAMBIO + " " + Constantes.ORDENACION_ASCENDENTE;
			default:
				return null;
		}
	}
}