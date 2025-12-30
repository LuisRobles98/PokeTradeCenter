package com.poketradecenter.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poketradecenter.Clase.Carta;
import com.poketradecenter.Clase.CriteriosCarta;
import com.poketradecenter.Service.interfaces.ICrearIntercambioService;

@RestController
public class CrearIntercambioController {
	
	@Autowired
	private ICrearIntercambioService crearIntercambioService;
	
    @GetMapping("/cartasIntercambio")
    public List<Carta> recuperarCartasPorCriterios(@RequestParam Map<String, String> params) {
        CriteriosCarta criterios = crearIntercambioService.crearCriteriosCartaParams(params);
        return crearIntercambioService.recuperarCartasPorCriterios(criterios);
    }
    
}