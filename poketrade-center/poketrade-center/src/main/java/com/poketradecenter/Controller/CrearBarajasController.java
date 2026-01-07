package com.poketradecenter.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Service.interfaces.ICrearBarajasService;

@RestController
public class CrearBarajasController {
	
	@Autowired
	private ICrearBarajasService crearBarajasService;
	
    @GetMapping("/cartasBarajas")
    public List<Carta> recuperarCartasPorCriterios(@RequestParam Map<String, String> params) {
        CriteriosCarta criterios = crearBarajasService.crearCriteriosCartaParams(params);
        return crearBarajasService.recuperarCartasPorCriterios(criterios);
    }
    
    @PostMapping("/cartasBarajas/guardar")
    public ResponseEntity<?> guardarBaraja(@RequestBody BarajaUsuario baraja) {
    	try {
    		crearBarajasService.guardarBaraja(baraja);
    		return ResponseEntity.ok().build();
    	} catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
    
    @PostMapping("/cartasBarajas/publicar")
    public ResponseEntity<?> publicarBaraja(@RequestBody BarajaPublica baraja) {
    	try {
    		crearBarajasService.publicarBaraja(baraja);
    		return ResponseEntity.ok().build();
    	} catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }

}