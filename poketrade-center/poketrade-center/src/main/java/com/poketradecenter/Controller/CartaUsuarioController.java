package com.poketradecenter.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poketradecenter.Clase.CartaUsuario;
import com.poketradecenter.Clase.CriteriosCartaUsuario;
import com.poketradecenter.Service.interfaces.ICartaUsuarioService;

@RestController
public class CartaUsuarioController {
	
	@Autowired
	private ICartaUsuarioService cartaUsuarioService;
	

    @GetMapping("/cartasUsuario")
    public List<CartaUsuario> recuperarCartasUsuarioPorCriterios(@RequestParam Map<String, String> params) {
        CriteriosCartaUsuario criterios = cartaUsuarioService.crearCriteriosCartaUsuarioParams(params);
        List<CartaUsuario> cartas = cartaUsuarioService.recuperarCartaUsuarioPorCriterios(criterios);
        return cartas;
    }
    
    @PutMapping("/cartasUsuario")
    public void actualizarCarta(@RequestBody CartaUsuario cartaUsuario) {
        cartaUsuarioService.actualizarCarta(cartaUsuario);
    }
    
    //MIGRAR A NUEVA TABLA PARA CARTAS
    @GetMapping("/cartasUsuario/{expansionId}")
    public Integer recuperarTotalCartasPorExpansion(@PathVariable Integer expansionId) {
    	Integer totalCartas = cartaUsuarioService.recuperarTotalCartasPorExpansion(expansionId);
    	return totalCartas;
    }
}