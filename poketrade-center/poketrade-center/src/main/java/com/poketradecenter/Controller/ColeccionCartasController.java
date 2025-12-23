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

import com.poketradecenter.Clase.CartaUsuario;
import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Service.interfaces.IColeccionCartasService;

@RestController
public class ColeccionCartasController {
	
	@Autowired
	private IColeccionCartasService coleccionCartasService;
	

    @GetMapping("/coleccionCartas")
    public List<CartaUsuario> recuperarCartasUsuarioPorCriterios(@RequestParam Map<String, String> params) {
        CriteriosCartaUsuario criterios = coleccionCartasService.crearCriteriosCartaUsuarioParams(params);
        return coleccionCartasService.recuperarCartaUsuarioPorCriterios(criterios);
    }

    @PutMapping("/coleccionCartas")
    public ResponseEntity<?> actualizarCarta(@RequestBody CartaUsuario cartaUsuario) {
    	try {
    		coleccionCartasService.actualizarCarta(cartaUsuario);
    		return ResponseEntity.ok().build();
    	}catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
    
    @GetMapping("/coleccionCartas/{expansionId}")
    public Integer recuperarTotalCartasPorExpansion(@PathVariable Integer expansionId) {
    	return coleccionCartasService.recuperarTotalCartasPorExpansion(expansionId);
    }
}