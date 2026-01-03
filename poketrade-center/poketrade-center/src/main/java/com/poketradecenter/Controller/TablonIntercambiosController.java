package com.poketradecenter.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poketradecenter.Clase.CriteriosIntercambiosPublicos;
import com.poketradecenter.Clase.Intercambio;
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
    
}