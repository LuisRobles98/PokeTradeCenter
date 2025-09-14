package com.poketradecenter.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MenuPrincipalController {
	
    @GetMapping("/menuPrincipal")
    public String MenuPrincipal() {
        return "redirect:/menuPrincipal/html/menuPrincipal.html";
    }
}