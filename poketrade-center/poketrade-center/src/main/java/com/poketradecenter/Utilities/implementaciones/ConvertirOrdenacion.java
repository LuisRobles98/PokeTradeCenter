package com.poketradecenter.Utilities.implementaciones;
import org.springframework.stereotype.Service;
import com.poketradecenter.Utilities.interfaces.IConvertirOrdenacion;



@Service
public class ConvertirOrdenacion implements IConvertirOrdenacion {
	
	@Override
	public String convertirOrdenacionBarajasPublicas(String ordenacion) {
		switch(ordenacion) {
			case "likes_desc":
				return "me_gusta DESC";
			case "likes_asc":
				return "me_gusta ASC";
			case "fecha_desc":
				return "fecha_creacion DESC";
			case "fecha_asc":
				return "fecha_creacion ASC";
			default:
				return null;
		}
	}
	
	@Override
	public String convertirOrdenacionMisBarajas(String ordenacion) {
		switch(ordenacion) {
			case "fecha_desc":
				return "fecha_creacion DESC";
			case "fecha_asc":
				return "fecha_creacion ASC";
			default:
				return null;
		}
	}
	
	@Override
	public String convertirOrdenacionTablonIntercambios(String ordenacion) {
		switch(ordenacion) {
		case "fecha_desc":
			return "fecha_creacion DESC";
		case "fecha_asc":
			return "fecha_creacion ASC";
		default:
			return null;
	}
}
	
}