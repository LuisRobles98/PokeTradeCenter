package com.poketradecenter.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
    public Usuario recuperarUsuarioIntercambiosPublicosPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosUsuario criterios = crearCriterios.crearCriteriosUsuarioParams(params);
       return intercambiosActivosService.recuperarUsuarioPorCriterios(criterios);
    }
    
    @GetMapping("/intercambiosActivos/carta")
    public Carta recuperarCartaIntercambiosPublicosPorCriterios(@RequestParam Map<String, String> params) {
       CriteriosCarta criterios = crearCriterios.crearCriteriosCartaParams(params);
       return intercambiosActivosService.recuperarCartaPorCriterios(criterios);
    }
}