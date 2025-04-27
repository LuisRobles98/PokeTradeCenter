package com.poketradecenter.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaginaPrincipalController {
	
    @GetMapping("/")
    public String PaginaPrincipal() {
        return "redirect:/paginaPrincipal/html/paginaPrincipal.html";
    }
}