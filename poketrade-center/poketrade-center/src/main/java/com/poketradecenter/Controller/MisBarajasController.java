package com.poketradecenter.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosMisBarajas;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Service.interfaces.IMisBarajasService;
import com.poketradecenter.Utilities.interfaces.ICrearCriterios;

@RestController
public class MisBarajasController {
	
	@Autowired
	private IMisBarajasService misBarajasService;
	
	@Autowired
	private ICrearCriterios crearCriterios;

    @GetMapping("/misBarajas")
    public List<BarajaUsuario> recuperarMisBarajasPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosMisBarajas criterios = crearCriterios.crearCriteriosMisBarajasParams(params);
       return misBarajasService.recuperarMisBarajasPorCriterios(criterios);
    }
    
    @GetMapping("/misBarajas/carta")
    public Carta recuperarCartaMisBarajas(@RequestParam Map<String, String> params) {
       CriteriosCarta criterios = crearCriterios.crearCriteriosCartaParams(params);
       return misBarajasService.recuperarCartaMisBarajas(criterios);
    }
    
    @DeleteMapping("/misBarajas")
    public ResponseEntity<?> eliminarMiBaraja(@RequestBody BarajaUsuario baraja) {
    	try {
    		 misBarajasService.eliminarMiBaraja(baraja);
    		return ResponseEntity.ok().build();
    	}catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
    
    @GetMapping("/misBarajas/usuario")
    public Usuario recuperarCreadorBaraja(@RequestParam Map<String, String> params) {
       CriteriosBarajasPublicas criterios = crearCriterios.crearCriteriosBarajasPublicasParams(params);
       return misBarajasService.recuperarCreadorMisBaraja(criterios);
    }
}