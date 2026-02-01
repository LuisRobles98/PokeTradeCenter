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
import com.poketradecenter.Clase.BarajaLike;
import com.poketradecenter.Clase.BarajaPublica;
import com.poketradecenter.Clase.BarajaUsuario;
import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosBarajaPublica;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosBarajaUsuario;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Service.interfaces.IBarajasPublicasService;
import com.poketradecenter.Utilities.interfaces.ICrearCriterios;

@RestController
public class BarajasPublicasController {
	
	@Autowired
	private IBarajasPublicasService barajasPublicasService;

	@Autowired
	private ICrearCriterios crearCriterios;
	
    @GetMapping("/barajasPublicas")
    public List<BarajaPublica> recuperarBarajasPublicasPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosBarajaPublica criterios = crearCriterios.crearCriteriosBarajaPublicaParams(params);
       return barajasPublicasService.recuperarBarajasPublicasPorCriterios(criterios);
    }
    
    @GetMapping("/barajasPublicas/carta")
    public Carta recuperarCartaBarajasPublicas(@RequestParam Map<String, String> params) {
       CriteriosCarta criterios = crearCriterios.crearCriteriosCartaParams(params);
       return barajasPublicasService.recuperarCartaBarajasPublicas(criterios);
    }
    
    @GetMapping("/barajasPublicas/usuario")
    public Usuario recuperarCreadorBaraja(@RequestParam Map<String, String> params) {
       CriteriosUsuario criterios = crearCriterios.crearCriteriosUsuarioParams(params);
       return barajasPublicasService.recuperarCreadorBarajasPublicas(criterios);
    }
    
    @GetMapping("/barajasPublicas/like")
    public boolean recuperarLikeBarajasPublicas(@RequestParam Map<String, String> params) {
       CriteriosBarajaPublica criterios = crearCriterios.crearCriteriosBarajaPublicaParams(params);
       return barajasPublicasService.comprobarLikeABaraja(criterios);
    }
    
    @PostMapping("/barajasPublicas")
    public ResponseEntity<?> darLike(@RequestBody BarajaLike barajaLike) {
    	try {
    		barajasPublicasService.darLikeABaraja(barajaLike);
    		return ResponseEntity.ok().build();
    	}catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
    
    @GetMapping("/barajasPublicas/barajaGuardada")
    public boolean recuperarBarajaPublicaGuardada(@RequestParam Map<String, String> params) {
       CriteriosBarajaUsuario criterios = crearCriterios.crearCriteriosBarajaUsuarioParams(params);
       return barajasPublicasService.comprobarBarajaPublicaGuardada(criterios);
    }
    
    @PostMapping("/barajasPublicas/guardar")
    public ResponseEntity<?> guardarBarajaPublicaComoUsuario(@RequestBody BarajaUsuario barajaUsuario) {
    	try {
    		barajasPublicasService.guardarBarajaPublicaComoUsuario(barajaUsuario);
    		return ResponseEntity.ok().build();
    	}catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
    
}