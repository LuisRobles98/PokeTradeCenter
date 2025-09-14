package com.poketradecenter.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ColeccionCartasController {
	
    @GetMapping("/menuPrincipal/coleccionCartas")
    public String ColeccionCartas() {
        return "redirect:/coleccionCartas/html/coleccionCartas.html";
    }
}