package com.poketradecenter.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Clase.CriteriosIntercambiosPublicos;
import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Intercambio;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Service.interfaces.ITablonIntercambiosService;

@RestController
public class TablonIntercambiosController {
	
	@Autowired
	private ITablonIntercambiosService tablonIntercambiosService;

    @GetMapping("/intercambiosPublicos")
    public List<Intercambio> recuperarIntercambiosPublicosPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosIntercambiosPublicos criterios = tablonIntercambiosService.crearCriteriosIntercambiosPublicosParams(params);
       return tablonIntercambiosService.recuperarIntercambiosPublicosPorCriterios(criterios);
    }
    
    @GetMapping("/intercambiosPublicos/usuario")
    public Usuario recuperarUsuarioIntercambiosPublicosPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosUsuario criterios = tablonIntercambiosService.crearCriteriosUsuarioParams(params);
       return tablonIntercambiosService.recuperarUsuarioPorCriterios(criterios);
    }
    
    @GetMapping("/intercambiosPublicos/carta")
    public Carta recuperarCartaIntercambiosPublicosPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosCarta criterios = tablonIntercambiosService.crearCriteriosCartaParams(params);
       return tablonIntercambiosService.recuperarCartaPorCriterios(criterios);
    }
    
    @PutMapping("/intercambiosPublicos")
    public ResponseEntity<?> solicitarIntercambio(@RequestBody Intercambio intercambio) {
    	try {
    		tablonIntercambiosService.solicitarIntercambio(intercambio);
    		return ResponseEntity.ok().build();
    	}catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
    
}