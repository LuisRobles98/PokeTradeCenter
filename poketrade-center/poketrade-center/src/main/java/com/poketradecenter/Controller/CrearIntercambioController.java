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

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Service.interfaces.ICrearIntercambioService;
import com.poketradecenter.Utilities.interfaces.ICrearCriterios;

@RestController
public class CrearIntercambioController {
	
	@Autowired
	private ICrearIntercambioService crearIntercambioService;
	
	@Autowired
	private ICrearCriterios crearCriterios;
	
    @GetMapping("/cartasIntercambio")
    public List<Carta> recuperarCartasPorCriterios(@RequestParam Map<String, String> params) {
        CriteriosCarta criterios = crearCriterios.crearCriteriosCartaParams(params);
        return crearIntercambioService.recuperarCartasPorCriterios(criterios);
    }
    
    @PostMapping("/cartasIntercambio/publicar")
    public ResponseEntity<?> publicarIntercambio(@RequestBody Intercambio intercambio) {
    	try {
    		crearIntercambioService.publicarIntercambio(intercambio);
    		return ResponseEntity.ok().build();
    	} catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    } 
}