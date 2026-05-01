package com.poketradecenter.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosIntercambio;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Service.interfaces.IIntercambiosActivosService;
import com.poketradecenter.Utilities.interfaces.ICrearCriterios;

@RestController
public class IntercambiosActivosController {
	
	@Autowired
	private IIntercambiosActivosService intercambiosActivosService;
	
	@Autowired
	private ICrearCriterios crearCriterios;

    @GetMapping("/intercambiosActivos")
    public List<Intercambio> recuperarIntercambiosActivosPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosIntercambio criterios = crearCriterios.crearCriteriosIntercambioParams(params);
       return intercambiosActivosService.recuperarIntercambiosActivosPorCriterios(criterios);
    }

    @GetMapping("/intercambiosActivos/usuario")
    public Usuario recuperarUsuarioIntercambiosActivosPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosUsuario criterios = crearCriterios.crearCriteriosUsuarioParams(params);
       return intercambiosActivosService.recuperarUsuarioPorCriterios(criterios);
    }
    
    @GetMapping("/intercambiosActivos/carta")
    public Carta recuperarCartaIntercambiosPublicosPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosCarta criterios = crearCriterios.crearCriteriosCartaParams(params);
       return intercambiosActivosService.recuperarCartaPorCriterios(criterios);
    }
    
    @PutMapping("/intercambiosActivos")
    public ResponseEntity<?> actualizarIntercambio(@RequestBody Intercambio intercambio) {
       try {
    	   intercambiosActivosService.actualizarIntercambio(intercambio);
    	   return ResponseEntity.ok().build();
	   	}catch(RuntimeException e) {
	   		return ResponseEntity.badRequest().body(e.getMessage());
	   	}
    }
    
    @GetMapping("/intercambiosActivos/{expansionId}")
    public Integer recuperarTotalCartasPorExpansion(@PathVariable Integer expansionId) {
    	return intercambiosActivosService.recuperarTotalCartasPorExpansion(expansionId);
    }
}