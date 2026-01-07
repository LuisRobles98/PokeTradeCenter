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

import com.poketradecenter.Clase.Baraja;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajasPublicas;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Service.interfaces.IBarajasPublicasService;

@RestController
public class BarajasPublicasController {
	
	@Autowired
	private IBarajasPublicasService barajasPublicasService;

    @GetMapping("/barajasPublicas")
    public List<BarajaPublica> recuperarBarajasPublicasPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosBarajasPublicas criterios = barajasPublicasService.crearCriteriosBarajasPublicasParams(params);
       return barajasPublicasService.recuperarBarajasPublicasPorCriterios(criterios);
    }
    
    @GetMapping("/barajasPublicas/carta")
    public Carta recuperarCartaBarajasPublicas(@RequestParam Map<String, String> params) {
       CriteriosCarta criterios = barajasPublicasService.crearCriteriosCartaParams(params);
       return barajasPublicasService.recuperarCartaBarajasPublicas(criterios);
    }
    
    @GetMapping("/barajasPublicas/usuario")
    public Usuario recuperarCreadorBaraja(@RequestParam Map<String, String> params) {
       CriteriosUsuario criterios = barajasPublicasService.crearCriteriosUsuarioParams(params);
       return barajasPublicasService.recuperarCreadorBarajasPublicas(criterios);
    }
    
    @GetMapping("/barajasPublicas/like")
    public boolean recuperarLikeBarajasPublicas(@RequestParam Map<String, String> params) {
       CriteriosBarajasPublicas criterios = barajasPublicasService.crearCriteriosBarajasPublicasParams(params);
       return barajasPublicasService.comprobarLikeABaraja(criterios);
    }
    
    @PostMapping("/barajasPublicas")
    public ResponseEntity<?> darLike(@RequestBody CriteriosBarajasPublicas criterios) {
    	try {
    		barajasPublicasService.darLikeABaraja(criterios);
    		return ResponseEntity.ok().build();
    	}catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
    
    @PostMapping("/barajasPublicas/guardar")
    public ResponseEntity<?> guardarBaraja(@RequestBody CriteriosBarajasPublicas criterios) {
    	try {
    		barajasPublicasService.guardarBaraja(criterios);
    		return ResponseEntity.ok().build();
    	}catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
    
}